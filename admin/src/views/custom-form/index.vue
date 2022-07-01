<template>
  <div class="home app-container">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <custom-form
      ref="read"
      :layout="layout"
      :wrapper-col="wrapperCol"
      :content="content"
      :model.sync="model"
      :rules="rules"
      :disabled="false"
      label-width="80px"
      label-suffix=": "
      label-as-placeholder
      border
      @on-change="handleModelChange"
    >
      <el-button @click="onSubmit('read')">提交</el-button>
      <el-button @click="onReset('read')">重置</el-button>
    </custom-form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import CustomForm from '@/components/CustomForm'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    CustomForm
  },
  data() {
    // const h = this.$createElement
    this.content = [
      {
        label: '用户名',
        prop: 'username',
        defaultValue: 'nangongpo',
        valueWidth: '200px',
        render: (h, context) => {
          return <el-input {...context.data} placeholder=''/>
        }
      },
      {
        label: '密码',
        prop: 'password',
        defaultValue: '123',
        valueWidth: '200px',
        render: (h, context) => {
          return <el-input {...context.data} show-password />
        }
      },
      {
        label: '创建时间',
        prop: 'create_at',
        defaultValue: [],
        valueWidth: '360px',
        wrapperCol: {
          // xs: 24,
          // sm: 18,
          // md: 14,
          // lg: 9,
          // xl: 8
        },
        render: (h, context) => {
          return <el-date-picker
            {...context.data}
            type='datetimerange'
            range-separator='至'
            start-placeholder='开始日期'
            end-placeholder='结束日期'
          />
        }
      },
      {
        label: '课程',
        prop: 'subject',
        defaultValue: '',
        valueWidth: '200px',
        render: (h, context) => {
          const options = [
            { label: '科目1', value: '1' }
          ]
          const scopedSlots = {
            prefix: () => <span class='el-input__prefix'><i class='el-icon-edit'></i></span>,
            option: (item) => {
              return [
                h('span', { style: 'float: left' }, item.label),
                h('span', { style: 'float: right; color: #8492a6; font-size: 13px' }, item.value)
              ]
            }
          }
          return <el-select-option {...context.data} options={options} multiple={true} scopedSlots={scopedSlots} />
        }
      },
      {
        label: (h, context) => {
          const { attrs = {}} = context.data
          return <span>
            爱好{attrs['label-suffix']}
            <div style='color: red; font-size: 12px'>(必填)</div>
          </span>
        },
        prop: 'hobby',
        defaultValue: '',
        valueWidth: '500px',
        isBlock: true,
        render: (h, context) => {
          return <el-input {...context.data} type='textarea' rows={2} />
        }
      }
    ]
    this.rules = {
      username: [
        { required: true, message: '用户名必填' }
      ],
      hobby: [
        { required: true, message: '爱好必填' }
      ]
    }
    return {
      layout: {
        gutter: 0,
        type: 'flex',
        justify: 'start',
        align: 'middle'
      },
      wrapperCol: {
        // xs: 12,
        // sm: 9,
        // md: 7,
        // lg: 6,
        // xl: 4
      },
      model: {},
      input1: '123'
    }
  },
  methods: {
    handleModelChange(prop, value, config) {
      // this.$set(this.model, prop, value)
      // console.log(config)
    },
    onSubmit(formName) {
      console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.model)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onReset(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">

</style>
