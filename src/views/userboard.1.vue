<template>
  <div>
        <el-row type="flex" justify="center" style="padding-top:30px">
            <el-col :span="3">
                <div class="side-nav">
                    <ul>
                        <li class="nav-item" v-for="(item,index) in groupList" :key="index">
                            <a :class="{ active: tabIndex == index }"@click="changeTab(index)">{{item.label}}</a>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="memberBox" v-show="tabIndex == 0">
                    <h2>社团成员管理</h2>
                    <div class="searchBox">
                        <div class="filterBox">
                            <el-checkbox-group v-model="departmentFilter" size="mini">
                                <el-checkbox-button v-for="(item,index) in departmentList" 
                                    :label="item.label" 
                                    :key="index">
                                </el-checkbox-button>
                            </el-checkbox-group>
                        </div>
                        <div class="filterBox">
                            <el-input
                                size="mini"
                                placeholder="查询.."
                                suffix-icon="el-icon-search"
                                v-model="searchValue">
                            </el-input>
                            <i class="el-icon-refresh" @click="getList"></i>
                        </div>
                    </div>
                     <el-table
                        :data="tableFilterData"
                        style="margin-top:20px;width: 100%">
                        <el-table-column
                            prop="mail"
                            label="邮箱">
                        </el-table-column>
                        <el-table-column
                            prop="department"
                            label="部门">
                        </el-table-column>
                         <el-table-column
                            prop="name"
                            label="姓名">
                        </el-table-column>
                          <el-table-column
                            prop="auth"
                            label="权限">
                        </el-table-column>
                        <el-table-column
                            prop="createdAt"
                            label="注册时间">
                        </el-table-column>
                        <el-table-column
                            v-if="adminAuth"
                            fixed="right"
                            label="操作">
                            <template slot-scope="scope">
                                <el-button @click="modifyPwdClick(scope.row)" type="text" size="small">修改密码</el-button>
                                <el-button @click="modifyAuthClick(scope.row)" type="text" size="small">权限修改</el-button>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </div>
                <div v-show="tabIndex == 1">
                    <h2>部门管理</h2>
                    <h4>请选择需要管理的部门</h4>
                    <el-radio-group v-model="departmentValue" size="small">
                        <el-radio-button v-for="item in departmentList" :key="item.label" :label="item.label" ></el-radio-button>
                    </el-radio-group>
                    <h4>成员操作</h4>
                    <el-transfer  filterable
                        :filter-method="filterMethod"
                        :props="{
                            key: 'id',
                            label: 'name'
                        }"
                        filter-placeholder="请输入姓名或邮箱"
                        :titles="['成员列表','转移的部门']"
                        v-model="transferValue" :data="tableData">
                    </el-transfer>
                    <el-button type="primary" @click="changeDep">确定</el-button>
                </div>
                <div class="memberBox" v-show="tabIndex == 2">
                    <h2>物资管理</h2>
                    <div class="searchBox">
                        <div class="filterBox">
                            <el-button size="small" type="primary" round  @click="addMaFormVisible = true">+新增物资</el-button>
                        </div>
                        <div class="filterBox">
                            <el-input
                                size="mini"
                                placeholder="查询.."
                                suffix-icon="el-icon-search"
                                v-model="searchValue">
                            </el-input>
                        </div>
                    </div>
                     <el-table
                        :data="materialsFilterData"
                        style="margin-top:20px;width: 100%">
                        <el-table-column
                            prop="id"
                            label="Id">
                        </el-table-column>
                         <el-table-column
                            prop="name"
                            label="物资名称">
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="备注信息">
                        </el-table-column>
                        <el-table-column
                            prop="updatedAt"
                            label="更新时间">
                        </el-table-column>
                        <el-table-column
                            v-if="adminAuth"
                            fixed="right"
                            label="操作"
                            >
                            <template slot-scope="scope">
                                <el-button type="text" size="small">修改</el-button>
                                <el-button type="text" size="small" @click="destoryMa">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-dialog
                title="修改密码"
                :visible.sync="modifyPwdDialog"
                width="30%"
                center>
                <el-form :model="modifyForm">
                    <el-form-item label="邮箱" label-width="80px">
                        <el-input v-model="modifyForm.mail" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="旧密码" label-width="80px">
                        <el-input type="password" v-model="modifyForm.pwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" label-width="80px">
                        <el-input type="password" v-model="modifyForm.npwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" label-width="80px">
                        <el-input type="password" v-model="modifyForm.checkpwd" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="modifyPwdDialog = false">取 消</el-button>
                    <el-button type="primary" @click="modifyPwd">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="权限修改"
                :visible.sync="modifyAuthDialog"
                width="30%"
                center>
                <el-form :model="modifyAuthForm">
                    <el-form-item label="邮箱" label-width="80px">
                        <el-input v-model="modifyAuthForm.mail" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="权限" label-width="80px">
                        <el-select v-model="modifyAuthForm.auth" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="modifyAuthDialog = false">取 消</el-button>
                    <el-button type="primary" @click="modifyPwd">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="添加物资"  width="30%" :visible.sync="addMaFormVisible">
                <el-form :model="addMaForm">
                    <el-form-item label="物资名称" label-width="80px">
                        <el-input v-model="addMaForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="80px">
                        <el-input v-model="addMaForm.remark" auto-complete="off"></el-input>
                    </el-form-item>
                   
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addMaFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addMaterials">确定添加</el-button>
                </div>
            </el-dialog>
        </el-row>
        
  </div>
</template>
<script>
import user from '../api/user'
import materials from '../api/materials'
export default {
   data() {
        return {
            modifyPwdDialog: false,
            modifyAuthDialog: false,
            addMaFormVisible: false,
            adminAuth: true,
            // searchFilter
            searchValue: '',
            departmentFilter: [],
            // tab
            tabIndex: 0,
            // form
            addMaForm:{
                name:'',
                remark:'',
            },
            deMaForm:{
                name:''
            },
            modifyForm: {
                mail:'',
                oldpwd:'',
                freshpwd: '',
                checkpwd: '',
            },
            modifyAuthForm: {
                mail:'',
                auth:''
            },
            departmentValue: '',
            transferValue: [],
            options: [{
                value: 'president',
                label: '社长'
            }, {
                value: 'minister',
                label: '部长'
            }, {
                value: 'cadre',
                label: '小干部'
            }, {
                value: 'member',
                label: '普通社员'
            }],
            departmentList:[{
                label:'策划部'
            },{
                label:'外联部'
            },{
                label:'秘书部'
            },{
                label:'技术部'
            },{
                label:'学习部'
            }],
            groupList:[{
                label:'成员管理'
            },{
                label:'部门管理'
            },{
                label:'物资管理'
            }],
            tableData: [],
            materialsData:[],
        }
    },
    computed:{
        tableFilterData(){
            var filterDep = this.departmentFilter.length;
            var filter = this.searchValue;
            if(filter || filterDep){
                // if(filterDep){
                //     this.departmentFilter.
                // }
                return this.tableData.find(ele=>ele.department.includes('filter'))
            }
            return this.tableData;
        },
        materialsFilterData(){
            return this.materialsData
        }
    },
    methods:{
        getList(){
            user.getList().then(res=>{
                this.tableData = res.data.data
            })
            materials.getList().then(res=>{
                this.materialsData = res.data.data
            })
        },
        changeTab(index){
            this.tabIndex = index;
        },
        changeDep(){
            var dep = this.departmentValue || '未分配'
            var ps = this.transferValue.map(id=>{
                return user.changeDep({
                    id,
                    department:dep,
                    poster:this.$store.getters.name
                })
            });
            Promise.all(ps).then(res=>{
                 this.$message({
                    message: '部门分派成功',
                    type: 'success'
                });
            })
        },
        addMaterials(){
            this.addMaForm.status = '空闲';
            var form = this.addMaForm;
            form.poster = this.$store.getters.name;
            materials.addMaterials(form).then(res=>{
                this.$message({
                    message: '物资添加成功',
                    type: 'success'
                });
                this.addMaFormVisible = false;
            })
        },
        destoryMa(row){
            materials.destroyMaterial({
                id:row.id,
            }).then(res=>{
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                });
            },err=>{
                this.$message({
                    message: res.data.msg,
                    type: 'error'
                })
            });
        },
        modifyPwdClick(row) {
            this.modifyForm.mail = row.mail;
            this.modifyPwdDialog = true;
        },
        modifyAuthClick(row){
            this.modifyAuthForm.mail = row.mail;
            this.modifyAuthDialog = true;
        },
        modifyPwd(){
            if(this.modifyForm.freshpwd !== this.modifyForm.checkpwd){
                this.$message({
                    message: '您两次输入的密码不一致',
                    type: 'error'
                });
                return 
            }
            this.modifyPwdDialog = false;
            user.changePwd(this.modifyForm).then(res=>{
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                });
            },err=>{
                this.$message({
                    message: res.data.msg,
                    type: 'error'
                })
            })
        },
        modifyAuth(){
            this.modifyPwdDialog = false;
            user.changeAuth(this.modifyAuthForm).then(res=>{
                this.$message({
                    message: res.data.msg,
                    type: 'success'
                });
            },err=>{
                this.$message({
                    message: res.data.msg,
                    type: 'error'
                })
            })

        },
        filterMethod(query, item) {
            if(!query){
                return item.name.includes(query)
            }
          return true
        }
    },
    created(){
        this.getList()
    }
}
</script>
<style lang="less" scoped>
.memberBox{
    position: relative;
    .searchBox{
        position: absolute;
        top: 0;
        right: 5px;
        .filterBox{
            float: left;
            margin-left: 20px;
        }
    }
}

.side-nav{
    padding-top:20px;
    padding-left:30px;
    .nav-item{
        a{
            display: block;
            color: #666;
            line-height: 40px;
            height: 40px;
            font-size:0.92em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: bold;
            opacity: 0.7;
            cursor: pointer;
        }
        .active{
            color: #409eff;
        }
        a:hover {
            color: #409eff;
        }
    }
    li {
        list-style: none;
    }
}

</style>
