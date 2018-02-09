import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import index from '@/components/index'
import addItem from '@/components/addItem'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/addItem',
      name: 'addItem',
      component: addItem
    },
  ]
})
