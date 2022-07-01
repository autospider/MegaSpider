<template>
  <div
    style="
    margin-left: 16px;margin-right: 10px"
  >
    <div style="float: left; margin: 8px 52px 8px 0px;padding-bottom: 10px;padding-top: 10px;">
      <el-button type="success" icon="el-icon-plus" @click="addDb"
                 style="padding-left: 30px;padding-right: 30px; ">添加新连接
      </el-button>
    </div>
    <div>
      <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%"
                :cell-style="cellStyle" @selection-change="handleSelectionChange">
        <el-table-column type="selection"/>
        <el-table-column
          type="index" align="center" width="100">
          <template slot="header">
            <svg-icon icon-class="icon" class-name="card-panel-icon"/>

            序号

          </template>

        </el-table-column>
        <el-table-column prop="dbName" align="center">
          <template slot="header">
            <i class="el-icon-notebook-2"></i>
            数据连接名称
          </template>
        </el-table-column>
        <el-table-column prop="dbType" align="center">
          <template slot="header">
            <i class="el-icon-link"/>
            连接类型
          </template>
        </el-table-column>
        <el-table-column prop="host"  align="center">
          <template slot="header">
            <i class="el-icon-connection"/>
            连接服务器
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center">
          <template slot="header">
            <i class="el-icon-s-tools"/>
            操作
          </template>

          <template slot-scope="scope">
            <el-button type="text" size="small" @click="detail({'title':'详情','row':scope.row})">
              查看
            </el-button>
            <el-divider direction="vertical"/>
<!--            <el-button type="text" size="small" @click="delDb(scope.row)">-->
            <el-button type="text" size="small" @click="giveData(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="100px" :model="addDbForm">
        <el-form-item label="数据连接名称">
          <el-input v-if="dialogTitle=='详情'"  style="width: 400px" v-model="addDbForm.dbName" :disabled="true"/>
          <el-input v-else style="width: 400px" v-model="addDbForm.dbName"/>
        </el-form-item>
        <el-form-item label="连接类型">
<!--          <el-input v-model="addDbForm.dbType" style="width: 400px"/>-->
          <el-select v-model="addDbForm.dbType" placeholder="请选择" style="width: 400px">
            <el-option
              v-for="item in typeOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="host">
          <el-input  style="width: 400px" v-model="addDbForm.host" />
        </el-form-item>
        <el-form-item label="port">
          <el-input  style="width: 400px" v-model="addDbForm.port" oninput="value=value.replace(/[^\d.,]/g,'')"/>
        </el-form-item>
        <el-form-item label="user">
          <el-input  style="width: 400px" v-model="addDbForm.user" />
        </el-form-item>
        <el-form-item label="password">
          <el-input  style="width: 400px" v-model="addDbForm.password" />
        </el-form-item>
        <el-form-item label="database">
          <el-input  style="width: 400px" v-model="addDbForm.db" />
        </el-form-item>
<!--        <el-form-item label="table">-->
<!--          <el-input  style="width: 400px" v-model="addDbForm.table" />-->
<!--        </el-form-item>-->
        <el-form-item label="charset">
          <el-input  style="width: 400px" v-model="addDbForm.charset" />
        </el-form-item>
<!--        <el-form-item label="连接参数">-->
<!--          <el-button v-if="conneInfo.length===0&&dialogTitle!='详情'"  type="primary" @click="innerVisible=true">添加</el-button>-->
<!--&lt;!&ndash;          <div v-else-if="addDbForm.dbParameters.length!==0">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input  v-model="addDbForm.dbParameters" style="width: 400px" :disabled="true"/>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-button v-else-if="conneInfo.length!==0" type="text" @click="innerVisible=true">修改</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--          <div v-else>-->
<!--            <el-input  v-model="addDbForm.dbParameters" style="width: 400px" :disabled="true"/>-->
<!--            <el-button  type="text" @click="editInner(addDbForm.dbParameters)">修改</el-button>-->
<!--          </div>-->
<!--&lt;!&ndash;          <p v-show="conneInfo.length!==0" v-model="addDbForm.connectInfo" style="width: 400px">{{conneInfo}}&ndash;&gt;-->
<!--&lt;!&ndash;            <el-button  type="primary" @click="innerVisible=true">修改</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          </p>&ndash;&gt;-->

<!--&lt;!&ndash;          <el-dialog&ndash;&gt;-->
<!--&lt;!&ndash;            width="30%"&ndash;&gt;-->
<!--&lt;!&ndash;            title="连接参数"&ndash;&gt;-->
<!--&lt;!&ndash;            :visible.sync="innerVisible"&ndash;&gt;-->
<!--&lt;!&ndash;            append-to-body>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-form :label-position="labelPosition" label-width="100px" :model="innerForm">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-form-item label="host">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-input  style="width: 250px" v-model="innerForm.host" />&ndash;&gt;-->
<!--&lt;!&ndash;              </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-form-item label="port">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-input  style="width: 250px" v-model="innerForm.port" oninput="value=value.replace(/[^\d.,]/g,'')"/>&ndash;&gt;-->
<!--&lt;!&ndash;              </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-form-item label="user">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-input  style="width: 250px" v-model="innerForm.user" />&ndash;&gt;-->
<!--&lt;!&ndash;              </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-form-item label="password">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-input  style="width: 250px" v-model="innerForm.password" />&ndash;&gt;-->
<!--&lt;!&ndash;              </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-form-item label="database">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-input  style="width: 250px" v-model="innerForm.db" />&ndash;&gt;-->
<!--&lt;!&ndash;              </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-form-item label="table">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-input  style="width: 250px" v-model="innerForm.table" />&ndash;&gt;-->
<!--&lt;!&ndash;              </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-form-item label="charset">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-input  style="width: 250px" v-model="innerForm.charset" />&ndash;&gt;-->
<!--&lt;!&ndash;              </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-form>&ndash;&gt;-->
<!--&lt;!&ndash;            <span slot="footer" class="dialog-footer">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-button   type="primary" @click="saveConnection">确定</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;            </span>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-dialog>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input v-model="addDbForm.dbParameters" style="width: 400px" />&ndash;&gt;-->
<!--        </el-form-item>-->
<!--        <el-form-item label="连接参数" v-else>-->
<!--          <el-input v-model="addDbForm.dbParameters" style="width: 400px"/>-->
<!--          <el-button  type="text" @click="editInner(addDbForm.dbParameters)">修改</el-button>-->
<!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button  type="primary" v-if="dialogTitle=='添加新连接'" @click="outerConfirm">确 定</el-button>
          <el-button  type="primary" v-if="dialogTitle=='详情'" @click="outerConfirm">保 存</el-button>
          <el-button  type="success"  @click="testConnection()">测试连接</el-button>

        </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="delVisible"
      width="30%"
      :before-close="handleClose">
      <span>确认删除吗？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="delDb(delData)">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import {getDb, getSpider} from "../../api/role";
  import { v4 as uuidv4 } from 'uuid'
  import checkPermission from "../../utils/permission";
  export default {
    data() {
      return {
        delVisible:false,
        typeOpts:[{
          value: 'mongodb',
          label: 'mongodb'
        }, {
          value: 'mysql',
          label: 'mysql',
        }, {
          value: 'sqlserver',
          label: 'sqlserver'
        }, {
          value: 'oracle',
          label: 'oracle'
        }, {
          value: 'postgre',
          label: 'postgre'
        }],
        innerForm:{},
        innerVisible: false,
        dialogVisible:false,
        labelPosition:'left',
        tableData: [],
        crawlerOpts:[],
        dialogTitle:'添加数据连接',
        addDbForm:[],
        conneInfo:'',
        delData:{}

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
      giveData(data){
        this.delVisible=true
        this.delData=data
      },
      testConnection(){
        this.$axios.post('/dev-prod/dbconn/test',  this.addDbForm, { headers: { 'accept': 'application/json','Content-Type': 'application/json' } }).then(res => {
          if (res.status==200&&res.data.flag==0){
            this.$message({
              message: '连接成功',
              type: 'success'
            });
          }
          else if(res.status==200&&res.data.flag==-1){
            this.$message.error(res.data.msg);
          }
          else {
            this.$message.error('连接发生错误，请重试！');
          }
        })
      },
      editInner(data){
        this.innerForm=JSON.parse(data)
        this.innerVisible=true
       // console.log(this.dialogTitle)
      },
      cancel(){
        this.dialogVisible = false
        this.addDbForm=[]

        this.conneInfo=''
      },
      delDb(data){
        this.$axios.post('/dev-prod/dbconn/del',  { "dbName": data.dbName}, { headers: { 'accept': 'application/json','Content-Type': 'application/json' } }).then(res => {
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
        // for (let i = 0; i < this.tableData.length; i++) {
        //   if (this.tableData[i].id==data.id){
        //     delPos=i
        //     break
        //   }
        // }
        // this.tableData.splice(delPos,1)
      },
      saveEdit(){
        const id = this.addDbForm.id
        for (let i = 0; i < this.tableData.length; i++) {
          const tableId = this.tableData[i].id
          if (tableId==id){
            this.$set(this.tableData,i,this.addDbForm)
            // this.$set(this.tableData,i,this.addTimerForm)
          }

        }
        this.dialogVisible=false
        this.addTimerForm={}
      },
      detail(data){
        this.dialogVisible=true
        this.dialogTitle=data.title
        this.addDbForm = JSON.parse(JSON.stringify(data.row))
      },
      outerConfirm() {
        // if (this.dialogTitle=='添加数据连接')
        if (!this.isNotEmptyStr(this.addDbForm.host)||!this.isNotEmptyStr(this.addDbForm.db)){
          this.$message.error('host、datebase为必填字段，请完善之后再提交！');
        }
        else {
          this.addDbForm['id']=uuidv4()
          this.$axios.post('/dev-prod/dbconn/save',  this.addDbForm, { headers: { 'accept': 'application/json','Content-Type': 'application/json' } }).then(res => {
            if (res.status==200&&res.data.msg=='insert success'&&this.dialogTitle=='添加新连接'){
              this.$message({
                message: '新连接已添加',
                type: 'success'
              });
              const that = this
              setTimeout(function(){
                that.$router.go(0)},500);
            }
            else if(res.status==200&&res.data.msg=='update success'&&this.dialogTitle=='详情'){
              this.$message({
                message: '数据已更新',
                type: 'success'
              });
              const that = this
              setTimeout(function(){
                that.$router.go(0)},500);
            }
            else {
              this.$message.error('连接添加失败，请重试！');
            }
          })

          // this.tableData.push(this.addDbForm)
          this.dialogVisible = false
          this.addDbForm=[]
          this.innerForm={}
          this.conneInfo=''
        }

        // }



      },
      async getSpider(){
        const spiderRes = await getSpider()
        this.spiderListData=spiderRes.data
        for (let i = 0; i < this.spiderListData.length; i++) {
          const crawlerObj = {}
          crawlerObj['label']=this.spiderListData[i].spiderName
          crawlerObj['value']=this.spiderListData[i].spiderName
          this.crawlerOpts.push(crawlerObj)
        }
      },
      async getData() {
        // const res = await getDb()
        this.$axios.post('/dev-prod/dbconn/list',  {}, { headers: { 'accept': 'application/json','Content-Type': 'application/json' } }).then(res => {
          if (res.status==200){
            const data = res.data.data
            for (let key in data)
            {
              this.tableData.push(data[key])
            }
          }
          else {
            this.$message.error('请求数据失败！');
          }
        })
        // console.log(res)




      },
      saveConnection(){
        if (!this.isNotEmptyStr(this.innerForm.host)||!this.isNotEmptyStr(this.innerForm.table)||!this.isNotEmptyStr(this.innerForm.db)){
          this.$message.error('host、table、datebase为必填字段，请完善之后再提交！');
        }
        else{
          const value = this.innerForm.port
          this.innerForm['port'] = parseInt(value)
          this.conneInfo = JSON.stringify(this.innerForm)
          this.addDbForm.dbParameters = JSON.stringify(this.innerForm)
          this.innerVisible=false
        }

        // console.log(JSON.stringify(this.innerForm))
      },
      addDb(){
        this.dialogVisible=true
        this.dialogTitle='添加新连接'
        this.addDbForm={}
      },
      isNotEmptyStr(s) {
        if (typeof s == 'string' && s.length > 0) {
          return true
        }
        return false
      }

    }
  }
</script>
<style lang="scss">
  /*.inputDeep .el-input--medium .el-input__inner{*/
  /*  border-top: none ;*/
  /*  border-left: none !important;*/
  /*  border-right: none !important;*/
  /* border-radius: 0;*/

  /*}*/

  /*.el-table .hidden-row {*/
  /*  display: none;*/
  /*}*/
  /*.el-table.sssssssss{*/
  /*  color:red*/
  /*}*/


  .el-input__inner {
    border-top: none ;
    border-left: none !important;
    border-right: none !important;
    /*border-color: #C0C4CC;*/
    /*border: 0;*/
    /*border-bottom-color: 1px solid ;*/

    /*border: 0px solid #DCDFE6;*/
    /*border-top-color: rgb(220, 223, 230);*/
    /*border-top-style: solid;*/
    /*border-top-width: 1px;*/
    /*border-right-color: rgb(220, 223, 230);*/
    /*border-right-style: solid;*/
    /*border-right-width: 1px;*/
    /*border-bottom-color: rgb(220, 223, 230);*/
    /*border-bottom-style: solid;*/
    /*border-bottom-width: 1px;*/
    /*border-left-color: rgb(220, 223, 230);*/
    /*border-left-style: solid;*/
    /*border-left-width: 1px;*/
    /*border-image-source: initial;*/
    /*border-image-slice: initial;*/
    /*border-image-width: initial;*/
    /*border-image-outset: initial;*/
    /*border-image-repeat: initial;*/
    /*box-sizing: border-box;*/
    /*color: #606266;*/
    /*display: inline-block;*/
    /*font-size: inherit;*/
    /*height: 40px;*/
    /*line-height: 40px;*/
    /*outline: none;*/
    /*padding: 0 15px;*/


  }

</style>
