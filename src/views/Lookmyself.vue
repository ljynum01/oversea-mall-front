<template>
    <div style="margin: 20px"></div>
    <diV style="width: 700px; margin: 0 auto">
      <el-form :label-position="right" label-width="80px" :model="formLabelAlign">
        <div v-if="user.role == 'admin'">
          <el-form-item label="名称">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="update">修改信息</el-button>
          </el-form-item>
        </div>
        <div v-if="user.role == 'merchant'">
          <el-form-item label="名称">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formLabelAlign.phone"></el-input>
          </el-form-item>
          <el-form-item label="发货地址">
            <el-input v-model="formLabelAlign.address"></el-input>
          </el-form-item>
          <el-form-item label="送货天数">
            <el-input v-model="formLabelAlign.time"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </diV>
  </template>
  
  <script>
  import { right } from "@popperjs/core";
  
  export default {
    data() {
      return {
        user: JSON.parse(sessionStorage.getItem("user")),
        labelPosition: "right",
        formLabelAlign: {
          name: "老王",
          phone: "13126019494",
          address: "广东省中山市",
          password: "",
        },
        updateForm: {
          aid: null,
          aname: null,
          apasswd: null,
          oldName: null,
        },
      };
    },
    methods: {
      update() {
        this.updateForm.oldName = this.user.username;
        this.updateForm.aid = this.user.id;
        this.updateForm.aname = this.formLabelAlign.name;
        this.updateForm.apasswd = this.formLabelAlign.password;
        console.log(this.updateForm);
        const _this = this;
        this.axios({
          method: "post",
          url: "http://localhost:8080/admin/update2",
          data: _this.updateForm,
        }).then((res) => {
          alert("修改成功");
  
          sessionStorage.clear();
          _this.$router.push("/");
          console.log("buyiyang");
        });
      },
    },
    created() {
      const _this = this;
      let role = JSON.parse(sessionStorage.getItem("user")).role;
      console.log(JSON.parse(sessionStorage.getItem("user")));
      let id = JSON.parse(sessionStorage.getItem("user")).sid;
      if (role == "merchant") {
        this.axios
          .get(
            "http://localhost:8080/merchant/findByName?username=" +
              JSON.parse(sessionStorage.getItem("user")).username
          )
          .then(function (resp) {
            console.log(4566556);
            console.log(resp.data);
            _this.formLabelAlign.name = resp.data.sname;
            _this.formLabelAlign.phone = resp.data.sphone;
            _this.formLabelAlign.address = resp.data.area.saddress;
            _this.formLabelAlign.time = resp.data.area.time;
            console.log(_this.formLabelAlign);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (role == "admin") {
        this.axios
          .get(
            "http://localhost:8080/admin/findByName?username=" +
              JSON.parse(sessionStorage.getItem("user")).username
          )
          .then(function (resp) {
            console.log(resp.data);
            _this.formLabelAlign.name = resp.data.aname;
            _this.formLabelAlign.password = resp.data.apasswd;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  };
  </script>
  