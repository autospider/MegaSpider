export function renderError(h, err) {
  return h('pre', { style: { color: 'red' }}, err.stack)
}

export function filterObjectNullValue(obj) {
  return Object.keys(obj).reduce((t, v) => {
    return obj[v] !== null ? { ...t, [v]: obj[v] } : t
  }, {})
}

export function isValidValue(value) {
  return ['number', 'boolean'].includes(typeof (value)) ||
    (Array.isArray(value) && value.length > 0) ||
    !!value
}

export function getFormItemWidth(width, item, model) {
  const { render, prop, prop_width, disabled } = item
  if (render === 'image') {
    const value = model[prop]
    let imageNum = Array.isArray(value) ? value.length : value && value.indexOf(',') > -1 ? value.split(',').length : 1
    imageNum = disabled ? imageNum : imageNum + 1
    const imageWidth = 148
    return (imageNum * imageWidth) + (imageNum - 1) * 10
  }
  const dialogPadding = 20 * 4
  const formItemWidth = (parseInt(width) - dialogPadding) * prop_width
  if (prop_width) {
    return formItemWidth
  }
}

export function getDefaultValue(prop_type) {
  const mapPropType = {
    string: '',
    number: '',
    array: []
  }
  return mapPropType[prop_type]
}

export function getSubmitFields(content = [], model = {}) {
  return content.reduce((t, v) => v.is_submit ? { ...t, [v.prop]: model[v.prop] } : t, {})
}
