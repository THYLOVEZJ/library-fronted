<template>


  <div style="height: 100vh;overflow: hidden">

    <el-card class="cover" v-if="admin.id">
      <slide-verify :l="42"
                    :r="10"
                    :w="310"
                    :h="155"
                    :accuracy="5"
                    slider-text="向右滑动"
                    @success="onSuccess"
                    @fail="onFail"
                    @refresh="onRefresh"
      ></slide-verify>
    </el-card>

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
import admin from "@/views/admin/Admin";

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
              this.admin = res.data
            } else {
              this.$notify.warning(res.msg)
            }
          })
        } else {
          this.$notify.warning("请检查表单")
        }
      })
    },
    onSuccess() {
      Cookies.set('admin', JSON.stringify(this.admin))
      this.$router.push('/')
    },
    onFail() {

    },
    onRefresh() {
      console.log('refresh')
    }
  },
}
</script>

<style scoped>
.cover {
  width: fit-content;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>