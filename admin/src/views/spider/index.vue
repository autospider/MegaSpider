
<template>
  <div>
    <div
      style="margin-left: 12px;
    margin-top: 10px;
    margin-bottom: 20px;"
    >

      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
          <span class="name">
            项目名称
          </span>
          <el-select v-model="projectName" placeholder="请选择" style="width: 120px">
            <el-option v-for="item in dataSource" :key="item.key" :label="item.taskName" :value="item.taskName" />
          </el-select>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          <el-button type="success" icon="el-icon-search" @click="">查询</el-button>
          <el-button type="success" icon="el-icon-refresh-right" @click="">重置</el-button>
        </div></el-col>
      </el-row>

    </div>

    <el-row>
      <el-col v-for="project in dataSource" :key="project.taskName" :span="8">
<!--        <el-card class="box-card" @click.native="jumpSpider(project)">-->
        <el-card class="box-card" @click.native="jumpSpider(project)">
          <div slot="header" class="clearfix" >
            <span>{{ project.taskName }}</span>
            <el-button style="float: right; padding: 3px 0;margin-right: 10px" icon="el-icon-delete" @click.stop="delProjectInfo(project.key)" />
            <!--            <el-button style="float: right; padding: 3px 0;margin-right: 10px" type="text" @click="delProjectInfo(project.key)">删除</el-button>-->
            <!--            <el-button style="float: right; padding: 3px 0;margin-right: 10px" type="text" @click="edit(project)">编辑</el-button>-->
            <el-button style="float: right; padding: 3px 0;margin-right: 10px" icon="el-icon-edit" @click.stop="edit(project)" />
          </div>
          <div class="text item">
            taskName：{{ project.taskName }}
          </div>
          <!--          <div class="text item">-->
          <!--            taskKey：{{ project.taskKey }}-->
          <!--          </div>-->
          <div class="text item">
            爬虫数量：{{ project.crawlerNo }}
          </div>
          <div class="text item">
            创建时间：{{ project.createTime }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" align="center">
          <!--          <el-button type="success" icon="el-icon-plus" circle @click="dialogVisible = true" />-->
          <el-button type="success" icon="el-icon-plus" circle @click="changeState()" />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :destroy-on-close="true" >
      <el-form ref="form" :model="form" label-width="100px" :label-position="labelPosition" :rules="rules">
        <el-form-item
          label="taskName"
          prop="taskName"
        >
         <!-- :rules="{
          required: true, message: '项目名不能为空', trigger: 'blur',validator: validateTaskName
          }"-->

          <el-input type="text" v-model="form.taskName" autocomplete="off" />
        </el-form-item>

        <el-form-item label="项目简介">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancle()">取 消</el-button>
        <!--        <el-button type="primary" @click="addProjectInfo()">确 定</el-button>-->
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { getTask } from '@/api/role'
export default {

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('taskName不能为空'));
      } else {
        // console.log(value)
        callback();
      }
    };
    return {
      // jump: true,
      rules: {
        taskName: [
          {validator: validatePass, trigger: 'blur' ,required: true}
        ],
      },
      innerTaskName: '',
      dialogTitle: '',
      dataSource: [],
      dialogVisible: false,
      form: {
        taskName: '',
        desc: ''},
      // 操作类型，0新增，1修改
      optType: 0,
      labelPosition: 'left',
      projectName: ''
    }
  },
  created() {
    this.getRoles()
    // this.getTask()
    // this.dataSource = rolesList
  },
  methods: {
    jumpSpider(data){
      console.log(data)
      // if (this.jump){
        this.$router.push({
        // name: '添加配置',
        // path: '/permission/page',
        // path: '/tinymce/spiderTest',
        // path: '/sign/index',
        // name: 'sign',
        path: '/tinymce/index',
        name: 'spiderIndex',
        params: data
      })
    // }

    },
    handleCancle(){
      // this.form = {}
      if (this.dialogTitle=='编辑' &&this.form.taskName===''){
        this.form.taskName=this.innerTaskName
      }
      // else {
      //   this.form = {}
      // }
      this.dialogVisible = false
      // this.jump = true
    },
    changeState() {
      this.form= {
        taskName: '',
          desc: ''}
      this.dialogVisible = true
      this.dialogTitle = '新增项目'
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.form.taskName)
          this.addProjectInfo()
          // this.jump = true
        } else {
          // console.log(this.form.taskName)
          // console.log(this.$refs)

          console.log('error submit!!')
          // this.jump = true
          return false
        }
      })
    },
    clearValid(){},
    async getRoles() {
      const res = await getTask()
      // const res = await getSpider()
      // console.log(res)
      this.dataSource = res.data
    },
    handleClose(done) {
      if (this.dialogTitle=='编辑'&&this.form.taskName.trim()===''){
        this.form.taskName=this.innerTaskName
      }
      // this.jump = true
      this.$confirm('确认关闭？')
      // if (this.dialogTitle=='编辑'&&this.form.taskName.trim()===''){
      //   this.form.taskName=this.innerTaskName
      // }

        .then(_ => {
          // console.log(this.from.taskName)
          done()
        })
        .catch(_ => { })

    },
    addProjectInfo() {
      // 新增
      // eslint-disable-next-line eqeqeq
      if (this.optType == 0) {
        // this.dialogTitle = '新增项目'
        this.form.key = this.dataSource.length + 1
        this.form.createTime = new Date().toLocaleDateString()
        this.dataSource.push(this.form)
        this.dialogVisible = false

        this.$notify({
          title: '创建项目成功',
          message: '创建项目成功',
          type: 'success',
          position: 'top-right'
        })
        this.form= {
          taskName: '',
            desc: ''}
      } else {
        this.dialogVisible = false
        this.$notify({
          title: '操作成功',
          message: '操作成功',
          type: 'success',
          position: 'top-right'
        })
        this.form = {}
        this.optType = 1
      }
    },
    delProjectInfo(key) {
      // this.jump = false
      let delPos = -1
      for (let i = 0; i < this.dataSource.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (key == this.dataSource[i].key) {
          delPos = i
          break
        }
      }
      this.dataSource.splice(delPos, 1)
      this.$notify({
        title: '删除项目成功',
        message: '删除项目成功',
        type: 'success',
        position: 'top-right'
      })

    // this.jump = true
    },
    edit(projectInfo) {
      // console.log(projectInfo)
      // this.jump=false
      this.optType = 1
      this.dialogTitle = '编辑'
      this.form = projectInfo
      this.innerTaskName = projectInfo.taskName
      this.dialogVisible = true

    }
  }
}
</script>
<style>
  .text {
    font-size: 14px;
  }
  .name {
    font-size: 14px;
  }

  .item {
    margin-bottom: 20px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 350px;
    margin: 10px;
  }
</style>
