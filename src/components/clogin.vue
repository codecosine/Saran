<template>
<div v-show="loginModalShow">
  <div class="signInBox">
    <el-tabs v-model="activeName">
        <el-tab-pane label="登录" name="first">
            <el-form class="formBox" ref="ruleForm1" :model="ruleForm1">
                <el-input class="form-item" v-model="ruleForm1.mail" placeholder="请输入登录邮箱/用户名"></el-input>
                <el-input class="form-item" type="password" v-model="ruleForm1.pass" placeholder="6-16位密码,区分大小写,不能用空格"></el-input>
                <div class="form-item">
                    <label class="label-forget">忘记密码？</label>
                </div>
                <button type="button" class="form-item btn-full btn-red" @click="login"> 
                    登录
                </button>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
            <el-form class="formBox" ref="ruleForm2" :model="ruleForm2">
                <el-input class="form-item" v-model="ruleForm2.mail" placeholder="请输入注册邮箱/用户名"></el-input>
                <el-input class="form-item" v-model="ruleForm2.name" placeholder="请输入您的姓名"></el-input>
                <el-input class="form-item" type="password" v-model="ruleForm2.pass" placeholder="6-16位密码,区分大小写,不能用空格"></el-input>
                <el-input class="form-item" type="password" v-model="ruleForm2.checkPass" placeholder="确认密码"></el-input>
                <button  type="button" class="form-item btn-full btn-red"  @click="register">
                    注册
                </button>
            </el-form>
        </el-tab-pane>
    </el-tabs>
    <span class="signInBoxClose" @click="handleClose"><i class="el-icon-close"></i></span>
  </div>
  <div class="modal-backdrop modal-in" @click.stop="handleClose"></div>
</div>

</template>
<script>
import Login from '../api/login'
export default {
    props:['loginModalShow'],
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
            activeName: 'first',
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
            }
        }
    },
    methods: {
        handleClose(){
            this.$emit('onchange',false)
        },
        login(){
            Login.signin(this.ruleForm1).then(res=>{
                console.log(res)
                if(res.data.code == 0){
                    this.$store.dispatch('updateUser',res.data.data)
                    this.$message({
                        message: '恭喜你,登录成功，现在转入工作台',
                        type: 'success'
                    });
                    this.$router.push({ path:'/dashboard'} )
                    this.handleClose();
                } else {
                    this.$message({
                        message: '登录失败',
                        type: 'error'
                    });
                }
            }).catch(err=>{
                console.error(err)
            })
            // this.$refs['ruleForm1'].validate((valid) => {
            //     if (valid) {
                    
            //     } else {
            //         this.$message({
            //             message: '未正确填入表单',
            //             type: 'error'
            //         });
            //     }
            // });
        },
        register(){
            Login.signup(this.ruleForm2).then(res=>{
                // 储存权限信息
                if(res.data.code == 0){
                    this.$store.dispatch('updateUser',res.data.data)
                    this.$message({
                        message: '恭喜你,注册成功,即将转入工作台',
                        type: 'success'
                    });
                    this.$router.push({path:'/dashboard'})
                    this.handleClose();
                } else {
                    this.$message({
                        message: '注册失败',
                        type: 'error'
                    });
                }
            }).catch(err=>{
                console.error(err)
                this.$message({
                    message: '注册失败：'+err,
                    type: 'error'
                });
            })
            // this.$refs['ruleForm2'].validate((valid) => {
            //     if (valid) {
                    
            //     } else {
            //         this.$message({
            //             message: '未正确填入表单',
            //             type: 'error'
            //         });
            //     }
            // });
        },
        changeTab(index){
            this.cuurrentIndex = index;
        }
      
    }
}
</script>

<style lang="less" scoped>
.signInBox{
    padding:10px 20px 10px 20px;
    position: fixed;
    background: #fff;
    z-index: 1050;
    width: 320px;
    min-height: 300px;
    padding-bottom: 30px;
    left: 50%;
    top: 50%;
    margin: -218px 0 0 -180px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -o-transition: all 0.2s;
    .signInBoxClose{
        position: absolute;
        font-size: 1.2em;
        cursor: pointer;
        right: 15px;
        top: 19px;
        &:hover{
          color: aquamarine;
        }
    }

}
.btn-red{
    color: #fff;
    background-color: #ec1500;
    border-color: #ec1500;
    border-style: solid;
    border-width: 1px;
    -weibkit-transition: all .3s;
    -moz-transition: all .3s;
    transition: all .3s;
    width: 138px;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
}

.formBox{
    padding:5px 8px 0px 8px;
    .form-item{
        padding-bottom: 15px;
        .label-forget{
            cursor: pointer;
            color: #787d82;
            &:hover{
            color: aquamarine;
            }
        }
    }
    .btn-full{
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        cursor: pointer;
    }
    
    
}
.modal-in{
    opacity: .65;
    filter: alpha(opacity=65);
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
