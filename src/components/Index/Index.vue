<template>
  <div>
    <el-container>
      <!-- header start -->
      <el-header>
        <div class="header_left">
          <div class="title">后台管理系统</div>
          <div class="show" @click="isShow"><i class="el-icon-menu"></i></div>
        </div>
        <div class="header_right">
          <div class="image">
            <el-avatar :src="userImg"></el-avatar>
          </div>
          <div class="name">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="aboutMe">关于我</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <hr>
                <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <!-- header end -->
      <el-container>
        <!-- aside start -->
        <div class="el-aside">
          <el-col>
            <el-menu
              mode="vertical"
              class="el-menu-vertical-demo"
              background-color="rgb(50, 65, 87)"
              text-color="rgb(191, 203, 217)"
              active-text-color="#ffd04b"
              :collapse="isCollapse"
              :collapse-transition="transition"
              :unique-opened=true
              >     
              <!-- 判断一级菜单是否有结点（没有这种情况） -->
               <el-menu-item :index="(index+1).toString()" v-for="(item, index) in menuList" :key="'info1'+index" v-show="item.twoSubmenus.length == 0">
                <i class="el-icon-document"></i>
                <span slot="title">{{item.menuName}}</span>
              </el-menu-item>
              <!-- 判断一级菜单是否有结点（有这种情况） -->
              <el-submenu :index="(index+1).toString()" v-for="(item, index) in menuList" :key="index" v-show="item.twoSubmenus.length != 0">
                <!-- 判断二级菜单是否有结点（没有这种情况） -->
                <el-menu-item @click="$router.push(item2.menuUrl)" :index="(index+1).toString()+'-'+(index2+1).toString()" v-for="(item2, index2) in item.twoSubmenus" :key="'info2'+index2" v-show="item2.threeSubmenus.length == 0">{{item2.menuName}}</el-menu-item>
                <template slot="title">
                  <i :class="item.menuImg"></i>
                  <span slot="title">{{item.menuName}}</span>
                </template>
                <!-- 判断二级菜单是否有结点（有这种情况） -->
                <el-submenu :index="(index+1).toString()+'-'+(index2+1).toString()" v-for="(item2, index2) in item.twoSubmenus" :key="index2" v-show="item2.threeSubmenus.length != 0">
                  <template>
                    <span slot="title">{{item2.menuName}}</span>
                  </template>
                  <!-- 三级菜单 -->
                  <el-menu-item-group>
                    <el-menu-item :index="(index+1).toString()+'-'+(index2+1).toString()+'-'+(index3+1).toString()" v-for="(item3, index3) in item2.threeSubmenus" :key="index3">{{item3.menuName}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </el-col>
        </div>
        <!-- aside end -->
        <!-- main start -->
        <el-main>
          <!-- 状态栏 -->
          <Bar></Bar>
          <!-- 路由 -->
          <div class="mian_content">
            <router-view></router-view>
          </div>
        </el-main>
        <!-- main end -->
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {getMenu,loginOut} from '../../common/model'
import Bar from '../Bar/Bar'
export default {
  name: 'Index',
  components: {
    Bar
  },
  data () {
    return {
      isCollapse: true,
      transition: true,
      menuList: '', // 菜单列表
      userName: '',
      userImg: ''
    }
  },
  methods: {
    isShow () {
      this.isCollapse = !this.isCollapse
    },
    // 获取用户信息
    getUser () {
      if(sessionStorage.getItem('token')) {
        this.userName = JSON.parse(sessionStorage.getItem('token')).userName
        this.userImg = JSON.parse(sessionStorage.getItem('token')).userImg
      }
    },
    // 退出登录
    handleCommand(command) {
      switch (command) {
        case 'loginOut':
          // 退出登录
          loginOut().then(res => {
            if(res.message == '成功') {
              // 删除sessionstorage
              sessionStorage.removeItem('token')
              this.$message({
                message: '退出登录成功',
                type: 'success'
              })
              // 跳转到首页
              this.$router.push('/login')
            }
          })
          break;
        case 'aboutMe':
          this.$router.push('/aboutme')
          break;
        default:
          break;
      }
    }
  },
  created () {
    getMenu().then(res => {
      console.log(res,9999)
      this.menuList = res.data
    });
    this.getUser ();
  }
}
</script>
<style lang="stylus" scoped>
  .el-header, .el-footer {
    height: 8vh!important;
    background-color: #242f42;
    color: #fff;
    line-height: 8vh;
    display: flex;
    justify-content: space-between
    .header_left {
      display: flex
      .title {
        font-size: 20px;
        margin-right: 10px;
      }
      .show{
        height: 8vh!important;
        line-height: 9vh;
        cursor: pointer
        i{
          font-size: 20px;
        }
      }
    }
    .header_right {
      display: flex;
      .image {
        height: 8vh;
        line-height: 12vh;
      }
      .name {
        .el-dropdown {
          color: #fff;
          cursor: pointer;
          margin-left: 10px
        }       
      }
    }
  }
  
  .el-aside {
    height: 92vh!important;
    background-color: rgb(50, 65, 87);
    color: #333;
    text-align: center;
    line-height: 200px;
    overflow: hidden 
    .el-menu{
      border: none
    }
    .el-submenu >>> .el-submenu__title {
      text-align: left!important
      .el-icon-location {
        margin-right: 12px
      }
    }
    // 划过背景颜色
    .el-submenu >>> .el-submenu__title:hover {
      background-color: rgb(40,52,70)!important
    }
    .el-submenu__title:hover {
      background-color: rgb(40,52,70)!important
    }
    // 文字居左
    .el-menu-item-group >>>.el-menu-item-group__title {
      text-align: left
    }
    // 划过背景颜色
    .el-menu-item:hover {
      background-color: rgb(40,52,70)!important
    }
    // 图标与文字间距
    .el-menu-item >>> i{
      margin-right: 12px
    }
    .el-menu-item {
      text-align: left
      .el-icon-menu{
        margin-right: 12px
      }
    }
  }
  // 划过背景颜色
  .el-menu-item:hover {
    background-color: rgb(40,52,70)!important
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0px!important;
  }

  .mian_content {
    overflow: auto!important;
    height: 86vh;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    height: 92vh
  }
</style>