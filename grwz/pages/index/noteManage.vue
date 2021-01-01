<template>
  <div class="note-manage">
    <BrandNav :list="['首页', '笔记管理']" />
    <div class="filter-box">
      <el-input
        v-model="searchMsg"
        placeholder="请输入标题"
        class="input"
        @keydown.native.enter="search"
      ></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <el-table class="reset-table" :data="tableData" v-loading="loading">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="
              (editContent = ''),
                getDetails(scope.row.note_id),
                (dialogFormVisible = true)
            "
            >修改</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="delItem(scope.row.note_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-if="tableData.length > 0"
      :currentPage.sync="currentPage"
      :total="total"
      @onLoadNextData="loadData"
    />
    <el-dialog
      title="笔记修改"
      class="dialog-form"
      :visible.sync="dialogFormVisible"
      width="1000px"
    >
      <quill-editor ref="editor" v-model="editContent" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { post, get } from "@/libs/axios";
import {
  getNoteList,
  findNoteDetails,
  updateNoteDetails,
  delNoteItem,
} from "@/api";
export default {
  name: "addVideo",
  middleware: "index",
  data() {
    return {
      editContent: "",
      dialogFormVisible: false, //弹窗显示与隐藏
      total: 0,
      currentPage: 1,
      tableData: [],
      tmpData: {}, //临时数据，用于修改
      loading: false, //默认没有处于加载中
      searchMsg: "", //搜索内容
    };
  },
  async asyncData() {
    const noteListData = await get(getNoteList, { page: 1 });
    const total = Number(noteListData.data.total);
    const noteList = noteListData.data.list;
    return {
      tableData: noteList,
      total,
    };
  },
  methods: {
    //富文本变化
    onEditorChange(e) {
      // console.log(e);
    },
    //搜索
    search() {
      this.currentPage = 1;
      this.loadData();
    },
    //加载数据
    async loadData() {
      this.loading = true;
      let opt = { page: this.currentPage };
      if (this.searchMsg) {
        opt.title = this.searchMsg;
      }
      const noteListData = await get(getNoteList, opt);
      const total = Number(noteListData.data.total);
      const noteList = noteListData.data.list;
      this.tableData = noteList;
      this.total = total;
      this.loading = false;
    },
    //获取详情
    async getDetails(note_id) {
      const result = await get(findNoteDetails, { note_id });
      let { code, list } = result.data;
      if (code === 200) {
        this.tmpData = list;
        this.editContent = list.details;
      }
    },
    //保存修改
    async save() {
      if (!this.editContent) {
        this.$message.warning("笔记内容不能为空");
        return;
      }
      const result = await post(updateNoteDetails, {
        note_id: this.tmpData.note_id,
        details: this.editContent,
      });
      let { code, msg } = result.data;
      if (code === 200) {
        this.$message.success(msg);
        this.editContent = "";
        this.dialogFormVisible = false;
        this.loadData();
      } else {
        this.$message.error(msg);
      }
    },
    //删除笔记列表
    async delItem(note_id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await get(delNoteItem, { note_id });
          let { code, msg } = result.data;
          if (code === 200) {
            this.$message.success(msg);
            this.loadData();
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
.note-manage {
  /deep/ .ql-toolbar.ql-snow + .ql-container.ql-snow {
    height: 500px;
    .ql-editor {
      height: 500px;
    }
  }
  /deep/ .reset-table {
    width: 100%;
    margin: 20px 0;
  }
  .filter-box {
    margin-top: 20px;
    text-align: right;
    .input {
      width: 300px;
    }
  }
}
</style>