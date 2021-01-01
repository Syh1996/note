<template>
  <div class="work-manage">
    <BrandNav :list="['首页', '职业生涯管理']" />
    <div class="handle-group">
      <el-button
        type="primary"
        size="small"
        @click="clear(), (dialogFormVisible = true)"
        >新增</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="公司LOGO">
        <template slot-scope="scope">
          <img
            :src="scope.row.company_logo"
            class="company-logo"
            :alt="scope.row.company_name"
          />
        </template>
      </el-table-column>
      <el-table-column prop="company_name" label="公司名称"></el-table-column>
      <el-table-column prop="join_time" label="在职时间"></el-table-column>
      <el-table-column label="视频地址">
        <template slot-scope="scope">
          <a v-if="scope.row.mp4_url" :href="scope.row.mp4_url" target="_blank"
            >查看视频</a
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="delItem(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="笔记修改"
      class="dialog-form"
      :visible.sync="dialogFormVisible"
      width="700px"
    >
      <el-form ref="form" :model="form" label-width="120px" class="form">
        <el-form-item label="公司LOGO">
          <el-upload
            class="avatar-uploader"
            :on-success="handleUploadSuccess"
            action="https://shaoyuhong.cn/grzx/findTellmeList.php"
            ref="upload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>
        <el-form-item label="在职时间">
          <el-input v-model="form.time"></el-input>
        </el-form-item>
        <el-form-item label="职业描述">
          <el-input v-model="form.desc" type="textarea" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="视频地址">
          <el-input v-model="form.mp4url"></el-input>
        </el-form-item>
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
import { createWorkItem, findWorkList, delWorkItem } from "@/api";
export default {
  name: "addVideo",
  middleware: "index",
  async asyncData() {
    const result = await get(findWorkList);
    return {
      tableData: result.data.list,
    };
  },
  data() {
    return {
      form: {
        companyName: "",
        time: "",
        desc: "",
        mp4url: "",
      },
      imageUrl: "",
      dialogFormVisible: false, //弹窗显示与隐藏
      tableData: [],
    };
  },
  methods: {
    //上传文件
    handleUploadSuccess(res, file) {
      let that =this;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file.raw);
      fileReader.onload=function(){
        that.imageUrl = this.result;
      }
    /*   this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl); */
    },
    //获取列表
    async getTableData() {
      const result = await get(findWorkList);
      this.tableData = result.data.list;
    },
    //新增
    async save() {
      let { companyName, time, desc, mp4url } = this.form;
      let { imageUrl } = this;
      if (!imageUrl) {
        this.$message.warning("公司LOGO不能为空");
        return;
      }
      if (!companyName) {
        this.$message.warning("公司名称不能为空");
        return;
      }
      if (!time) {
        this.$message.warning("在职时间不能为空");
        return;
      }
      if (!desc) {
        this.$message.warning("描述不能为空");
        return;
      }
      let opt = {
        company_name: companyName,
        join_time: time,
        desc,
        mp4: mp4url,
        company_logo: imageUrl,
      };
      const result = await post(createWorkItem, opt);
      let { code, msg } = result.data;
      if (code === 200) {
        this.$message.success(msg);
        this.clear();
        this.dialogFormVisible = false;
        this.getTableData();
      } else {
        this.$message.error(msg);
      }
    },
    //清空
    clear() {
      this.form = {
        companyName: "",
        time: "",
        desc: "",
        mp4url: "",
      };
      this.imageUrl = "";
      try {
        this.$refs.upload.clearFiles();
      } catch (e) {}
    },
    delItem(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await post(delWorkItem, { id });
          let { code, msg } = result.data;
          if (code === 200) {
            this.$message.success(msg);
            this.getTableData();
          } else {
            this.$message.error(msg);
          }
        })
        .catch((e) => {
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
.company-logo {
  display: inline-block;
  width: 80px;
}
.dialog-form /deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.dialog-form /deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.dialog-form /deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.dialog-form /deep/ .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>