import formComponent from 'element-ui/packages/form/src/form.vue'
const formProps = formComponent.props

export default formProps
export function getFormProps(props) {
  return Object.keys(formProps).reduce((t, v) => {
    return { ...t, [v]: props[v] }
  }, {})
}
