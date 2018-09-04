import Vue from 'vue'
import Router from 'vue-router'
import Confirm from '@/views/Confirm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/confirm'
    },
    {
      path: '/confirm',
      name: 'Confirm',
      component: Confirm
    }
  ]
})
