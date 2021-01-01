<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :total="total"
      @current-change="change"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: ["currentPage", "total"],
  methods: {
    change(page) {
      this.$emit("update:currentPage", page);
      this.$emit("onLoadNextData")
    },
  },
};
</script>

<style scoped lang="less">
.pagination {
  text-align: center;
}
</style>