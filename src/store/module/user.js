import {getAuth, setlogin} from '@/api/user'
import { setToken, getToken,sethasGetInfoToken,getInfoToken,
  setMenuNavListInLocalstorage,
  getMenuNavListFromLocalstorage,
  setAdminInfoInLocalstorage,
  getAdminInfoFromLocalstorage} from '@/libs/util'
import {encry} from '@/libs/tools';
import { hex_md5 } from '@/libs/md5';
export default {
  state: {
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    access: getMenuNavListFromLocalstorage(),
    hasGetInfo: getInfoToken(),
    publicKey: '',
    guid: '',
    adminInfo: getAdminInfoFromLocalstorage(),
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setAvatar(state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access;
      setMenuNavListInLocalstorage(access)
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status;
      sethasGetInfoToken(status);
    },

    setPublicKey(state, publicKey) {
      state.publicKey = publicKey
    },
    setGuid(state, guid) {
      state.guid = guid
    },
    setAdminInfo(state, adminInfo) {
      state.adminInfo = adminInfo;
      setAdminInfoInLocalstorage(adminInfo);
    },

    setMessageCount(state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList(state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList(state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList(state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore(state, {msg_id, content}) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg(state, {from, to, msg_id}) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },


  actions: {
    /* 获取加密公钥 */
    getAuth({commit}) {
      return new Promise((resolve, reject) => {
        getAuth().then(res => {
          debugger
          let data = res.data
          commit('setPublicKey', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 登录
    handleLogin({commit, state}, param) {

      let enpassword = encry(state.publicKey, param.password)

      /*key MD5加密*/
      let mdkey = hex_md5(state.publicKey);
      let obj = {}

      obj.account = param.userName;
      obj.pwd = enpassword;
      obj.returnUrl = '';
      obj.key = mdkey;

      return new Promise((resolve, reject) => {
        setlogin(obj).then(res => {
          const data = res.data.data;
          commit('setToken', data.jwtToken);
          commit('setUserName', param.userName);
          commit('setHasGetInfo', true);
          let roleList = data.user.roles.split(',');
          commit('setAccess', roleList);
          commit('setUserId', data.user.userId);
          commit('setAdminInfo', data.user);
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取用户相关信息
    getUserInfo({state, commit}) {
      return new Promise((resolve, reject) => {
        try {

        } catch (error) {
          reject(error)
        }
      })
    }
  }
}

    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    /*getUnreadMessageCount ({ state, commit }) {
      getUnreadCount().then(res => {
        const { data } = res
        commit('setMessageCount', data)
      })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage().then(res => {
          const { unread, readed, trash } = res.data
          commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageReadedList', readed.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageTrashList', trash.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据当前点击的消息的id获取内容
    getContentByMsgId ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msg_id]
        if (contentItem) {
          resolve(contentItem)
        } else {
          getContentByMsgId(msg_id).then(res => {
            const content = res.data
            commit('updateMessageContentStore', { msg_id, content })
            resolve(content)
          })
        }
      })
    },
    // 把一个未读消息标记为已读
    hasRead ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageUnreadList',
            to: 'messageReadedList',
            msg_id
          })
          commit('setMessageCount', state.unreadCount - 1)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除一个已读消息到回收站
    removeReaded ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageReadedList',
            to: 'messageTrashList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 还原一个已删除消息到已读消息
    restoreTrash ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageTrashList',
            to: 'messageReadedList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
*/
