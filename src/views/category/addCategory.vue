<template>
  <div style="padding: 20px;width: 80%">
    <h2 style="text-align: center;size: 40px;margin-bottom: 40px"><span>新增图书分类</span></h2>
    <el-form :inline="true" :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
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
  name: 'AddCategory',
  data() {
    return {
      form: {},
      rules: {
        name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'},
        ],
      }
    }
  },
  created() {
  },
  methods: {
    save() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          request.post("/category/save", this.form).then(res => {
            if (res.code === '200') {
              this.$notify.success('新增成功')
              this.$refs['formRef'].resetFields();
            } else {
              this.$notify.error(res.msg)
            }
          })
        } else {
          this.$notify.error("请检查表单输入")
        }
      })
    }
  }
}
</script>