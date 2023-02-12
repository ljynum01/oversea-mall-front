<template>
    <div class="bigBox">
      <div class="loginBox screen">
        <h2 class="loginBox__heading">登录</h2>
        <span class="hint">{{ message }}</span>
        <div class="loginBox__main">
          <el-form :model="UserLogin">
            <el-form-item label="用户名">
              <el-input
                v-model="UserLogin.username"
                placeholder="请输入用户名"
                required
              />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="UserLogin.password"
                type="password"
                placeholder="请输入密码"
                show-password
                required
              />
            </el-form-item>
            <el-link @click="toregisterPage" type="primary">注册账号</el-link>
            <el-form-item class="ButtonBox">
              <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  el-input {
    margin-bottom: 5rem;
  }
  
  .bigBox {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.574),
        rgba(0, 0, 0, 0.59)
      ),
      url("../picture/photo-1669111959929-5851e6536991.webp");
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
    width: 30rem;
    height: 22rem;
    padding: 2rem;
    border-radius: 5px;
    background: white;
  
    box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.493);
    opacity: 0;
  }
  
  .bigBox .loginBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  
    width: 24rem;
    height: 28rem;
    padding: 2rem;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.544);
  
    box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.493);
  }
  
  .bigBox .loginBox .loginBox__heading {
    font-size: 2rem;
    color: white;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .loginBox__main >>> .el-form-item__label {
    color: white;
    width: 6rem;
  }
  
  .loginBox__main >>> .el-form-item__content {
    display: flex;
    flex: row;
    justify-content: space-around;
  }
  
  .loginBox__main >>> .ButtonBox {
    margin-top: 3rem;
  }
  
  .loginBox__main >>> .el-button {
    width: 18rem;
  }
  
  /* .el-link:hover {
    color: #e7e7e7;
  } */
  
  .el-link:checked {
    color: #e7e7e7;
  }
  
  .form__inputbox {
    font-size: 0.8rem;
    width: 90%;
    height: 3rem;
    margin-bottom: 2rem;
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
    padding-left: 2rem;
  }
  
  .form__inputbox .form_label {
    color: #2376b7;
    display: block;
    margin-bottom: 1rem;
  }
  
  .form__inputbox .form__input {
    display: block;
    padding: 0.5rem 0.8rem;
    border: none;
    background: #e7e7e7;
    width: 100%;
    text-align: inherit;
    outline: none;
    border-radius: 3px;
  }
  
  .form__inputbox .form__input:focus {
    border-bottom: #2376b7 4px solid;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.416);
  }
  
  .hint {
    margin: 0 auto;
    margin-bottom: 0.8rem;
    display: inline-block;
    text-align: center;
    width: 100%;
    font-size: 0.7rem;
    color: #ee2c79;
    opacity: 0;
  }
  </style>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        message: "",
        UserLogin: {
          id: 123,
          username: "",
          password: "",
          role: "merchant",
        },
      };
    },
    methods: {
      demo() {
        if (this.role === "merchant") {
          window.localStorage.setItem("roles", "merchant");
        } else if (this.role === "user") {
          window.localStorage.setItem("roles", "user");
        }
      },
      openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      },
      toregisterPage() {
        this.$router.push("/register");
      },
      onSubmit() {
        const that = this;
  
        console.log(this.UserLogin.username),
          console.log(this.UserLogin.password);
        if (this.UserLogin.username != null && this.UserLogin.password != null) {
          axios({
            method: "post",
            url: "http://localhost:8080/user/login",
            params: this.UserLogin,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }).then((res) => {
            console.log(res);
            that.openFullScreen2();
            setTimeout(() => {
              console.log(res.data);
              that.UserLogin.username = res.data.username;
              that.UserLogin.role = res.data.role;
              that.UserLogin.id = res.data.id;
              if (res.data.role == "admin" || res.data.role == "merchant") {
                let user = JSON.stringify(that.UserLogin);
                console.log(that.UserLogin);
                sessionStorage.setItem("user", [user]);
                console.log(JSON.parse(sessionStorage.getItem("user")));
                that.$router.push("/Goods");
              } else if (res.data.role == "consumer") {
                let user = JSON.stringify(that.UserLogin);
                sessionStorage.setItem("user", [user]);
                console.log(JSON.parse(sessionStorage.getItem("user")));
                that.$router.push("/consumer");
              } else {
                that.message = "用户名或密码错误";
                document.getElementsByClassName("hint")[0].style.opacity = 1;
              }
            }, 2000);
          });
        } else {
          that.message = "用户名和密码不能为空";
          document.getElementsByClassName("hint")[0].style.opacity = 1;
        }
      },
    },
  };
  </script>  