import axios from '@/libs/api.request'

/* 获取管理员列表 */
export const adminList = (param) => {
  return axios.request({
    url: '/api/auth/list',
    params: param,
    method: 'get'
  })
}

/* 获取管理员详情 */
export const adminInfo = (param) => {
  return axios.request({
    url: '/api/auth/getinfo',
    params: param,
    method: 'get'
  })
}

/* 添加或修改管理员 */
export const addOrEditAdmin = (param) => {
  return axios.request({
    url: '/api/auth/addOrEditUser',
    data: param,
    method: 'post'
  })
}


/* 删除管理员 */
export const deleteAdmin = (param) => {
  return axios.request({
    url: '/api/auth/delUserInfo',
    data: param,
    method: 'post'
  })
}

