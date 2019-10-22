<template>
  <div class="bar-content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>  
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="stylus" scoped>
  .bar-content{
    width: 100%;
    height: 30px;
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    padding-left: 5px;
    box-sizing: border-box;
    .el-breadcrumb{
      height: 30px;
      line-height: 2;
    }
  }
</style>