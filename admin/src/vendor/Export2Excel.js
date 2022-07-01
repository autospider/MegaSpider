/* eslint-disable */
import { saveAs } from 'file-saver'
// xlsx-color 整合了xlsx 和 xlsx-style, 可以导出带有样式的excel
import XLSX from 'xlsx-color'

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

/**
 * @param {*} node $refs获取的节点 或 dom元素
 * @param {*} options 
 */
export function export_table_to_excel(node, options = {}) {
  const {
    headerStyle, // 表头样式
    cellStyle, // 单元格样式
    headerLength = 1, // 表头占1行
    autoWidth = true, // 自动宽度
    rowHeight = 30, // 表格行高
    filename = 'excel-list', // excel名称
    bookType = 'xlsx' // 格式
  } = options

  const ws_name = "SheetJS"
  const tableDOM = node.$el || node
  const wb = new Workbook(),
    ws = XLSX.utils.table_to_sheet(tableDOM, { raw: true })

  // A列的索引列表
  const ARows = []
  // 每列的数据集合，用于计算列宽
  const columnInfo = {}
  const isValidKey = (key) => !['!ref', '!merges', '!cols', '!rows'].includes(key)
  for (let key in ws) {
    if (isValidKey(key)) {
      const [prop, numStr, value] = [key.slice(0, 1), key.slice(1), ws[key].v]
      const index = Number(numStr)
      ARows.push(index)
      if (!columnInfo[prop]) columnInfo[prop] = []
      value && columnInfo[prop].push(value)
    }
  }
  // 最大行数
  const maxRows = Math.max(...ARows)
  // 有效列的名称列表
  const columns = Object.keys(columnInfo).filter(v => !!columnInfo[v].length)
  // 补充缺失的信息
  for (let i = 0; i < columns.length; i++) {
    for (let j = 1; j <= maxRows; j++) {
      const key = columns[i] + j
      if (!ws[key]) ws[key] = { t: "s", v: "" }
    }
  }

  // 设置每列的宽度
  if (autoWidth) {    
    const columnWidth = []
    const indexs = 'ABCDEFGHIJKLMNOPGRSTUVWXYZ'
    // 设置worksheet每列的最大宽度
    for (let key in columnInfo) {
      if (!columnInfo[key].length) continue
      const colWidths = columnInfo[key].map(val => val ? val.toString().length : 10)
      columnWidth[indexs.indexOf(key)] = { wch: Math.max(...colWidths) }
    }
    ws['!cols'] = columnWidth
  }
  
  // 设置每行的高度
  let _rowHeight = []

  for (let i = 1; i <= maxRows; i++) {
    _rowHeight.push({
      'hpx': rowHeight
    })
  }
  
  ws['!rows'] = _rowHeight

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name)
  wb.Sheets[ws_name] = ws

  /* add excel style */
  addExcelStyle(wb.Sheets[wb.SheetNames[0]], { headerLength, headerStyle, cellStyle })

  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'array'
  })

  saveAs(new Blob([wbout], {
    type: "application/octet-stream"
  }), `${filename}.${bookType}`)
}

export function export_json_to_excel({
  multiHeader = [],
  header,
  headerStyle, // 表头样式
  cellStyle, // 单元格样式
  data,
  merges = [],
  autoWidth = true, // 自动宽度
  rowHeight = 30, // 表格行高
  filename = 'excel-list', // excel名称
  bookType = 'xlsx' // 格式
} = {}) {
  /* original data */
  filename = filename || 'excel-list'
  data = [...data]
  data.unshift(header);

  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }

  const ws_name = "SheetJS";
  const wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = [];
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }

  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidths = data.map(row => row.map(val => {
      return {
        'wch': val ? val.toString().length : 10
      }
    }))
    /*以第一行为初始值*/
    let colWidth = colWidths[0];
    for (let i = 1; i < colWidths.length; i++) {
      for (let j = 0; j < colWidths[i].length; j++) {
        if (colWidth[j]['wch'] < colWidths[i][j]['wch']) {
          colWidth[j]['wch'] = colWidths[i][j]['wch'];
        }
      }
    }
    ws['!cols'] = colWidth
  }

  // 设置每行的高度
  let _rowHeight = []

  for (let i = 1; i <= data.length; i++) {
    _rowHeight.push({
      'hpx': rowHeight
    })
  }

  ws['!rows'] = _rowHeight

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name)
  wb.Sheets[ws_name] = ws

  /* add excel style */
  addExcelStyle(wb.Sheets[wb.SheetNames[0]], { data, header, headerStyle, cellStyle, multiHeader })

  const wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  })
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), `${filename}.${bookType}`)
}

// 添加excel样式
function addExcelStyle(dataInfo, params = {}) {
  const {
    header, 
    multiHeader,
    headerLength, // 表头所占的行数
    cellStyle = { // 单元格样式
      border: {
        top: {
          style: 'thin'
        },
        bottom: {
          style: 'thin'
        },
        left: {
          style: 'thin'
        },
        right: {
          style: 'thin'
        }
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center'
      },
      font: {
        name: '微软雅黑',
        sz: 12,
        bold: false
      }
    },
    headerStyle = {
      font: {
        name: '微软雅黑',
        sz: 13,
        bold: false
      },
      fill: {
        fgColor: {
          rgb: 'f0f0f0'
        }
      }
    }
  } = params
  // 表头所占的行数
  const _headerLength = headerLength !== undefined 
    ? headerLength 
      : header.length > 0 
        ? 1 + multiHeader.length 
          : multiHeader.length
  // 给所有单元格加上边框，内容居中，字体，字号，标题表头特殊格式部分后面替换
  for (const i in dataInfo) {
    if (!['!ref', '!merges', '!cols', '!rows'].includes(i)) {
      if (i.slice(1) > _headerLength) {
        dataInfo[i + ''].s = cellStyle
      } else {
        // 表头样式处理
        dataInfo[i + ''].s = {
          ...cellStyle,
          ...headerStyle
        }
      }
    }
  }
}
