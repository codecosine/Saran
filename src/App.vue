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
    <el-footer class="bd-footer text-muted">
        <div class="bd-footer-container">
          <ul class="bd-footer-links">
            <li><a href="https://github.com/codecosine/Saran">@朝岚日语社团应用</a></li>
            <li><a href="https://github.com/codecosine/Saran">GitHub</a></li>
            <li><a href="https://github.com/codecosine/Saran">使用简要</a></li>
          </ul>
          <p>技术支持:Element + vue + express</p>
          <p>Currently v1.0.0-beta. Code licensed <a href="https://github.com/codecosine/Saran/master/LICENSE" target="_blank" rel="license noopener">MIT</a>, docs <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="license noopener"></a>.</p>
        </div>
    </el-footer>
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
