<template>
  <el-table
    ref="tableview"
    :data="data"
    border
    :header-cell-style="{color: '#fff', fontSize: '14px', backgroundColor: '#409EFF',fontWeight: '500'}"
    :cell-style="{height: '0px', display: 'none'}"
    class="especially_table"
  >
    <column v-for="(item, index) in columnData" :key="index" :data="item" :entshow="entshow" />
  </el-table>
</template>
<script>
import column from './column.vue'
export default {
  components: {
    column
  },
  props: {
    data: { type: Array, default() {
      return []
    } },
    columnData: { type: Array, default() {
      return []
    } },
    entshow: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
 .especially_table {
  .el-table__body-wrapper {
    height: 0;
  }
 }
</style>
