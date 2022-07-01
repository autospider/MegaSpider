<template>
  <div>

    <div
      style="
    margin-left: 16px;margin-right: 10px"
    >
      <div style="float: left; margin: 8px 52px 8px 0px;padding-bottom: 10px;padding-top: 10px;">
        <el-button type="success" icon="el-icon-plus" @click="jumpNewPage({path:'/tinymce/spiderTest',data:{},name:'添加配置',activeNo:'fourth'})" style="padding-left: 50px;padding-right: 50px; ">添加爬虫</el-button>
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
<!--          <el-table-column prop="taskName"  align="center" >-->
<!--            <template slot="header">-->
<!--              <i class="el-icon-tickets"></i>-->
<!--              项目名称-->
<!--            </template>-->

<!--          </el-table-column>-->
          <el-table-column prop="taskName"   align="center" >
            <template slot="header">
              <svg-icon icon-class="bug" class-name="card-panel-icon"/>
              爬虫名称
            </template>

          </el-table-column>
          <el-table-column prop="flag"  align="center" >
            <template slot="header">
              <i class="el-icon-unlock"/>
              采集状态

            </template>

            <template #default="scope">

              <el-tag v-if="scope.row.flag==-1" size="medium"  type="danger" ><i class="el-icon-error"></i>已暂停</el-tag>
              <el-tag v-else-if="scope.row.flag==0" size="medium"  type="success" ><i class="el-icon-success"></i>已停止</el-tag>
              <el-tag v-else-if="scope.row.flag==1" size="medium"  type="" ><i class="el-icon-loading"></i>采集中</el-tag>
              <!--            <el-tag size="medium"  type="danger" >{{scope.row.status}}</el-tag>-->
            </template>


          </el-table-column>
<!--          <el-table-column prop="lastTime"  align="center" >-->
<!--            <template slot="header">-->
<!--              <i class="el-icon-time"/>-->
<!--              操作时间-->

<!--            </template>-->

<!--          </el-table-column>-->
<!--          <el-table-column   align="center" >-->
<!--            <template slot="header">-->
<!--              <i class="el-icon-s-operation"/>-->
<!--              启动/终止-->
<!--            </template>-->
<!--            <template slot-scope="scope">-->
<!--              &lt;!&ndash; // value:绑定值  disabled:是否禁用   inactive-color:switch关闭时的背景色  active-color:switch打开时的背景色&ndash;&gt;-->
<!--              <el-switch v-model="scope.row.isSwitchOn"-->
<!--                         inactive-color="#A7A7A7" active-color="#17BF6D"></el-switch>-->
<!--            </template>-->
<!--          </el-table-column>-->

          <!--        <el-table-column prop="encode" label="编码" align="center" />-->
          <!--        <el-table-column prop="resource" label="resource" align="center" />-->
          <!--        <el-table-column prop="parameter" label="parameter"  align="center" />-->
          <!--        <el-table-column prop="dataType" label="dataType" align="center" />-->
          <el-table-column fixed="right" align="center">
            <template slot="header">
              <i class="el-icon-s-tools"/>
              操作
            </template>

            <template slot-scope="scope">
              <el-button   circle @click="jumpNewPage({path:'/tinymce/spiderTest',data:scope.row,name:'添加配置',activeNo:'fourth'})">
                <el-tooltip class="item" content="编辑">
                  <i class="el-icon-edit" :style="{color:'blue'}"></i>
                </el-tooltip>
              </el-button>
              <el-button  circle v-if="scope.row.flag==-1||scope.row.flag==0"  @click="changeStatus({'title':'启动','row':scope.row})">
                <el-tooltip class="item" effect="dark" content="启动" placement="bottom">
                  <i class="el-icon-video-play" :style="{color:iconColor}"></i>
                </el-tooltip>
              </el-button>
              <el-button   circle v-if="scope.row.flag==1" @click="changeStatus({'title':'暂停','row':scope.row})">
                <el-tooltip class="item" effect="dark" content="暂停" placement="bottom">
                  <i class="el-icon-video-pause" :style="{color:'orange'}"></i>
                </el-tooltip>
              </el-button>
              <el-button   circle v-if="scope.row.flag==1||scope.row.flag==-1" @click="changeStatus({'title':'停止','row':scope.row})">
                <el-tooltip class="item" effect="dark" content="停止" placement="bottom">
                  <i class="el-icon-circle-close" :style="{color:'red'}"></i>
                </el-tooltip>

              </el-button>
<!--              <el-button   circle @click="delSpider({'title':'删除','row':scope.row})">-->
              <el-button   circle @click="giveDelParams({'title':'删除','row':scope.row})">
                <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                  <i class="el-icon-delete"></i>
                </el-tooltip>
              </el-button>

            </template>
          </el-table-column>
        </el-table>

      </div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="handleClose">
        <el-form :label-position="labelPosition" label-width="100px" :model="spiderForm">
          <el-form-item label="项目名称">
            <el-select v-model="spiderForm.taskName" placeholder="请选择" style="width: 400px">
              <el-option
                v-for="item in projectOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
<!--          <el-form-item label="Role">-->
<!--            <el-input v-model="spiderForm.role" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="爬虫id">-->
<!--            <el-input v-model="spiderForm.taskKey" />-->
<!--          </el-form-item>-->
          <el-form-item label="爬虫名称">
            <el-input v-model="spiderForm.spiderName" style="width: 400px"/>
          </el-form-item>
          <el-form-item label="采集状态">
<!--            <el-input v-model="spiderForm.status" style="width: 400px"/>-->
            <el-select v-model="spiderForm.status" placeholder="请选择" style="width: 400px">
              <el-option
                v-for="item in statusOpts"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="操作时间">
            <el-input v-model="spiderForm.lastTime" style="width: 400px"/>
          </el-form-item>
          <el-form-item label="启动/终止">
            <el-select v-model="spiderForm.isSwitchOn" placeholder="请选择" style="width: 400px">
              <el-option
                v-for="item in isSwitchOnOpts"
                :key="item.label"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>

<!--            <el-input v-model="spiderForm.isSwitchOn" style="width: 400px"/>-->
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
<!--          <el-button v-if="dialogTitle=='编辑'" type="primary" @click="dialogVisible=false">保存</el-button>-->
          <el-button v-if="dialogTitle=='编辑'" type="primary" @click="saveForm()">保存</el-button>
          <el-button v-if="dialogTitle=='添加爬虫'" type="primary" @click="addNewSpider()">添加</el-button>
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
          <el-button type="primary" @click="delSpider(delData)">确 定</el-button>
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
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    font-size: 12px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
<script>

// import { getTask } from '@/api/role'
import { getSpider,getTask} from '../../api/role'
import checkPermission from "../../utils/permission";
import store from '@/store'
import { v4 as uuidv4 } from 'uuid'
import {tableData} from "../custom-table-input/demo";

export default {
  data() {
    return {
      delVisible:false,
      iconColor:"green",
      isSwitchOnOpts: [
        {
          value: true,
          label: true
        }, {
          value: false,
          label: false
        },
      ],
      statusOpts: [
        {
          value: '选项1',
          label: '已中断'
        }, {
          value: '选项2',
          label: '已完成'
        }, {
          value: '选项3',
          label: '采集中'
        },
      ],
      roleName: store.getters.roles[0],
      projectOpts: [],
      labelPosition: 'left',
      operationType: 0,
      dialogTitle: '',
      dialogVisible: false,
      spiderForm: {},
      crawlerId: '',
      tableData: [],
      multipleSelection: [],
      delData:{},

    }
  },
  // mounted() {
  //   document.title = '患者信息列表'
  // },
  created() {
    // this.getSpider()
    this.getData()
    this.getProject()
    // this.dataSource = rolesList
  },
  methods: {
    giveDelParams(data) {
      this.delVisible = true
      this.delData = data
    },
    searchSpider(){
      // console.log('传进来的是',this.$route)
    },
    checkPermission,
    saveForm(){

      const index = this.spiderForm.id
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id==index){
          // this.tableData[i]=this.spiderForm
          this.$set(this.tableData,i,this.spiderForm)//不能用this.tableData[i]=this.spiderForm，这样只能刷新数据源，页面上的table不变
        }
      }
      this.dialogVisible=false
    },
    addNewSpider(){
      const tableObj = this.spiderForm
      tableObj['id']=uuidv4()
      this.tableData.push(tableObj)
      this.dialogVisible=false
      // console.log(this.spiderForm)
    },
    async getData() {
      // const res = await getSpider()
      // const projectRes = await getTask().data
      // for (let i = 0; i < projectRes.length; i++) {
      //   const optsObj = {}
      //   optsObj['label'] = projectRes[i].taskName
      //   optsObj['value'] = projectRes[i].taskName
      //
      // }

      this.$axios.post('/dev-prod/spider/list',  {}, { headers: { 'accept': 'application/json','Content-Type': 'application/json' } }).then(res => {
        const data = res.data.data
        for (let key in data) {
          this.tableData.push( data[key])
        }

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
      })
      // console.log(res)


    },
    async getProject(){
      const projectRes = await getTask()
      const data  = projectRes.data
      for (let i = 0; i < data.length; i++) {
        const optsObj = {}
        optsObj['label'] = data[i].taskName
        optsObj['value'] = data[i].taskName
        this.projectOpts.push(optsObj)
      }
      this.projectOpts.push(data)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    jumpNewPage(routeData) {
      routeData.data['activeNo'] = routeData.activeNo
      // const dataObj = data
      // console.log(data)
      // this.$router.push({ name: '添加配置', aaaaa: { id: 'aaaaaaaaaaaaaaaaa' }})
      this.$router.push({
        // name: '添加配置',
        // path: '/permission/page',
        // path: '/tinymce/spiderTest',
        path:routeData.path,
        name: routeData.name,
        // query: data,
        params:routeData.data
      })
    },
    handleCommand(command) {
      // this.$message('click on item ' + command)
      if(command.title=='删除'){
        this.delSpider(command)
      }
      else if(command.title=='编辑'){
        this.detail(command)

      }
      else {
        this.changeStatus(command)
      }
    },
    changeStatus(data) {
      if (data.title == '启动') {
        this.$axios.post('/dev-prod/spider/start', {"taskKey": data.row.taskKey}, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if (res.status == 200 && res.data.flag == 0) {
            this.$message({
              message: '爬虫启动成功',
              type: 'success'
            });
            data.row.flag = 1
          } else if (res.status == 200 && res.data.flag == -1) {
            this.$message.error('爬虫正在运行');
          } else {
            this.$message.error('启动失败，请重试！');
          }
        })
      } else if (data.title == '暂停') {
        this.$axios.post('/dev-prod/spider/pause', {"taskKey": data.row.taskKey}, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if (res.status == 200 && res.data.msg == 'success') {
            this.$message({
              message: '爬虫已暂停',
              type: 'success'
            });
            data.row.flag = -1
          } else {
            this.$message.error('操作失败，请重试！');
          }
        })

      } else {
        this.$axios.post('/dev-prod/spider/stop', {"taskKey": data.row.taskKey}, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if (res.status == 200 && res.data.msg == 'success') {
            this.$message({
              message: '爬虫已停止',
              type: 'success'
            });
            data.row.flag = 0
          } else {
            this.$message.error('操作失败，请重试！');
          }
        })

      }
    },
    delSpider(data){
      // let delPos = -1
      // const rowId = data.row.id
      // for (let i = 0; i < this.tableData.length; i++) {
      //   if (this.tableData[i].id==rowId){
      //     delPos=i
      //     break
      //   }
      //
      // }
      // this.tableData.splice(delPos, 1)
      // console.log(this.tableData)
      this.delVisible=false
      this.$axios.post('/dev-prod/spider/del',  { "taskKey": data.row.taskKey}, { headers: { 'accept': 'application/json','Content-Type': 'application/json' } }).then(res => {
        if(res.status==200&&res.data.msg=='success'){
          this.$message({
            message: '爬虫已删除',
            type: 'success'
          });
          const that = this
          setTimeout(function(){
            that.$router.go(0)},500);
        }
        else{
          this.$message.error('爬虫删除失败，请重试！');
        }
      })
    },
    detail(spiderForm) {
      this.dialogTitle = spiderForm.title
      // console.log(this.dialogTitle)
      this.spiderForm = JSON.parse(JSON.stringify(spiderForm.row))//先把对象转成字符串再转json对象以后再赋值给form表单的数据源
      // console.log(spiderForm)
      this.dialogVisible = true
      // console.log('现在', this.dialogVisible)
    },
    addSpider() {
      // console.log('表单源数据',this.tableData)
      this.spiderForm= {
      }
      this.dialogVisible = true
      this.dialogTitle = '添加爬虫'
      // console.log(this.tableData)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    addConfig() {
      // this.$router.push("/about");
      this.$router.push('/addConfig')
    }

  }
}
</script>
