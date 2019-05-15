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
        :data="getenterprisList"
        @on-selection-change="changeSelect"
        style="min-width: 1280px;"
      >
        <template slot-scope="{ row, index }" slot="createTime">
          <span>{{row.createTime | formatDate}}</span>
        </template>

        <template slot-scope="{ row, index }" :slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px;margin-bottom: 5px"
            @click="detail(row)"
          >企业详情</Button>
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
    <Modal v-model="detailModal" width="1200" title="企业详情" @on-ok="confirm">
      <div class="modal-div">
        <div class="modal-desc">
          <label>企业名称:</label>
          <span>{{detailRow.title}}</span>
        </div>
        <div class="modal-desc">
          <label>人员数量:</label>
          <span>{{detailRow.personnelNumber}}</span>
        </div>
        <div class="modal-desc">
          <label>创建人:</label>
          <span>{{detailRow.founderId}}</span>
        </div>
      </div>
      <div class="modal-div">
        <div class="modal-desc">
          <label>总分享数:</label>
          <span>{{detailRow.totalScore}}</span>
        </div>
        <div class="modal-desc">
          <label>总点击数:</label>
          <span>{{detailRow.totalHits}}</span>
        </div>
        <div class="modal-desc">
          <label>创建时间:</label>
          <span>{{detailRow.createTime | formatDate}}</span>
        </div>
      </div>
      <Divider orientation="left">人员列表</Divider>
      <PersonnelList v-if="detailModal"></PersonnelList>
    </Modal>
  </div>
</template>
<script>
import { formatDate } from '@/libs/tools'
import { mapGetters } from 'vuex'
import PersonnelList from '@/view/enterprise/component/personnelList.vue'
export default {
  name: 'enterprise',
  components: {
    PersonnelList
  },
  data () {
    return {
      action: 'action',
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        {
          title: '企业名称',
          key: 'title',
          align: 'center'
        },
        {
          title: '人员数量',
          key: 'personnelNumber',
          align: 'center'
        },
        {
          title: '创建人',
          key: 'founderId',
          align: 'center'
        },
        {
          title: '总分享数',
          key: 'totalScore',
          align: 'center'
        },
        {
          title: '总点击数',
          key: 'totalHits',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createTime',
          slot: 'createTime',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      detailModal: false,
      detailRow: {},
      ids: ''
    }
  },
  computed: {
    ...mapGetters(['getenterprisList']),

    listTotal () {
      return this.$store.state.enterprise.enterprisPage.listTotal
    },
    pageRange () {
      return this.$store.state.enterprise.enterprisPage.pageRange
    },
    setPageIndex () {
      return this.$store.state.enterprise.enterprisValue.pageindex
    },
    pageSize () {
      return this.$store.state.enterprise.enterprisValue.pageSize
    },
    searchValue () {
      return this.$store.state.enterprise.enterprisValue
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
      vm.$store.dispatch('getEnterprisList', param)
    },

    detail (row) {
      let vm = this
      vm.$store.dispatch('changePersonnelId', row.id)
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
        this.$Message.error('请选择企业')
        return
      }
      vm.$store.dispatch('deleteEnterprisList', { ids: vm.ids }).then(res => {
        if (res.status == 200) {
          this.$Message.success('删除成功')
        }
      })
    },
    /* 改变页码 */
    changePage (pageNumber) {
      this.$store.dispatch('changeEnterprisListPage', pageNumber)
    },

    /* 改变每页条数 */
    changePageSize (pageSize) {
      this.$store.dispatch('changeEnterprisListPageSize', pageSize)
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
