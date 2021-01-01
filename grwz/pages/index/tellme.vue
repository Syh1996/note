<template>
  <div class="tellme">
     <BrandNav :list="['首页','给我留言']" />
    <el-form  label-width="0px" :model="form" class="form">
  <el-form-item label="">
    <p class="label">留言内容</p>
    <el-input v-model="form.content" type="textarea" :rows="10" placeholder="您的留言将通过邮件自动下发到我的邮箱，如果您有留下相关联系邮箱，我将很快回复您的消息"></el-input>
  </el-form-item>
  <el-form-item label="">
    <el-button type="primary" @click="save">留言</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { post } from '~/libs/axios';
import { sendTellme} from '~/api';
export default {
  transition: "fade",
  name:'tellme',
  data(){
    return {
      form:{
        content:''
      }
    }
  },
   head() {
    return {
      title:`邵预鸿-给我留言`,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: `邵预鸿-给我留言`,
        },
        {
          hid: "description",
          name: "description",
          content: `邵预鸿-您的留言将通过邮件自动下发到我的邮箱，如果您有留下相关联系邮箱，我将很快回复您的消息`,
        },
      ],
    };
  },
  methods:{
     async save(){
        let opt = {
           desc_msg:this.form.content
        };
        const result  = await post(sendTellme,opt);
        let {code,msg} = result.data;
        if(code ===200){
          this.$message.success(msg);
          this.form.content= '';
        }else{
          this.$message.error(msg);
        }
     }
  }
};
</script>

<style scoped lang="less">
.tellme{
  width: 70%;

}
.form{
  margin-top: 20px;
}
.label{
    vertical-align: middle;
    float: left;
    font-size: 16px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
}

</style>