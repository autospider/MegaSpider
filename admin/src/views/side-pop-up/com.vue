<template>
  <div
    class="side-popup"
    :style="{ width: `${width}px` }"
    :class="{ leave: !showPushCard,hidden: !isStarted }"
  >
    <div class="popup_title normal" :class="`title-custom-${titleType}`">
      <span class="popup_title_text">
        <slot name="title" />
      </span>
      <img
        class="popup_title_icon"
        src="https://img1.dxycdn.com/2022/0107/052/1476059175561025253-7.png"
        alt=""
        @click.stop="handleClose"
      >
    </div>
    <div
      v-show="showCard"
      :url="url"
      class="popup"
      :style="{ width: `${width}px` }"
      @click="(parmas) => $emit('click', parmas)"
    >
      <div class="popup_content">
        <slot />
      </div>
      <div class="popup_footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 侧边弹框
  name: 'SidePopup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '250'
    },
    handleClick: {
      type: Function,
      default: () => {}
    },
    // 跳转地址
    url: {
      type: String,
      default: ''
    },
    // 1:蓝色 2: 红色，3：金色
    titleType: {
      type: Number,
      default: 1,
      validator: function(value) {
        return [1, 2, 3].indexOf(value) !== -1
      }
    },
    // 自动隐藏
    autoHidden: {
      type: Boolean,
      default: true
    },
    // 多少毫秒后隐藏
    delay: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      showCard: this.value,
      // 记录是否出现过状态，避免初始化时自动执行一次隐藏动画
      isStarted: false
    }
  },
  computed: {
    showPushCard: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    showPushCard(val) {
      if (val) {
        this.showCard = val
        this.isStarted = val
        if (this.autoHidden) {
          // 自动隐藏
          setTimeout(() => {
            this.$emit('input', false)
          }, this.delay)
        }
      } else {
        setTimeout(() => {
          // 动画执行完再隐藏元素
          this.showCard = val
        }, 500)
      }
    }
  },
  methods: {
    handleClose() {
      this.showPushCard = false
    }
  }
}
</script>
<style lang="scss" scoped>
.side-popup {
  position: fixed;
  right: -300px;
  bottom: 150px;
  animation: rightShow 0.5s ease-in-out forwards;
  z-index: 2000;
  &.leave {
    right: 15px;
    animation-name: rightHidden;
  }
  &.hidden {
    display: none;
  }
  .popup {
    background:#fff;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    z-index: 2000;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }
  .popup_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 8px;
    height: 25px;
    line-height: 25px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    // 下方叠一层白色，防止主题色透明度太低时，直接看到title后边的内容
    background: #fff;
    .popup_text {
      font-size: 12px;
      color: var(--themeColor);
    }
    .popup_title_icon {
      padding: 7px;
      width: 25px;
      cursor: pointer;
    }
  }
  .title-custom-1 {
    background: linear-gradient(115.33deg, #e7e6ff 23.77%, #d0c4ff 91.65%, #d2c5ff 91.65%);
    .popup_title_text {
      color: #7e5aff;
    }
  }
  .title-custom-2 {
    background: linear-gradient(115.33deg, #fff5ef 23.77%, #ffe8d7 91.65%);
    .popup_title_text {
      color: #ff6c37;
    }
  }
  .title-custom-3 {
    background: linear-gradient(90deg, #f1d09c 0%, #fee8c2 100%);
    .popup_title_text {
      color: #7d4317;
    }
  }
  .popup_content {
    padding: 10px 12px 12px;
  }
  .popup_footer {
    text-align: right;
    font-size: 12px;
    padding: 0 6px 6px 0;
  }
}
// mobile
// 右边出现
@keyframes rightShow {
  100% {
    right: 10px;
  }
}
// 右边隐藏
@keyframes rightHidden {
  100% {
    right: -300px;
  }
}
</style>
