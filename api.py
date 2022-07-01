# -*- coding: utf-8 -*-
import collections.abc
from aiohttp import web
from json.decoder import JSONDecodeError
from extractor import makeReq
from store import createConn
from cache import ReqCache, DBConnCache, CronJobCache, gWebPort, loads, dumps, datetime, deepcopy, gWebRoot


def simplify(pFunc):
    async def wrapper(pObj, pReq):
        # print(datetime.now(), dumps(pReq.headers, indent=4, ensure_ascii=False))
        print(datetime.now(), pReq.remote, pReq.path)
        iData = await pReq.read()
        try:
            iData = loads(iData)
        except JSONDecodeError:
            return web.json_response({'flag': -1, 'msg': 'JSONDecodeError'})

        iResult = await pFunc(pObj, iData)
        if isinstance(iResult, dict):
            return web.Response(text=dumps(iResult, ensure_ascii=False))
        else:
            return web.json_response({'flag': -1, 'msg': 'invalid result'})
    return wrapper


class Spider(object):
    def __init__(self):
        self._cache = ReqCache()

    @simplify
    async def pause(self, pData):
        if 'taskKey' not in pData:
            return {'flag': -1, 'msg': 'invalid parameter'}

        iTaskKey = pData.get('taskKey', None)
        self._cache.pause(iTaskKey)
        return {'flag': 0, 'msg': 'success'}

    @simplify
    async def stop(self, pData):
        if 'taskKey' not in pData:
            return {'flag': -1, 'msg': 'invalid parameter'}

        iTaskKey = pData.get('taskKey', None)
        self._cache.stop(iTaskKey)
        return {'flag': 0, 'msg': 'success'}

    @simplify
    async def start(self, pData):
        if 'taskKey' not in pData:
            return {'flag': -1, 'msg': 'invalid parameter'}

        iTaskKey = pData.get('taskKey', None)
        iProject = self._cache.getProject(iTaskKey)
        if iProject is None:
            return {'flag': -1, 'msg': 'invalid parameter'}

        iStatus = self._cache.isRunning(iTaskKey)
        if iStatus is None:
            if not self._cache.isFinished(iTaskKey):
                return {'flag': -1, 'msg': 'task is not finished'}

            self._cache.clear(iTaskKey)
            iActKey = 'entrance'
            iEntrance = iProject.get(iActKey, {})
            iEntrance.setdefault('actKey', iActKey)
            iEntrance.setdefault('encoding', iProject.get('encoding', 'utf8'))
            iList = iEntrance.pop('task')
            for iItem in iList:
                iTask = deepcopy(iEntrance)
                iTask.update(iItem)
                iTask = makeReq(iTask, iProject)
                self._cache.push(iTask)
        elif iStatus > 0:
            return {'flag': -1, 'msg': 'task is running'}

        self._cache.start(iProject)
        return {'flag': 0, 'msg': 'success'}

    @simplify
    async def save(self, pData):
        if 'taskKey' not in pData:
            return {'flag': -1, 'msg': 'invalid parameter'}
        try:
            self._cache.initProject(pData)
            return {'flag': 0, 'msg': 'success'}
        except Exception as e:
            return {'flag': -1, 'msg': str(e)}

    @simplify
    async def get(self, pData):
        if 'taskKey' not in pData:
            return {'flag': -1, 'msg': 'invalid parameter'}
        iResult = self._cache.getProject(pData["taskKey"])
        if iResult is None:
            return {'flag': -1, 'msg': f'can not find project `{pData["taskKey"]}`'}
        else:
            return {'flag': 0, 'msg': 'success', 'data': iResult}

    @simplify
    async def Del(self, pData):
        if 'taskKey' not in pData:
            return {'flag': -1, 'msg': 'invalid parameter'}
        return {'flag': 0, 'msg': 'success', 'data': self._cache.delProject(pData['taskKey'])}

    @simplify
    async def list(self, pData):
        return {'flag': 0, 'msg': 'success', 'data': self._cache.listProject()}


class DBConn(object):
    def __init__(self):
        self._cache = DBConnCache()

    @simplify
    async def test(self, pData):
        try:
            iConn = createConn(pData)
            if iConn is None:
                return {'flag': -1, 'msg': 'invalid parameter'}
            if pData['dbType'] == 'mongodb':
                iConn.list_collection_names()
            # else:
            #     if pData['dbType'] == 'oracle':
            #         iSql = f"select * from {iTable} where rownum < 1"
            #     elif pData['dbType'] == 'sqlserver':
            #         iSql = f"select top 0 * from {iTable}"
            #     else:
            #         iSql = f"select * from {iTable} limit 0"
            #     iConn.cursor().execute(iSql)
            return {'flag': 0, 'msg': 'success'}
        except Exception as e:
            return {'flag': -1, 'msg': '连接失败，请修改配置后重试'}


    @simplify
    async def save(self, pData):
        if 'dbName' not in pData:
            return {'flag': -1, 'msg': 'invalid parameter'}
        iResult = self._cache.save(pData)
        if iResult < 0:
            return {'flag': -1, 'msg': 'invalid parameter'}
        elif iResult > 0:
            return {'flag': 1, 'msg': 'insert success'}
        else:
            return {'flag': 0, 'msg': 'update success'}

    @simplify
    async def get(self, pData):
        if 'dbName' not in pData:
            return {'flag': -1, 'msg': 'invalid parameter'}
        iResult = self._cache.get(pData['dbName'])
        if iResult is None:
            return {'flag': -1, 'msg': f'can not find dbc `{pData["dbName"]}`'}
        else:
            return {'flag': 0, 'msg': 'success', 'data': iResult}

    @simplify
    async def Del(self, pData):
        if 'dbName' not in pData:
            return {'flag': -1, 'msg': 'invalid parameter'}
        return {'flag': 0, 'msg': 'success', 'data': self._cache.Del(pData['dbName'])}

    @simplify
    async def list(self, pData):
        return {'flag': 0, 'msg': 'success', 'data': self._cache.list()}


class CronJob(object):
    def __init__(self):
        self._cache = CronJobCache()

    @simplify
    async def save(self, pData):
        if 'id' not in pData:
            return {'flag': -1, 'msg': 'invalid parameter'}
        iResult = self._cache.save(pData)
        if iResult < 0:
            return {'flag': -1, 'msg': 'invalid parameter'}
        elif iResult > 0:
            return {'flag': 1, 'msg': 'insert success'}
        else:
            return {'flag': 0, 'msg': 'update success'}

    @simplify
    async def get(self, pData):
        if 'id' not in pData:
            return {'flag': -1, 'msg': 'invalid parameter'}
        iResult = self._cache.get(pData['id'])
        if iResult is None:
            return {'flag': -1, 'msg': f'can not find dbc `{pData["id"]}`'}
        else:
            return {'flag': 0, 'msg': 'success', 'data': iResult}

    @simplify
    async def Del(self, pData):
        if 'id' not in pData:
            return {'flag': -1, 'msg': 'invalid parameter'}
        return {'flag': 0, 'msg': 'success', 'data': self._cache.Del(pData['id'])}

    @simplify
    async def list(self, pData):
        return {'flag': 0, 'msg': 'success', 'data': self._cache.list()}


def mapRouter(pObjectList, pRouter):
    for iObject in pObjectList:
        iName = iObject.__class__.__name__.lower()
        for iAttrb in iObject.__dir__():
            iTarget = getattr(iObject, iAttrb)
            if not iAttrb.startswith('_') and isinstance(iTarget, collections.abc.Callable):
                iAttrb = iAttrb.lower()
                pRouter.add_post(f"/{iName}/{iAttrb}".lower(), iTarget)


async def index(pReq):
    return web.HTTPFound('index.html')


def main():
    iApp = web.Application()
    iApp.router.add_get('/', index)
    iApp.router.add_static('/', gWebRoot)

    mapRouter([Spider()], iApp.router)
    mapRouter([CronJob()], iApp.router)
    mapRouter([DBConn()], iApp.router)
    web.run_app(iApp, port=gWebPort)


if __name__ == '__main__':
    main()
