<template>
  <my-form
    ref="read"
    :fields="fields"
    :model="model"
    :rules="rules"
    label-as-placeholder
    inline
    class="app-container"
  >
    <template #input="{ prop, attrs }">
      <el-input
        v-model="model[prop]"
        v-bind="attrs"
      />
    </template>
    <template #select="{ prop, attrs }">
      <el-select-option
        v-model="model[prop]"
        :options="allOptions[prop]"
        v-bind="attrs"
      />
    </template>
    <template #cascader="{ prop, attrs }">
      <el-cascader
        v-model="model[prop]"
        v-bind="attrs"
      />
    </template>
    <template #datetimerange="{ prop }">
      <el-date-picker
        v-model="model[prop]"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
      />
    </template>
    <template #image="{ prop, attrs, config }">
      <el-upload-image
        v-model="model[prop]"
        v-bind="attrs"
        :config="config"
        :on-preview="onPreview"
        :http-request="httpRequest"
      />
      <el-image v-if="!!previewInfo.src" ref="preview" v-bind="previewInfo" style="display: none" />
    </template>
    <template #file="{ prop, attrs, config }">
      <el-upload-file
        v-model="model[prop]"
        v-bind="attrs"
        :config="config"
        :on-preview="onPreview"
      />
      <!-- 文件预览 -->
    </template>
    <template #default>
      <el-button type="primary" @click="onSubmit('read')">提交</el-button>
      <el-button @click="onReset('read')">重置</el-button>
    </template>
  </my-form>
</template>

<script>
import allConfig from './data'
import MyForm from '@/components/MyForm'
export default {
  components: { MyForm },
  data() {
    return {
      fields: allConfig.select,
      model: {
        state: 'select',
        images: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      rules: {
        car_number: { pattern: '^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})|([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$', message: '车牌号格式不正确' }
      },
      allOptions: {
        car_color: [
          { label: '黄牌', value: '01' }
        ]
      },
      previewInfo: {}
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
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
    },
    onPreview(image, config) {
      const imageStr = this.model[config.prop] || ''
      this.previewInfo = {
        src: image,
        previewSrcList: imageStr.split(',')
      }
      if (this.$refs.preview) {
        this.$refs.preview.showViewer = true
      }
    },
    httpRequest(file, config) {
      // console.log(file, config)
      return new Promise((resolve, reject) => {
        const randomNum = Math.floor((Math.random() * 4))
        // console.log(randomNum)
        const result = ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg' + `?t=${new Date().getTime()}`, 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg' + `?t=${new Date().getTime()}`, ''][randomNum]
        result ? resolve(result) : reject(new Error('请求失败'))
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.wrapper { display: block; }
</style>
