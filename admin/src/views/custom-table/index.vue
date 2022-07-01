<template>
  <div>
    <h3>用pl-table + 自定义表头解决大数据渲染问题 （没开启虚拟滚动版
    </h3>
    <mytable class="looking" :data="tableData" :column-data="columnData" />
  </div>
</template>

<script>
import mytable from './table.vue'
import { columnData, tableData } from '../custom-table-input/demo'
export default {
  name: 'CustomTable',
  components: {
    mytable
  },
  data() {
    return {
      columnData: columnData,
      tableData: tableData
    }
  },
  created() { },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>
