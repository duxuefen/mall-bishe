import request from '@/utils/request'

// 导出函数
export function login(username, password) {
  return request({
    url: '/admin2/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin2/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin2/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/member/searchAll',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/member/addOne',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/member/updateById/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/admin2/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id2) {
  return request({
    url: '/member/deleteById/' + id2,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/admin2/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/admin2/role/update',
    method: 'post',
    data: data
  })
}
