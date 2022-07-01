# -*- coding: utf-8 -*-
import asyncio
import aiohttp
from copy import deepcopy
from datetime import datetime
from aiohttp.client_exceptions import ClientProxyConnectionError
from proxy import getProxy
from cache import ReqCache, ParseCache, gMaxConcurrency, gTimeout


async def aRequest(pTask):
    iTask = deepcopy(pTask)
    iResult = {
        'body': b'',
        'status': 200,
        'reqDate': datetime.now(),
        'resDate': datetime.now(),
        'msg': 'success',
        'url': iTask.get('req', {}).get('url')
    }
    if iTask.get('skip', False):
        iTask['res'] = iResult
        return iTask

    iReqTask = deepcopy(iTask.get('req', {}))

    iHeaders = {
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        'Accept-Encoding': 'gzip, deflate',
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/90.0.4430.212 Safari/537.36 "
    }
    iHeaders.update(iReqTask.get('headers', {}))
    iReqTask['headers'] = iHeaders
    iReqTask['timeout'] = aiohttp.ClientTimeout(total=int(iReqTask.get('timeout', gTimeout)))
    iReqTask.setdefault('method', 'GET')
    iReqTask.setdefault('proxy', await getProxy(iTask))
    iResult['reqDate'] = datetime.now()
    async with aiohttp.ClientSession() as iSession:
        try:
            async with iSession.request(**iReqTask) as iRes:
                iResult['headers'] = dict(iRes.headers)
                iResult['body'] = await iRes.read()
                iResult['cookies'] = {k: iRes.cookies[k].value for k in iRes.cookies}
                iResult['status'] = iRes.status
                iResult['url'] = str(iRes.real_url)
        except ClientProxyConnectionError:
            iResult['status'] = -3
            iResult['msg'] = 'ClientProxyConnectionError'
        except asyncio.TimeoutError:
            iResult['status'] = -2
            iResult['msg'] = 'TimeoutError'
        except Exception as e:
            iResult['status'] = -1
            iResult['msg'] = str(e)

    iResult['resDate'] = datetime.now()
    iTask['res'] = iResult
    return iTask


class Downloader(object):
    def __init__(self):
        self.reqCache = ReqCache()
        self.parseCache = ParseCache()
        self.threadCount = gMaxConcurrency

    @staticmethod
    def log(*args):
        print(datetime.now(), *args)

    async def doThread(self, pIndex):
        while True:
            iTask = self.reqCache.pop()
            if iTask is None:
                await asyncio.sleep(1)
                continue

            iResult = await aRequest(iTask)
            if not self.reqCache.isRunning(iTask['taskKey']):
                self.reqCache.finish(iTask)
                continue
            iUrl = iTask.get('req', {}).get('url', 'virtualRequest')
            if iResult['res']['status'] == 200:
                self.parseCache.push(iResult)
                self.log(pIndex, 'res', iUrl, iResult['res']['status'])
            elif iResult['res']['status'] in iTask['retryCode']:
                if iTask['retryTimes'] > 0:
                    iTask['retryTimes'] = iTask['retryTimes'] - 1
                    self.reqCache.pushOne(iTask)
                    self.log(pIndex, 'retry', iUrl, iTask['retryTimes'])
                else:
                    self.log(pIndex, 'ignore', iUrl)
            else:
                self.log(pIndex, 'res', iUrl, iResult['res']['status'])
            self.reqCache.finish(iTask)

    def start(self):
        asyncio.run(asyncio.wait([self.doThread(i) for i in range(self.threadCount)]))


def main():
    print(datetime.now(), 'downloader is starting')
    try:
        Downloader().start()
    finally:
        pass


if __name__ == '__main__':
    main()
