<template>
  <div style="height: 100vh;overflow: hidden">
    <div style="width: 500px;height: 400px;border-radius: 10px;background-color: white;margin:150px auto;padding: 50px">
      <el-form :model="admin" ref="login" :rules="rules">
        <div style="margin:30px;text-align: center;font-size: x-large;color: dodgerblue">登 录</div>
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" prefix-icon="el-icon-user" size="medium"
                    v-model="admin.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-key" size="medium" show-password
                    v-model="admin.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
import request from "@/utils/request";
import Cookies from "js-cookie"

export default {
  name: "Login",
  data() {
    return {
      admin: {},
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs['login'].validate((valid) => {
        if (valid) {
          request.post("/admin/login", this.admin).then(res => {
            if (res.code === '200') {
              console.log("hi")
              this.$notify.success("登录成功")
              if (res.data != null){
                console.log("hi")
                Cookies.set('admin', JSON.stringify(res.data))
              }
              this.$router.push("/")
            } else {
              this.$notify.error(res.msg)
            }
          })
        } else {
          this.$notify.warning("请检查表单")
        }
      })
    }
  }
}
</script>

