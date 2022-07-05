# -*- coding: utf-8 -*-
import re
import os
import sys
import csv
import asyncio
import pymongo
import pymysql
import pymssql
import psycopg2
import cx_Oracle
from bson.objectid import ObjectId
from bson.json_util import dumps, loads
from pymongo.errors import BulkWriteError, PyMongoError
from cache import DBConnCache, gLibDir

if sys.platform == 'win32':
    cx_Oracle.init_oracle_client(lib_dir=gLibDir)
else:
    os.environ['LD_LIBRARY_PATH'] = ':'.join([gLibDir] + (os.getenv('LD_LIBRARY_PATH') or '').split(':'))


def createConn(pDict):
    iParam = {k: v for k, v in pDict.items() if v != '' and k not in ['id', 'dbName', 'table', 'created', 'updated']}
    iDBType = iParam.pop('dbType')
    iParam['database'] = iParam.pop('db')
    iParam.setdefault('charset', 'utf8')
    iPort = iParam.pop('port', 0)
    if iPort:
        iParam['port'] = int(iPort)
    if iDBType == 'mongodb':
        iParam['serverSelectionTimeoutMS'] = 1000
        iParam['username'] = iParam.pop('user', None)
        iParam.pop('charset')
        iDatabase = iParam.pop('database')
        cn = pymongo.MongoClient(**iParam)
        cn = cn.get_database(iDatabase)
    elif iDBType == 'mysql':
        iParam['connect_timeout'] = 1
        cn = pymysql.connect(**iParam)
    elif iDBType == 'sqlserver':
        iParam['login_timeout'] = 1
        iParam['server'] = iParam.pop('host')
        cn = pymssql.connect(**iParam)
    elif iDBType == 'oracle':
        iParam['encoding'] = iParam.pop('charset')
        iPort = iParam.pop('port', None)
        iPort = '' if iPort is None else f':{iPort}'
        iParam['dsn'] = f"{iParam.pop('host')}{iPort}/{iParam.pop('database')}"
        cn = cx_Oracle.connect(**iParam)
    elif iDBType == 'postgre':
        iParam.pop('charset')
        cn = psycopg2.connect(**iParam)
    else:
        cn = None
    return cn


class Store(object):
    def __init__(self):
        self._lock = asyncio.Lock()
        self._cache = DBConnCache()
        self.conn = dict()
        self.refresh()

    def refresh(self):
        for k, iDict in self.conn:
            if iDict['dict']['dbType'] != 'mongodb':
                iDict['db'].close()
        self.conn = dict()
        iDict = self._cache.list()
        for iKey, iVal in iDict.items():
            self.conn[iKey] = {
                'dict': iVal,
                'db': createConn(iVal)
            }

    async def storeCSV(self, pTask, pTarget):
        iTarget = pTarget
        if not iTarget.lower().endswith('.csv'):
            iTarget = iTarget + '.csv'
        iHeaders = tuple(pTask['task'][0].keys())
        if not os.path.exists(iTarget):
            async with self._lock:
                with open(iTarget, 'w', encoding='utf8') as iFile:
                    iWriter = csv.DictWriter(iFile, iHeaders)
                    iWriter.writeheader()
        elif not os.path.isfile(iTarget):
            print('error', f'{iTarget} is folder')
            return
        async with self._lock:
            with open(iTarget, 'a', encoding='utf8') as iFile:
                iWriter = csv.DictWriter(iFile, iHeaders)
                iWriter.writerows(pTask['task'])

    async def storeBSON(self, pTask, pTarget):
        iTarget = pTarget
        if not iTarget.lower().endswith('.bson'):
            iTarget = iTarget + '.bson'
        async with self._lock:
            with open(iTarget, 'a', encoding='utf8') as iFile:
                for iItem in pTask['task']:
                    iFile.write(dumps(iItem, ensure_ascii=False))
                    iFile.write('\n')

    def doStore(self, pTask):
        if len(pTask['task']) == 0:
            return
        iTarget = pTask.get('target')
        iType = pTask.get('targetType')
        if iTarget is None or not isinstance(iTarget, str):
            iTarget = str(ObjectId())
        if iType == 'csv':
            # asyncio.run(self.storeCSV(pTask, iTarget))
            pass
        elif iType == 'bson':
            # asyncio.run(self.storeBSON(pTask, iTarget))
            pass
        else:
            if iTarget not in self.conn:
                return
            iConn = self.conn[iTarget]
            iTmp = pTask.get('parameter', '').split('|')
            iTable = iTmp[0].strip()
            if len(iTable) == 0:
                return
            iDBType = iConn['dict']['dbType']
            if iDBType == 'mongodb':
                iCol = iConn['db'].get_collection(iTable)
                try:
                    return len(iCol.insert_many(pTask['task'], ordered=False).inserted_ids)
                except BulkWriteError:
                    pass
            elif len(iTmp) == 2:
                iFields = [_.strip() for _ in re.split('[,;，；]', iTmp[1])]
                if len(iFields) == 0:
                    return
                iSql = ','.join([f":{_+1}" for _ in range(len(iFields))]) if iDBType == 'oracle' \
                    else ','.join(['%s'] * len(iFields))
                iSql = f"insert into {iTable}({','.join(iFields)}) values({iSql})"
                iCursor = iConn['db'].cursor()
                for iItem in pTask['task']:
                    iValues = [iItem.get(_, None) for _ in iFields]
                    try:
                        iCursor.execute(iSql, tuple(iValues))
                        iConn['db'].commit()
                    except:
                        iConn['db'].rollback()
                iCursor.close()

