/* eslint-disable no-unused-vars */
const select = require('./select.json')
// const renderMap = {
//   'input': (h, context) => {
//     return <el-input {...context.data} />
//   },
//   'select': (h, context) => {
//     const options = []
//     return <el-select-option {...context.data} options={options} />
//   },
//   'cascader': (h, context) => {
//     const options = []
//     return <el-cascader {...context.data} options={options} show-all-levels={false}></el-cascader>
//   },
//   'datetimerange': (h, context) => {
//     return <el-date-picker
//       {...context.data}
//       type='datetimerange'
//       range-separator='至'
//       start-placeholder='开始日期'
//       end-placeholder='结束日期'
//       value-format='yyyy-MM-dd HH:mm:ss'
//       default-time={['00:00:00', '23:59:59']}
//     />
//   }
// }

function getFormData(data) {
  // const rule = null
  // 排序
  const orderData = data
  const formData = []
  for (let i = 0; i < orderData.length; i++) {
    const item = orderData[i]
    if (!item) continue
    formData.push(item)
  }
  return formData
}

// 构造formatValue, null_value_display
// 分离必填项的校验规则， { type: prop_type, required: true, message: placeholder }

export default {
  select: select
}

// [
//   {
//     label: '用户名',
//     prop: 'username',
//     defaultValue: 'nangongpo',
//     valueWidth: '200px',
//     render: (h, context) => {
//       return <el-input {...context.data} placeholder=''/>
//     }
//   },
//   {
//     label: '创建时间',
//     prop: 'create_at',
//     defaultValue: [],
//     valueWidth: '360px',
//     wrapperCol: {
//       // xs: 24,
//       // sm: 18,
//       // md: 14,
//       // lg: 9,
//       // xl: 8
//     },
//     render: (h, context) => {
//       return <el-date-picker
//         {...context.data}
//         type='datetimerange'
//         range-separator='至'
//         start-placeholder='开始日期'
//         end-placeholder='结束日期'
//       />
//     }
//   },
//   {
//     label: '课程',
//     prop: 'subject',
//     defaultValue: '',
//     valueWidth: '200px',
//     render: (h, context) => {
//       const options = [
//         { label: '科目1', value: '1' }
//       ]
//       const scopedSlots = {
//         prefix: () => <span class='el-input__prefix'><i class='el-icon-edit'></i></span>,
//         option: (item) => {
//           return [
//             h('span', { style: 'float: left' }, item.label),
//             h('span', { style: 'float: right; color: #8492a6; font-size: 13px' }, item.value)
//           ]
//         }
//       }
//       return <el-select-option {...context.data} options={options} multiple={true} scopedSlots={scopedSlots} />
//     }
//   }
// ]
