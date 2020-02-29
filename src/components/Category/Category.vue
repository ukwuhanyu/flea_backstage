<template>
  <div class="container">
    <el-table
      ref="singleTable"
      :data="categoryData"
      highlight-current-row
      @current-change="handleCurrentChange"
      class="category_table"
    >
      <el-table-column type="index" width="50" label="编号"></el-table-column>
      <el-table-column property="categoryName" label="分类名称"></el-table-column>
      <el-table-column property="categoryLevel" label="级别"></el-table-column>
      <el-table-column property="categoryRank" label="排序"></el-table-column>
      <el-table-column property="categoryLevel" label="查看">
        <template slot-scope="scope">
          <el-button size="mini" @click="addNum(scope.row)">查看二级</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isDeleted"
            active-color="#ff4949"
            inactive-color="#13ce66"
            @change="change(scope.row)"
          ></el-switch>&nbsp;
          <el-button size="mini" @click="addNum(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteImg(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getMoreCategory, getCategory } from "./model.js";
export default {
  name: "Category",
  data() {
    return {
      categoryData: [],
      currentRow: null
    };
  },
  methods: {
    // 获取全部一级分类
    getOnegetCategory(p) {
      getCategory(p).then(res => {
        console.log(res);
        this.categoryData = res.data;
      });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  },
  created() {
    this.getOnegetCategory({
      categorylevel: 1,
      limit: 5,
      page: 1
    });
  }
};
</script>
<style lang="stylus" scoped>
.container{
  padding: 20px
}
.category_table {
  width: 100%;
  // margin: 20px;
}
</style>