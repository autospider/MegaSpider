<script>
import './style.scss'

export default {
  functional: true,
  props: {
    title: String,
    type: String, // success / info / warning / error
    message: String,
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    }
  },
  render(h, context) {
    const { data, props, listeners } = context
    const { title, type, message, confirmButtonText, cancelButtonText, showConfirmButton, showCancelButton } = props

    const setEmitter = (name, e) => {
      if (listeners[name]) return listeners[name](e)
      listeners['update:visible'] && listeners['update:visible'](false)
    }

    return <el-dialog
      { ...data }
      width='300px'
      top='0'
      center={true}
      round-button={true}
      show-close={false}
      close-on-click-modal={false}
      close-on-press-escape={false}
      class='modal-dialog'>
      {
        type && <div class='modal-icon'>
          <i class={`el-icon-${type}`} />
        </div>
      }
      { title && <h2 class='modal-title'>{title}</h2> }
      <p class='modal-description'>
        { message }
      </p>
      <div class='modal-options'>
        {
          showConfirmButton && <el-button type='success' data-text={confirmButtonText} plain round class='el-button--left' onClick={(e) => setEmitter('confirm', e)} />
        }
        {
          showCancelButton && <el-button type='danger' data-text={cancelButtonText} plain round class='el-button--right' onClick={(e) => setEmitter('cancel', e)} />
        }
      </div>
    </el-dialog>
  }
}
</script>
