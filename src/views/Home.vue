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
  name: 'Home',
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
    }
  }
}
</script>
