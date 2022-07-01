# -*- coding: utf-8 -*-
import asyncio
import re
import moment
import itertools
import lxml.html
from lxml import etree
from copy import deepcopy
from jsonpath import jsonpath
from urllib.parse import urljoin
from bson.json_util import loads
from datetime import datetime
from cache import ParseCache, ReqCache, gInterval, gTimeout, gRetryTimes, gRetryCode
from store import Store


class Element(etree.ElementBase):
    def __init__(self, pTag, pText=None, *args, **kwargs):
        super(Element, self).__init__(*args, **kwargs)
        self.tag = pTag
        if isinstance(pText, str):
            self.text = pText


def fnTokenize(_, pList, pVal):
    iResult = []
    for iItem in pList:
        iList = [i for i in re.findall(pVal, iItem) if i.strip()]
        if iList:
            iResult.extend(iList)
    return iResult


etree.FunctionNamespace('http://exslt.org/regular-expressions').prefix = 're'
ns = etree.FunctionNamespace(None)
ns['getValue'] = lambda context, pList, pVal: pList if pList else [pVal]
ns['string-join'] = lambda context, pList, pVal: pVal.join([re.sub(r'\s+', '', i) for i in pList])
ns['math-add'] = lambda context, pList, pVal: [Element(pTag="math", pText=str(int(i) + int(pVal))) for i in pList]
ns['cartesian'] = lambda context, pList, pStart, pEnd, pStep: [
    [str(i[0]), str(i[1])] for i in itertools.product(pList, range(int(pStart), int(pEnd), int(pStep)))]
ns['tokenize'] = fnTokenize


def node2str(pNode):
    return etree.tostring(pNode, method='c14n', pretty_print=True, strip_text=True, with_comments=False).decode()


def str2node(pHtml):
    iHtml = pHtml.replace('&nbsp;', ' ')
    iHtml = re.sub(r'\s+<', '<', re.sub(r'>\s+', '>', iHtml))
    iHtml = re.sub(r'<\?[^?]*\?>', '', re.sub('\r', '', iHtml))
    return etree.fromstring(iHtml, lxml.html.HTMLParser())


def obj2int(pObj):
    iResult = None
    try:
        iResult = int(pObj)
    finally:
        return iResult


def makeReq(pTask, pProject):
    iTask = deepcopy(pTask)
    iTask.setdefault('taskKey', pProject['taskKey'])
    if 'req' not in iTask:
        iTask['skip'] = True
        iTask['local'] = True
        iTask['req'] = {"url": f"virtualReq|{pProject['taskKey']}|{iTask['actKey']}"}
    iTask['req'].setdefault('timeout', pProject.get('timeout', gTimeout))
    iTask.setdefault('retryCode', pProject.get('retryCode', []))
    iTask['retryCode'] = set(iTask['retryCode'] + gRetryCode)
    iTask.setdefault('retryTimes', pProject.get('retryTimes', gRetryTimes))

    if 'resource' in pProject:
        iTask.setdefault('resource', pProject['resource'])
        iTask.setdefault('resourceKey', pProject['resourceKey'])
        iTask.setdefault('interval', pProject.get('interval', gInterval))

    if 'fixProxy' in pProject:
        iTask.setdefault('fixProxy', pProject.get('fixProxy'))
    iTask['created'] = datetime.now()

    return iTask


def makeStore(pTask, pProject):
    iTask = deepcopy(pTask)
    iTask['taskKey'] = pProject['taskKey']
    iTask['created'] = datetime.now()
    iTask['flag'] = 0
    return iTask


def transform(pTask):
    iDict, iCharSet = {}, pTask.get('encoding', 'utf8')
    if pTask.get('dataType', 'dom') == 'dom':
        iBody = pTask['res'].get('body', b'')
        iDict = {
            'parameter': str2node(iBody.decode(iCharSet, 'ignore')),
            'res': pTask['res'],
            'req': pTask['req'],
            'inherit': pTask.get('inherit', {})
        }
    elif pTask.get('dataType', 'dom') == 'json':
        iBody = pTask['res'].pop('body', b'')
        iDict = {
            'parameter': loads(re.sub('[\r\n]+', '', iBody.decode(iCharSet))),
            'res': pTask['res'],
            'req': pTask['req'],
            'inherit': pTask.get('inherit', {})
        }
    else:
        iBody = pTask['res'].pop('body', b'')
        iDict = {
            'parameter': iBody,
            'res': pTask['res'],
            'req': pTask['req'],
            'inherit': pTask.get('inherit', {})
        }
    return iDict


def doParseStep(pStep, pData, pPrev):
    iParseData = pData.get(pStep.get('target', 'parameter'), pPrev)
    iType = pStep.get('parseType', 'any')
    iRule = pStep.get('rule')
    iOut = pStep.get('out', 'any')
    iNext = pStep.get('next', [])
    iFetchAll = pStep.get('fetchall', 0)

    iResult = iParseData
    if iParseData is not None:
        if iType == 'xpath':
            iResult = iParseData.xpath(iRule)
        elif iType == 'json':
            iResult = jsonpath(iParseData, iRule) or []
        elif iType == 'str':
            iResult = str.format_map(iRule, iParseData if isinstance(iParseData, dict) else {
                "parameter": iParseData})
        elif iType == 're':
            iResult = re.findall(iRule, iParseData)
        elif iType == 'value':
            iResult = iRule

    if not isinstance(iResult, list):
        iResult = [] if iResult is None else [iResult]

    if iOut == 'url':
        iResult = [urljoin(pData['res'].get('url', ''), i) for i in iResult]
    elif iOut == 'html':
        iResult = [node2str(i) for i in iResult]
    elif iOut == 'dom':
        iResult = [str2node(i) for i in iResult]
    elif iOut == 'range':
        iResult = list(range(*[int(i) for i in iResult])) if len(iResult) else []
    elif iOut == 'cartesianProduct':
        iResult = itertools.product(*iResult) if len(iResult) > 1 else []
    elif iOut == 'int':
        iResult = [obj2int(i) for i in iResult]
    elif iOut == 'datetime':
        iResult = [moment.date(str(i)).date if moment.date(str(i)).date else datetime.now() for i in iResult]

    if len(iResult):
        if iNext:
            return doParse(iNext, {
                'parameter': iResult[0], 'res': pData['res'], 'req': pData['req'], 'inherit': pData['inherit']
            }) if not iFetchAll else (doParse(iNext, {
                'parameter': iResult, 'res': pData['res'], 'req': pData['req'], 'inherit': pData['inherit']
            }) if iFetchAll > 0 else [doParse(iNext, {
                'parameter': list(i) if isinstance(i, tuple) else i,
                'res': pData['res'], 'req': pData['req'], 'inherit': pData['inherit']
            }) for i in iResult])
        else:
            return iResult if iFetchAll else iResult[0]
    else:
        return [] if iFetchAll else None


def doParse(pParseStep, pData):
    iResult = {}
    for iStep in pParseStep:
        iData = doParseStep(iStep, pData, iResult)
        if 'name' in iStep:
            if isinstance(iResult, dict):
                iResult[iStep['name']] = iData
            else:
                iResult = {iStep['name']: iData}
        else:
            if isinstance(iResult, list) and isinstance(iData, list):
                iResult.extend(iData)
            elif isinstance(iResult, dict) and isinstance(iData, dict):
                iResult.update(iData)
            else:
                iResult = iData
    return iResult


def initSend(pData, pActKey, pProject):
    iResult = {}
    if not pData:
        return iResult

    for iSender in pProject.get('sender', {}).get(pActKey, []):
        iSender = deepcopy(iSender)
        iSender.setdefault('encoding', pProject.get('encoding', 'utf8'))
        iSource = iSender.pop('source', '*' if isinstance(pData, list) else '.')
        iSenderType = iSender.pop('type', 'any')

        iList = jsonpath(pData, iSource)
        if isinstance(iList, bool):
            continue
        iResult.setdefault(iSenderType, [])
        if iSenderType == 'req':
            iList = [makeReq(_, pProject) for _ in iList]
        elif iSenderType == 'store':
            iList = [makeStore(_, pProject) for _ in iList]

        iSender['task'] = iList
        iResult[iSenderType].append(iSender)

    return iResult


def doTask(pTask, pReqCache, pStore):
    iProject = pReqCache.getProject(pTask['taskKey'])
    iResult = transform(pTask)
    iResult = doParse(iProject.get('parser', {}).get(pTask['actKey'], []), iResult)
    iResult = initSend(iResult, pTask['actKey'], iProject)
    for iSenderType, iList in iResult.items():
        if iSenderType == 'req':
            for iItem in iList:
                iItem['actKey'] = iItem.pop('target')
                iItem['dataType'] = iItem.pop('targetType', 'dom')
                iTaskList = iItem.pop('task')
                for iTaskItem in iTaskList:
                    iData = deepcopy(iItem)
                    iData.update(iTaskItem)
                    pReqCache.push(iData)
        elif iSenderType == 'store':
            for iItem in iList:
                pStore.doStore(iItem)


def main():
    iReqCache = ReqCache()
    iParseCache = ParseCache()
    iStore = Store()
    print(datetime.now(), 'extractor is starting')
    while True:
        if iParseCache.needRefreshDBC():
            iStore.refresh()
        iTask = iParseCache.pop()
        if iTask is None:
            asyncio.run(asyncio.sleep(1))
            continue
        doTask(iTask, iReqCache, iStore)


if __name__ == '__main__':
    main()
