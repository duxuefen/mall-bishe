import request from '@/utils/request'
export function  findAllMember(params) {
  return request({
    url: '/caiwu/insert',
    method: 'post',
    params: params
  })
}
