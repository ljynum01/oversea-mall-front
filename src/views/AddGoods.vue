<template>
  <div style="margin-top: 20px;"></div>
    <div style="margin-left: 200px;width: 800px;">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="cname">
          <el-input v-model="ruleForm.cname"></el-input>
        </el-form-item>
    
        <el-form-item label="介绍" prop="introduction">
          <el-input v-model="ruleForm.introduction"></el-input>
        </el-form-item>
    
        <el-form-item label="价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
    
        <el-form-item label="库存" prop="inventory">
          <el-input v-model="ruleForm.inventory"></el-input>
        </el-form-item>
    
        <div style="margin-left: 100px; margin-top: 40px; width: 600px">
          <el-select v-model="typeValue" placeholder="请选择商品类别">
            <el-option
              v-for="item in options"
              :key="item.lid"
              :label="item.category"
              :value="item.category"
              @click="
                () => {
                  this.ruleForm.lid = item.lid;
                }
              "
            >
            </el-option>
          </el-select>
        </div>
    
        <div style="margin-left: 100px; margin-top: 40px; width: 600px">
          <el-upload
            class="upload-demo"
            action="http://localhost:8080/upload/"
            :on-remove="handleRemove"
            name="fileUpload"
            list-type="picture"
            multiple
            :on-success="setfileList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">
                只能上传 jpg/png 文件，且不超过 500kb
              </div>
            </template>
          </el-upload>
        </div>
    
        <div style="margin-left: 200px; margin-top: 50px;"> 
          <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)"
            >上架商品</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <!-- <el-button @click="resetForm(ruleForm)">重置</el-button> -->
          <!-- <el-button @click="test()">test</el-button> -->
        </el-form-item>

        </div>
       
      </el-form>
  </div>
    </template>
    
    <script>
    import { ElMessage } from 'element-plus'
    export default {
      data() {
        return {
          options: [],
          typeValue: "",
    
          ruleForm: {
            cname: "",
            introduction: "",
            price: "",
            inventory: "",
            lid: "",
            sid: JSON.parse(sessionStorage.getItem("user")).id,
            imgUrl: "",
          },
    
          rules: {
            cname: [
              { required: true, message: "商品名称不能为空", trigger: "blur" },
            ],
            introduction: [
              { required: true, message: "介绍不能为空", trigger: "blur" },
            ],
            price: [{ required: true, message: "价格不能为空", trigger: "blur" }],
            inventory: [
              { required: true, message: "库存不能为空", trigger: "blur" },
            ],
            lid: [{ required: true, message: "类别不能为空", trigger: "blur" }],
          },
        };
      },
    
      methods: {
        setfileList(res) {
          console.log(res);
          this.ruleForm.imgUrl = res[0];
          console.log(this.ruleForm.imgUrl);
        },
        // handleRemove(file, fileList) {
        //   console.log(file, fileList);
        // },
        // handlePreview(file) {
        //   console.log(file);
        // },
    
        submitForm(formName) {
          console.log(formName);
          const _this = this;
          this.axios({
            method: "post",
            url: "http://localhost:8080/goods/addGoods",
            data: _this.ruleForm,
          })
            .then((res) => {
              if (res) {
                alert("《" + _this.ruleForm.cname + "》 上架成功！", "消息", {
                  confirmButtonText: "确定",
                  callback: (action) => {
                    // _this.$router.push("/Goods");
                  },
                });
                _this.$router.push("/Goods");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields()
        },
        handleExceed() {
          ElMessage('只能上传一张图片')
        },
      },
      created() {
        const _this = this;
        this.axios
          .get("http://localhost:8080/types/findAll")
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
    };
    </script>
    