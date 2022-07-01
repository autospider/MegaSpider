<template>
  <div>
    <div
      style="
    margin-left: 16px;margin-right: 10px"
    >
      <div style="float: left; margin: 8px 52px 8px 0px;padding-bottom: 10px;padding-top: 10px;">
        <!--        项目名称-->
        <!--        <el-select v-model="value1" placeholder="请选择">-->
        <!--          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />-->
        <!--        </el-select>-->
        <!--        爬虫id-->
        <!--        <el-input v-model="crawlerId" placeholder="爬虫id" style="width: 200px" clearable suffix-icon="el-icon-search" />-->
        <!--        <el-button type="primary" icon="el-icon-search" @click="searchSpider()">查询</el-button>-->
        <el-button type="success" icon="el-icon-plus" @click="addTimer()"
                   style="padding-left: 30px;padding-right: 30px; ">添加定时任务
        </el-button>
      </div>
      <div>
        <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%" :cell-style="cellStyle" @selection-change="handleSelectionChange">
          <el-table-column type="selection" />
          <el-table-column
            type="index"  align="center" width="100">
            <template slot="header">
              <svg-icon icon-class="icon" class-name="card-panel-icon"/>

              序号

            </template>

          </el-table-column>
          <!--        <el-table-column fixed prop="index" label="序号" align="center" />-->
          <el-table-column prop="timerName" align="center" >
            <template slot="header">
              <i class="el-icon-time"></i>

<!--                            <el-tooltip class="item" effect="dark" content="定时任务的名称" placement="bottom">-->
<!--                <i class="el-icon-question"></i>-->
<!--              </el-tooltip>-->
              任务名称

            </template>
          </el-table-column>
          <!--        <el-table-column prop="role" label="Role"  align="center" />-->
          <!--        <el-table-column prop="taskKey" label="爬虫id"  align="center" />-->
          <el-table-column prop="spiderName"  align="center" >
            <template slot="header">
              <svg-icon icon-class="bug" class-name="card-panel-icon"/>
              爬虫名称
            </template>
          </el-table-column>
          <el-table-column prop="timerOrder" label="cron表达式"  align="center" >
            <template slot="header">
              <i class="el-icon-key"/>
              cron表达式

            </template>
          </el-table-column>
          <el-table-column prop="desc" align="center" >
            <template slot="header">
              <i class="el-icon-notebook-2"/>
              任务描述

            </template>
          </el-table-column>
          <el-table-column   align="center" >
            <template slot="header">
              <i class="el-icon-s-operation"/>
              启动/终止

            </template>
            <template slot-scope="scope" >

              <!-- // value:绑定值  disabled:是否禁用   inactive-color:switch关闭时的背景色  active-color:switch打开时的背景色-->
              <el-switch v-model="scope.row.isSwitchOn"
                         inactive-color="#A7A7A7" active-color="#17BF6D"></el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center">
            <template slot="header">
              <i class="el-icon-s-tools"/>
              操作
            </template>

            <template slot-scope="scope">
              <el-button type="text" size="small" @click="detail({'title':'定时任务详情','row':scope.row})">
                查看
              </el-button>
              <el-divider direction="vertical" />
              <el-button type="text" size="small" @click="delTimer(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

      </div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="handleClose">
        <el-form :label-position="labelPosition" label-width="100px" :model="addTimerForm">
          <el-form-item label="任务名称">
            <el-input  style="width: 400px" v-model="addTimerForm.timerName" />
          </el-form-item>
          <el-form-item label="爬虫名称">
            <el-select v-model="addTimerForm.spiderName" placeholder="请选择" style="width: 400px">
              <el-option
                v-for="item in crawlerOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
<!--            <el-input v-model="addTimerForm.spiderName" />-->
          </el-form-item>
          <el-form-item label="cron表达式">
            <el-input v-model="addTimerForm.timerOrder" style="width: 400px"/>
          </el-form-item>
          <el-form-item label="任务描述">
            <el-input v-model="addTimerForm.desc" style="width: 400px" />
          </el-form-item>
          <el-form-item label="是否启动">
            <el-select v-model="addTimerForm.isSwitchOn" placeholder="请选择" style="width: 400px">
              <el-option
                v-for="item in switchOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <!--          <el-button v-if="dialogTitle=='编辑'" type="primary" @click="dialogVisible=false">保存</el-button>-->
          <el-button v-if="dialogTitle=='定时任务详情'" type="primary" @click="editTimer()">保存</el-button>
          <el-button v-if="dialogTitle=='添加定时任务'" type="primary" @click="saveForm()">添加</el-button>
        </span>
      </el-dialog>


    </div>
    <div
      class="block"
      style="
    border-top-width: 30px;
    padding-bottom: 0px;
    margin-top: 30px;
    margin-left: 400px;
"
    >
      <el-pagination
        background
        layout="prev, pager, next"
        :total="50"
      />
    </div>
  </div>
</template>
<script>
  import checkPermission from "../../utils/permission";
  import {getTimer,getSpider} from "../../api/role";
  import { v4 as uuidv4 } from 'uuid'
  import {tableData} from "../custom-table-input/demo";

  export default {
    data() {
      return {
        value1:'true',
        tableData: [],
        labelPosition:'left',
        addTimerForm:{},
        dialogTitle:'添加定时任务',
        dialogVisible:false,
        spiderListData:[],
        crawlerOpts:[],
        switchOpts:[
          {
            value: true,
            label: true
          }, {
            value: false,
            label: false
          },
        ],
      }
    },
    // mounted() {
    //   document.title = '患者信息列表'
    // },
    created() {
      // this.getSpider()
      this.getData()
      this.getSpider()
      // this.dataSource = rolesList
    },
    methods: {
      cancel(){
        this.dialogVisible = false
        this.addTimerForm=[]
      },
      delTimer(data){
        this.$axios.post('/dev-prod/cronjob/del',  { "id": data.id}, { headers: { 'accept': 'application/json','Content-Type': 'application/json' } }).then(res => {
          if(res.status==200&&res.data.msg=='success'){
            this.$message({
              message: '连接已删除',
              type: 'success'
            });
            const that = this
            setTimeout(function(){
              that.$router.go(0)},500);
          }
          else{
            this.$message.error('连接删除失败，请重试！');
          }
        })
       // let delPos = -1
       //  for (let i = 0; i < this.tableData.length; i++) {
       //    if (this.tableData[i].id==data.id){
       //      delPos=i
       //      break
       //    }
       //  }
       //  this.tableData.splice(delPos,1)
      },
      detail(data){
        this.dialogVisible=true
        this.dialogTitle=data.title
        this.addTimerForm=JSON.parse(JSON.stringify(data.row))
      },
      searchSpider(){
        // console.log('传进来的是',this.$route)
      },
      checkPermission,

      changeAutograph(data){
        if (data=='true'){
          this.value1=true
        }
        // console.log(data)
      },
      async getData() {
        const res = await getTimer()
        // console.log(res)
        this.$axios.post('/dev-prod/cronjob/list',  {}, { headers: { 'accept': 'application/json','Content-Type': 'application/json' } }).then(res => {
         if (res.status==200){
           const data = res.data.data
           for (let key in data)
           {
             this.tableData.push(data[key])
           }
           // this.tableData = res.data
           let newTable = []
           for (let i = 0; i <this.tableData.length ; i++) {
             if(this.tableData[i]['taskName']==this.$route.params.taskName){
               newTable.push(this.tableData[i])
             }
             // else{
             //   this.tableData[i]['role'] = this.roleName
             // }
           }
           if (newTable.length>0){
             this.tableData = newTable
           }
           this.tableData[i]['role'] = this.roleName
         }
         else {
           this.$message.error('请求数据失败！');
         }
        })


      },
      async getSpider(){
        const spiderRes = await getSpider()
        this.$axios.post('/dev-prod/spider/list',  {}, { headers: { 'accept': 'application/json','Content-Type': 'application/json' } }).then(res => {
          const data = res.data.data
          for (let key in data) {
            this.spiderListData.push( data[key])
          }
          for (let i = 0; i < this.spiderListData.length; i++) {
            const crawlerObj = {}
            // crawlerObj['label']=this.spiderListData[i].taskName
            // crawlerObj['value']=this.spiderListData[i].taskName
            crawlerObj['label']=this.spiderListData[i].taskName
            crawlerObj['value']=this.spiderListData[i].taskName
            this.crawlerOpts.push(crawlerObj)
          }
        })

      },
      saveForm(){
        const timerObj = this.addTimerForm
        timerObj['id'] = uuidv4()
        // this.tableData.push(timerObj)
        this.$axios.post('/dev-prod/cronjob/save',  timerObj, { headers: { 'accept': 'application/json','Content-Type': 'application/json' } }).then(res => {
          if(res.status==200&&res.data.flag==1){
            this.$message({
              message: '定时任务已保存',
              type: 'success'

            });
            const that = this
            setTimeout(function(){
              that.$router.go(0)},500);
          }
          else{
            this.$message.error('定时任务保存失败，请重试！');
          }
        })
        this.dialogVisible=false
        // console.log(this.addTimerForm)
        this.addTimerForm={}


      },
      editTimer(){
        // console.log(this.addTimerForm)
        const id = this.addTimerForm.id
        this.$axios.post('/dev-prod/cronjob/save',  this.addTimerForm, { headers: { 'accept': 'application/json','Content-Type': 'application/json' } }).then(res => {
          if(res.status==200&&res.data.flag==0){
            this.$message({
              message: '定时任务已更新',
              type: 'success'

            });
            const that = this
            setTimeout(function(){
              that.$router.go(0)},500);
            // this.$router.go(0)
          }
          else{
            this.$message.error('定时任务保存失败，请重试！');
          }
        })
        // console.log(id)
        // for (let i = 0; i < this.tableData.length; i++) {
        //   const tableId = this.tableData[i].id
        //   if (tableId==id){
        //     this.$set(this.tableData,i,this.addTimerForm)
        //     // this.$set(this.tableData,i,this.addTimerForm)
        //   }
        //
        // }
        this.dialogVisible=false
        this.addTimerForm={}
        // console.log('vis:',this.dialogVisible)

      },
      addTimer(){
        // console.log(this.spiderListData)
        // console.log(this.crawlerOpts)
        this.dialogVisible=true
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },

    }
  }
</script>
