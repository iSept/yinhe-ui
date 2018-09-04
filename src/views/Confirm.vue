<template>
  <div class="Index">
    <h2>Vue Confirm弹框组件</h2>
    <button @click="handleConfirm">组件方式</button>
    <button @click="handleDialogConfirm">插件方式</button>
    <confirm
      :value="confirm.value"
      confirmStyle="1"
      :title="confirm.title"
      :title-image="confirm.titleImage"
      :title-image-style="confirm.titleImageStyle"
      :content="confirm.content"
      :confirm-text="confirm.confirmText"
      :cancel-text="confirm.cancelText"
      :confirm-button-position="confirm.confirmButtonPosition"
      :show-confirm-button="confirm.showConfirmButton"
      :show-cancel-button="confirm.showCancelButton"
      :close-on-confirm="confirm.closeOnConfirm"
      :hideOnBlur="confirm.hideOnBlur"
      :maskTransition="confirm.maskTransition"
      :dialogTransition="confirm.dialogTransition"
      :maskZIndex="confirm.maskZIndex"
      :dialogStyle="confirm.dialogStyle"
      @on-show="onShow"
      @on-hide="onHide"
    ></confirm>
  </div>
</template>

<script>
import Confirm from '../components/confirm/src/index'

export default {
  name: 'Index',
  components: {
    Confirm
  },
  data() {
    return {
      confirm: {
        value: false, // 是否显示
        confirmStyle: 2, // 确认框风格，可取值1,2，默认1
        title: '提示', // 标题，confirmStyle为2生效
        // titleImage: require('../assets/logo.png'), // 头部图片，confirmStyle为1失效
        titleImageStyle: { width: '80px', height: '80px' }, // 头部图片样式，confirmStyle为1失效
        content: '这里是确认弹框的主体内容，可以按需要自由填写...', // 弹框内容
        confirmText: '确定', // 确定按钮文案
        cancelText: '取消', // 取消按钮文案
        confirmButtonPosition: 'right', // 确认按钮位置，默认'right'，取值：left,right会显示2个按钮，center只会显示一个按钮
        showConfirmButton: true, // 是否显示确定按钮，默认true
        showCancelButton: true, // 是否显示取消按钮，默认true, 确认按钮位置为center时失效
        closeOnConfirm: true, // 是否在点击确认按钮时自动关闭确认框，默认true
        hideOnBlur: true, // 是否在点击遮罩时自动关闭弹窗，默认true
        maskTransition: 'yinhe-mask', // 遮罩动画，默认'yinhe-mask'
        dialogTransition: 'yinhe-dialog', // 弹窗主体动画，默认'yinhe-dialog'
        dialogClass: 'yinheui-dialog', // 弹框主体class
        dialogStyle: {maxWidth: '280px'}, // 弹框主体样式
        maskZIndex: 1000 // 遮罩层 z-index 值,默认1000
      }
    }
  },
  mounted() {
  },
  methods: {
    handleConfirm() {
      this.confirm.value = true
    },
    handleDialogConfirm() {
      this.$yinhe.confirm.show({
        ...this.confirm,
        onShow() {
          console.log('dialog-show')
        },
        onHide() {
          console.log('dialog-hide')
        },
        onConfirm() {
          console.log('dialog-confirm')
        },
        onCancel() {
          console.log('dialog-cancel')
        }
      })
    },
    onShow() {
      console.log('confirm-show')
    },
    onHide() {
      this.confirm.value = false
      console.log('confirm-hide')
    }
  }
}
</script>

<style scoped>

</style>
