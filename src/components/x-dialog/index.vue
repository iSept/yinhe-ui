<template>
  <div class="yinheui-x-dialog">
    <transition :name="maskTransition">
      <div class="yinheui-mask" @click="hide" v-show="show" :style="maskStyle"></div>
    </transition>
    <transition :name="dialogTransition">
      <div :class="dialogClass" v-show="show" :style="dialogStyle" >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
// import preventBodyScrollMixin from '../../mixins/prevent-body-scroll'

export default {
  // mixins: [preventBodyScrollMixin],
  name: 'x-dialog',
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'yinhe-mask'
    },
    maskZIndex: [String, Number],
    dialogTransition: {
      type: String,
      default: 'yinhe-dialog'
    },
    dialogClass: {
      type: String,
      default: 'yinhe-dialog'
    },
    dialogStyle: {
      type: Object
    },
    hideOnBlur: {
      type: Boolean
    }
  },
  computed: {
    maskStyle() {
      if (typeof this.maskZIndex !== 'undefined') {
        return {
          zIndex: this.maskZIndex
        }
      }
      return ''
    }
  },
  methods: {
    hide() {
      if (this.hideOnBlur) {
        this.$emit('change', false)
      }
    }
  },
  watch: {
    show(val) {
      this.$emit(val ? 'on-show' : 'on-hide')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../styles/transition.less';
  @import '../../styles/yinheui/modules/yinhe_tips/yinhe_mask';
  @import '../../styles/yinheui/modules/yinhe_tips/yinhe_dialog';
</style>
