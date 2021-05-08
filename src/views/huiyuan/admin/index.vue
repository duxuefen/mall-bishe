<template> 
  <div class="app-container">
    <!--搜索模块-->
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="姓名" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <!--一开始的展示模块，展示会员记录-->
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.sex}}</template>
        </el-table-column>
        <el-table-column label="年龄" align="center">
          <template slot-scope="scope">{{scope.row.age}}</template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
<!--        <el-table-column label="最后登录" width="160" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.loginTime | formatDateTime}}</template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="是否启用" width="140" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <el-switch-->
<!--              @change="handleStatusChange(scope.$index, scope.row)"-->
<!--              :active-value="1"-->
<!--              :inactive-value="0"-->
<!--              v-model="scope.row.status">-->
<!--            </el-switch>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total">
      </el-pagination>
    </div>
    <!--添加会员模块，时间是后台进行添加-->
    <el-dialog
      :title="isEdit?'编辑用户':'添加用户'"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="member"
               ref="adminForm"
               label-width="150px" size="small">
<!--        <el-form-item label="编号：">-->
<!--          <el-input v-model="member.id" style="width: 250px"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="姓名：">
          <el-input v-model="member.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-input v-model="member.sex" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="年龄：">
          <el-input v-model="member.age"  type="text" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="member.phone"  type="text" style="width: 250px"></el-input>
        </el-form-item>
<!--        <el-form-item label="备注：">-->
<!--          <el-input v-model="admin.note"-->
<!--                    type="textarea"-->
<!--                    :rows="5"-->
<!--                    style="width: 250px"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="是否启用：">-->
<!--          <el-radio-group v-model="admin.status">-->
<!--            <el-radio :label="1">是</el-radio>-->
<!--            <el-radio :label="0">否</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
<!--    <el-dialog-->
<!--      title="分配角色"-->
<!--      :visible.sync="allocDialogVisible"-->
<!--      width="30%">-->
<!--      <el-select v-model="allocRoleIds" multiple placeholder="请选择" size="small" style="width: 80%">-->
<!--        <el-option-->
<!--          v-for="item in allRoleList"-->
<!--          :key="item.id"-->
<!--          :label="item.name"-->
<!--          :value="item.id">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="allocDialogVisible = false" size="small">取 消</el-button>-->
<!--        <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </div>
</template>
<script>
  //导入函数,login2对应是会员
  import {fetchList,createAdmin,updateAdmin,updateStatus,deleteAdmin,getRoleByAdmin,allocRole} from '@/api/login2';
  import {fetchAllRoleList} from '@/api/role2';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword: null
  };
  const defaultMember = {
    id: null, //编号
    name: null,
    sex: null,
    age: null,
    phone: null,
    time: null,
  };
  export default {
    name: 'adminList',
    //data 是函数
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        member: Object.assign({}, defaultMember),
        isEdit: false,
        allocDialogVisible: false,
        allocRoleIds:[],
        allRoleList:[],
        allocAdminId:null
      }
    },
    created() {
      this.getList();
      this.getAllRoleList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.member = Object.assign({},defaultMember);
      },
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateStatus(row.id, {status: row.status}).then(response => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
          this.getList();
        });
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAdmin(row.id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.member = Object.assign({},row);
      },
      handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            updateAdmin(this.member.id,this.member).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          } else {
            createAdmin(this.member).then(response => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          }
        })
      },
      handleAllocDialogConfirm(){
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("adminId", this.allocAdminId);
          params.append("roleIds", this.allocRoleIds);
          allocRole(params).then(response => {
            this.$message({
              message: '分配成功！',
              type: 'success'
            });
            this.allocDialogVisible = false;
          })
        })
      },
      handleSelectRole(index,row){
        this.allocAdminId = row.id;
        this.allocDialogVisible = true;
        this.getRoleListByAdmin(row.id);
      },
      getList() {
        this.listLoading = true;
        //这里使用了后端的方法admin2/list
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      getAllRoleList() {
        fetchAllRoleList().then(response => {
          this.allRoleList = response.data;
        });
      },
      getRoleListByAdmin(adminId) {
        getRoleByAdmin(adminId).then(response => {
          let allocRoleList = response.data;
          this.allocRoleIds=[];
          if(allocRoleList!=null&&allocRoleList.length>0){
            for(let i=0;i<allocRoleList.length;i++){
              this.allocRoleIds.push(allocRoleList[i].id);
            }
          }
        });
      }
    }
  }
</script>
<style></style>


