const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])
const timerList = [
  { id: '1',
    timerName: 'newsTimer2',

    spiderName: 'spiderMan',
    timerOrder: '0 * * * *',
    isSwitchOn: false,
    desc: 'this is the first crawler',
  },
  { id: '2',
    timerName: 'newsTimer2',
    spiderName: 'coolSpider',
    timerOrder: '*/1 * * * *',
    isSwitchOn: true,
    desc: 'this is the second crawler',
  },
]
const dbList = [{
  id: 1,
  dbName: 'ronasSpider',
  spiderName: 'upupU',
  dbType: 'mongo',
  dbParameters: '{"host":"192.168.31.7","port":20000,"user":"admin","password":"admin","database":"ronasSpider","collection":"journal"}',
},{
  id: 2,
  dbName: 'ronasCrawler',
  spiderName: 'spiderMan',
  dbType: 'oracle',
  dbParameters: '{"host":"192.168.31.8","port":20000,"user":"visitor","password":"visitor","database":"ronasSpider","collection":"news"}',
},]
const spiderList = [
  { id: '1',
    taskName: 'news',
    role: 'admin',
    taskKey: 'med.wanfangdata.com.cn',
    url: 'http://wanfangdata/getTask',
    encode: 'utf8',
    resource: 'false',
    parameter: 'null',
    status: '已暂停',
    dataType: 'json',
    isSwitchOn: false,
    spiderName: 'upupU',
    lastTime: '半个月前'
  }, {
  id: '2',
    taskName: 'journal',
    role: 'admin',
    taskKey: 'med.wanfangdata.com.cn',
    url: 'http://wanfangdata/getTask',
    encode: 'utf8',
    resource: 'false',
    isSwitchOn: false,
    parameter: 'null',
    status: '已停止',
    dataType: 'json',
    spiderName: 'spiderMan',
    lastTime: '半个月前'
  },
  { id: '3',
    taskName: 'project',
    role: 'admin',
    isSwitchOn: true,
    taskKey: 'med.weipu.com',
    encode: 'gbk',
    url: 'http://www.weipu.com',
    resource: 'true',
    resourceId: 'hhhh',
    parameter: 'null',
    status:'采集中',
    dataType: 'dom',
    lastTime: '昨天',
    spiderName: 'document'
  }
]
const spiderList2 = [
  {
  "sender":{
    "entrance":[{"type":"req","target":"details"}],
    "details":[{"type":"store","target":"ok","targetType":"bson"}]
  },
  "parser":{
    "entrance":[
      {
        "fetchall":-1,
        "next":[
          {"name":"req","next":[{"name":"url","parseType":"json","rule":"$.docurl","out":"url"}]},
          {"name":"inherit"}
        ]
      }
    ],
    "details": [
      {"target": "inherit"},
      {"name": "title", "parseType": "xpath", "rule": "//title/text()"},
      {"name": "url", "parseType": "json", "rule": "//title/text()", "target": "res"}
    ]
  },
  "entrance":{"task":[{"req":{"url":"https://news.163.com/special/cm_guonei/?callback=x"}}],"dataType":"jsonp"},
  "taskName":"网易国内新闻","taskKey":"news.163.com","resource":"proxy","resourceKey":"news.163.com","retryCode":[],"flag": 1,
},
  {
    "sender": {
      "entrance": [{
        "type": "req",
        "target": "list",
        "encoding": "utf8"
      }],
      "list": [{
        "source": "$..nextPage.*",
        "type": "req",
        "target": "list",
        "targetType": "dom",
        "parameter": ""
      }, {
        "source": "$..nextPage.*",
        "type": "req",
        "target": "list",
        "targetType": "dom",
        "parameter": ""
      }],
      "detail": [{
        "type": "store",
        "target": "news.163news",
        "parameter": "url,title,moduleName,detailTitle"
      }]
    },
    "parser": {
      "entrance": [{
        "parseType": "xpath",
        "rule": "//a[contains(@href,'house2010') or contains(@href,'auto_house')]",
        "out": "any",
        "target": "parameter",
        "fetchall": -1,
        "next": [{
          "name": "req",
          "next": [{
            "name": "url",
            "parseType": "xpath",
            "rule": "@href",
            "out": "url"
          }]
        }, {
          "name": "inherit",
          "next": [{
            "name": "moduleName",
            "parseType": "xpath",
            "rule": "text()"
          }]
        }]
      }],
      "list": [{
        "name": "detail",
        "parseType": "xpath",
        "rule": "//div[@class='area_list clearfix']/div[@class='col_l']//h2/a",
        "fetchall": -1,
        "next": [{
          "name": "req",
          "next": [{
            "name": "url",
            "parseType": "xpath",
            "rule": "@href",
            "out": "url"
          }]
        }, {
          "name": "inherit",
          "next": [{
            "target": "inherit"
          }, {
            "name": "title",
            "parseType": "xpath",
            "rule": "text()"
          }]
        }]
      }, {
        "name": "nextPage",
        "parseType": "xpath",
        "rule": "//div[@class='list_page']//a[contains(@title,'页')]",
        "fetchall": -1,
        "next": [{
          "name": "req",
          "next": [{
            "name": "url",
            "parseType": "xpath",
            "rule": "@href",
            "out": "url"
          }]
        }, {
          "name": "inherit",
          "target": "inherit"
        }]
      }],
      "detail": [{
        "target": "inherit"
      }, {
        "name": "url",
        "parseType": "json",
        "rule": "$.url",
        "target": "res"
      }, {
        "name": "detailTitle",
        "parseType": "xpath",
        "rule": "//h1[@class='post_title']/text()"
      }]
    },
    "entrance": {
      "task": [{
        "req": {
          "url": "https://money.163.com",
          "method": "GET",
          "cookies":{'aaa': '5555', 'gggg': '5555555555555555555'},
          "headers":{'qq': '55555'},
        }
      }],
      "inherit": {
        "key1": "value1"
      },
      "encoding": "utf8",
      "dataType": "dom"
    },
    "taskName": "新闻-网易",
    "flag": 0,
    "retryTimes": 3,
    "timeout": 12,
    "concurrency": 32,
    "interval": 1,
    "encoding": "utf8",
    "resourceKey": "money.163.com",
    "taskGroup": "news",
    "taskKey": "news.163.com",
    "resource": "proxy"
  }]
const taskList = [
  {
    key: 1,
    taskName: 'recruit',
    desc: 'recruit',
    taskKey: 'recruit.jobuy.com',
    resourceKey: 'jobuy.com',
    crawlerNo: 5,
    createTime: '2022-03-21 25:10:00'
  },
  {
    key: 2,
    taskName: 'news',
    desc: 'news',
    taskKey: 'recruit.jobuy.com',
    crawlerNo: 40,
    resourceKey: 'jobuy.com',
    createTime: '2022-03-22 12:22:05'
  },
  {
    key: 3,
    taskName: 'project',
    taskKey: 'recruit.jobuy.com',
    resourceKey: 'jobuy.com',
    crawlerNo: 9,
    desc: 'project',
    createTime: '2022-03-22 12:22:05'
  }
  // {
  //   key: 3,
  //   taskName: 'project',
  //   url: 'url',
  //   resource: 'true',
  //   crawlerNo: 9,
  //   desc: 'project',
  //   createTime: '2022-03-22 12:22:05'
  // }
  // {
  //   key: 5,
  //   name: '数据分析项目04',
  //   desc: '数据分析项目是一个xxxx项目',
  //   createTime: '2022-03-22 12:22:05'
  // }
]
const entranceData = [
  {
    key: 0,
    name: '',
    tableData: [{
      id: 1,
      code: {
        value: '',
        edit: false
      },
      attribute: {
        value: 'encoding',
        key: [{
          value: '选项1',
          label: 'utf8'
        }, {
          value: '选项2',
          label: 'gbk'
        }],
        edit: false
      },
      value: {
        value: '',
        edit: false
      },
    },
      {
        id: 2,
        code: {
          value: '',
          edit: false
        },
        attribute: {
          value: 'dataType',
          key: [{
            value: '选项1',
            label: 'dom'
          }, {
            value: '选项2',
            label: 'json'
          },{
            value: '选项3',
            label: 'jsonp'
          },{
            value: '选项4',
            label: 'original'
          },],
          edit: false
        },
        value: {
          value: '',
          edit: false
        },
      },
      {
        id: 3,
        code: {
          value: '',
          edit: false
        },
        attribute: {
          value: 'inherit',
          edit: false
        },
        children: [
          { id: 1111,attrStr:{
              value: '',
              edit: false
            }, valueStr: {
              value: '',
              edit: false
            } },
          // { id: 2222,attrStr:{
          //     value: 'key2',
          //     edit: false
          //   }, valueStr: {
          //     value: 'value2',
          //     edit: false
          //   }
          // }
        ],
        value: {
          value: '{}',
          edit: false
        },
      },
      {
        id: 4,
        code: {
          value: '',
          edit: false
        },
        attribute: {
          value: 'task',
          edit: false
        },
        task: [
          { id: 3333,
            url:{
              value: '',
              edit: false
            },
            method: {
              value: '',
              key: [{
                value: '选项1',
                label: 'GET'
              }, {
                value: '选项2',
                label: 'POST'
              }, {
                value: '选项3',
                label: 'HEAD'
              },  {
                value: '选项4',
                label: 'OPTIONS'
              },{
                value: '选项5',
                label: 'PUT'
              },{
                value: '选项6',
                label: 'PATCH'
              }, {
                value: '选项7',
                label: 'DELETE'
              }, {
                value: '选项8',
                label: 'TRACE'
              },{
                value: '选项9',
                label: 'CONNECT'
              }, ],
              edit: false
            },
            body: {
              value: '',
              edit: false
            },
            headers: {
              // value: '{ "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/x-www-form-urlencoded"}',
              value: '',
              edit: false
            },
            cookies: {
              // value: '{ "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/x-www-form-urlencoded"}',
              value: '',
              edit: false
            },
          },

        ],
        value: {
          value: '{}',
          edit: false
        },
      },]
  }
]
const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

module.exports = [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/vue-element-admin/task',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: taskList
      }
    }
  },
  {
    url: '/vue-element-admin/spider',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        // data: spiderList
        data: spiderList2
      }
    }
  } ,
  {
    url: '/vue-element-admin/timer',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: timerList
      }
    }
  },
  {
    url: '/vue-element-admin/database',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: dbList
      }
    }
  },
  {
    url: '/vue-element-admin/entrance',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: entranceData
      }
    }
  },
]
