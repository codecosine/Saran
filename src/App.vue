<template>
  <div id="app">
    <el-container>
      <el-header class="navbar navbar-color-fixed" style="height:55px">
            <nav class="clear">
              <ul class="nav navbar-nav">
                <li v-for="(item,index) in routesList" :key="index"
                  :class="{ active: routePath == item.path}"> 
                  <a :href="item.path">{{item.name}}</a>
                </li>
              </ul>
            </nav>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import './styles/main.less'
export default {
  name: 'app',
  data(){
    return {
      routesList:[{
        path:'/welcome',
        name:'朝岚日语~'
      },
      {
        path:'/dashboard',
        name:'活动信息'
      },
      {
        path:'/materials',
        name:'社团物资'
      },
      {
        path:'/userBoard',
        name:'社团成员'
      }
      ]
    }
  },
  computed:{
    routePath(){
      return this.$route.path;
    }

  }
}
</script>
