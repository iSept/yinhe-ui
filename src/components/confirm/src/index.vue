<template>
  <div class="yinheui-confirm">
    <x-dialog
      v-model="showValue"
      :mask-transition="maskTransition"
      :dialog-transition="dialogTransition"
      :hide-on-blur="hideOnBlur"
      :mask-z-index="maskZIndex"
      :dialog-class="dialogClass"
      :dialog-style="dialogStyle"
      @on-hide="$emit('on-hide')"
      @on-show="$emit('on-show')"
    >
    <div :class="{'yinhe-dialog-two': dialogTwoModel}">
      <div class="yinhe-dialog__hd">
        <strong class="yinhe-dialog__title" v-if="dialogTwoModel">{{ title }}</strong>
        <img :src="titleImage" :style="titleImageStyle" alt="" v-else>
      </div>
      <div class="yinhe-dialog__bd">
        <slot><div v-html="content"></div></slot>
      </div>
      <div class="yinhe-dialog__ft" :class="{center: confirmBtnCenter}">
        <a href="javascript:;" class="yinhe-dialog__btn" :class="`yinhe-dialog__btn_${item.btnType}`"
          v-for="(item, index) in buttonTypeMap" :key="index" v-if="item.show"
          @click="_handleBtnClick(item.type)">
          {{item.text}}
        </a>
      </div>
    </div>
    </x-dialog>
  </div>
</template>

<script>
import XDialog from '../../x-dialog/index'
import hdImage from './hd-img.png'

export default {
  name: 'confirm',
  components: {
    XDialog
  },
  props: {
    value: {
      type: Boolean
    },
    confirmStyle: {
      type: [String, Number],
      default: 1
    },
    title: {
      type: String
    },
    titleImage: {
      type: String,
      default: hdImage
    },
    titleImageStyle: {
      type: Object
    },
    content: {
      type: String
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmButtonPosition: {
      type: String,
      default: 'right'
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    hideOnBlur: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'yinhe-mask'
    },
    dialogTransition: {
      type: String,
      default: 'yinhe-dialog'
    },
    dialogClass: {
      type: String,
      default: 'yinheui-dialog'
    },
    dialogStyle: {
      type: Object
    },
    maskZIndex: {
      type: [Number, String]
    }
  },
  data() {
    return {
      showValue: false
    }
  },
  computed: {
    buttonTypeMap() {
      const buttonObj = []
      const confirmButtonObj = {
        type: 'confirm',
        show: this.showConfirmButton,
        text: this.confirmText,
        btnType: ''
      }
      const cancelButtonObj = {
        type: 'cancel',
        show: this.showCancelButton,
        text: this.cancelText,
        btnType: ''
      }
      const defaultBtnType = 'default'
      const paimaryBtnType = 'primary'
      const confirmBtnObj = { ...confirmButtonObj }
      const cancelBtnObj = { ...cancelButtonObj }
      switch (this.confirmButtonPosition) {
        case 'left':
          confirmBtnObj.btnType = defaultBtnType
          cancelBtnObj.btnType = paimaryBtnType
          buttonObj.push(confirmBtnObj, cancelBtnObj)
          break
        case 'center':
          confirmBtnObj.btnType = paimaryBtnType
          buttonObj.push(confirmBtnObj)
          break
        default:
          cancelBtnObj.btnType = defaultBtnType
          confirmBtnObj.btnType = paimaryBtnType
          buttonObj.push(cancelBtnObj, confirmBtnObj)
      }
      return buttonObj
    },
    confirmBtnCenter() {
      return this.confirmButtonPosition === 'center'
    },
    dialogTwoModel() {
      return this.confirmStyle === 2
    }
  },
  created() {
    if (typeof this.value !== 'undefined') {
      this.showValue = this.value
    }
  },
  methods: {
    _onHide() {
      this.showValue = false
    },
    _handleBtnClick(eventType) {
      if (eventType === 'confirm') {
        this._onConfirm()
      } else {
        this._onCancel()
      }
    },
    _onConfirm() {
      if (!this.showValue) {
        return
      }
      if (this.closeOnConfirm) {
        this.showValue = false
      }
      this.$emit('on-confirm')
    },
    _onCancel() {
      if (!this.showValue) {
        return
      }
      this.showValue = false
      this.$emit('on-cancel')
    }
  },
  watch: {
    value(val) {
      this.showValue = val
    },
    showValue(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
  // @import '../../../styles/transition.less';
  // @import '../../../styles/yinheui/modules/yinhe_tips/yinhe_mask';
  @import '../../../styles/yinheui/modules/yinhe_tips/yinhe_dialog';
</style>
