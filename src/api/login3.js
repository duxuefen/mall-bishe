import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin3/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin32/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin3/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/finance/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/finance/addOne',
    method: 'post',
    data: data
  })
}

export function updateAdmin(number, data) {
  return request({
    url: '/finance/updateFinance/' + number,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/admin3/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id) {
  return request({
    url: '/finance/deleteFinance/' + id,
    method: 'post'
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/admin3/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/admin3/role/update',
    method: 'post',
    data: data
  })
}
