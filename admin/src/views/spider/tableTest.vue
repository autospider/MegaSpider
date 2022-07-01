<template>
  <div style="padding:30px">
    <div >
      <el-button type="primary" @click="addRow">新增车站</el-button>
      <el-button type="primary" @click="addCol">新增车次</el-button>
    </div>
    <el-table :data="tableData" cell-class-name="table-cell" height="420" :cell-style="iconHeader" :header-cell-style="iconHeader" ref="table">
      <el-table-column label="" fixed="left" width="100" align="center">
        <template slot-scope="{$index}">
          <i v-if="$index != 0" class="el-icon-remove add_btn" @click="delRow($index)"></i>
        </template>
      </el-table-column>
      <el-table-column fixed="left" header-align="center" width="200" >
        <template slot-scope="{row,$index}">
          <span v-if="$index == 0">{{row.stationName}}</span>
          <el-input v-else v-model="row.stationName" placeholder="请输入车站"></el-input>
        </template>
      </el-table-column>
      <el-table-column v-for="item in colList" :key="item" header-align="center" width="200" >
        <template slot="header" slot-scope="{column,$index}">
          <i v-if="$index != 1" class="el-icon-remove add_btn" @click="delCol(column,$index)"></i>
        </template>
        <template slot-scope="{row,$index}">
          <el-input v-if="$index==0" v-model="row[item]" placeholder="请输入车次"></el-input>
          <el-time-picker v-else v-model="row[item]" value-format="HH:mm" format="HH:mm" placeholder="请输入发车时间"></el-time-picker>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        colList: [],
        index: 1,
        tableData: [],
      }
    },
    beforeUpdate(){
      this.$nextTick(() => { //在数据加载完，重新渲染表格
        this.$refs['table'].doLayout();
      })
    },
    mounted() {
      this.initTable()
    },
    methods: {
      iconHeader({row, column, rowIndex, columnIndex}) {
        if(columnIndex == 0) {
          return 'border-bottom:transparent'
        }
      },
      initTable() {
        this.tableData = []
        let head = {}
        head.stationName = '车站/车次'
        this.tableData.push(head)
        this.addRow()
        this.addCol()
      },
      addRow() {
        let obj = {}
        obj.stationName = ''
        this.colList.map((item) => {
          obj[item] = ''
        })
        this.tableData.push(obj)
      },
      delRow(index) {
        if(this.tableData.length == 2) {
          this.tableData.splice(index,1)
          this.addRow()
        }
        else {
          this.tableData.splice(index,1)
        }
      },
      addCol() {
        let str = 'train' + this.index
        this.index++
        this.tableData.map((item) => {
          this.$set(item,str,'')
        })
        this.colList.push(str)
      },
      delCol(column,index) {
        let str = this.colList[index-2]
        this.tableData.map(item => {
          delete item[str]
        })
        this.colList.splice(index-2,1)
        if(Object.keys(this.tableData[0]).length == 1) {
          this.addCol()
        }
      }
    }
  }
</script>

<style scoped lang="less">

  .el-table--border::after, .el-table--group::after, .el-table::before {
    background-color: transparent;
  }
  .add_btn {
    text-align: center;
    font-size: 25px;
    color: #909399;
    cursor: pointer;
  }
  /deep/ .el-table th.gutter {
    display: table-cell !important;
    width: 10px !important;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 179px;
  }
  /deep/.table-cell {
    border-right: 1px solid #EBEEF5;
  }
</style>
<style>
  .el-table__fixed-right::before, .el-table__fixed::before {
    height: 0px !important;
  }
</style>
