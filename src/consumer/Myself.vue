<template>
    <div class="box">
      <div class="box__contain">
        <el-container direction="vertical">
          <el-header height="60px">
            <TheHeader></TheHeader>
          </el-header>
          <!-- <div class="box_myself">
            <el-button class="box_back" @click="back">回到首页</el-button>
          </div> -->
          <TheAside></TheAside>
  
          <diV style="width: 700px; margin: 0 auto">
            <el-form
              :label-position="right"
              label-width="80px"
              :model="formLabelAlign"
            >
              <div class="box_myself1">我的信息</div>
              <el-form-item label="Uid:">
                <el-input disabled v-model="formLabelAlign.uid"></el-input>
              </el-form-item>
              <el-form-item label="名称:">
                <el-input v-model="formLabelAlign.uname"></el-input>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  show-password
                  v-model="formLabelAlign.upasswd"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话号码:">
                <el-input v-model="formLabelAlign.uphone"></el-input>
              </el-form-item>
              <el-form-item label="收货地址:">
                <el-input v-model="formLabelAlign.uaddress"></el-input>
              </el-form-item>
            </el-form>
            <div style="margin: 0 auto; height: 40px; width: 100px">
              <el-button type="primary" class="button" @click="button"
                >确认修改</el-button
              >
            </div>
          </diV>
        </el-container>
      </div>
    </div>
  </template>
  <script>
  import TheCarousel from "./TheCarousel.vue";
  import TheHeader from "./TheHeader.vue";
  import TheAside from "./TheAside.vue";
  import TheMain from "./TheMain.vue";
  
  export default {
    components: { TheCarousel, TheHeader, TheAside, TheMain },
    data() {
      return {
        labelPosition: "right",
        formLabelAlign: {
          oldName: "",
          uname: "",
          upassword: "",
          uphone: "",
          uaddress: "",
        },
      };
    },
    methods: {
      button() {
        const _this = this;
        this.formLabelAlign.oldName = JSON.parse(
          sessionStorage.getItem("user")
        ).username;
        this.$confirm("是否修改个人信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            console.log(this.formLabelAlign);
            this.axios({
              method: "post",
              url: "http://localhost:8080/consumer/update",
              data: _this.formLabelAlign,
            })
              .then((res) => {
                if (
                  _this.formLabelAlign.upasswd !=
                  JSON.parse(sessionStorage.getItem("user")).password
                ) {
                  sessionStorage.clear();
                  _this.$router.push("/")
                  console.log("buyiyang");
                }
              })
              .catch(function (error) {
                console.log(error);
              });
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消修改",
            });
          });
      },
      back() {
        this.$router.push("/consumer");
      },
    },
    created() {
      const _this = this;
  
      this.axios
        .get(
          "http://localhost:8080/consumer/findById?id=" +
            JSON.parse(sessionStorage.getItem("user")).id
        )
        .then(function (resp) {
          console.log(resp.data);
          _this.formLabelAlign = resp.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  };
  </script>
  
  <style>
  .box_myself {
    width: 100%;
    height: 60px;
    background-color: #ff9999;
  }
  .box_myself1 {
    width: 100%;
    height: 70px;
    text-align: left;
    font-size: 20px;
    color: #00a1d6;
    line-height: 50px;
  }
  .box_back{
    margin-top: 15px;
  }
  </style>
  