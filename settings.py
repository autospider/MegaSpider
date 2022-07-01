# -*- coding: utf-8 -*-


redis_reqCache = {
    'host': '192.168.31.7',
    'port': 6379,
    'db': 3
}

mongo_reqCache = {
    'host': '192.168.31.7'
}

gSeparator = '|'
gHISTPref = 'HIST' + gSeparator
gDLQueuePref = 'DLQ' + gSeparator
gProjectList = 'crawler_project_list'
gDLCounter = 'crawler_download_counter'
gDLStatus = 'crawler_download_status'
gParseDB = 'crawlers'
gParseQueue = 'crawler_parse_queue'
gDBList = 'database_connection_list'
gDBFresh = 'database_connection_fresh'
gCronList = 'cron_job_list'

gDefaultWeight = 100
gDefaultConcurrency = -1
gRetryTimes = 3
gRetryCode = [-2, -3]
gMaxConcurrency = 1
gTimeout = 60
gInterval = 3
gWebPort = 8765

gWebRoot = 'www'
gLibDir = './instantclient_21_6/'
