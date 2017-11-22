<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="状态" name="first">
            <div>
              <section class="current-box pass">
                <div class="box-info">
                  <h2 class="passed">任务执行完成</h2>
                  <div>
                    <ul class="box-info-list">
                      <li><span><i class="el-icon-info"></i>ID:</span>18825</li>
                      <li><span><i class="el-icon-document"></i>算法:</span>IDE3</li>
                    </ul>
                  </div>
                </div>
                <div class="box-result">
                  <h3>状态<el-tag style="margin-left:10px" size="mini">进行中</el-tag>
                  </h3>
                  <div>
                    <ul class="box-info-list">
                      <li><span><i class="el-icon-time"></i>启动时间:</span>2017-11-9 23:46:53</li>
                    </ul>
                  </div>
                </div>
       
              </section>
            </div>
            
        </el-tab-pane>
        <el-tab-pane label="内容信息" name="second">
          <quill-editor v-model="content"
                          ref="myQuillEditor"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)">
            </quill-editor>
        </el-tab-pane>
        <el-tab-pane label="附件" name="third">

        </el-tab-pane>
        <el-tab-pane label="历史记录" name="four">

        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import Quill from 'quill'
  // import { someModule } from '../yourModulePath/someQuillModule.js'
  // Quill.register('modules/someModule', someModule)
  import { quillEditor } from 'vue-quill-editor'

  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        content: '<h2>I am Example</h2>',
        editorOption: {
          // some quill options
        },
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
    }
  };
</script>
<style lang="less" scoped>
.current-box{
  display: flex;
  justify-content: space-between;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  padding: 10px 20px 10px 0px;
  font-size: 16px;
  color: #666;
  .box-info{
    flex: 0 1 35%;
    padding-left: 2.2rem;
    font-size: 16px;
    overflow: hidden;
    position: relative;
    h2{
      font-size: 16px;
    }
  }
  .box-result{
    flex: 0 1 37%;
    font-size: 15px;
    padding-left: 2rem;
  }
  .box-tools{
    flex: 0 0 10rem;
    padding: 1rem 0;
    overflow: auto;
    
  }
  .tool-btn{
      border: #eaeaea solid 1px;
      padding: 3px 8px 3px 8px;
      border-radius: 10px;
      &:hover{
        color: #3eaaaf;
        cursor: pointer;
        border: #3eaaaf solid 1px;
      }
    }
  .box-info-list{
    font-size: 14px;
    li{
      padding-bottom: 13px;
      span{
        padding-right: 5px;
      }
    }
  }
  
}
</style>
