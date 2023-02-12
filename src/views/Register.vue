<template>
    <div class="bigBox">
      <div class="registerBox">
        <div class="heading">
          <h2>注册</h2>
        </div>
        <div class="form">
          <div class="form__inputbox">
            <label class="form_label" for="name"
              >用户名<span class="span">{{ message }}</span></label
            >
  
            <input
              type="text"
              class="form__input form__input-1"
              placeholder="请输入用户名"
              id="name"
              v-model="UserLogin.username"
            />
          </div>
  
          <div class="form__inputbox">
            <label class="form_label" for="password">密码</label>
            <input
              type="password"
              class="form__input form__input-2"
              placeholder="请输入密码"
              id="password"
              v-model="UserLogin.password"
            />
          </div>
  
          <div class="mb-2 flex items-center text-sm">
            <el-radio-group v-model="radio" class="ml-4">
              <el-radio label="1" size="large">消费者</el-radio>
              <el-radio label="2" size="large">商家</el-radio>
            </el-radio-group>
          </div>
  
          <div class="form__button" @click="register">注册</div>
          <div class="form__button2" @click="backLogin">返回登录</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        message: "sss",
        UserLogin: {
          username: "",
          password: "",
        },
        radio: "1",
      };
    },
    methods: {
        backLogin(){
            this.$router.push("/");
        },
      register() {
        const _this = this;
        console.log(this.UserLogin.username),
          console.log(this.UserLogin.password);
        console.log(this.radio);
        if (this.radio == 1) {
          this.axios
            .get(
              "http://localhost:8080/user/consumerRegister?username=" +
                this.UserLogin.username +
                "&password=" +
                this.UserLogin.password
            )
            .then(function (resp) {
              if (resp.data == true) {
                setTimeout(() => {
                  _this.$router.push("/");
                }, 1000);
              } else {
                _this.message = "用户名已存在";
                document.getElementsByClassName("span")[0].style.opacity = 1;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else if (this.radio == 2) {
          this.axios
            .get(
              "http://localhost:8080/user/merchantRegister?username=" +
                this.UserLogin.username +
                "&password=" +
                this.UserLogin.password
            )
            .then(function (resp) {
              if (resp.data == true) {
                setTimeout(() => {
                  _this.$router.push("/");
                }, 1000);
              } else {
                _this.message = "用户名已存在";
                document.getElementsByClassName("span")[0].style.opacity = 1;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
    },
  };
  </script>
  
  <style>
  .bigBox {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.574),
        rgba(0, 0, 0, 0.59)
      ),
      url("../picture/photo-1669178792498-332864ef96e1.webp");
    background-blend-mode: screen;
    background-size: cover;
    color: white;
  
    position: relative;
  }
  
  .bigBox .registerBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 28rem;
    height: 26rem;
    height: 33rem;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0.8rem 2rem rgb(0 0 0 / 49%);
  }
  
  .form__inputbox {
    font-size: 0.8rem;
    width: 90%;
    height: 3rem;
    margin-bottom: 4rem;
  }
  
  .registerBox .heading {
    text-align: center;
    color: #2376b7;
    font-size: 2rem;
    letter-spacing: 0.8rem;
    margin-bottom: 2rem;
  }
  
  .registerBox .form {
    margin: 0 auto;
    padding-left: 3rem;
  }
  
  .form__inputbox .form_label {
    color: #2376b7;
    display: inline-block;
    margin-bottom: 1rem;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .form__inputbox .form__input {
    display: block;
    padding: 8px 0.8rem;
    border: none;
    background: #e7e7e7;
    width: 100%;
    text-align: inherit;
    outline: none;
    font-size: 12px;
    border-radius: 3px;
  }
  
  .form__inputbox .form__input:focus {
    border-bottom: #2376b7 4px solid;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.416);
  }
  
  .form__button {
    padding: 0.5rem 0.8rem;
    background: #2376b7;
    text-align: center;
    width: 90%;
    border-radius: 3px;
  }

  .form__button2 {
    padding: 0.5rem 0.8rem;
    background: #2376b7;
    text-align: center;
    width: 90%;
    border-radius: 3px;
    margin-top: 6px;
  }
  
  .span {
    float: right;
    color: red;
    padding: 0;
    font-size: 0.8rem;
    opacity: 0;
  }
  </style>
  