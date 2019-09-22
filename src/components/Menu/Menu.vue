<template>
  <div class="menu-content">
    <div class="m_operation">
      <el-button type="primary" class="el-icon-plus">新增</el-button>
      <el-button type="primary" class="el-icon-edit">修改</el-button>      
    </div>
    <el-container>
      <el-row>
        <el-col :span="14">
          <div class="menu_left">
            <el-table
              :data="tableData1"
              style="width: 100%"
              row-key="id"
              border
              lazy
              :load="load"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column
                prop="date"
                label="菜单名称"
                width="300">
              </el-table-column>
              <el-table-column
                prop="name"
                label="请求地址"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="操作">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
      form: {
        name: ''
      },
      tableData1: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        hasChildren: true
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    }    
  }
};
</script>
<style lang="stylus" scoped>
.menu-content {
  padding: 15px;
  .m_operation {
    margin-bottom: 15px;
  }
  .el-row {
    width: 100%;
    .menu_left {
      background: pink;
    }
    .menu_right {
      input {
        width: 40%; 
      }
    }
  }
}
</style>