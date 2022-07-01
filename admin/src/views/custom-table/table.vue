<template>
  <pl-table
    ref="tableview"
    :data="data"
    border
    :height="900"
    :header-cell-style="{color: '#fff', fontSize: '14px', backgroundColor: '#409EFF',fontWeight: '500'}"
  >
    <column v-for="(item, index) in columnData" :key="index" :data="item" :entshow="entshow" />
  </pl-table>
</template>
<script>
import column from './column.vue'
import { PlTable } from 'pl-table'
import 'pl-table/themes/index.css'
import 'pl-table/themes/plTableStyle.css'
export default {
  components: {
    PlTable,
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
</style>
