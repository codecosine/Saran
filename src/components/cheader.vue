<template>
    <header :class="{'navbar-color-welcome': isWecome, 'navbar-color-main': !isWecome}" class="main-header navbar">
      <div class="container">
        <nav class="nav-main">
            <ul class="nav navbar-nav">
              <li v-for="(item,index) in routesList" :key="index"
                :class="{ active: routePath == item.path}"> 
                <a :href="item.path">{{item.name}}</a>
              </li>
              <li class="pull-right">
                <el-dropdown v-if="isLogined" trigger="click" @command="logout">
                  <span class="item-logined">
                    {{username}}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>安全退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
      
              <li class="pull-right" v-if="!isLogined"><a href="javascript:void(0)" @click="isloginModalShow=true">登录</a></li>
            </ul>
              
        </nav>
      </div>
      <c-login :loginModalShow="isloginModalShow" @onchange="modalChange"></c-login>
    </header>
</template>
<script>

import cLogin from './cLogin'
import Login from '../api/login'
export default {
    components:{
      cLogin,
    },
    data(){
      return {
        isloginModalShow:false,
        routesList:[{
          path:'/#/welcome',
          name:'Saran社团管理系统'
        },
        {
          path:'/#/dashboard',
          name:'活动工作台'
        },
        {
          path:'/#/userBoard',
          name:'成员信息'
        },
        {
          path:'/#/userBoard',
          name:'物资信息'
        }
        ]
      }
    },
    methods:{
      modalChange(res){
        this.isloginModalShow = res;
      },
      logout(){
        console.log('logout')
        Login.logout().then(res=>{
          if(res.data.code == 0){
            this.$message({
                message: res.data.msg,
                type: 'success'
            });
            this.$store.dispatch('logout')
            this.$router.push({ path:'/'})
          }
        })
      }
    },
    computed:{
      routePath(){
        return this.$route.path
      },
      isLogined(){
        return this.$store.getters.token
      },
      username(){
        return this.$store.getters.name
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
.nav-main{
  :after{
        display:block;
        clear:both;
        height:0;
        content: "";
        visibility: hidden;
        overflow:hidden;
    }
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
   float: right !important;
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
.item-logined{
  padding: 12px 10px;
  line-height: 22px;
  position: relative;
  display: block;
  cursor: pointer;
  &:hover {
     color: #399faa;
  }
  &:focus{
    border: none;
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
