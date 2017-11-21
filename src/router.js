import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/views/dashboard'
import addTask from '@/views/addTask'
import welcome from '@/views/welcome'

Vue.use(Router)

export default new Router({
  mode: 'history',  
  routes: [
    {
      path: '/',
      component: welcome,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: welcome,
    },
    {
      path: '/index',
      name: 'index',
      component: DashBoard
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard
    },
    {
      path: '/addTask',
      name: 'addTask',
      component: addTask
    }
  ]
})
