/**
 * 生成圆形电子章
 * @param {object} options
 * @returns {base64}
 */
export function createCircularSeal(options = {}) {
  const {
    font = 'Helvetica',
    width = 250,
    height = 250,
    lineColor = '#000000',
    lineWidth = 7,
    lineGap = 4,
    starSize = 30,
    companySize = 30,
    nameSize = 30,
    company = '', // 部门名称
    name = '' // 测试专用章
  } = options
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')

  // 绘制印章边框
  const sealWidth = canvas.width / 2
  const sealHeight = canvas.height / 2
  context.lineWidth = lineWidth
  context.strokeStyle = lineColor
  context.beginPath()
  context.arc(sealWidth, sealHeight, sealWidth - context.lineWidth, 0, Math.PI * 2)
  context.stroke()

  // 画五角星
  create5star(context, sealWidth, sealHeight, starSize, lineColor, 0)

  // 绘制印章名称
  context.font = `${nameSize}px ${font}`
  context.textBaseline = 'middle'// 设置文本的垂直对齐方式
  context.textAlign = 'center' // 设置文本的水平对对齐方式
  context.lineWidth = 1
  context.fillStyle = lineColor
  context.fillText(name, sealWidth, sealHeight * 1.6)

  // 绘制印章单位
  context.translate(sealWidth, sealHeight) // 平移到此位置
  context.font = `${companySize}px ${font}`
  const count = company.length // 字数
  const angle = 4 * Math.PI / (3 * (count - 1)) // 字间角度
  const chars = company.split('')
  let c
  for (let i = 0; i < count; i++) {
    c = chars[i] // 需要绘制的字符
    if (i === 0) { context.rotate(5 * Math.PI / 6) } else { context.rotate(angle) }
    context.save()
    context.translate(90, 0) // 平移到此位置,此时字和x轴垂直
    context.rotate(Math.PI / 2) // 旋转90度,让字平行于x轴
    context.fillText(c, 0, lineGap) // 此点为字的中心点
    context.restore()
  }

  // 绘制五角星
  /**
   * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上
   * rotate:绕对称轴旋转rotate弧度
   */
  function create5star(context, sx, sy, radius, color, rotate) {
    context.save()
    context.fillStyle = color
    context.translate(sx, sy)// 移动坐标原点
    context.rotate(Math.PI + rotate)// 旋转
    context.beginPath()// 创建路径
    const dig = Math.PI / 5 * 4
    for (let i = 0; i < 5; i++) { // 画五角星的五条边
      const x = Math.sin(i * dig)
      const y = Math.cos(i * dig)
      context.lineTo(x * radius, y * radius)
    }
    context.closePath()
    context.stroke()
    context.fill()
    context.restore()
  }

  return canvas.toDataURL('image/png')
}
