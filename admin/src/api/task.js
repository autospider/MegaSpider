import request from '@/utils/request'

export function getTask() {
  return request({
    url: '/vue-element-admin/task',
    method: 'get'

  })
}
