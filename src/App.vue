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
              <ul class="nav navbar-nav" style="float:right">
                <li><a>{{name}}</a></li>
              </ul>
            </nav>
      </el-header>
      <div style="background-color:#fff; height:82vh">
        <router-view></router-view>
      </div>
      <div class="bd-footer text-muted footer-container">
        <ul class="bd-footer-links">
          <li><a href="https://github.com/codecosine/Saran">@朝岚日语社团管理平台</a></li>
          <li><a href="https://github.com/codecosine/Saran">GitHub</a></li>
          <li><a href="https://github.com/codecosine/Saran">使用简要</a></li>
        </ul>
        <p>Designed by Cosine, Power by Element + vue + express</p>
        <p>Currently v1.0.0-beta. Code licensed <a href="https://github.com/codecosine/Saran/master/LICENSE" target="_blank" rel="license noopener">MIT</a>, docs <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="license noopener"></a></p>
      </div>
    </el-container>
  </div>
</template>

<script>
import './styles/main.less'
export default {
  name: 'app',
  data(){
    return {
      test:'test',
      routesList:[{
        path:'/welcome',
        name:'@朝岚日语研究社'
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
      return this.$route.path;
    },
    name(){
      return this.$store.getters.name
    },
    token(){
      return this.$store.getters.token
    }
  },
  methods:{
    getUserToken(){
      return this.$store.getters.token
    }
  }
}
</script>
