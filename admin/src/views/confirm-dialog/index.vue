<template>
  <div>
    <confirm-modal
      :visible.sync="dialogVisible"
      type="info"
      title="确认信息"
      message="检测到未保存的内容，是否在离开页面前保存修改？"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
    <el-button type="danger" @click="dialogVisible = true">
      打开弹窗
    </el-button>
  </div>
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal'

export default {
  components: { ConfirmModal },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleConfirm(e) {
      console.log(e)
      this.dialogVisible = false
    },
    handleCancel(e) {
      console.log(e)
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';

.modal-dialog {
  margin: auto;
  display: flex;
  align-items: center;
  .el-dialog {
    padding: 16px;
    color: #fff;
    background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%);
    border-radius: 12px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
    animation: show-modal 0.5s ease forwards;
    .el-dialog__header, .el-dialog__footer {
      display: none;
    }
    .el-dialog__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1em;
      color: inherit;
    }
    .modal-icon {
      font-size: 64px;
      text-align: center;
      color: #ffffff;
      margin-bottom: 1.25rem;
      opacity: 0;
      animation: show-modal-icon 0.5s ease 0.2s forwards;
    }

    .modal-title {
      margin-top: 0;
      margin-bottom: 1.2rem;
      opacity: 0;
      animation: show-modal-text 0.5s ease 0.35s forwards;
    }

    .modal-description {
      margin: 0;
      opacity: 0;
      animation: show-modal-text 1s ease 0.5s forwards;
    }

    .modal-options {
      margin-top: 1rem;
      display: flex;
      justify-content: space-around;

      .el-button {
        padding: 0 1.5em;
        margin: 0.3em;
        font-size: 18px;
        font-weight: 700;
        line-height: 2;
        background-color: #fff;
        transition: 0.25s;
        &.is-plain {
          border: none;
          overflow: hidden;
          &:before {
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            transition: 0.4s cubic-bezier(0.75, 0, 0.25, 1);
          }
          &:after {
            position: relative;
            content: attr(data-text);
            transition: 0.4s ease;
          }
          &:hover {
            &:before {
              transform: translateX(0);
            }
          }
        }

        &--left {
          &:before {
            transform: translateX(100%);
          }
        }

        &--right {
          &:before {
            transform: translateX(-100%);
          }
        }

        &--success {
          opacity: 0;
          animation: show-modal-option 0.5s ease 0.65s forwards;
          &:before {
            background: $green;
          }
        }

        &--danger {
          opacity: 0;
          animation: show-modal-option 0.5s ease 0.8s forwards;

          &::before {
            background: $red;
          }
        }
      }
    }
  }
}

@keyframes show-modal {
  from {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes show-modal-icon {
  from {
    transform: scale(0.4);
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes show-modal-text {
  from {
    transform: scale(0.6);
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes show-modal-option {
  from {
    transform: scale(0.4);
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
