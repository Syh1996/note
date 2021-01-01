<template>
  <div class="type-manage">
    <BrandNav :list="['首页','分类管理']" />
    <div class="handle-group">
      <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="form.name='',dialogFormVisible=true">新增分类</el-button>
    </div>
    <el-table :data="tableData" class="table">
      <el-table-column align="center" type="index" label="序号"></el-table-column>
      <el-table-column align="center" prop="type_name" label="分类名称"></el-table-column>
      <el-table-column align="center" prop="create_time" label="创建时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="delType(scope.row.type_id)"
          >删除分类</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--弹窗-->
    <el-dialog title="新增分类" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="90px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false,form.name=''">取 消</el-button>
        <el-button type="primary" @click="saveForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTypeList, delType,createType } from "~/api";
import { get, post } from "~/libs/axios";
export default {
  name: "typeManage",
    middleware:'index',
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      //分类表单
      form: {
        name: "",
      },
    };
  },
  async asyncData() {
    const typeListData = await get(getTypeList);
    return {
      tableData: typeListData.data.list,
    };
  },
  methods: {
    /**
     * 删除分类
     * @param { number } id
     */
    delType(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await post(delType, { type_id: id });
          let { code, msg } = result.data;
          if (code === 200) {
            this.$message({
              type: "success",
              message: msg,
            });
            const typeListData = await get(getTypeList);
            this.tableData = typeListData.data.list;
          } else {
            this.$message({
              type: "warning",
              message: msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    /**
     * 新增分类
     */
    async saveForm() {
      let { name } = this.form;
      if (!name) {
        this.$message.error("请输入分类名称");
        return;
      }
      const result = await post(createType, { type_name: name });
      let { code, msg } = result.data;
      if (code === 200) {
        this.$message.success(msg);
        this.form.name = "";
        this.dialogFormVisible = false;
        const typeListData = await get(getTypeList);
        this.tableData = typeListData.data.list;
      } else {
        this.$message.error(msg);
      }
    },
  },
};
</script>

<style scoped lang="less">
.handle-group {
  text-align: right;
  margin-top: 20px;
}
.table {
  width: 100%;
  margin-top: 20px;
}
</style>