<template>
  <footer>
      <div :class="{'footer-color-welcome': isWecome}" class="main-footer footer-fixed text-muted footer-container">
        <ul class="bd-footer-links">
          <li><a href="https://github.com/codecosine/Saran">@朝岚日语研究社</a></li>
          <li><a href="https://github.com/codecosine/Saran">GitHub</a></li>
          <li><a href="https://github.com/codecosine/Saran">使用简要</a></li>
        </ul>
        <p>Designed by Cosine, Power by Element + vue + express</p>
        <p>Currently v1.0.0-beta. Code licensed <a href="https://github.com/codecosine/Saran/master/LICENSE" target="_blank" rel="license noopener">MIT</a>, docs <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="license noopener"></a></p>
      </div>
  </footer>
</template>
<script>
export default {
  computed:{
      isWecome(){
        return this.$route.path == '/welcome' || this.$route.path == '/'
      }
    }
}
</script>

<style lang="less">
.footer-fixed{
    position: absolute;
    bottom: 0;
    z-index: 900;
}
.footer-color-welcome{
    background: rgba(0,0,0,.4);
}
.main-footer{
    //background-color: #fff;
    padding: 15px 0px 5px 0px;
    width: 100%;
    text-align: center;
    margin-bottom: 0;
    font-size: 0.7em;
    margin: 0 auto;
    p {
        margin-bottom: 0;
    }
    //padding: 1rem!important;
    .bd-footer-links {
        padding-left: 0;
        margin-bottom: 1rem;
        
        li {
            display: inline-block;
        }
        li+li{
            margin-left: 1rem;
        }
        
    }
}
</style>
