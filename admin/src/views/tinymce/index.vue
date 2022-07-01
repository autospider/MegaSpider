<template>
  <div v-show="!loading" class="app-container">
    <editor
      v-model="agreement"
      :tinymce-script-src="tinymceSrc"
      :init="editConfig"
      @onInit="onInit"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
const getFileUrl = (url) => url ? process.env.VUE_APP_BASE_API + url : ''
const getFileName = (url) => url ? url.split('/').pop().split('.')[0] : ''

export default {
  name: 'Tinymce',
  components: { Editor },
  data() {
    const self = this
    this.editConfig = {
      height: window.innerHeight - 130,
      language: 'zh_CN',
      fullpage_default_encoding: 'UTF-8',
      fullpage_default_langcode: 'zh',
      branding: false,
      elementpath: false,
      statusbar: true,
      menubar: true,
      contextmenu: false,
      browser_spellcheck: true,
      powerpaste_word_import: 'propmt', // 参数可以是propmt, merge, clear，效果自行切换对比
      powerpaste_html_import: 'propmt', // propmt, merge, clear
      powerpaste_allow_local_images: true,
      paste_data_images: true,
      nonbreaking_force_tab: true,
      target_list: false,
      convert_urls: false,
      default_link_target: '_blank',
      fontsize_formats: '14px 16px 18px 20px 24px 26px 28px 30px 32px 36px',
      font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times',
      file_picker_types: 'file',
      plugins: [
        'save nonbreaking fullpage code formatpainter',
        'hr advlist autolink lists link image imagetools charmap print preview anchor',
        'searchreplace visualblocks fullscreen',
        'insertdatetime table powerpaste help wordcount'
      ],
      toolbar: 'save link image showfile | removeformat formatpainter | undo redo | formatselect | fontselect | fontsizeselect | bold italic forecolor backcolor | indent | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
      file_picker_callback: function(callback, value, meta) {
        const fileType = '.pdf'
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', fileType)
        input.click()
        input.onchange = async function() {
          const file = this.files[0]
          console.log(file)
          const result = await self.handleUpload(file)
          if (result.ok) {
            const filename = getFileName(file.name)
            if (meta.filetype === 'file') {
              callback(getFileUrl(result.data), { title: filename, text: filename })
            }
          // if (meta.filetype === 'image') {
          //   callback(result.data, { alt: filename })
          // }
          // if (meta.filetype === 'media') {
          //   callback(url, { source2: '', poster: '' })
          // }
          }
        }
      },
      images_upload_handler: async function(blobInfo, success, failure) {
        const result = await self.handleUpload(blobInfo.blob())
        if (result.ok) {
          success(getFileUrl(result.data))
        } else {
          failure(result.msg)
        }
      },
      save_onsavecallback: self.handleSave,
      setup: function(editor) {
        editor.ui.registry.addIcon('showfile', '<svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296z"/><path d="M440 852H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"/><path d="M885.7 903.5l-93.3-93.3C814.7 780.7 828 743.9 828 704c0-97.2-78.8-176-176-176s-176 78.8-176 176 78.8 176 176 176c35.8 0 69-10.7 96.8-29l94.7 94.7c1.6 1.6 3.6 2.3 5.6 2.3s4.1-.8 5.6-2.3l31-31c3.1-3.1 3.1-8.1 0-11.2zM652 816c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"/></svg>')
        editor.ui.registry.addButton('showfile', {
          title: '查看已上传的文件链接',
          icon: 'showfile',
          tooltip: '查看已上传的文件链接',
          onAction: self.handleHistoryLinks
        })
      }
    }
    return {
      loading: true,
      agreement: ''
    }
  },
  computed: {
    tinymceSrc() {
      const defaultSrc = '/tinymce/tinymce.min.js'
      return process.env.NODE_ENV === 'production'
        ? `static${defaultSrc}`
        : defaultSrc
    }
  },
  beforeRouteLeave(to, from, next) {
    this.loading = true
    setTimeout(() => {
      next()
    }, 0)
  },
  methods: {
    onInit(a) {
      this.agreement = '123'
      this.loading = false
    },
    async handleSave() {
      // this.loading = true
      // const result = await axiosPost({ method, content: { state: 'update', conf_content: this.agreement }})
      // this.loading = false
      // if (result.ok) {
      //   this.$message.success('保存成功')
      // }
    },
    // 已上传的文件链接
    handleHistoryLinks() {
    },
    // 上传文件
    handleUpload(file) {
      // const formData = new FormData()
      // formData.append('method', method)
      // formData.append('state', 'upload')
      // formData.append('file', file)
      // return axiosPost(formData)
    }
  }
}
</script>
