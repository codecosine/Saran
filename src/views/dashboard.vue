<template>
  <div>
    <el-container>
        <el-aside width="300px">
             <taskList></taskList>
        </el-aside>
        <el-main>
            <div class="content">
                <taskCard></taskCard>
            </div>
        </el-main>
    </el-container>
  </div>
</template>
<script>
import taskList from '../components/taskList.vue'
import taskCard from '../components/taskCard.vue'
export default {
    components: {
        taskList,
        taskCard,
    },
    created(){
        this.$store.dispatch('updateMessageList')
    }
}
</script>
<style lang="less" scoped>
.content{
    padding: 10px 10px 0px 40px;
    h1{
        color: #666;
    }
}

</style>
