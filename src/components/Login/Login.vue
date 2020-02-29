<template>
  <div id="box">
    <el-container>
      <!-- 标题 -->
      <!-- <el-header>
        <p>长大跳蚤管理平台</p>
      </el-header> -->
      <!-- 登录区 -->
      <el-main id="main_login">
        <p class="login_title">商家管理平台登录</p>
        <el-form ref="form" :model="form" label-width="80px">
          <!-- <el-form-item label="" prop="user" label-position="right" id="lable_top"></el-form-item> -->
          <el-form-item label="" prop="username" label-position="right">
            <el-input v-model="form.name" placeholder="请输入账号" class="inputtext"></el-input>
          </el-form-item>
          <el-form-item label="" label-position="right">
            <el-input placeholder="请输入密码" v-model="form.input" show-password class="inputtext"></el-input>
          </el-form-item>
          <!-- <el-link type="primary" id="inputuser">注册账号</el-link>   -->
          <el-link type="primary" id="lesspwd">忘记密码?</el-link>
            <el-button type="primary" @click="onSubmit" class="login">登录</el-button>
            <!-- <el-button type="primary">重置</el-button> -->
        </el-form>
      </el-main>
      <!-- 没有账号start -->
      <div class="toReg">
        没有账号?<span>去开店</span>
      </div>
      <!-- 没有账号end -->
      <!-- 版权声明 -->
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script>
import { toLogin } from "./model";
export default {
  data() {
    return {
      form: {
        name: "",
        input: ""
      }
    };
  },
  methods: {
    // 登录提交
    onSubmit() {
      // 调取登录方法接口
      toLogin({
        userName: this.form.name,
        userPwd: this.form.input
      }).then(res => {
        console.log(res,'kun')
        // 判断是否登录成功
        if (res.message == "成功") {
          let user = {
            userName: this.form.name,
            tokenId: res.data.token,
            userId: res.data.userId,
            userImg: res.data.userImg,
            createTime: res.data.createTime,
            updateTime: res.data.updateTime,
            isDelete: res.data.isDelete
          };
          // 将用户信息存入sessionStorage中
          sessionStorage.setItem("token", JSON.stringify(user));
          // 跳转页面
          this.$router.push("/admin");
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.inputtext {
  width: 100%;
}

.el-main {
  // margin: 0px auto;
  // margin-top: 25vh;
  width: 380px;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.06);
  box-sizing: border-box;
  position: absolute;
  padding: 24px 40px
  left: 50%;
  top: 50%;
  margin-left: -190px;
  margin-top: -200px;
  // background-color: rgba(255,255,255,0.5)
}
.el-main .login_title {
    font-size: 18px;
    text-align: center;
    color: #fff
    margin: 0 0 20px;
    color: #2d2f33;
}
p {
  font-size: 2em;
  margin-top: 20px;
  color #fff
}

#lesspwd {
  // float: right;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 15px
}

#inputuser {
  display: inline-block;
  margin-bottom: 15px

}

#lable_top {
  font: 2em sans-serif;
}

#box {
  background-color: #C0C0C0;
  min-height: 100vh;
  // background: url('../../assets/images/bj.jpg') no-repeat;
  background-color: #f5f5f5;
  background-size: 100% 100%;
  position: relative;
}

.el-form-item >>> .el-form-item__content {
  margin-left: 0!important
}
.login {
  margin-top: 8px;
  padding: 0 16px;
  width: 100%;
  font-size: 16px;
  line-height: 43px;
  border-radius: 3px;
}

.toReg {
    margin-top: 20px;
    padding: 23px 0;
    text-align: center;
    color: #878d99;
    margin: 0 auto;
    width: 380px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.06);
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -190px;
    margin-top: 110px;
    font-size: 14px;
}
.toReg span{
  margin-left: 8px;
  color: #1989fa;
  cursor: pointer;
}
</style>