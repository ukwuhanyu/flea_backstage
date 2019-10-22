<template>
    <div id='box'>
        <el-container>
           <!-- 标题 -->
            <el-header>
                <p>长大跳蚤管理平台</p>
            </el-header>
            <!-- 登录区 -->
            <el-main id="main_login">
                <el-form ref="form" :model="form" label-width="80px" >
                    <el-form-item label="用户登录" prop="user" label-position='right' id="lable_top" ></el-form-item>
                    <el-form-item   label="用户账号" prop="username" label-position='right' >
                    <el-input v-model="form.name" placeholder="请输入账号" class="inputtext"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" label-position='right' >
                   <el-input placeholder="请输入密码" v-model="form.input" show-password class="inputtext"></el-input>
                    </el-form-item>
                    <el-link type="primary" id="inputuser">注册账号</el-link>
                    <el-link type="primary" id="lesspwd">找回密码</el-link>
                    <el-form-item>
                    <el-button type="primary" @click="onSubmit"  >登录</el-button>
                    <el-button type="primary" >重置</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
            <!-- 版权声明 -->
            <el-footer>

            </el-footer>
        </el-container>
    </div>
</template>
<script>

import {getu} from './model'
  export default {
   
    data() {
      return {
        form: {
          name: '',
          input:''
        }
      }
      
    },
    methods: {
     
      onSubmit() {
        
          getu({
          
             userName:this.form.name,
             userPwd:this.form.input
           
              
          }).then(res=>{
            
           
              console.log(res,444444)
              if(res.message == '成功'){
                let user = {
                  userName: this.form.name
                }
                sessionStorage.setItem('token',JSON.stringify(user))
                this.$router.push('/admin')
              }
          })
    
      }
    }
  }
   
</script>
<style lang="stylus" scoped>
    .inputtext{
        width 200px;
    }
    .el-main{
        margin 0px auto;
        margin-top 25vh;
        background-color #FFFFFF;
        border-radius 25px;
    }
    p{
      font-size:2em;
      margin-top 20px
    }
    #lesspwd{
     float :right;
     margin-right 20px;
    }
    #inputuser{
       margin-left  20px;
    }
   #lable_top{
     font 2em sans-serif
   }
   #box{
     background-color #C0C0C0;
     min-height 100vh

   }
</style>