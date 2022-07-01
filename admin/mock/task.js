const taskList = [
  {
    key: 1,
    name: '数据获取项目',
    desc: '数据获取项目是一个xxxx项目',
    createTime: '2022-03-21 25:10:00'
  },
  {
    key: 2,
    name: '数据分析项目01',
    desc: '数据分析项目是一个xxxx项目',
    createTime: '2022-03-22 12:22:05'
  },
  {
    key: 3,
    name: '数据分析项目02',
    desc: '数据分析项目是一个xxxx项目',
    createTime: '2022-03-22 12:22:05'
  },
  {
    key: 4,
    name: '数据分析项目03',
    desc: '数据分析项目是一个xxxx项目',
    createTime: '2022-03-22 12:22:05'
  },
  {
    key: 5,
    name: '数据分析项目04',
    desc: '数据分析项目是一个xxxx项目',
    createTime: '2022-03-22 12:22:05'
  }
]
module.exports = [
  // mock get all routes form server
  {
    url: '/vue-element-admin/task',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: taskList
      }
    }
  }
]
