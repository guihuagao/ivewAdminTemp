<template>
  <div class="mt-20" style="min-width: 1280px;">
    <Row>
      <Col span="12">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="账号：" prop="username">
        <Input v-model.trim="formValidate.username" placeholder="请输入管理员账号" class="width-400"/>
      </FormItem>
      <FormItem label="密码：" prop="password">
        <Input v-model.trim="formValidate.password" placeholder="请输入管理员密码" class="width-400"/>
      </FormItem>
      <FormItem label="权限设置：">
        <Transfer
          :titles="menuTitle"
          :data="menuList"
          :target-keys="chooseList"
          :render-format="renderTitle"
          @on-change="menuChange"></Transfer>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
    </Col>
    <Col span="12">

      <Table border :columns="columns" :data="showAdminList">

        <template slot-scope="{ row, index }" slot="createTime">
          <span>{{row.createTime | formatDate}}</span>

        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row,'auth')" v-if="isSuper">修改权限</Button>
          <Button v-if="loginName==row.account" type="warning" size="small" style="margin-right: 5px" @click="edit(row,'pass')">修改密码</Button>
          <Button type="success" size="small" style="margin-right: 5px" @click="reset(row)" v-if="isSuper">重置密码</Button>
          <Button type="error" size="small" @click="remove(row,index)" v-if="isSuper">删除</Button>
        </template>
      </Table>

  <div class="page">
    <Page :total="listTotal" :current="currentPage" show-sizer show-elevator show-total :page-size="pageSize" :page-size-opts="pageRange" @on-change="changePage" @on-page-size-change="changePageSize"/>
  </div>


      </Col>
    </Row>
  </div>
</template>

<script>
import {formatDate} from '@/libs/tools'
import {mapGetters, mapActions, mapState} from 'vuex'
export default {
  name: 'administratorSet',
  data () {
    return {
      menuTitle: ['所有菜单', '选中菜单'],
      formValidate: {
        username: '',
        password: ''
      },
      ruleValidate: {
        username: [
          { required: true, message: '账号必填', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur'}
        ]
      },
      menuList: this.getMenuList(),
      chooseList: this.getTargetList(),


      columns: [
        { title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '账号',
          key: 'account',
          width: 150,
          align: 'center'
        },

        {
          title: '权限',
          key: 'menulist',
          align: 'center'
        },

        {
          title: '创建时间',
          key: 'createTime',
          slot: 'createTime',
          align: 'center',
          width: 250
        },

        {
          title: '操作',
          slot: 'action',
          width: 450,
          align: 'center'
        }
      ]

    }
  },
  computed: {
    ...mapGetters(['getAdminList']),

    currentPage () {
      return this.$store.state.admin.currentPage
    },
    listTotal () {
      return this.$store.state.admin.listTotal
    },
    pageSize () {
      return this.$store.state.admin.pageSize
    },

    pageRange () {
      return this.$store.state.admin.pageRange
    },

    isSuper () {
      return this.$store.state.user.adminInfo.isSuper
    },
    loginName () {
      return this.$store.state.user.adminInfo.account
    },

    showAdminList () {
      let list = []
      let res = []
      let ret = []
      let menustr = ''
      let menus = this.$store.getters.menuList
      this.getAdminList.forEach(item => {
        ret = []
        list = item.roles.split(',')
        res = menus.filter(item => list.indexOf(item.meta.routerId) > -1)
        res.forEach(item => {
          ret.push(item.meta.title)
        })

        menustr = ret.join(',')
        item.menulist = menustr
      })

      return this.getAdminList
    }

  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },

  mounted () {
    this.getList(this.currentPage, this.pageSize)
  },

  methods: {
    getMenuList () {
      let menus = []
      let resMenu = []
      menus = this.$store.getters.menuList
      menus.forEach(item => {
        resMenu.push({'label': item.meta.title, 'key': item.meta.routerId})
      })

      return resMenu
    },

    getTargetList () {

    },

    renderTitle (item) {
      return item.label
    },

    menuChange (newTargetKeys, direction, moveKeys) {
      this.chooseList = newTargetKeys
    },

    handleSubmit (val) {
      let vm = this
      this.$refs[val].validate((valid) => {
        if (valid) {
          let obj = {}
          obj.password = vm.formValidate.password
          obj.username = vm.formValidate.username
          let syring = vm.chooseList.join(',')
          obj.roles = syring

          this.$store.dispatch('addAdmin', obj).then(res => {
            debugger
            // if (res.data.state === 0) {
            vm.$Message.success('管理员添加成功')
            vm.$router.push({name: 'roleSetting'})
            // }
          }).catch(err => {
            vm.$Message.error('管理员添加失败')
          })
        } else {
          this.$Message.error('请输入账号和密码')
        }
      })
    },
    handleReset (val) {
      this.$refs[val].resetFields()
    },


    /* 获取admin列表 */
    getList (pageindex, pageSize) {
      let vm = this
      this.$store.dispatch('adminList', {pageindex: pageindex, pagesize: pageSize})
    },

    edit (row, type) {
      this.$router.push({
        name: 'editRole',
        params: {
          row: row,
          type: type
        }
      })
    },
    remove (row, index) {
      this.$store.dispatch('removeAdminList', row.autoId)
    },

    reset (row) {
      let vm = this
      this.$store.dispatch('resetAdminPass', row.autoId).then(res => {
        if (res.data.state === 0) {
          vm.$Message.success('密码重置成功')
        }
      }).catch(err => {
        vm.$Message.error('密码重置失败')
      })
    },

    handleSearch () {

    },

    /* 改变页码 */
    changePage (pageNumber) {
      this.$store.dispatch('changeAdminPage', pageNumber)
    },

    /* 改变每页条数 */
    changePageSize (pageSize) {
      this.$store.dispatch('changeAdminPageSize', pageSize)
    }



  }


}
</script>

<style lang="less" scoped>
  .ivu-transfer-list{
    width: 300px;
    height: 400px;
  }
</style>
