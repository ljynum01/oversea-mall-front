<template>
    <div style="margin: 20px"></div>
    <diV style="width: 700px; margin: 0 auto">
      <el-form 
        :label-position="right" 
        label-width="80px" 
        :model="formLabelAlign"
                >
        <el-form-item label="名称:">
          <el-input v-model="formLabelAlign.sname"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input show-password v-model="formLabelAlign.spasswd"></el-input>
        </el-form-item>
        <el-form-item label="电话号码:">
          <el-input v-model="formLabelAlign.sphone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="发货地址:">
          <el-input v-model="formLabelAlign.saddressid"></el-input>
        </el-form-item> -->

    <el-form-item label="发货地址:">
    <div style="width: 600px;text-align:left;">
        <el-select v-model="value" clearable placeholder="请选择地区">
    <el-option
      v-for="item in options"
      :key="item.saddressid"
      :label="item.saddress"
      :value="item.saddress"

      @click="
              () => {
                this.formLabelAlign.saddressid = item.saddressid;
              }
            "
    >
    </el-option>
  </el-select>  <p>不选择则不更改地区</p>
    </div>
</el-form-item>

      </el-form>
      
      <div style="margin: 0 auto; height: 40px; width: 100px">
        <el-button type="primary" class="button" @click="button"
          >确认修改</el-button>
      </div>
    </div>

  </template>
  <script>
  import { ElMessage } from 'element-plus'
  
  export default {
    data() {
      return {
        options: [
          {
            value: '选项1',
            label: '黄金糕',
          },
          {
            value: '选项2',
            label: '双皮奶',
          },
          {
            value: '选项3',
            label: '蚵仔煎',
          },
          {
            value: '选项4',
            label: '龙须面',
          },
          {
            value: '选项5',
            label: '北京烤鸭',
          },
        ],
        value: '',

        labelPosition: "right",
        formLabelAlign: {
          sid: null,
          sname: null,
          spasswd: null,
          sphone: null,
          saddressid: null,
          oldName: null,
        },
      };
    },
    methods: {
      button() {
        const _this = this;
        this.$confirm("是否修改个人信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.axios({
              method: "post",
              url: "http://localhost:8080/merchant/update2",
              data: _this.formLabelAlign,
            }).then((res) => {
              
            });
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            _this.$router.push("/");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消修改",
            });
          });
      },
      AreaData(){
        // console.log("准备就绪")
    const _this = this;
      this.axios
        .get("http://localhost:8080/area/findAll")
        .then(function (resp) {
          console.log(resp.data);
          _this.options = resp.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      if (JSON.parse(sessionStorage.getItem("user")).role == "merchant") {
      }
      },
    },
    created () {
      const _this = this;
      this.axios
        .get(
          "http://localhost:8080/merchant/findByName?username=" +
            JSON.parse(sessionStorage.getItem("user")).username
        )
        .then(function (resp) {
          console.log(resp.data);
          _this.formLabelAlign = resp.data;
          _this.formLabelAlign.oldName = JSON.parse(sessionStorage.getItem("user")).username;
          
          console.log(_this.formLabelAlign);
        })
        .catch(function (error) {
          console.log(error);
        });

    this.AreaData();
    },
    
  };
  </script>
  
  <style scoped>
  .button {
    width: 100px;
    height: 40px;
  }
  </style>
  