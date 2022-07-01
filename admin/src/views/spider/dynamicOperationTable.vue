<template>
  <div style="margin:20px">
    <el-button type="primary" style="margin-bottom:10px" @click="addTable">AddStep</el-button>
    <el-button type="primary" style="margin-bottom:10px" @click="delTable">DelStep</el-button>
    <div class="inputDeep" style="width: 175px">
      <el-input
        placeholder="stepName"
        v-model="input"
        clearable>
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix"
          >
        </i>
      </el-input>
    </div>
    <div v-for="tableDataItem in tableDatas" :key="tableDataItem.key" style="margin-top:5px;margin-bottom:15px">
      <el-table :data="tableDataItem.tableData" border>
        <el-table-column prop="option" label="">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-minus" circle @click="subColumn(tableDataItem.key,scope.row.id)" />
            <el-button type="success" icon="el-icon-plus" circle @click="addColumn(tableDataItem.key)" />
          </template>
        </el-table-column>
        <el-table-column v-for="item in tableHeader" :key="item.key" :prop="item.prop" :label="item.label">
          <template slot-scope="scope">
            <el-input v-show="scope.row[item.prop].edit" v-model="scope.row[item.prop].value" placeholder="请输入内容" @blur="blueHandler(scope.row[item.prop])" />
            <span v-show="!scope.row[item.prop].edit">{{ scope.row[item.prop].value }}</span>
            <i v-show="!scope.row[item.prop].edit" style="margin-left:10px" class="el-icon-edit" @click="editHandle(scope.row[item.prop])" />
          </template>
        </el-table-column>
        <!-- <el-table-column prop="name" label="姓名" /> -->
        <!-- <el-table-column prop="date" label="日期" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="province" label="省份" />
      <el-table-column prop="city" label="市区" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="zip" label="邮编" /> -->
        <el-table-column prop="option" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button v-if="scope.row.edit" type="text" size="small" @click="editHandler(scope.row)">取消编辑</el-button>
            <el-button v-else type="text" size="small" @click="editHandler(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  data () {
    return {
      input: '',
      tableHeader: [
        {
          key: '0',
          label: '字段名',
          prop: 'name'
        },
        {
          key: '1',
          label: 'parseType',
          prop: 'parseType'
        },  {
          key: '2',
          label: 'out',
          prop: 'out'
        }, {
          key: '3',
          label: 'rule',
          prop: 'rule'
        },

      ],
      tableDatas: [
        {
          key: 0,
          tableData: [{
            id: 0,
            name: {
              value: '',
              edit: false
            },
            parseType: {
              value: 'xpath',
              edit: false
            },
            out: {
              value: 'list',
              edit: false
            }
            ,rule: {
              value: '//*[@class=\'dddd\']/a/@href',
              edit: false
            }
          }]
        }
      ]
    }
  },
  methods: {
    addColumn (tableDataItemKey) {
      console.log(tableDataItemKey)
      const column = { id: uuidv4() }
      for (let i = 0; i < this.tableHeader.length; i++) {
        console.log(this.tableHeader[i].prop)
        column[this.tableHeader[i].prop] = { value: '', edit: true }
      }
      for (let j = 0; j < this.tableDatas.length; j++) {
        if (this.tableDatas[j].key == tableDataItemKey) {
          this.tableDatas[j].tableData.push(column)
          return
        }
      }
    },
    subColumn (tableDataItemKey, tableDataId) {
      console.log(tableDataItemKey, tableDataId)
      for (let i = 0; i < this.tableDatas.length; i++) {
        if (this.tableDatas[i].key == tableDataItemKey) {
          for (let j = 0; j < this.tableDatas[i].tableData.length; j++) {
            if (this.tableDatas[i].tableData[j].id == tableDataId && this.tableDatas[i].tableData.length>1) {
              console.log(this.tableDatas[i].tableData.length)
              console.log(this.tableDatas[i].tableData)
              this.tableDatas[i].tableData.splice(j, 1)
            }
          }
        }
      }
    },
    blueHandler (row) {
      row.edit = false
    },
    editHandle (row) {
      console.log(row)
      row.edit = true
    },
    addTable () {
      const tableData = { key: uuidv4(), tableData: [] }
      this.tableDatas.push(tableData)
      console.log(this.tableDatas)
      console.log(tableData)
      this.addColumn(tableData.key)
    },
    delTable(){
      if (this.tableDatas.length>1){
        this.tableDatas.pop()
      }

    }
  }
}
</script>
<style>
  .inputDeep .el-input--medium .el-input__inner{
    border:none;

  }
</style>
