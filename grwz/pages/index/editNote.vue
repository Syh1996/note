<template>
  <div class="edit-note">
    <BrandNav :list="['首页', '记笔记']" />
    <el-form label-width="80px" :model="form" class="form">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="封面">
         <span v-show="!uploadPic"  @click="$refs.file.click()" class="click-upload">点击上传封面</span>
         <img  v-show="uploadPic" :src="uploadPic"  class="pic" @click="$refs.file.click()" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select style="width: 100%" v-model="form.type" placeholder>
          <el-option
            :label="item.type_name"
            :value="item.type_id"
            v-for="(item, index) in typeList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <quill-editor ref="editor" v-model="form.content" @change="onEditorChange($event)" />
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
     <input
            type="file"
            ref="file"
            class="file"
            @change="setUploadPic"
            accept="image/png, image/jpeg, image/jpg, image/bmp"
          />
  </div>
</template>

<script>
import { get, post } from "~/libs/axios";
import { getTypeList, sendNoteItem,sendURLtoBaiduSeo } from "~/api";
import seoConfig from "~/assets/seoConfig/index";
export default {
  name: "editor",
  middleware: "index",
  async asyncData() {
    const typeList = await get(getTypeList, {});
    return {
      typeList: typeList.data.list
    };
  },
  head() {
    const desc = "记笔记";
    return {
      title: "邵预鸿-学习笔记|生活笔记|经验分享|开发问题|面试题笔记" + desc,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: seoConfig.keyWords
        },
        {
          hid: "description",
          name: "description",
          content:
            "邵预鸿-学习笔记|生活笔记|经验分享|开发问题|面试题笔记" + desc
        }
      ]
    };
  },
  data() {
    return {
      typeList: [], //分类列表
      form: {
        title: "",
        desc: "",
        content: "",
        type: ""
      },
      uploadPic: ""
    };
  },
  methods: {
    onEditorChange() {},
    async save() {
      let { title, desc, content, type } = this.form;
      if (!title) {
        this.$message.error("笔记标题不能为空");
        return;
      }
      if (!desc) {
        this.$message.error("笔记描述不能为空");
        return;
      }
      if (!type) {
        this.$message.error("请选择分类");
        return;
      }
      if (!content) {
        this.$message.error("笔记详情不能为空");
        return;
      }
      const result = await post(sendNoteItem, {...this.form,pic:this.uploadPic});
      let { code, msg } = result.data;
      if (code === 200) {
        this.$message.success(msg);
        for (let i in this.form) this.form[i] = "";
        this.uploadPic ='';
        this.$refs.file.value='';
        const seoResult = await post(sendURLtoBaiduSeo);
        let { success,remain } = seoResult.data;
        this.$message.success(`成功推送:${success},剩余${remain}`);
      } else {
        this.$message.error(msg);
      }
    },
    setUploadPic() {
      let that = this;
      let file = this.$refs.file.files[0];
      let formData = new FileReader();
      formData.readAsDataURL(file);
      formData.onload = function(e) {
        that.uploadPic = this.result;
      };
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.form {
  width: 70%;
  margin-top: 20px;
  /deep/ .ql-toolbar.ql-snow + .ql-container.ql-snow {
    height: 500px;
    .ql-editor {
      height: 500px;
    }
  }
  .pic {
    display: block;
    width: 120px;
  }
  .click-upload{
        color: #606266;
        font-size: 14px;
        cursor: pointer;
  }

}
.file{
  position: fixed;
  left:-1000px;
  top:-1000px;
}
</style>