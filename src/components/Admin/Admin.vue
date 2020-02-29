<template>
  <div class="admin">
    <div class="admin_content">
      <div class="admin_new">
        <el-button type="primary" size="medium" @click="add()">新增</el-button>
      </div>
      <el-table :data="adminList" style="width: 100%">
        <el-table-column label="日期" width="190">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.userImg" class="admin_img" />
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <!-- <el-popover trigger="hover" placement="top"> -->
            <!-- <p>姓名: {{ scope.row.userName }}</p>
            <p>住址: {{ scope.row.userName }}</p>-->
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.userName }}</el-tag>
            </div>
            <!-- </el-popover> -->
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch
              @change="change(scope.row)"
              v-model="scope.row.isDelete"
              active-color="#ff4949"
              inactive-color="#13ce66"
            ></el-switch>
            <el-button size="mini" @click="change(scope.row)">编辑</el-button>&nbsp;
            <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页start -->
      <el-pagination
        @current-change="toPage"
        class="toPage"
        background
        layout="prev, pager, next"
        :total="adminCount"
        :page-size="6"
      ></el-pagination>
      <!-- 分页end -->
    </div>
    <!-- 添加用户start -->
    <div class="addTable" v-if="flag">
      <div class="back">
        <el-button size="small" icon="el-icon-arrow-left" @click="back">返回</el-button>
      </div>
      <div class="addTable_content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.userPwd"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              action
              list-type="picture-card"
              multiple
              ref="userUpload"
              :auto-upload="false"
              :limit="1"
              :http-request="doAdd"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 添加用户end -->
  </div>
</template>
<script>
import { getAdmin, delAdmin, deleteAdmin, createAdmin } from "./model";
export default {
  name: "Admin",
  data() {
    return {
      adminList: [],
      flag: false,
      form: {
        userName: "",
        userPwd: ""
      },
      imageUrl: "",
      adminCount: 0
    };
  },
  methods: {
    // 获取管理员列表
    getAdminUser(p) {
      getAdmin(p).then(res => {
        console.log(res, "hhh");
        this.adminCount = res.count;
        this.adminList = res.data;
      });
    },
    // 返回到管理员列表
    back() {
      this.flag = !this.flag;
      this.getAdminUser({
        limit: 6,
        page: 1
      });
    },
    // 编辑
    change(id) {
      console.log(id, "id");
      this.$prompt("请输入邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的邮箱是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 删除
    del(item) {
      this.$confirm("此操作将永久删除该该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除
          let parmas = {
            userId: item.userId,
            userImg: item.userImg
          };
          deleteAdmin(parmas).then(res => {
            console.log(res, "resssss");
            if (res.message == "成功") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              console.log(this.adminList, "bbbbbb");
              this.adminList = this.adminList.filter((items, index) => {
                return items.userId != item.userId;
              });
            } else {
              this.$message({
                type: "success",
                message: res.message
              });
            }
          });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 滑块改变是触发，修改状态
    change(e) {
      // 状态修改操作
      delAdmin({ userId: e.userId, isDelete: e.isDelete ? 1 : 0 }).then(res => {
        if (res.message == "成功") {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 加入添加用户界面
    add() {
      this.flag = !this.flag;
    },
    // 调取提交接口
    doAdd(f) {
      let formData2 = new FormData();
      formData2.append("file", f.file);
      formData2.append("userName", this.form.userName);
      formData2.append("userPwd", this.form.userPwd);
      this.$axios
        .post("http://101.37.25.201:9090/back-user/", formData2, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.message == "成功") {
            this.$message({
              message: "用户创建成功",
              type: "success"
            });
            // 将表单清空
            this.form = {};
            this.$refs.userUpload.clearFiles();
          } else {
            this.$message.error(res.message);
          }
        });
    },
    // 提交创建用户
    onSubmit() {
      if (!this.form.userName) {
        this.$message({
          message: "用户名不能为空",
          type: "warning"
        });
      } else if (!this.form.userPwd) {
        this.$message({
          message: "密码不能为空",
          type: "warning"
        });
      } else {
        if (this.$refs.userUpload.uploadFiles.length >= 1) {
          this.$refs.userUpload.submit();
        } else {
          this.$message({
            message: "请选择上传头像",
            type: "warning"
          });          
        }
      }
    },
    // 分页
    toPage(nowPage) {
      this.getAdminUser({
        limit: 6,
        page: nowPage
      });
    }
  },
  created() {
    this.getAdminUser({
      limit: 6,
      page: 1
    });
  }
};
</script>
<style lang="stylus" scoped>
.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

.toPage {
  margin-top: 18px;
}

.admin {
  position: relative;
}

.admin_img {
  width: 50px;
}

.admin_content {
  // margin-top: 20px;
  padding-top: 20px;
  margin-left: 20px;
  width: 1000px;
}

.admin_content .admin_new {
  margin-bottom: 20px;
}

.addTable {
  position: absolute;
  width: 100%;
  height: 86vh;
  top: 0;
  left: 0;
  background-color: #E9EEF3;
}

.addTable .addTable_content {
  width: 600px;
}

.addTable .back {
  padding: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>