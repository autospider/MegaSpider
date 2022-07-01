<template>
  <div>
    <h3>可自定义宽度，弹框内跳转地址，自定义标题颜色，控制自动隐藏，隐藏时间</h3>
    <el-button @click="showValue">点击试试</el-button>
    <!-- v-model = :value + @input -->
    <comPop v-model="value" :title-type="3" @click="hiddenCard">
      <template #title>
        Jay
      </template>
      <p>随便写点什么吧</p>
      <template #footer>
        来自聚凡
      </template>
    </comPop>
  </div>
</template>
<script>
import comPop from './com.vue'
export default {
  // 侧边弹框
  name: 'SidePopup',
  components: {
    comPop
  },
  data() {
    return {
      value: false
    }
  },
  methods: {
    showValue() {
      this.value = true
    },
    hiddenCard(val) {
      // 弹框内信息跳转
      console.log(val)
    },
    hiddenInput(val) {
      // 控制弹框的隐藏
      this.value = false
    }
  }
}
</script>
<style>
</style>
