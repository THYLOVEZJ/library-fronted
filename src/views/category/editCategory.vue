<template>
  <div style="padding: 20px;width: 80%">
    <h2 style="text-align: center;size: 40px;margin-bottom: 40px"><span>编辑分类</span></h2>
    <el-form :inline="true" :model="form" label-width="120px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>

    <div style="text-align: center;margin-top: 20px">
      <el-button type="primary" plain @click="save">提交</el-button>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'EditAdmin',
  data() {
    return {
      form: {}
    }
  },
  created() {
    const id = this.$route.query.id
    request("/category/" + id).then(res => {
      this.form = res.data
    })
  },
  methods: {
    save() {
      request.put("/category/update", this.form).then(res => {
        if (res.code === '200') {
          this.$notify.success('更新成功')
          this.$router.push("/category")
        } else {
          this.$notify.error(res.msg)
        }
      })
    }
  }
}
</script>