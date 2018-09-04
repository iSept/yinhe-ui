// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as VXUI from './components/index'

Vue.use(VXUI.ConfirmPlugin) // 1、插件形式
// Vue.component('confirm', VXUI.Confirm) // 2、全局组件形式

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
