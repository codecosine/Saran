<template>
  <div class="welcome_wrap">
    
    <el-container>
        <el-main>
            <div class="content">
            <el-row :gutter="20">
                <el-col :span="6" :offset="14">
                    <h4 class="signTab">
                        <a :class="{'active': cuurrentIndex == 1 }" @click="changeTab(1)">登录</a>
                        <a :class="{'active': cuurrentIndex == 2 }" @click="changeTab(2)">注册</a>
                    </h4>
                    <button @click="test">test</button>
                </el-col>
                <el-col :span="6" :offset="14" v-show="cuurrentIndex == 2">
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px">
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
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="ruleForm2.name"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                    
                        <el-form-item>
                            <el-button type="primary" @click="register">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="6" :offset="14" v-show="cuurrentIndex == 1">
                    <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px">
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
            </el-row>
            </div>
        </el-main>
    </el-container>
  </div>
</template>
<script>
import user from '../api/user'
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
                name: ''
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
        test(){
            this.$router.push({path:'/dashboard'})
        },
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
<style lang="less" scoped>
.welcome_wrap{
    background: url('../assets/campus.jpeg') no-repeat;
    // background-size:100% 100%;
    background-origin:border-box;
    height: 100%;
}
.signTab{
    padding-left: 50px;
    .active {
         color: #399faa
    }
    a{
        padding:10px;
        cursor: pointer;
        &:hover{
            color: #399faa
        }
    }
}

</style>
