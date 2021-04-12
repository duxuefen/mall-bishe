import request from '@/utils/request'

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
    url: '/admin22/info',
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
    url: '/admin2/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/admin2/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/admin2/update/' + id,
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

export function deleteAdmin(id) {
  return request({
    url: '/admin2/delete/' + id,
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
