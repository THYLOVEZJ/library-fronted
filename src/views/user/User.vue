<template>
  <div>
    <!--  搜索表单-->
    <div style="margin-bottom: 20px">
      <el-input style="width: 240px" placeholder="请输入名称" v-model="params.username"></el-input>
      <el-input style="width: 240px;margin-left: 5px" placeholder="请输入联系方式" v-model="params.phone"></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
      <el-button style="margin-left: 5px" type="warning" @click="reset"><i class="el-icon-refresh"></i>重置</el-button>
    </div>

    <el-table :data="tableData" stripe>
      <el-table-column prop="username" label="名称"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <!--scope.row就是当前行数据-->
          <el-button type="primary" @click="$router.push('/editUser?id='+scope.row.id)">编辑</el-button>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button slot="reference" type="danger">删除</el-button>
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
  </div>
</template>


<script>
import request from "@/utils/request";

export default {
  name: 'User',
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        username: "",
        phone: "",
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      // fetch("http://localhost:8081/user/all").then(res => res.json()).then(res => {
      //   console.log(res)
      //   this.tableData = res
      // })
      request.get('/user/page', {
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
      request.delete("/user/delete/" + id).then(res => {
        if (res.code === '200') {
          this.$notify.success("删除成功")
          this.load()
        } else {
          this.$notify.error("删除失败")
        }
      })
    }
  }
}
</script>

<style scoped>

</style>