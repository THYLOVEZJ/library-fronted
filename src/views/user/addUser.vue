<template>
  <div style="padding: 20px;width: 80%">
    <h2 style="text-align: center;size: 40px;margin-bottom: 40px"><span>新增用户</span></h2>
    <el-form :inline="true" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.sex" placeholder="请输入性别"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.phone" placeholder="请输入联系方式"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
    </el-form>

    <div style="text-align: center;margin-top: 20px">
      <el-button type="primary" plain @click="save">提交</el-button>
      <el-button type="danger" plain>重置</el-button>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'AddUser',
  data() {
    return {
      form: {}
    }
  },
  created() {
    this.load()
  },
  methods: {
    save() {
      request.post("/user/save", this.form).then(res => {
        if (res.code === '200') {
          this.$notify.success('新增成功')
          this.form={}
        } else {
          this.$notify.error(res.msg)
        }
      })
    }
  }
}
</script>