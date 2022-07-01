<script>
/* eslint-disable no-unused-vars */

export default {
  name: 'ElUploadFile',
  props: {
    value: [String, Array, File],
    httpRequest: Function, // return promise
    disabled: Boolean,
    action: {
      type: String,
      default: '#'
    },
    multiple: Boolean,
    drag: {
      type: Boolean,
      default: true
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 1
    },
    placeholder: String,
    onPreview: Function,
    config: Object
  },
  data() {
    return {
      error: null
    }
  },
  methods: {
    handleUpload(file) {
      const { setValue, config, httpRequest } = this

      if (!httpRequest) {
        setValue(file)
        return
      }
      // 上传图片
      httpRequest(file, config).then(result => {
        setValue(file)
        this.error = null
      }).catch((error) => {
        this.error = error
      })
    },
    handleRemove(file) {
      const { value } = this
      const newValue = Array.isArray(value) ? value.filter(v => v.uid !== file.uid) : undefined
      this.$emit('input', newValue)
    },
    setValue(file) {
      const { value, limit } = this
      const newValue = limit > 1
        ? [value].filter(v => Boolean(v)).concat([file.file])
        : file.file
      this.$emit('input', newValue)
    }
  },
  render(h) {
    const { action, limit, multiple, drag, placeholder, handleUpload, handleRemove, onPreview } = this
    const showButton = !drag
    const data = {
      props: {
        action,
        multiple,
        drag,
        limit,
        httpRequest: handleUpload,
        onRemove: handleRemove,
        onPreview
      },
      class: { 'el-upload-file': true, 'drag': drag }
    }

    return <el-upload {...data}>
      {
        showButton
          ? <el-button size='small' type='primary'>点击上传</el-button>
          : <span>
            <i class='el-icon-upload'></i>
            <div class='el-upload__text'>将文件拖到此处，或<em>点击上传</em></div>
          </span>
      }
      <span class='el-upload__tip' slot='tip'>{placeholder}</span>
    </el-upload>
  }
}

</script>
<style lang="scss" scoped>
.el-upload-file {
  .el-upload__tip {
    padding-left: 4px;
  }
  &.drag {
    .el-upload__tip {
      display: block;
    }
  }
}
</style>
