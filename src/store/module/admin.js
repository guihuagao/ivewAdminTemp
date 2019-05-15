import { addOrEditAdmin, adminList, adminInfo, deleteAdmin } from '@/api/admin'
import {encry} from '@/libs/tools';
import { hex_md5 } from '@/libs/md5';
import config from '@/config'
export default {
  state: {
    adminObj:config.pageConfig,
    adminList: []
  },
  mutations: {

    setAdminList (state, adminList) {
      state.adminList = adminList
    },
    setCurrentPage (state, currentPage) {
      state.adminObj.currentPage = currentPage
    },

    setPageSize (state, pageSize) {
      state.adminObj.pageSize = pageSize
    },

    setTotalNum (state, listTotal) {
      state.adminObj.listTotal = listTotal
    },

  },
  actions: {
    /* 添加Admin */
    addOrEditAdmin ({commit, dispatch, state, rootState}, param) {
      let obj = {}
      dispatch('getAuth').then(res => {
        let enpassword = encry(res.data, param.password)
        obj.isSuper=true;
        obj.pwd = enpassword;
        obj.name = param.username;
        obj.roles = param.roles;
        return new Promise((resolve, reject) => {
          addOrEditAdmin(obj).then(res => {
            debugger
            resolve(res)
            dispatch('adminList', {pageindex: state.adminObj.currentPage, pagesize: state.adminObj.pageSize})
          }).catch(err => {
            reject(err)
          })
        })
      })
    },

    /* 获取adminList */
    adminList ({commit}, param) {
      return new Promise((resolve, reject) => {
        adminList(param).then(res => {
          debugger
          let data = res.data.data
          commit('setAdminList', data)
          commit('setTotalNum', res.data.totalCount)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },

    /* 删除管理员 */
    removeAdminList ({commit, dispatch, state}, param) {
      return new Promise((resolve, reject) => {
        deleteAdmin(param).then(res => {
          dispatch('adminList', {pageindex: state.adminObj.currentPage, pagesize: state.adminObj.pageSize})
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    /* 修改页数 */
    changeAdminPage ({commit, dispatch, state}, param) {
      commit('setCurrentPage', param)
      dispatch('adminList', {pageindex: state.adminObj.currentPage, pagesize: state.adminObj.pageSize})
    },

    /* 修改每页条数 */
    changeAdminPageSize ({commit, dispatch, state}, param) {
      commit('setPageSize', param)
      dispatch('adminList', {pageindex: state.adminObj.currentPage, pagesize: state.adminObj.pageSize})
    }

  }

}
