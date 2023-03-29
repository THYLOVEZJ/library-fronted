<template>
  <div>
    <!--  搜索表单-->
    <div style="margin-bottom: 20px">
      <el-input style="width: 240px" placeholder="请输入分类名称" v-model="params.name"></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
      <el-button style="margin-left: 5px" type="warning" @click="reset"><i class="el-icon-refresh"></i>重置</el-button>
    </div>

    <el-table :data="tableData" stripe row-key="id" default-expand-all>
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="createtime" label="创建时间"></el-table-column>
      <el-table-column prop="updatetime" label="更新时间"></el-table-column>
      <el-table-column label="操作" width="370">
        <template v-slot="scope">
          <!--scope.row就是当前行数据-->
          <el-button type="primary" @click="$router.push('/editCategory?id='+scope.row.id)">编辑</el-button>
          <el-button type="warning" v-if="!scope.row.pid" @click="handleChangeDialoge(scope.row)">添加二级分类</el-button>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="del(scope.row.id)"
              style="padding-left: 5px"
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

    <el-dialog title="添加二级分类" :visible.sync="dialogTableVisible" width="500px">
      <el-form :model="form" rules="rule" ref="formRef">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类注释" prop="remark">
          <el-input v-model="form.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import request from "@/utils/request";
import Cookies from "js-cookie";

export default {
  name: 'Category',
  data() {
    return {
      tableData: [],
      total: 0,
      form: {},
      pid: null,
      dialogTableVisible: false,
      params: {
        pageNum: 1,
        pageSize: 10,
        name: "",
      },
      rules: {
        name: [
          {required: true, message: '请输入分类名称', trigger: 'blur'},
        ]
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get('/category/page', {
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
      request.delete("/category/delete/" + id).then(res => {
        if (res.code === '200') {
          this.$notify.success("删除成功")
          this.load()
        } else {
          this.$notify.error("删除失败")
        }
      })
    },
    handleChangeDialoge(row) {
      this.pid = row.id
      this.dialogTableVisible = true;
    },
    save() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.form.pid = this.pid
          request.post("/category/save", this.form).then(res => {
            if (res.code === '200') {
              this.$notify.success('新增二级分类成功')
              this.$refs['formRef'].resetFields();
              this.dialogTableVisible = false
              this.load()
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

<style scoped>

</style>