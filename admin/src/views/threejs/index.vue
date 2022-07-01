<template>
  <el-row type="flex" :gutter="0" class="threejs-wrapper" />
</template>

<script>
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
// import Stats from 'three/examples/jsm/libs/stats.module'
import WebGL from 'three/examples/jsm/capabilities/WebGL'

// 兼容性检查
const checkWebGL = (dom, cb) => {
  if (WebGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    cb && cb()
  } else {
    const warning = WebGL.getWebGLErrorMessage()
    dom.appendChild(warning)
  }
}

export default {
  name: 'ThreeJS',
  components: {},
  data() {
    return {
      width: 0,
      height: 0
    }
  },
  created() { },
  mounted() {
    const dom = this.$el
    // 获取当前页面的宽高
    const domRect = dom.getBoundingClientRect()
    const width = domRect.width
    const height = window.innerHeight - domRect.top
    // 创建立方体
    const cubeDom = document.createElement('div')
    cubeDom.className = 'el-col el-col-12 cube'
    cubeDom.setAttribute('data-title', '立方体')
    this.createCube(cubeDom, { width, height }).animate()
    dom.appendChild(cubeDom)
    // 画线
    const lineDom = document.createElement('div')
    lineDom.className = 'el-col el-col-12 line'
    lineDom.setAttribute('data-title', '画线')
    this.drawingLine(lineDom, { width, height })
    dom.appendChild(lineDom)
    // 文字
    const textDom = document.createElement('div')
    textDom.className = 'el-col el-col-12 text'
    textDom.setAttribute('data-title', '文字: 点击变色')
    this.creatingText(textDom, { width, height, text: 'three.js' })
    dom.appendChild(textDom)
  },
  methods: {
    createCube(dom, options = {}) {
      if (!dom) return
      const { width, height } = options
      // 创建场景
      const scene = new THREE.Scene()
      // 使用透视摄像机, 参数说明(视野角度, 长宽比, 近截面, 远截面)
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      // 创建一个渲染器, 设置渲染尺寸
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      dom.appendChild(renderer.domElement)
      // 创建一个立方体
      const geometry = new THREE.BoxGeometry()
      // 使用MeshBasicMaterial材质, 设置材质颜色
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      // 绘制网格, 添加到场景中
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)
      // 当我们调用scene.add()的时候，物体将会被添加到(0,0,0)坐标。但将使得摄像机和立方体彼此在一起。为了防止这种情况的发生，我们只需要将摄像机稍微向外移动一些即可
      camera.position.z = 5
      // 添加动画
      const animate = () => {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        // 渲染
        renderer.render(scene, camera)
      }

      return { animate: () => checkWebGL(dom, animate) }
    },
    drawingLine(dom, options = {}) {
      if (!dom) return
      const { width, height } = options
      // 创建场景
      const scene = new THREE.Scene()
      // 使用透视摄像机, 参数说明(视野角度, 长宽比, 近截面, 远截面)
      const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000)
      camera.position.set(0, 0, 100)
      camera.lookAt(0, 0, 0)
      // 创建一个渲染器, 设置渲染尺寸
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      dom.appendChild(renderer.domElement)
      // 使用LineBasicMaterial材质, 设置材质颜色
      const material = new THREE.LineBasicMaterial({ color: '#ffffff' })
      // 构造带有一些顶点的几何体
      const points = []
      points.push(new THREE.Vector3(-10, 0, 0))
      points.push(new THREE.Vector3(0, 10, 0))
      points.push(new THREE.Vector3(10, 0, 0))

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      // 绘制直线, 添加到场景中
      const line = new THREE.Line(geometry, material)
      scene.add(line)
      // 渲染
      renderer.clear()
      renderer.render(scene, camera)
    },
    creatingText(dom, options = {}) {
      if (!dom) return
      const { width, height, text } = options
      const fontPath = '/fonts/Roboto_Regular.json'
      const robotoRegularPath = process.env.NODE_ENV === 'production'
        ? `static${fontPath}`
        : fontPath
      const color = '#ffffff'

      // 创建场景
      const scene = new THREE.Scene()
      // 使用透视摄像机, 参数说明(视野角度, 长宽比, 近截面, 远截面)
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.set(0, 0, 1000)

      // 放置灯光
      const pointLight = new THREE.PointLight(color, 1)
      pointLight.position.set(0, 100, 100)
      scene.add(pointLight)

      // 使用MeshBasicMaterial材质, 设置材质颜色
      const material = new THREE.MeshPhongMaterial({ color, flatShading: false })

      const loader = new FontLoader()
      // 字体转换地址： https://gero3.github.io/facetype.js/
      loader.load(robotoRegularPath, function(font) {
        const textGeo = new TextGeometry(text, {
          font: font,
          size: 80,
          height: 5,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 8,
          bevelSegments: 5
          /*
            这里只定义了最基本的参数
            还有其他的参数
            font: THREE.Font的实例
            size: Float, 字体大小, 默认值为100
            height: Float, 挤出文本的厚度。默认值为50
            curveSegments: Integer, (表示文本的)曲线上点的数量，默认值为12
            bevelEnabled: Boolean, 是否开启斜角，默认为false
            bevelThickness: Float, 文本上斜角的深度，默认值为20
            bevelSize: Float, 斜角与原始文本轮廓之间的延伸距离, 默认值为8
            bevelSegments: Integer, 斜角的分段数, 默认值为3
            */
        })

        textGeo.computeBoundingBox()
        const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)

        const textMesh = new THREE.Mesh(textGeo, material)

        textMesh.position.x = centerOffset
        scene.add(textMesh)

        // 添加事件
        dom.style.touchAction = 'none'
        dom.addEventListener('pointerdown', onPointerDown)

        // 创建一个渲染器, 设置渲染尺寸
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(width, height)
        dom.appendChild(renderer.domElement)

        // 渲染
        renderer.render(scene, camera)

        function onPointerDown(event) {
          if (event.isPrimary === false) return
          scene.remove(pointLight)
          pointLight.color.setHSL(Math.random(), 1, 0.8)
          scene.add(pointLight)
          renderer.render(scene, camera)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.threejs-wrapper {
  width: 100%;
  height: 500px;
  flex-wrap: wrap;
  .el-col {
    position: relative;
    color: #fff;
    border: 1px solid #ffffff;
    box-sizing: border-box;
    canvas {
      width: 100% !important;
      height: 100% !important;
    }
    &:before {
      content: attr(data-title);
      position: absolute;
      top: 10px;
      left: 10px;
      font-weight: 700;
    }
    &:hover {
      color: #008dfc;
    }
  }
}

</style>
