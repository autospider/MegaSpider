//
<template>
  <div>
    <h3>用自定义表头 + pl-table (隐藏掉表头) + 虚拟滚动 解决大数据渲染问题 注：plx-table-grid不支持多级头！！！有待优化 还没想好
    </h3>
    <!-- 这是表头 给表格隐藏掉 -->
    <mytable ref="plTable" :data="[]" :column-data="tableColumnData" :entshow="true" />
    <!-- 这是表格 给表头隐藏了 -->
    <plx-table-grid ref="plColumnData" :data="tableData" :header-cell-style="{display: 'none'}" @table-body-scroll="exterHandleScroll">
      <plx-table-column
        v-for="(item, index) in columnData"
        :key="index"
        :width="130"
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="scope">
          <el-input v-if="item.is_input" v-model="scope.row[item.prop]" size="mini" />
          <span v-else> {{ scope.row[item.prop] }}</span>
        </template>
      </plx-table-column>
    </plx-table-grid>
  </div>
</template>

<script>
import mytable from './table.vue'
import { PlxTableColumn, PlxTableGrid } from 'pl-table'
import { columnData, tableData } from './demo'
import 'pl-table/themes/index.css'
import 'pl-table/themes/plTableStyle.css'
export default {
  name: 'CustomTableInput',
  components: {
    PlxTableColumn,
    PlxTableGrid,
    mytable
  },
  data() {
    return {
      columnData: columnData,
      tableData: tableData,
      tableColumnData: [],
      newColumn: []
    }
  },
  created() {
    this.tableColumnData = this.columnData
    this.columnData = this.clapData(this.columnData)
  },
  mounted() {
  },
  methods: {
    // 这是表格的滚动事件 在他滚动的时候给表头添加滚动事件
    exterHandleScroll(event) {
      const newDom = this.$refs.plTable.$refs.tableview.bodyWrapper
      newDom.scrollTo(event.scrollLeft, 0)
    },
    clapData(columnData) {
      for (const item of columnData) {
        if (item.prop) {
          this.newColumn.push(item)
        }
        if (item.children) {
          this.clapData(item.children)
        }
      }
      return this.newColumn
    }
  }
}
</script>
<style lang="scss">
</style>
