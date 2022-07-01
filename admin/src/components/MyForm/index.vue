<script>
/* eslint-disable no-unused-vars */
import { getMapTranslateOptions } from '@/utils/options'

import {
  renderError,
  filterObjectNullValue,
  isValidValue,
  getFormItemWidth,
  getDefaultValue,
  getSubmitFields
} from './utils'

export { getDefaultValue, getSubmitFields }

export default {
  functional: true,
  props: {
    width: {
      type: String,
      default: ''
    },
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    rules: {
      type: Object,
      default() {
        return {}
      }
    },
    labelAsPlaceholder: {
      type: Boolean,
      default: true
    }
  },
  render(h, context) {
    const { props, data, scopedSlots } = context
    const { width, fields, rules, labelAsPlaceholder } = props
    const model = data.attrs.model
    // 转义列表
    const translateOptions = getMapTranslateOptions()
    const getLabelByOptions = (prop, value, defaultValue = '-') => {
      const options = translateOptions[prop]
      if (!Array.isArray(options)) return value || defaultValue
      const getLabel = (arr, value) => {
        return arr.reduce((t, v) => {
          const hasValue = v.value === value
          if (hasValue) {
            return v.label
          }
          if (Array.isArray(v.children) && !!v.children.length) {
            return getLabel(v.children, value) || t
          }
          return t
        }, '')
      }

      return getLabel(options, value) || value || defaultValue
    }

    // 排序
    const newContent = fields.slice().sort((a, b) => a.order - b.order)
    const newRules = {}

    const formContent = newContent.reduce((acc, item, index) => {
      const { prop, label, render, null_value_display, display, prop_type, prop_width, label_width, required, editable, placeholder, order, ...restAttrs } = item
      // 显示的表单项
      const isDisplay = null_value_display ? display : isValidValue(model[prop])
      const hasRender = !!render
      if (isDisplay) {
        // 构造校验规则
        if (required) {
          const requiredRule = {
            type: prop_type,
            required,
            message: placeholder || `请填写${label}`
          }
          newRules[prop] = rules[prop] ? [requiredRule, rules[prop]] : [requiredRule]
        }
        const currentValue = hasRender ? model[prop] : getLabelByOptions(prop, model[prop])
        const newPlaceholder = placeholder || (labelAsPlaceholder ? label : placeholder)
        const elementAttrs = {
          config: item,
          prop,
          attrs: filterObjectNullValue({ placeholder: newPlaceholder, 'data-order': order, disabled: !editable, ...restAttrs })
        }
        const formItemStyle = { width: `${getFormItemWidth(width, item, model)}px` }
        const tmpNodes = <el-form-item
          prop={prop}
          label={label}
          key={index}
          class={{ [`el-form-item--${prop_width}`]: prop_width !== undefined }}
          style={formItemStyle}>
          {
            !hasRender
              ? currentValue
              : typeof (scopedSlots[render]) === 'function'
                ? scopedSlots[render](elementAttrs)
                : renderError(h, { stack: `${render} slot is undefined` })
          }
        </el-form-item>
        return [...acc, tmpNodes]
      }
      return acc
    }, [])

    return <el-form
      {...data}
      scopedSlots={{}}
      rules={newRules}
      validate-on-rule-change={false}>
      { formContent }
      { scopedSlots.default && scopedSlots.default(context) }
    </el-form>
  },
  renderError
}
</script>

<style lang="scss">
.el-form {
  .el-form-item--0, .el-form-item--1 {
    & > .el-form-item__content {
      width: 100%;
      text-align: left;
    }
  }
  // prop_width = 0
  .el-form-item--0 {
    .el-image {
      background: #f5f7fa;
      width: 148px;
      height: 148px;
      & + .el-image {
        margin-left: 10px;
      }
    }
  }
  // prop_width = 1
  .el-form-item--1 {
    width: 100%;
  }
}
</style>
