import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './module/user'
import app from './module/app'
import admin from './module/admin'
import enterprise from './module/enterprise'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  getters,
  modules: {
    user,
    app,
    admin,
    enterprise
  }
})
