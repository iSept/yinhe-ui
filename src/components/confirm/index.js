import ConfirmComponent from './src/index'
import * as utils from '../../libs/plugin_utils'

let $vm

const plugin = {
  install(Vue, options = {}) {
    const Confirm = Vue.extend(ConfirmComponent)

    if (!$vm) {
      $vm = new Confirm({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const confirm = {
      show(options) {
        if (typeof options === 'object') {
          utils.mergeOptions($vm, options)
        }
        if (typeof options === 'object' && (options.onShow || options.onHide)) {
          options.onShow && options.onShow()
        }
        $vm.$off('on-cancel')
        $vm.$off('on-confirm')
        $vm.$off('on-hide')

        $vm.$on('on-cancel', () => {
          options && options.onCancel && options.onCancel()
        })

        $vm.$on('on-confirm', () => {
          options && options.onConfirm && options.onConfirm()
        })

        $vm.$on('on-hide', () => {
          options && options.onHide && options.onHide()
        })

        $vm.showValue = true
      }
    }

    if (!Vue.$yinhe) {
      Vue.$yinhe = {
        confirm
      }
    } else {
      Vue.$yinhe.confirm = confirm
    }

    Vue.mixin({
      created() {
        this.$yinhe = Vue.$yinhe
      }
    })
  }
}

export default plugin
