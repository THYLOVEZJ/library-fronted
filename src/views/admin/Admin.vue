<template>
  <div>
    <!--  搜索表单-->
    <div style="margin-bottom: 20px">
      <el-input style="width: 240px" placeholder="请输入用户名" v-model="params.username"></el-input>
      <el-input style="width: 240px;margin-left: 5px" placeholder="请输入联系方式" v-model="params.phone"></el-input>
      <el-input style="width: 240px;margin-left: 5px" placeholder="请输入邮箱" v-model="params.email"></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
      <el-button style="margin-left: 5px" type="warning" @click="reset"><i class="el-icon-refresh"></i>重置</el-button>
    </div>

    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="state" label="状态">
        <template v-slot="scope">
          <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template v-slot="scope">
          <!--scope.row就是当前行数据-->
          <el-button type="primary" @click="$router.push('/editAdmin?id='+scope.row.id)">编辑</el-button>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="del(scope.row.id)"
              style="padding-left: 5px"
          >
            <el-button slot="reference" type="danger">删除</el-button>
            <el-button slot="reference" type="warning" @click="handleChangePass(scope.row)">修改密码</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px">
      <!--分页-->
      <el-pagination
          background
          :current-page="params.pageNum"
          :page-size="params.pageSize"
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogTableVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="form.newPass" auto-complete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import request from "@/utils/request";
import Cookies from "js-cookie";

export default {
  name: 'Admin',
  data() {
    return {
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
      tableData: [],
      total: 0,
      dialogTableVisible: false,
      form: {},
      params: {
        pageNum: 1,
        pageSize: 10,
        username: "",
        phone: "",
      },
      rules: {
        newPass: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在3-10个字符', trigger: blur},
        ],
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get('/admin/page', {
        params: this.params
      }).then(res => {
        if (res.code === "200") {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        username: "",
        phone: "",
      }
      this.load()
    },
    handleCurrentChange(pageNum) {
      // 点击分页按钮触发
      this.params.pageNum = pageNum
      this.load()
    },
    del(id) {
      request.delete("/admin/delete/" + id).then(res => {
        if (res.code === '200') {
          this.$notify.success("删除成功")
          this.load()
        } else {
          this.$notify.error("删除失败")
        }
      })
    },
    handleChangePass(row) {
      this.dialogTableVisible = true;
      this.form = JSON.parse(JSON.stringify(row))
    },
    savePass() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          request.put('/admin/password', this.form).then(res => {
            if (res.code === '200') {

              if (this.form.id === this.admin.id) { // 当前修改的id等于当前登录的id
                Cookies.remove('admin')
                this.$router.push('/login')
                this.$notify.warning('修改成功，请重新登录')
              } else {
                this.load()
                this.$notify.success("修改成功")
                this.dialogTableVisible = false
              }
            } else {
              this.$notify.error('修改失败')
            }
          })
          this.dialogTableVisible = false
        }
      })
    },
    changeSwitch(row) {
      this.form = JSON.parse(JSON.stringify(row))
      if (row.id !== this.admin.id) {
        request.put("/admin/update", row).then(res => {
          if (res.code === '200') {
            this.$notify.success('更新成功')
            this.load()
          } else {
            this.$notify.error(res.msg)
          }
        })
      } else {
        this.$notify.warning("操作不合法")
        this.load()
      }
    }
  }
}
</script>

<style scoped>

</style>