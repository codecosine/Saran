<template>
  <div>
    <h2>{{ message.title }}</h2>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="状态" name="first">
            <div>
              <section class="current-box pass">
                <div class="box-info">
                  <h2 class="passed"></h2>
                  <div>
                    <ul class="box-info-list">
                      <li><span>ID:</span>{{ message.id }}</li>
                    </ul>
                  </div>
                </div>
                <div class="box-result">
                  <h4>状态<el-tag style="margin-left:10px" size="mini">{{message.status}}</el-tag>
                  </h4>
                  <div>
                    <ul class="box-info-list">
                      <li><span><i class="el-icon-time"></i>创建时间:</span>{{message.createdAt}}</li>
                      <li><span><i class="el-icon-time"></i>更新时间:</span>{{message.updatedAt}}</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
            
        </el-tab-pane>
        <el-tab-pane label="内容信息" name="second">
            <quill-editor v-model="content"
                          ref="myQuillEditor"
                          style="height:400px"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)">
            </quill-editor>
        </el-tab-pane>
        <el-tab-pane label="附件" name="third">
            <el-upload
              class="upload-demo"
              name="annex"
              action="/api/uploadAnnex"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-tab-pane>
        <el-tab-pane label="历史记录" name="four">
          <el-alert title="XXXX操作信息！@！#！@321321"
              type="info" show-icon>
          </el-alert>
          <el-alert title="XXXX操作信息！@！#！@321321"
              type="info" show-icon>
          </el-alert>
          <el-alert title="XXXX操作信息！@！#！@321321"
              type="info" show-icon>
          </el-alert>
          <el-alert title="XXXX操作信息！@！#！@321321"
              type="info" show-icon>
          </el-alert>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'

  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        content: '<h2>I am Example</h2>',
        editorOption: {},
        activeName: 'first',
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    computed:{
        message(){
          return this.$store.getters.cuurentMessage || {
            annex:"",
            content:"",
            createdAt:"2017-11-22 17:24:13",
            id:0,
            poster:"游客",
            status:"待确认",
            title:"测试活动001",
            updatedAt:"2017-11-22T17:24:13.000Z",
          }
        }
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      }
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
