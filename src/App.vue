<template>
  <div id="app">
    <!-- 头部区域 -->
    <div style="height: 60px;line-height: 60px;background-color: white;margin-bottom: 2px">
      <img src="@/assets/book.png" alt="" style="width: 40px; position: relative;top:10px;left:20px">
      <span style="margin-left: 20px; font-size: 24px;font-family: 'Arial Black'">图书管理系统</span>
    </div>

    <!-- 侧边栏和主体 -->
    <div style="display: flex">
      <!--侧边栏导航-->
      <div
          style="width: 200px;min-height:calc(100vh - 62px);margin-right: 2px;background-color: white;height: 200px;overflow: hidden">
        <el-menu :default-active="$router.path" router class="el-menu-demo">
          <el-menu-item index="/"><i class="el-icon-s-home"></i><span>首页</span></el-menu-item>
          <el-submenu>
            <template slot="title">
              关于页面
            </template>
            <el-menu-item>关于详情</el-menu-item>
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

<style>
</style>
