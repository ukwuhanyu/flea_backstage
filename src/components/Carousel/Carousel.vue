<template>
  <div class="carousel_content">
    <!-- 图片上传板块start -->
    <div class="upload">
      <el-upload
        class="upload-demo"
        action
        ref="upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
        :http-request="uploadImg"
      >
        <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </div>
    <!-- 图片上传板块end -->
    <!-- 轮播图展示和操作start -->
    <el-table :data="caroselList" style="width: 100%">
      <el-table-column label="图片" width="500">
        <template slot-scope="scope">
          <!-- <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
          <img :src="scope.row.carouselImg" class="showImg" />
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
    <!-- 轮播图展示和操作end -->
    <!-- 分页start -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="this.caroselCount"
      :page-size="4"
      @current-change="currentChange"
      class="toPage"
    ></el-pagination>
    <!-- 分页end -->
  </div>
</template>
<script>
import {
  getCarousel,
  changeCarousel,
  delCarousel,
  uploadCarousel
} from "./model";
export default {
  name: "Carousel",
  data() {
    return {
      caroselList: [], // 轮播图
      fileList: [],
      caroselCount: 0 //轮播图个数
    };
  },
  methods: {
    // 上传图片
    uploadImg(item) {
      let obj = {
        file: item.file,
        carouselRank: 100,
        isDelete: false
      };
      let fileObject = item.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      formData.append("carouselRank", 100);
      formData.append("isDeleted", false);
      console.log(item);
      // uploadCarousel(obj,{headers:{'Content-Type': 'multipart/form-data'}}).then(res => {
      //   console.log('good',res)
      // })
      this.$axios
        .post("http://101.37.25.201:9090/wx-carousel/", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          console.log(res, "oooo");
          // 清空文件列表
          if (res.data.message == "成功") {
            this.$refs.upload.clearFiles();
            this.$message({
              message: "上传成功",
              type: "success"
            });
            this.getCarouselImg({
              limit: 4,
              page: 1
            });
          } else {
            this.$message({
              message: "上传失败",
              type: "error"
            });
          }
        });
    },
    submitUpload() {
      // 执行上传
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 轮播图状态改变
    change(item) {
      changeCarousel({
        carouselId: item.carouselId,
        isDelete: item.isDeleted ? 1 : 0
      }).then(res => {
        if (res.message == "成功") {
          this.$message({
            message: "状态修改成功",
            type: "success"
          });
        }
      });
    },
    // 删除图片
    deleteImg(item) {
      let { carouselId, carouselUrl } = item;
      console.log(item);
      delCarousel(carouselId).then(
        res => {
          if (res.message == "成功") {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.caroselList = this.caroselList.filter((items, index) => {
              return items.carouselId != item.carouselId;
            });
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        }
      );
    },
    getCarouselImg(p) {
      // 获取轮播图列表
      getCarousel(p).then(res => {
        this.caroselList = res.data;
        this.caroselCount = parseInt(res.count);
      });
    },
    addNum(item) {},
    currentChange(nowPage) {
      this.getCarouselImg({
        limit: 4,
        page: nowPage
      });
    }
  },
  created() {
    this.getCarouselImg({
      limit: 4,
      page: 1
    });
  }
};
</script>
<style lang="stylus" scoped>
.carousel_content {
  width: 1000px;
  margin-top: 20px;
  margin-left: 20px;
}

.carousel_content .upload {
  width: 250px;
  margin-bottom: 20px;
}

.showImg {
  width: 100px;
}

.toPage {
  margin-top: 18px;
}
</style>