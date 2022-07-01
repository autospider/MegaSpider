/* eslint-disable no-unused-vars */
function getInstanceByFormId(parentContext) {
  const { parent, props } = parentContext
  const { formId } = props
  if (Array.isArray(parent.$children)) {
    return parent.$children.find(instance => {
      return instance.$attrs['data-key'] === formId
    })
  }
}

export default {
  functional: true,
  props: {
    item: Object,
    index: Number,
    parentContext: Object
  },
  render(h, context) {
    const { item, index, parentContext } = context.props
    const { listeners } = parentContext
    const { model = {}, disabled } = parentContext.props
    const value = model[item.prop]

    // undefined 和 [undefined] 均为无效值
    const isValidValue = Array.isArray(value) ? !(value.length === 1 && value[0] === undefined) : value !== undefined

    const onInput = (val) => {
      const newModel = { ...model, [item.prop]: val }
      const parentInstance = {
        $current: getInstanceByFormId(parentContext),
        $parent: parentContext.parent,
        $index: index,
        model: newModel
      }
      listeners['model'] && listeners['model'](item.prop, val, parentInstance)
      listeners['update:model'] && listeners['update:model']({
        ...model,
        [item.prop]: val
      })
      listeners['on-change'] && listeners['on-change'](item.prop, val, parentInstance)
    }
    // value为无效值时，使用默认值
    if (!isValidValue) {
      onInput(Array.isArray(value) ? [] : item.defaultValue)
      return []
    }

    const _disabled = item.disabled || disabled
    const { attrs = {}, props = {}, on = {}, ...restData } = context.data
    const eleContext = {
      data: {
        attrs: attrs,
        props: { ...props, value, disabled: _disabled },
        on: { ...on, input: onInput },
        ...restData
      }
    }

    const vNodes = typeof (item.render) === 'function' ? [item.render(h, eleContext, parentContext.parent)] : []

    return vNodes
  }
}
