<template>
    <header :class="{ welcomeStyleNav: isWecome }" class="main-header navbar navbar-color-fixed">
      <div class="container">
        <nav>
            <ul class="nav navbar-nav">
              <li v-for="(item,index) in routesList" :key="index"
                :class="{ active: routePath == item.path}"> 
                <a :href="item.path">{{item.name}}</a>
              </li>
            </ul>
            <ul class="nav navbar-nav pull-right">
              <li><a href="/">{{username}}</a></li>
            </ul>
        </nav>
      </div>
    </header>
</template>
<script>
export default {
    data(){
      return {
        isWecome:true,
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
    computed:{
      routePath(){
        return this.$router.path
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
.navbar-color-fixed {
    top: 0;
    z-index: 999;
    background: rgba(0,0,0,.4);
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

.welcomeStyleNav{
  a {
    color: #bfbfbf;
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
