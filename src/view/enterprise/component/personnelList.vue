<template>
  <div class>
    <div class="top-div">
      <div style="padding-bottom:15px" v-if="listTotal !== 0">
        <Button type="error" @click="remove">批量删除</Button>
      </div>
      <Table
        border
        ref="selection"
        :columns="columns"
        :data="getPersonnelList"
        @on-selection-change="changeSelect"
      >
        <template slot-scope="{ row, index }" slot="membershipType">
          <span>{{row.membershipType===1?'普通用户':(row.membershipType===2?'试用期用户':'高级用户')}}</span>
        </template>
        <template slot-scope="{ row, index }" slot="state">
          <span>{{row.state===1?'正常':'禁用'}}</span>
        </template>

        <template slot-scope="{ row, index }" :slot="action">
          <Button
            type="error"
            size="small"
            @click="remove(row.id,1)"
            style="margin-bottom: 5px;margin-right: 5px;"
          >删除</Button>
        </template>
      </Table>
      <div class="page">
        <Page
          :total="listTotal"
          :current="setPageIndex"
          show-sizer
          show-elevator
          show-total
          :page-size="pageSize"
          :page-size-opts="pageRange"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/libs/tools'
import { mapGetters } from 'vuex'
export default {
  name: 'enterprise',
  data () {
    return {
      action: 'action',
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        // {
        //   title: '序号',
        //   type: 'index',
        //   width: 70,
        //   align: 'center'
        // },
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '类型',
          key: 'membershipType',
          slot: 'membershipType',
          align: 'center'
        },
        {
          title: '状态',
          key: 'state',
          slot: 'state',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center'
        },
        {
          title: '分享视频次数',
          key: 'videoSharingNumber',
          align: 'center'
        },
        {
          title: '分享资讯次数',
          key: 'informationSharingNumber',
          align: 'center'
        },
        {
          title: '分享视频点击次数',
          key: 'videoSharingClickNumber',
          align: 'center'
        },
        {
          title: '分享资讯点击次数',
          key: 'informationSharingClickNumber',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 80,
          align: 'center'
        }
      ],
      ids: ''
    }
  },
  computed: {
    ...mapGetters(['getPersonnelList']),

    listTotal () {
      return this.$store.state.enterprise.personnelPage.listTotal
    },
    pageRange () {
      return this.$store.state.enterprise.personnelPage.pageRange
    },
    setPageIndex () {
      return this.$store.state.enterprise.personnelValue.pageindex
    },
    pageSize () {
      return this.$store.state.enterprise.personnelValue.pageSize
    },
    EnterpriseId () {
      return this.$store.state.enterprise.personnelValue.EnterpriseId
    },
    searchValue () {
      return this.$store.state.enterprise.personnelValue
    }
  },

  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },

  mounted () {
    this.getList(this.searchValue)
  },

  methods: {
    getList (param) {
      let vm = this
      vm.$store.dispatch('getPersonnelList', param)
    },

    detail (row) {
      let vm = this
      vm.detailRow = row
      vm.detailModal = true
    },
    confirm () {
      let vm = this
      vm.detailModal = false
    },

    /* 多选 */
    changeSelect (selection) {
      let arr = []
      selection.forEach(item => {
        arr.push(item.id)
      })
      this.ids = arr.join(',')
    },
    // 删除
    remove (id, index) {
      let vm = this
      if (index === 1) {
        vm.ids = id
      }
      if (vm.ids == '' || !vm.ids) {
        this.$Message.error('请选择人员')
        return
      }
      vm.$store
        .dispatch('deletePersonnelList', {
          ids: vm.ids,
          EnterpriseId: vm.EnterpriseId
        })
        .then(res => {
          if (res.status == 200) {
            this.$Message.success('删除成功')
          }
        })
    },
    /* 改变页码 */
    changePage (pageNumber) {
      this.$store.dispatch('changePersonnelPage', pageNumber)
    },

    /* 改变每页条数 */
    changePageSize (pageSize) {
      this.$store.dispatch('changePersonnelPageSize', pageSize)
    }
  }
}
</script>
<style lang="less">
.page {
  text-align: center;
  margin-top: 20px;
}

.modal-div {
  display: flex;
  padding: 0 20px;
  font-size: 14px;
}

.modal-desc {
  width: 400px;
  min-height: 50px;
  line-height: 30px;
  padding: 10px 0;
  padding-right: 40px;
}

.modal-desc label {
  white-space: nowrap;
  display: inline-block;
  padding-right: 15px;
  vertical-align: top;
}
.modal-desc span {
  display: inline-block;
  width: 260px;
  line-height: 30px;
}
</style>
