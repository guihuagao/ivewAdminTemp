const getters = {
  /*messageUnreadCount: state => state.messageUnreadList.length,
  messageReadedCount: state => state.messageReadedList.length,
  messageTrashCount: state => state.messageTrashList.length*/
  token:state => state.user.token,
  getAdminList:state=>state.admin.enterprisList,
  getenterprisList: state => state.enterprise.enterprisList,
  getPersonnelList: state => state.enterprise.personnelList
}

export default getters
