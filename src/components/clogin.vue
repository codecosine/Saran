<template>
<div>
  <div class="signInBox">
      <div class="signIn">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
            <el-input v-model="input" placeholder="请输入内容"></el-input>

      </div>
      <div class="register">
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
      </div>
  </div>
  <div class="modal-backdrop">

  </div>
</div>

</template>
<script>
export default {
    props:['isShow'],
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
.signInBox{
    position: fixed;
    background: #fff;
    z-index: 100000;
    width: 360px;
    padding-bottom: 30px;
    left: 50%;
    top: 50%;
    margin: -218px 0 0 -180px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -o-transition: all 0.2s;

}
.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #000;
}
</style>
