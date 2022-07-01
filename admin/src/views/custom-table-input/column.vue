<template>
  <el-table-column
    header-align="center"
    align="center"
    :prop="data.prop || ''"
    :label="data.label"
    :width="data.width || '130px'"
  >
    <template v-if="data.prop" slot-scope="scope">
      <span> {{ scope.row[data.prop] }}</span>
    </template>
    <template v-if="data.children && data.children.length > 0">
      <!-- 将数据拍平 将头藏起来 -->
      <column v-for="(child, index2) in data.children" :key="index2" v-bind="$attrs" :data="child" :entshow="entshow" />
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: 'Column',
  props: {
    data: { type: Object, default() {
      return {}
    } },
    entshow: {
      type: Boolean,
      default: false
    }
  }
  // inject: ['formatters']
}
</script>
