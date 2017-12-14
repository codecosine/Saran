<template>
  <div id="app">
      <c-header></c-header>
      <router-view></router-view>
      <c-footer></c-footer>
  </div>
</template>

<script>
import './styles/main.less'
import cHeader from './components/cHeader'
import cFooter from './components/cFooter'
export default {
  name: 'app',
  components:{
    cHeader,
    cFooter,
  }
}
</script>
