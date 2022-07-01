/* eslint-disable vue/require-default-prop */
<script>

export default {
  name: 'ElUploadImage',
  props: {
    value: String,
    httpRequest: Function, // return promise
    getImage: Function, // 构造图片链接
    disabled: Boolean,
    drag: Boolean,
    action: {
      type: String,
      default: '#'
    },
    limit: Number,
    onRemove: Function,
    onPreview: Function,
    config: Object
  },
  data() {
    return {
      cacheImages: this.getImages(this.value),
      showUpload: !this.disabled
    }
  },
  computed: {
    images: {
      get: function() {
        const { value, getImages, cacheImages } = this
        const hasError = cacheImages.length > 0 && cacheImages.some(v => Boolean(v.error))
        return hasError ? cacheImages : getImages(value)
      },
      set: function() {}
    }
  },
  methods: {
    handleUpload(file) {
      const { limit, images, getImages, setValue, config, httpRequest, setCacheImages } = this
      const cacheImages = images
      if (!httpRequest) return
      // 限制个数
      if (images.length >= limit) return
      // 更新视图数据
      const setViewData = (result, error = '图片上传失败') => {
        const image = getImages(result)[0] || { src: null, value: null, error }
        // 检查是否重复
        const isRepeat = images.length > 0 && images.some(v => v.value === image.value)
        if (isRepeat) return
        if (!image.error) {
        // 替换无效的图片， value = null
          const replaceIndex = cacheImages.reduce((t, v, i) => v.value === null ? i : t, images.length)
          images.splice(replaceIndex, 1, image)
          setValue(images)
        } else {
          cacheImages.push(image)
        }
        setCacheImages(cacheImages)
      }
      // 上传图片
      httpRequest(file, config).then(result => {
        setViewData(result)
      }).catch((err) => {
        setViewData(null, err.message)
      })
    },
    handleImageEvent(action, image, event) {
      const { images, onRemove, config, setCacheImages, setValue } = this
      const currentSrc = image.src

      if (action === 'onError') {
        const cacheImages = images.reduce((t, v) => {
          return v.src === currentSrc ? [...t, { ...v, src: null, value: null, error: '图片地址无效' }] : [...t, v]
        }, [])
        setCacheImages(cacheImages)
        return
      }

      if (action === 'onRemove') {
        if (onRemove) return onRemove(currentSrc, config)
        const newImages = images.filter(v => v.src !== currentSrc)
        setValue(newImages)
        return
      }

      if (action === 'onReUpload') {
        this.$refs.upload && this.$refs.upload.$el.firstChild.click()
        return
      }

      this[action] && this[action](currentSrc, config)
    },
    createImage(image) {
      const { disabled, handleImageEvent } = this
      const { src, error } = image
      if (error) {
        return <span class='el-upload-list__item-thumbnail image-error'>
          <span class='image-error-text'>
            { image.error }
            {
              !disabled && <el-link type='primary' onClick={() => handleImageEvent('onReUpload', image)}>重新上传</el-link>
            }
          </span>
        </span>
      }
      return !!src && <img
        src={src}
        class='el-upload-list__item-thumbnail'
        onerror={(e) => handleImageEvent('onError', image, e)}/>
    },
    createImageAction(image) {
      const { disabled, handleImageEvent } = this
      const { src } = image
      return !!src && <span class='el-upload-list__item-actions'>
        <span class='el-upload-list__item-preview' onClick={() => handleImageEvent('onPreview', image)}>
          <i class='el-icon-zoom-in'></i>
        </span>
        {
          !disabled && <span class='el-upload-list__item-delete' onClick={() => handleImageEvent('onRemove', image)}>
            <i class='el-icon-delete'></i>
          </span>
        }
      </span>
    },
    getImages(value) {
      const { getImage } = this
      const images = value ? value.split(',').map(v => {
        return { value: v, src: getImage ? getImage(v) : v, error: '' }
      }) : []
      return images
    },
    setCacheImages(cacheImages) {
      const { disabled } = this
      this.cacheImages = cacheImages
      this.showUpload = !disabled && cacheImages.length > 0 && cacheImages.every(v => !v.error)
    },
    setValue(newImages) {
      const newValue = newImages.reduce((t, v) => v.value ? [...t, v.value] : t, []).join(',')
      this.$emit('input', newValue)
    }
  },
  render(h) {
    const { images, showUpload, action, drag, limit, createImage, createImageAction, handleUpload } = this

    return <div class='el-upload-image'>
      <div vShow={!showUpload && !images.length}>-</div>
      <div class='el-upload-list--picture-card'>
        {
          images.map((image, index, arr) => {
            return <div key={index} class={{ 'el-upload-list__item': true, 'gutter': arr.length === index + 1 && !showUpload }}>
              { createImage(image) }
              { createImageAction(image) }
            </div>
          })
        }
        {
          <el-upload
            ref='upload'
            props={{
              action,
              drag,
              limit,
              listType: 'picture-card',
              accept: '.jpg,.jpeg',
              showFileList: false,
              httpRequest: handleUpload
            }}
            class={{ 'el-upload-wrapper': true, 'el-upload-list__item': true, gutter: true, hidden: !showUpload }}>
            <i class='el-icon-plus'></i>
          </el-upload>
        }
      </div>
    </div>
  }
}

</script>
<style lang="scss" scoped>
.image-error {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background: #F5F7FA;
  color: #C0C4CC;
  vertical-align: middle;
}
.image-error-text {
  text-align: center;
  .el-link {
    display: flex;
  }
}
.el-upload-wrapper {
  border: none;
  &.hidden {
    display: none;
    margin: 0;
  }
  .el-upload  {
    width: inherit;
    height: inherit;
  }
}
.el-upload-list__item {
  &.gutter {
    margin: 0 0 8px 0;
  }
}
::v-deep .el-upload-dragger {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: inherit;
}

</style>
