<template>
  <div class="video-manage">
    <BrandNav :list="['首页', '行走路途管理']" />
    <div class="handle-group">
      <el-button
        type="primary"
        size="small"
        @click="clear(), (dialogFormVisible = true)"
        >新增</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="视频名称"></el-table-column>
      <el-table-column prop="url" label="视频地址"></el-table-column>
      <el-table-column label="跳转地址">
        <template slot-scope="scope">
          <a :href="scope.row.target" target="_blank">{{ scope.row.target }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="200"
      ></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增视频" :visible.sync="dialogFormVisible" width="700px">
      <el-form ref="form" :model="form" label-width="80px" class="form">
        <el-form-item label="视频名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="视频地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址">
          <el-input v-model="form.target"></el-input>
        </el-form-item>
        <!--  <el-form-item label>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { post, get } from "@/libs/axios";
import { addVideo, findVideo, delWayItem } from "@/api";
export default {
  name: "addVideo",
  middleware: "index",
  async asyncData() {
    const noteListData = await get(findVideo);
    const noteList = noteListData.data.list;
    return {
      tableData: noteList,
    };
  },
  mounted() {
    this.reloadList();
  },
  data() {
    return {
      form: {
        name: "",
        url: "",
        target: "",
      },
      dialogFormVisible: false, //弹窗显示与隐藏
      tableData: [],
    };
  },
  methods: {
    async save() {
      let { name, url, target } = this.form;
      if (!name) {
        this.$message.warning("视频名称不能为空");
        return;
      }
      if (!url) {
        this.$$message.warning("视频地址不能为空");
        return;
      }

      const result = await post(addVideo, { title: name, url, target });
      let { code, msg } = result.data;
      if (code === 200) {
        this.$message.success(msg);
        this.clear();
        this.dialogFormVisible = false;
        this.reloadList();
      } else {
        this.$message.error(msg);
      }
    },
    clear() {
      this.form = {
        name: "",
        url: "",
        target: "",
      };
    },
    async reloadList() {
      const data = await get(findVideo);
      const list = data.data.list;
      this.tableData = list;
    },
    //删除某视频
    del(opt) {
      let { id } = opt;
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await post(delWayItem, { id });
          let { code, msg } = result.data;
          if (code === 200) {
            this.$message.success(msg);
            this.reloadList();
          } else {
            this.$message.error(msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped lang="less">
.handle-group {
  text-align: right;
  margin-top: 20px;
}
</style>