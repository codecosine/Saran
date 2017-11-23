import Vue from 'vue'
import Router from 'vue-router'
import DashBoard from '@/views/dashboard'
import welcome from '@/views/welcome'
import userBoard from '@/views/userboard'
Vue.use(Router)

let option = {
  mode: 'history',
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
  if(to.meta.auth == 'member'){
    //vm = to.router.app.$root
    console.log(router.app.$root.test)
    next()
    // console.log(router.app)
    // var token = router.app.$store.getters.token
    // console.log(token)
    // if(token){
    //   next()
    // } else {
    //   next(new Error('你没有权限进入此页面'))        
    // }
  } else {
    next()
  }
});
export default router
