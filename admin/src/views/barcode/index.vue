<template>
  <div class="barcode-wrapper app-container">
    <div ref="barcode" class="barcode-area">
      <img v-if="barcode" :src="barcode">
      <div class="barcode-error">
        {{ errMsg }}
        <div>
          <el-link v-show="errMsg" type="primary" href="https://github.com/lindell/JsBarcode/wiki#barcodes">
            点我查看：条形码类型 format 参数的说明
          </el-link>
        </div>
      </div>
    </div>
    <!-- 条码内容 -->
    <el-input v-model="text" class="barcode-text" />
    <!-- 参数选项 -->
    <el-divider>参数选项</el-divider>
    <el-form :model="options" inline>
      <el-form-item label="format" prop="format">
        <el-select v-model="options.format">
          <el-option v-for="item in formatOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="width" prop="width">
        <el-input-number v-model="options.width" />
      </el-form-item>
      <el-form-item label="height" prop="height">
        <el-input-number v-model="options.height" />
      </el-form-item>
      <el-form-item label="font" prop="font">
        <el-input v-model="options.font" />
      </el-form-item>
      <el-form-item label="fontSize" prop="fontSize">
        <el-input-number v-model="options.fontSize" />
      </el-form-item>
      <el-form-item label="fontOptions" prop="fontOptions">
        <el-select v-model="options.fontOptions" clearable>
          <el-option v-for="item in fontOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="textAlign" prop="textAlign">
        <el-select v-model="options.textAlign" clearable>
          <el-option v-for="item in textAlignOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="textPosition" prop="textPosition">
        <el-select v-model="options.textPosition" clearable>
          <el-option v-for="item in textPositionOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="textMargin" prop="textMargin">
        <el-input-number v-model="options.textMargin" />
      </el-form-item>
      <el-form-item label="background" prop="background">
        <el-color-picker v-model="options.background" />
      </el-form-item>
      <el-form-item label="lineColor" prop="lineColor">
        <el-color-picker v-model="options.lineColor" />
      </el-form-item>
      <el-form-item label="marginTop" prop="marginTop">
        <el-input-number v-model="options.marginTop" />
      </el-form-item>
      <el-form-item label="marginRight" prop="marginRight">
        <el-input-number v-model="options.marginRight" />
      </el-form-item>
      <el-form-item label="marginBottom" prop="marginBottom">
        <el-input-number v-model="options.marginBottom" />
      </el-form-item>
      <el-form-item label="marginLeft" prop="marginLeft">
        <el-input-number v-model="options.marginLeft" />
      </el-form-item>
      <el-form-item label="flat（format为EAN8、EAN13时有效）" prop="flat">
        <el-switch
          v-model="options.flat"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode2'
export default {
  name: 'Barcode',
  data() {
    return {
      barcode: null,
      text: '12345678901231',
      errMsg: '',
      options: {
        format: 'CODE128',
        width: 2,
        height: 100,
        displayValue: true,
        // text: '测试',
        fontOptions: 'bold italic', // 字体类型 bold、italic
        font: 'fantasy',
        textAlign: 'center', // left、center、right
        textPosition: 'bottom', // bottom、top
        textMargin: 25,
        fontSize: 40,
        background: '#ccffff',
        lineColor: '#990000',
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        flat: false, // Only for EAN8/EAN13
        valid: (valid) => { // 验证参数text是否有效
          if (!valid) {
            this.errMsg = '条形码生成失败，请检查条形码内容是否符合format参数的要求'
            this.barcode = null
          } else {
            this.errMsg = null
          }
        }
      },
      formatOptions: ['CODE128', 'CODE39', 'EAN13', 'EAN8', 'EAN5', 'EAN2', 'UPC', 'ITF14', 'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110', 'pharmacode', 'codabar'],
      fontOptions: ['bold', 'italic', 'bold italic'],
      textAlignOptions: ['left', 'center', 'right'],
      textPositionOptions: ['bottom', 'top']
    }
  },
  watch: {
    text(newVal) {
      const { createBarcode, options } = this
      this.barcode = createBarcode(newVal, options)
    },
    options: {
      handler(newVal) {
        const { createBarcode, text } = this
        this.barcode = createBarcode(text, newVal)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    createBarcode(text, options) {
      const canvas = document.createElement('canvas')
      JsBarcode(canvas, text, options)
      return canvas.toDataURL('image/png')
    }
  }
}
</script>
<style lang="scss" scoped>
.barcode-wrapper {
  .barcode-area {
    border: 1px solid #000;
    min-height: 120px;
    position: relative;
  }
  .barcode-text {
    line-height: 80px;
  }
  .barcode-error {
    position: absolute;
    top: 50%;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    margin-top: -10px;
    color: #f00;
  }
}
</style>
