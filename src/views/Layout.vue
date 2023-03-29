<template>
  <div>
    <!-- 头部区域 -->
    <div style="height: 60px;line-height: 60px;background-color: white;margin-bottom: 2px;display: flex">
      <div style="width: 300px">
        <img src="@/assets/book.png" alt="" style="width: 40px; position: relative;top:10px;left:20px">
        <span style="margin-left: 20px; font-size: 24px;font-family: 'Arial Black'">图书管理系统</span>
      </div>
      <div style="flex: 1;text-align: right;padding-right: 50px">
        <el-dropdown>
          <span class="el-dropdown-link" style="cursor: pointer">
            管理员：{{ admin.username }} <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div style="width: 50px;text-align: center" @click="logout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 侧边栏和主体 -->
    <div style="display: flex">
      <!--侧边栏导航-->
      <div
          style="width: 200px;min-height:calc(100vh - 62px);margin-right: 2px;background-color: white;height: 200px;overflow: hidden">
        <el-menu :default-active="$router.path" router class="el-menu-demo">
          <el-menu-item index="/"><i class="el-icon-s-home"></i><span>首页</span></el-menu-item>
          <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-question"></i>
              <span>会员管理</span>
            </template>
            <el-menu-item index="addUser">会员添加</el-menu-item>
            <el-menu-item index="user">会员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="admin">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>管理员管理</span>
            </template>
            <el-menu-item index="admin">管理员列表</el-menu-item>
            <el-menu-item index="addAdmin">管理员添加</el-menu-item>
          </el-submenu>
          <el-submenu index="category">
            <template slot="title">
              <i class="el-icon-s-operation"></i>
              <span>图书分类管理</span>
            </template>
            <el-menu-item index="category">图书分类列表</el-menu-item>
            <el-menu-item index="addCategory">分类添加</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <!--主体数据-->
      <div style="flex: 1;background-color: white;padding:10px">
        <router-view/>
      </div>
    </div>
  </div>
</template>


<script>
import Cookies from "js-cookie";
import request from "@/utils/request";

export default {
  name: "Layout.vue",
  data() {
    return {
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {}
    }
  },

  methods: {
    logout() {
      // 清除浏览器数据
      Cookies.remove('admin')
      this.$router.push("/login")
    },
  }
}
</script>


<style scoped>

</style>