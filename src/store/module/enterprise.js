import { getEnterprisList,deleteEnterprisList, getPersonnelList,deletePersonnelList} from '@/api/enterprise'

export default {
  state: {
    enterprisList: [], // 企业列表
    enterprisPage:{
        listTotal: 0,
        pageRange: [10, 20, 30, 40],
    },
    enterprisValue: {
      pageindex: 1,
      pagesize: 10,
      keyword: null,
    },

    personnelList: [], // 企业人员列表
    personnelPage:{
        listTotal: 0,
        pageRange: [10, 20, 30, 40],
    },
    personnelValue: {
      EnterpriseId:null, //企业ID
      pageindex: 1,
      pagesize: 10,
      keyword: null,
    },
  },

  mutations: {

    setEnterprisList (state, enterprisList) {
      state.enterprisList = enterprisList
    },
    setPageIndex (state, pageindex) {
      state.enterprisValue.pageindex = pageindex
    },
    setPageSize (state, pagesize) {
      state.enterprisValue.pagesize = pagesize
    },
    setTotalNum (state, listTotal) {
      state.enterprisPage.listTotal = listTotal
    },

    setPersonnelList (state, personnelList) {
      state.personnelList = personnelList
    },
    setPersonnelPageIndex (state, pageindex) {
      state.personnelValue.pageindex = pageindex
    },
    setPersonnelPageSize (state, pagesize) {
      state.personnelValue.pagesize = pagesize
    },
    setPersonnelId (state, EnterpriseId) {
      state.personnelValue.EnterpriseId = EnterpriseId
    },
    setPersonnelTotalNum (state, listTotal) {
      state.personnelPage.listTotal = listTotal
    },
  },

  actions: {
    /* 获取企业列表 */
    getEnterprisList ({commit}, param) {
      return new Promise((resolve, reject) => {
        getEnterprisList(param).then(res => {
          let data = res.data
          commit('setEnterprisList', data.item1)
          commit('setTotalNum', data.item2)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /* 删除企业 */
    deleteEnterprisList ({commit,dispatch}, param) {
      return new Promise((resolve, reject) => {
        deleteEnterprisList(param).then(res => {
          dispatch('getEnterprisList', state.enterprisValue)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /* 修改企业列表页数 */
    changeEnterprisListPage ({commit, dispatch, state}, param) {
      commit('setPageIndex', param)
      dispatch('getEnterprisList', state.enterprisValue)
    },

    /* 修改企业列表每页条数 */
    changeEnterprisListPageSize ({commit, dispatch, state}, param) {
      commit('setPageSize', param)
      dispatch('getEnterprisList', state.enterprisValue)
    },


    /* 获取企业人员列表 */
    getPersonnelList ({commit}, param) {
      return new Promise((resolve, reject) => {
        getPersonnelList(param).then(res => {
          let data = res.data
          commit('setPersonnelList', data.item1)
          commit('setPersonnelTotalNum', data.item2)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /* 删除人员 */
    deletePersonnelList ({commit,dispatch}, param) {
      return new Promise((resolve, reject) => {
        deletePersonnelList(param).then(res => {
          dispatch('getPersonnelList', state.personnelValue)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /* 修改企业人id */
    changePersonnelId ({commit, dispatch, state}, id) {
      commit('setPersonnelId', id)
    },
    /* 修改企业人员列表页数 */
    changePersonnelPage ({commit, dispatch, state}, param) {
      commit('setPersonnelPageIndex', param)
      dispatch('getPersonnelList', state.personnelValue)
    },

    /* 修改企业人员列表每页条数 */
    changePersonnelPageSize ({commit, dispatch, state}, param) {
      commit('setPersonnelPageSize', param)
      dispatch('getPersonnelList', state.personnelValue)
    },
  }
}
