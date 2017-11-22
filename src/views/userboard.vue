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
                            label="注册时间"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            v-if="adminAuth"
                            fixed="right"
                            label="操作"
                            >
                            <template slot-scope="scope">
                                <el-button @click="modifyPwd(scope.row)" type="text" size="small">修改密码</el-button>
                                <el-button type="text" size="small">权限修改</el-button>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </div>
                <div v-show="tabIndex == 1">
                    <h2>部门管理</h2>
                    <h4>请选择部门</h4>
                    <el-radio-group v-model="departmentValue" size="small">
                        <el-radio-button  v-for="item in departmentList" :key="item.label" :label="item.label" ></el-radio-button>
                    </el-radio-group>
                    <h4>请选择成员</h4>

                    <el-transfer  filterable
                        :filter-method="filterMethod"
                        filter-placeholder="请输入姓名或邮箱"
                        :titles="['成员列表','转移的部门']"
                        v-model="transferValue" :data="tableData">
                    </el-transfer>

                </div>
            </el-col>
        </el-row>
        
  </div>
</template>
<script>

export default {
   data() {
        return {
            adminAuth: true,
            // searchFilter
            searchValue: '',
            departmentFilter: [],
            // tab
            tabIndex: 0,
            // 
            departmentValue: '',
            transferValue: [],
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
            }],
            tableData: [{
                createdAt: '2016-05-02',
                name: '王小虎',
                auth:'会员',
                department: '秘书部',
                mail: 'abc@qq.com'
            }]
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
        }
    },
    methods:{
        changeTab(index){
            this.tabIndex = index;
        },
        modifyPwd(row) {
            console.log(row);
        },
        filterMethod(query, item) {
            console.log(item)
          return true
        }
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
