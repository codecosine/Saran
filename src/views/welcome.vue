<template>
  <div>
      <div class="back">
          <div class="items">
              <div class="mask img-mask"></div>
              <div class="back_img img_item"></div>
               
          </div>
          <div class="main-content">
                <div class="laymid">
                    <div class="laymid-text"></div>
                    <p class="laymid-btn">
                        <el-button type="primary">立即开始</el-button>
                    </p>
                </div>
          </div>
          <!-- <el-row :gutter="20" class="logInContent">
                <el-col :span="5" :offset="14" class="tabBox box">
                    <li :class="{'active': cuurrentIndex == 1 }" @click="changeTab(1)"><a>账号登录</a></li>
                    <li :class="{'active': cuurrentIndex == 2 }" @click="changeTab(2)"><a>快速注册</a></li>
                </el-col>
                <el-col :span="5" :offset="14" v-show="cuurrentIndex == 2" class="inputbox box">
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="60px">
                        <el-form-item
                            prop="mail"
                            label="邮箱"
                            :rules="[
                            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                            ]"
                        >
                            <el-input v-model="ruleForm2.mail"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认" prop="checkPass">
                            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                    
                        <el-form-item>
                            <el-button type="primary" @click="register">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="5" :offset="14" v-show="cuurrentIndex == 1" class="inputbox box">
                    <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="60px">
                        <el-form-item
                            prop="mail"
                            label="邮箱"
                            :rules="[
                            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                            ]"
                        >
                            <el-input v-model="ruleForm1.mail"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="ruleForm1.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="login">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
          </el-row> -->
      </div>
  </div>
</template>

<style lang="less" scoped>
.back {
    //bottom: 70px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .main-content{
        width: 1200px;
        margin: 0 auto;
        height: 100%;
    }
    .items{
            overflow: visible;
    }
    .back_img{
        background: #fff none no-repeat center center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    .img_item {
        background-image: url('../assets/people-coffee-tea-meeting.jpg');
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .mask{
        position: absolute;
        z-index: 9;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        //opacity: 0;
    }
    .img-mask {
        z-index: 99;
        background: #000;
        opacity: 0.15;
        filter: alpha(opacity=40);
          
    }
}
.laymid {
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    width: 450px;
    height: 220px;
    margin-left: -225px;
    margin-top: -110px;
    .laymid-text{
        margin-bottom: 10px;
        width: 450px;
        height: 100px;
        background-repeat: no-repeat;
        background-position: -10px 0;
        background-size: 100% 100%;
        background-image: url('../assets/bgText.png');
    }
    .laymid-btn{
        margin-left: -10px;
        text-align: center;
        // button{
        //     margin: 5px auto;
        // }
    }
}
.active{
    a{
        color: #3a8ee6 !important;
    }
    border-bottom: 2px solid #3a8ee6
}
.logInContent{
    top:20%;
    .tabBox{
        a{
            color: #fff;
        }
        margin-bottom: 4px;
        li{
            //font-weight: bold;
            padding: 15px 0;
            display: inline-block;
            width: 49%;
            cursor: pointer;
            text-align: center;
        }
    }
    .inputbox{
        padding-top:20px;
    }
    .box{
        border: 1px solid transparent;
        background: rgba(0,0,0,.3);
    }
}
</style>

<script>
export default {
   data(){
        var validateName = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入用户名'));
            } else if (value.length <2 ) {
            callback(new Error('用户名长度需要大于2'));
            } else{
            callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm2.checkPass !== '') {
                this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            cuurrentIndex: 1,
            ruleForm1: {
                mail:'',
                pass: '',
            },
            ruleForm2: {
                mail:'',
                pass: '',
                checkPass: '',
            },
            rules1: {

            },
            rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                name: [
                    { validator: validateName, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        login(){
            this.$refs['ruleForm1'].validate((valid) => {
                if (valid) {
                    user.login(this.ruleForm1).then(res=>{
                        if(res.data.code == 0){
                            this.$store.dispatch('updateUser',res.data.data)
                            this.$message({
                                message: '恭喜你,登录成功',
                                type: 'success'
                            });
                            this.$router.push({path:'/dashboard'})
                        } else {
                            this.$message({
                                message: '登录失败',
                                type: 'error'
                            });
                        }
                    })
                } else {
                    this.$message({
                        message: '未正确填入表单',
                        type: 'error'
                    });
                }
            });
        },
        register(){
            this.$refs['ruleForm2'].validate((valid) => {
                if (valid) {
                    user.register(this.ruleForm2).then(res=>{
                        // 储存权限信息
                        if(res.data.code == 0){
                            this.$store.dispatch('updateUser',res.data.data)
                            this.$message({
                                message: '恭喜你,注册成功,即将转入登录后主页',
                                type: 'success'
                            });
                            this.$router.push({path:'/dashboard'})
                        } else {
                            this.$message({
                                message: '注册失败',
                                type: 'error'
                            });
                        }
                    })
                } else {
                    this.$message({
                        message: '未正确填入表单',
                        type: 'error'
                    });
                }
            });
        },
        changeTab(index){
            this.cuurrentIndex = index;
        }
      
    }
}
</script>

