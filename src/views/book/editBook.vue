<template>
  <div style="padding: 20px;width: 80%">
    <h2 style="text-align: center;size: 40px;margin-bottom: 40px"><span>编辑分类</span></h2>
    <el-form :inline="true" :model="form" label-width="120px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入图书描述"></el-input>
      </el-form-item>
      <el-form-item label="出版日期" prop="publish_date">
        <el-date-picker
            v-model="form.publishDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出版日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author" placeholder="请输入图书作者"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-cascader
            :props="{value:'name',label:'name'}"
            v-model="form.categories"
            :options="categories"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="图书索引号" prop="isbn">
        <el-input v-model="form.isbn" placeholder="请输入图书描述"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-input v-model="form.cover" placeholder="请输入图书封面"></el-input>
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
  name: 'EditBook',
  data() {
    return {
      form: {},
      categories: [],
    }
  },
  created() {
    const id = this.$route.query.id
    request("/book/" + id).then(res => {
      this.form = res.data
      if (this.form.category) {
        this.form.categories = this.form.category.split("/")
      }
    })
    request.get('/category/tree').then(res => {
      this.categories = res.data
    })
  },
  methods: {
    save() {
      request.put("/book/update", this.form).then(res => {
        if (res.code === '200') {
          this.$notify.success('更新成功')
          this.$router.push("/book")
        } else {
          this.$notify.error(res.msg)
        }
      })
    },
  }
}
</script>