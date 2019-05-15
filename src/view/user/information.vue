<template>
  <div>
    <!-- 用户管理-基本信息 -->
    <Table border ref="selection" :columns="columns" :data="data"></Table>

  </div>
</template>

<script>
export default {
  name: 'information',
  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '账号',
          key: 'name'
        }, {
          title: '姓名',
          key: 'age'
        }, {
          title: '会员类型',
          key: 'address'
        }, {
          title: '行业',
          key: 'address'
        }, {
          title: '供应产品名称',
          key: 'address'
        }
      ],
      data: []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
