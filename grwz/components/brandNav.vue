<template>
  <div class="brand-nav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,index) in list" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "brandNav",
  data(){
    return {

    }
  },
  props:['list'],
  created(){
   
  }
};
</script>

<style scoped lang="less">
  .brand-nav{
    /deep/ .el-breadcrumb{
      font-size:18px;
    }
  }
</style>