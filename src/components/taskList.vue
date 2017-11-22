<template>
  <div class="wrapper-main">
      <el-dialog title="新建活动"  width="40%" :visible.sync="addFormVisible">
        <el-form :model="addForm">
            <el-form-item label="名称" label-width="80px">
                <el-input v-model="addForm.title" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确定添加</el-button>
        </div>
    </el-dialog>
    <div class="filterBox">
            <el-checkbox-group v-model="messageFilter" size="mini">
                <el-checkbox-button v-for="(item,index) in messageList" 
                    :label="item.label" 
                    :key="index">
                </el-checkbox-button>
            </el-checkbox-group>
            <div class="dropBox">
                <el-dropdown trigger="click" @command="dropClick">
                <span class="add-dropdown-link">
                    <i class="el-icon-plus el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">
                        新建活动
                    </el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
            
    </div>
    <div class="search">
        <el-input
            placeholder="search..."
            size="small"
            v-model="searchinput">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
    </div>
    <div class="sidebar-list">
        <div class="ember-view">
            <ul class="task-list">
                <li class="task" @click="selectMessage(index)"
                    v-for="(item,index) in filterlist" :key="index">
                    <div class="task-card pass">
                        <h2>
                            <a>
                                <span>{{ item.title }}</span>
                            </a>
                            <span class="tag">#{{item.id}}</span>
                        </h2>
                        <p><i class="el-icon-view"></i>{{ item.poster }}</p>
                        <p><i class="el-icon-time"></i>{{ item.createdAt }}</p>
                    </div>
                </li>
            </ul>  
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
      return {
          addFormVisible: false,
          searchinput: '',
          addForm:{
              title:''
          },
          messageFilter:[],
          messageList:[{
                label:'待确认'
            },{
                label:'进行中'
            },{
                label:'已完成'
            }],
      }
  },
  computed:{
      filterlist(){
          return this.$store.getters.messageList
                   .filter(ele=>{
                       return ele.title.includes(this.searchinput) 
                   })
        //       //|| (ele.id + "").includes(this.searchinput)
        //   });
      },
  },
  methods:{
      add(){
        if(!this.addForm.title){
            this.$message({
                message: '添加失败,请输入名称',
                type: 'error'
            });
            this.addFormVisible = false
            return
        }
        let message = {
            title: this.addForm.title,
            status: '待确认',
            poster: this.$store.getters.name,
        }
        this.$store.dispatch('addMessage',message).then(res=>{
            if(res.data.code == 0){
                this.addFormVisible = false
                this.$message({
                    message: '添加成功',
                    type: 'success'
                })
                this.$store.dispatch('updateMessageList')
            } else {
                this.$message({
                    message: res.data.msg,
                    type: 'info'
                });
            }
        })
        
      },
      selectMessage(index){
          this.$store.dispatch('selectMessage',index)
      },
      dropClick(){
          console.log('dropClick')
          this.addFormVisible = true
      }
  }
}
</script>

<style lang="less" scoped>

i{
    padding-right: 4px;
}
.wrapper-main{
    background-color:#fff;
    border-right: #dfe4ed solid 2px;
    overflow: visible;
    min-height: 80vh;
}
.filterBox{
    position: relative;
    padding: 15px 10px 0px 15px;
    .dropBox{
        position: absolute;
        right: 20px;
        top:20px;
    }
    .add-dropdown-link{
        font-size: 1em;
        cursor: pointer;
        color: #333;
        padding-left: 5px;
        padding-top: 5px;
        //line-height: 50px;
        &:hover{
            color:#399faa;
        }
    }
}
.search{
    padding: 10px 15px;
}
.sidebar-list{
    background-color:#dfe4ed;
    
    .task-list{
        .task{
            cursor: pointer;
            .task-card{
                height: 100px;
                padding: 5px 0px 10px 25px;
            }
            h2{
                width: 80%;
                font-size: 14px;
                position: relative;
                padding-bottom: 6px;
                a{
                    &:hover{
                        text-decoration: underline;
                    }
                    color: #39aa56;
                }
                .tag{
                    color: #666;
                    font-size: 15px;
                    //margin-left: 5px;
                    right: 0;
                    position: absolute;
                }
                white-space: nowrap;
                overflow: hidden;
            }
            font-size: 14px;
            background-color: #fff;
            margin-bottom: 5px;
        }
    }
}
</style>

