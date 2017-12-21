import Vue from 'vue'
import store from './store'

import Router from 'vue-router'
import DashBoard from '@/views/dashboard'
import welcome from '@/views/welcome'
import userBoard from '@/views/userboard'
Vue.use(Router)

let option = {
  //mode: 'history',
  routes: [
    {
      path: '/',
      component: welcome,
      meta:{
        auth: 'all'
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: welcome,
      meta:{
        auth: 'all'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
      meta:{
        auth: 'member'
      }      
    },
    {
      path: '/userBoard',
      name: 'userBoard',
      component: userBoard,
      meta:{
        auth: 'member'
      }  
    }
  ],
}
let router = new Router(option)

router.beforeEach((to, from, next) => {
  console.log(from)
  // 第一次登录时，向服务器确认token
  if(from.name == null){
    console.log('第一次登录')
  }
  if(to.meta.auth == 'member'){
    var token = store.getters.token 
    if(token){
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
});
export default router
