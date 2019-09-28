<template>
  <div class="menu-content">
    <div class="m_operation">
      <el-button type="primary" class="el-icon-plus">新增</el-button>
    </div>
    <el-container>
      <el-row>
        <el-col :span="14">
          <div class="menu_left">
            <el-table
              :data="menuList"
              style="width: 100%"
              row-key="id"
              border
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column
                prop="menuName"
                label="菜单名称"
                width="300">
              </el-table-column>
              <el-table-column
                prop="menuUrl"
                label="请求地址"
                width="100">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" plain size="small">修改</el-button>
                  <el-button type="danger" plain size="small" @click="del(scope.row.menuId)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>
<script>
import {getMenu} from './model'
export default {
  name: "Menu",
  data() {
    return {
      menuList: [],
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
        children: [{
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
              id: 311,
              date: '2016-05-01',
              name: '王小虎3333',
              address: '上海市普陀区金沙江路 1519 弄',
            }]
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },
  methods: {
    getMenuList () {
      getMenu().then(res => {
        res.data.forEach((item, index) => {
          item.id = index + 1
          console.log(item,2222)
          if(item.twoSubmenus.length != 0){
            item.children = item.twoSubmenus
            item.children.forEach((item2, index2) => {
              item2.id = index2 + 1
              if(item2.threeSubmenus.length != 0) {
                item2.children = item.threeSubmenus
                // item2.children.forEach((item3, index3) => {
                //   item3.id = index3 + 1
                // })
                console.log(item2,7777)
              }
              // item2.children.forEach((item3, index3) => {
              //   item3.id = index3 + 1
              // })
            }) 
          }
 
        })
        console.log(res.data)
        this.menuList = res.data

        console.log(this.menuList,'menu')
      })
    }
  },
  created () {
    this.getMenuList()
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