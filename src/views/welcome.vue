<template>
  <div>
    <el-container>
        <el-main>
            <div class="content">
                <h4>注册</h4>
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
                <h4>登录</h4>
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
        login(){
            this.$refs['ruleForm1'].validate((valid) => {
                if (valid) {
                    console.log('login')
                    user.login(this.ruleForm1)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        register(){
            this.$refs['ruleForm2'].validate((valid) => {
                if (valid) {
                    console.log('register')
                    user.register(this.ruleForm2)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
      
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
