# -*- coding: utf-8 -*-
import redis
import random
import hashlib
import pymongo
import pymongo.errors
from copy import deepcopy
from datetime import datetime
from bson.json_util import loads, dumps, JSONOptions
from settings import *


def getTaskId(pTask):
    iUrl = pTask.get('req', {}).get('url', '')
    iUrl = iUrl.split('://')[-1].split('#')[0]
    iBody = pTask['req'].get('body', '')
    iData = f"{iUrl}\x1f{iBody}"
    return hashlib.md5(iData.encode()).hexdigest()


class ReqCache(object):
    def __init__(self):
        self._redis = redis.StrictRedis(connection_pool=redis.ConnectionPool(**redis_reqCache))

    def initProject(self, pProject: dict):
        iProject = deepcopy(pProject)
        iProject.setdefault('weight', gDefaultWeight)
        iProject.setdefault('concurrency', gDefaultConcurrency)
        iProject['created'] = datetime.now()
        iTaskKey = iProject['taskKey']

        self.stop(iTaskKey)
        self._redis.hset(gDLCounter, f"w{gSeparator}{iTaskKey}", 0)
        self._redis.hset(gProjectList, iTaskKey, dumps(iProject, ensure_ascii=False))

    def listProject(self):
        iResult = {}
        for k, v in self._redis.hgetall(gProjectList).items():
            iProject = loads(v, json_options=JSONOptions(tz_aware=False))
            iTaskKey = k.decode()
            iFlag = self._redis.hget(gDLStatus, iTaskKey)
            iProject['flag'] = 0 if iFlag is None else (1 if int(iFlag) > 0 else -1)
            iResult[iTaskKey] = iProject
        return iResult

    def getProject(self, pTaskKey):
        iProject = self._redis.hget(gProjectList, pTaskKey)
        return None if iProject is None else loads(iProject, json_options=JSONOptions(tz_aware=False))

    def delProject(self, pTaskKey):
        return self._redis.hdel(gProjectList, pTaskKey)

    def pushOne(self, pTask):
        self._redis.lpush(f"{gDLQueuePref}{pTask['taskKey']}", dumps(pTask, ensure_ascii=False))

    def push(self, pTask):
        iHistory = f"{gHISTPref}{pTask['taskKey']}"
        pTask['taskId'] = getTaskId(pTask)
        if pTask.get('unique', False) and not self._redis.sadd(iHistory, pTask['taskId']):
            return
        self.pushOne(pTask)

    def pop(self):
        iKeys = set([_.split(gSeparator.encode())[1] for _ in self._redis.keys(f"{gDLQueuePref}*")])
        iDict = {k.decode(): abs(int(v)) for k, v in self._redis.hgetall(gDLStatus).items() if int(v) and k in iKeys}
        while iDict:
            iList = []
            for k, v in iDict.items():
                iList.extend([k] * v)
            iTaskKey = random.choice(iList)
            iDict.pop(iTaskKey)
            iProject = self.getProject(iTaskKey)
            if iProject is None:
                self.stop(iTaskKey)
                return None

            iWorker = f"w{gSeparator}{iTaskKey}"
            if 0 < iProject['concurrency'] <= self._redis.hincrby(gDLCounter, iWorker, 1):
                self._redis.hincrby(gDLCounter, iWorker, -1)
                continue

            iTask = self._redis.lpop(f'{gDLQueuePref}{iTaskKey}')
            if iTask is not None:
                iTask = loads(iTask, json_options=JSONOptions(tz_aware=False))
                iTask['updated'] = datetime.now()
                return iTask
        return None

    def finish(self, pTask):
        self._redis.hincrby(gDLCounter, f"w{gSeparator}{pTask['taskKey']}", -1)

    def start(self, pProject):
        self._redis.hset(gDLStatus, pProject['taskKey'], pProject.get('weight'))

    def pause(self, pTaskKey):
        self._redis.hset(gDLStatus, pTaskKey, 0)

    def stop(self, pTaskKey):
        self._redis.hdel(gDLStatus, pTaskKey)
        self.clear(pTaskKey)

    def clear(self, pTaskKey):
        self._redis.delete(f'{gDLQueuePref}{pTaskKey}')

    def isRunning(self, pTaskKey):
        return int(self._redis.hget(gDLStatus, pTaskKey)) \
            if self._redis.hexists(gDLStatus, pTaskKey) else None

    def isFinished(self, pTaskKey):
        return self._redis.hincrby(gDLCounter, f"w{gSeparator}{pTaskKey}", 0) == 0


class ParseCache(object):
    def __init__(self):
        self._redis = redis.StrictRedis(connection_pool=redis.ConnectionPool(**redis_reqCache))
        self._col = pymongo.MongoClient(**mongo_reqCache).get_database(gParseDB).get_collection(gParseQueue)

    def push(self, pTask):
        iId = self._col.insert_one(pTask).inserted_id
        self._redis.rpush(gParseQueue, dumps(iId))

    def pop(self):
        iId = self._redis.lpop(gParseQueue)
        return self._col.find_one({'_id': loads(iId)}) if iId else None

    def needRefreshDBC(self):
        return self._redis.rpop(gDBFresh) is not None


class DBConnCache(object):
    def __init__(self):
        self._redis = redis.StrictRedis(connection_pool=redis.ConnectionPool(**redis_reqCache))

    def save(self, pTask):
        if pTask.get('dbName') is None:
            return -1
        pTask.setdefault('created', datetime.now())
        pTask['updated'] = datetime.now()
        self._redis.lpush(gDBFresh, 's')
        return self._redis.hset(gDBList, pTask['dbName'], dumps(pTask, ensure_ascii=False))

    def get(self, pKey):
        iResult = self._redis.hget(gDBList, pKey)
        return None if iResult is None else loads(iResult, json_options=JSONOptions(tz_aware=False))

    def Del(self, pKey):
        self._redis.lpush(gDBFresh, 'd')
        return self._redis.hdel(gDBList, pKey)

    def list(self):
        return {k.decode(): loads(v, json_options=JSONOptions(tz_aware=False))
                for k, v in self._redis.hgetall(gDBList).items()}


class CronJobCache(object):
    def __init__(self):
        self._redis = redis.StrictRedis(connection_pool=redis.ConnectionPool(**redis_reqCache))

    def save(self, pTask):
        if pTask.get('id') is None:
            return -1
        pTask.setdefault('created', datetime.now())
        pTask['updated'] = datetime.now()
        return self._redis.hset(gCronList, pTask['id'], dumps(pTask, ensure_ascii=False))

    def get(self, pKey):
        iResult = self._redis.hget(gCronList, pKey)
        return None if iResult is None else loads(iResult, json_options=JSONOptions(tz_aware=False))

    def Del(self, pKey):
        return self._redis.hdel(gCronList, pKey)

    def list(self):
        return {k.decode(): loads(v, json_options=JSONOptions(tz_aware=False))
                for k, v in self._redis.hgetall(gCronList).items()}


if __name__ == "__main__":
    pass
