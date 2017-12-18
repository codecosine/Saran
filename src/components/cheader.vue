<template>
    <header :class="{'navbar-color-welcome': isWecome, 'navbar-color-main': !isWecome}" class="main-header navbar">
      <div class="container">
        <nav>
            <ul class="nav navbar-nav">
              <li v-for="(item,index) in routesList" :key="index"
                :class="{ active: routePath == item.path}"> 
                <a :href="item.path">{{item.name}}</a>
              </li>
            </ul>
            <ul class="nav navbar-nav pull-right">
              <li v-if="isLogined"><a href="/">{{username}}</a></li>
              <li v-if="!isLogined"><a href="javascript:void(0)" @click="isloginModalShow=true">登录</a></li>
            </ul>
        </nav>
      </div>
      <c-login :loginModalShow="isloginModalShow" @onchange="modalChange"></c-login>
    </header>
</template>
<script>

import cLogin from './cLogin'
export default {
    components:{
      cLogin,
    },
    data(){
      return {
        isLogined:false,
        isloginModalShow:false,
        username:'登录',
        routesList:[{
          path:'/welcome',
          name:'Saran社团管理系统'
        },
        {
          path:'/dashboard',
          name:'活动信息'
        },
        {
          path:'/userBoard',
          name:'社团管理'
        }
        ]
      }
    },
    methods:{
      modalChange(res){
        this.isloginModalShow = res;
      }
    },
    computed:{
      routePath(){
        return this.$route.path
      },
      isWecome(){
        return this.$route.path == '/welcome' || this.$route.path == '/'
      }
    }
}
</script>
<style lang="less" scoped>
.main-header .container{
    padding:0 20px;
    max-width: 960px;
    margin: auto;
}

.navbar {
    font-family: "Avenir Next",Avenir,"Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 600;
    font-size: 14px;
    position: relative;
    min-height: 50px;
    margin-bottom: 20px;
    border: 1px solid transparent;
}
.navbar-color-welcome{
    top: 0;
    z-index: 900;
    background: rgba(0,0,0,.4);
    a {
      color: #bfbfbf;
    }
}
.navbar-color-main{
    top: 0;
    z-index: 900;
    background:  #fff !important;
    box-shadow: 0 4px 8px 0 rgba(7,17,27,.1);
}
.pull-right {
   float: right;
}
.nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    >li {
      position: relative;
      display: block;
    }
}


.navbar-nav li{
    a:focus,a:hover {
      color: #399faa;
    }
    
}
.navbar-nav {
    margin: 0;
    >li {
        float: left;
    }
}
.navbar-nav>li>a {
    padding: 15px 10px;
    line-height: 20px;
    position: relative;
    display: block;
}

.navbar:after, .navbar:before {
    content: " ";
    display: table;
}
</style>
