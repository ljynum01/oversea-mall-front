<template>
    <div class="header">
      <div class="header__logo">
        <img src="../assets/logo.svg" class="logo" />
      </div>
      <div class="header__title">
        <h2 style="font-size:20px;">白鲸鱼——海外购物商城</h2>
      </div>
      <div class="header__user">
        <div class="header__iconbox header__user-message">
          <img
            src="../assets/message.svg"
            class="header__icon"
            @click="myorders"
          />
        </div>
    </div>
    <div class="header__iconbox header__user-shopcar" @click="shopcar">
          <img src="../assets/shopcar.svg" class="header__icon" />
    </div>
    <el-dialog title="购物车" v-model="ttt">
      <table>
        <tr>
              <!-- <th class="title">编号</th> -->
              <th class="title">商品图</th>
              <th class="title">商品名</th>
              <th class="title">单价</th>
              <th class="title">数量</th>
              <th class="title">小计</th>
              <th class="title">操作</th>
        </tr>
        <tr v-for="(item, index) in cars" :key="index">
          <!-- <td>{{ item.id }}</td> -->
          <td>
            <el-image class="ii"
                  :src="require('@/assets/' + item.goods.imageList[0].image)"
                ></el-image>
          </td>
          <td>{{ item.goods.cname }}</td>
          <td>¥{{ item.goods.price }}</td>
          <td class="operation">
                <el-button @click="reduce(index)" class="reduce">-</el-button>
                <div class="num2">{{ item.number }}</div>
                <el-button @click="addition(index)" class="addition">+</el-button>
              </td>
              <th>¥{{ item.number * parseFloat(item.goods.price) }}</th>
           <el-button type="danger" @click="deletes(item.id)">删除</el-button>
        </tr>
      </table>
      <div class="sum">总价: ¥{{ Total }}</div>
      <el-button class="buy" @click="buy">结算</el-button>
  </el-dialog>
  
  <el-dropdown>
    <div class="header__user-box">
            <div class="header__user-image">
              <img
                src="../assets/bighead.svg"
                alt="people"
                class="header__image"
              />
            </div>
            <div class="header__user-username">
              <h3>{{ user.username }}</h3>
            </div>
      </div>
      <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                ><span @click="layout">退出登录</span></el-dropdown-item
              >
              <el-dropdown-item
                ><span @click="myself">个人信息</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
  </el-dropdown>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cars: [
          {
            id: "1",
            image: "123123",
            cname: "王小虎",
            price: "12",
            number: "1",
            inventory: "5",
          },
        ],
        ttt: false,
        user: JSON.parse(sessionStorage.getItem("user")),
        order: {
          cid: null,
          uid: null,
          number: null,
          sid: null,
        },
      };
    },
    computed: {
      Total() {
        let total = 0;
        for (let i = 0; i < this.cars.length; i++) {
          total += this.cars[i].number * this.cars[i].goods.price;
        }
        return total;
      },
    },
    methods: {
      buy() {
        const _this = this;
        console.log(this.cars.length);
        for (var i = 0; i < this.cars.length; i++) {
          this.order.cid = this.cars[i].goods.cid;
          this.order.uid = this.user.id;
          this.order.number = this.cars[i].number;
          this.order.sid = this.cars[i].goods.merchant.sid;
          this.axios({
            method: "post",
            url: "http://localhost:8080/orders/createOrders",
            data: this.order,
          }).then((res) => {
            if (res) {
            }
          });
        }
        alert("购买成功！");
        this.ttt = false;
        this.$router.push("/myorders");
      },
      reduce(index) {
        const _this = this;
        if (this.cars[index].number <= 1) {
          alert("数量已减为1");
        } else {
          this.axios
            .get(
              "http://localhost:8080/shopCar/decrease?id=" + this.cars[index].id
            )
            .then(function (resp) {
              if (resp) {
                _this.shopcar();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      addition(index) {
        console.log(this.cars[index]);
        if (this.cars[index].number < this.cars[index].goods.inventory) {
          const _this = this;
          this.axios
            .get(
              "http://localhost:8080/shopCar/increase?id=" + this.cars[index].id
            )
            .then(function (resp) {
              if (resp) {
                _this.shopcar();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          alert("亲～没货啦～>.<");
        }
      },
      deletes(id) {
        const _this = this;
        this.axios({
          method: "get",
          url: "http://localhost:8080/shopCar/delete?id=" + id,
        })
          .then((res) => {
            if (res) {
              this.shopcar();
              this.$notify({
            title: '删除成功',
            // message: '删除成功',
            type: 'success',
            position: 'top-left',
          })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(id);
      },
      shopcar() {
        const _this = this;
        this.axios
          .get(
            "http://localhost:8080/shopCar/findAllByUid?uid=" +
              JSON.parse(sessionStorage.getItem("user")).id
          )
          .then(function (resp) {
            console.log(resp.data);
            _this.cars = resp.data;
            _this.ttt = true;
          })
          .catch(function (error) {
            console.log(error);
          });
        // this.$router.push('/shopcar')
      },
      layout() {
        this.openFullScreen2();
        setTimeout(() => {
          sessionStorage.clear();
          this.$router.push("/");
        }, 2000);
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
      myorders() {
        this.$router.push("/myorders");
      },
      myself() {
        this.$router.push("/myself");
      },
    }
  }
  </script>
  
  
  <style lang="scss">
  .header {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  
    &__iconbox {
      padding: 0 10px;
      height: 100%;
      align-self: stretch;
      display: flex;
      align-items: center;
  
      &:hover {
        background-color: #f7f7f7;
      }
    }
  
    &__logo{
      width: 40px;
      height: 40px;
    }
  
    &__user {
      display: flex;
      flex-direction: row;
      align-self: stretch;
      align-items: center;
  
      &-box {
        display: flex;
        align-items: center;
        align-self: stretch;
        &:hover {
          background-color: #f7f7f7;
        }
      }
  
      &-image {
        width: 45px;
        height: 45px;
        border-radius: 100px;
      }
  
      &-image:hover {
        background-color: #f7f7f7;
      }
  
      &-username {
        padding: 0 8px;
      }
    }
  
    }
  .logo{
      width: 40px;
      height: 40px;
    }
  .header__title{
    margin: auto;
  }
  .header__user{
    display: flex;
      flex-direction: row;
      align-self: stretch;
      align-items: center;
  }
  .header__icon{
      width: 25px;
      height: 25px;
  }
  .title {
    width: 250px;
  }
  .reduce {
    float: left;
    margin-left: 1px;
  }
  .addition {
    float: left;
  }
  .operation {
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: center;
  }
  td {
    height: 60px;
  }
  .sum {
    font-size: 20px;
    margin-left: 510px;
    margin-top: 20px;
  }
  .num2 {
    float: left;
    width: 25px;
    height: 32px;
    text-align: center;
    line-height: 32px;
  }
  .ii{
    width: 50px;
    height: 50px;
  }
  
  </style>