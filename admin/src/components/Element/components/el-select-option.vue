<script>
/* eslint-disable no-unused-vars */
export default {
  functional: true,
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    multiple: Boolean,
    defaultProps: { // 映射关系对应键名称
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value',
          disabled: 'disabled'
        }
      }
    }
  },
  render(h, context) {
    const { data, props, listeners, children } = context
    const { options = [], multiple, defaultProps } = props

    const onMultiple = (isCheckAll) => {
      const newValue = isCheckAll ? options.map(v => v[defaultProps.value]) : []
      listeners.input && listeners.input(newValue)
    }
    const getOptionHeader = () => <li class='el-select-dropdown__header' key='option-header'>
      <el-button size='middle' type='text' icon='el-icon-check' onClick={() => onMultiple(true)}>全选</el-button>
      <el-button size='middle' type='text' icon='el-icon-close' onClick={() => onMultiple(false)}>全不选</el-button>
    </li>

    const scopedSlots = data.scopedSlots || {}
    const optionSlot = scopedSlots.option
    optionSlot && delete scopedSlots.option

    return <el-select { ...data} value-key={defaultProps.value} multiple={multiple}>
      { multiple && getOptionHeader() }
      {
        options.map((item, index) => {
          return <el-option
            key={index}
            label={item[defaultProps.label]}
            value={item[defaultProps.value]}
            disabled={item[defaultProps.disabled]}>
            { optionSlot && optionSlot({ label: item[defaultProps.label], value: item[defaultProps.value] })}
          </el-option>
        })
      }
      {
        Object.keys(scopedSlots).map(slotName => {
          return <template slot={slotName}>
            { scopedSlots[slotName] && scopedSlots[slotName]() }
          </template>
        })
      }
      { children }
    </el-select>
  }
}

</script>
<style lang="scss">
.el-select-dropdown {
  &.is-multiple {
    .el-select-dropdown__item {
      &.selected {
        &:after {
          border: 1px solid #fff;
        }
      }
    }
  }
  .el-select-dropdown__header {
    margin-top: -6px;
    padding: 0 20px;
  }
}
</style>
