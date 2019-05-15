// 企业接口
import axios from '@/libs/api.request'

// 企业列表
export const getEnterprisList = (param) => {
    return axios.request({
        url: '/api/enterprise/list',
        params: param,
        method: 'get'
    })
}

// 删除企业
export const deleteEnterprisList = (param) => {
    return axios.request({
        url: '/api/enterprise/delete',
        params: param,
        method: 'get'
    })
}

// 查询企业人员列表
export const getPersonnelList = (param) => {
    return axios.request({
        url: '/api/enterprise/getpersonnel',
        params: param,
        method: 'get'
    })
}
// 查询企业人员列表
export const deletePersonnelList = (param) => {
    return axios.request({
        url: '/api/enterprise/delpersonnel',
        params: param,
        method: 'get'
    })
}
