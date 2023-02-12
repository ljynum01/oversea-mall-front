<template>
    <div class="main">
      <div class="main__newnacks">
        <div v-for="(item, index) in tableData" :key="index" class="snacklist">
              <div @click="details(index)">
                <div class="image">
                  <div v-if="item.imageList[0] && item.imageList[0].image">
                    <!-- {{ item.imageList[0].image }} -->
                    <el-image
                      :src="require('@/assets/' + item.imageList[0].image)"
                    ></el-image>
                  </div>
                </div>
                <div>
                  <div class="cname">{{ item.cname }}</div>
                  <div class="introduction">{{ item.introduction }}</div>
                  <div class="price">¥{{ item.price }}</div>
                </div>
              </div>
              <div class="shopcar" @click="addshopcar(item)">+</div>
            </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
        return {
          total: null,
          shopcarForm: {
            uid: null,
            cid: null,
            number: null,
          },
          tableData: [
          ],
        };
      },
      methods: {
        addshopcar(item) {
        this.shopcarForm.uid = JSON.parse(sessionStorage.getItem("user")).id;
        this.shopcarForm.number = 1;
        this.shopcarForm.cid = item.cid;
        console.log(this.shopcarForm);
        const _this = this;
        this.axios({
          method: "post",
          url: "http://localhost:8080/shopCar/addGoodForCar",
          data: _this.shopcarForm,
        })
          .then((res) => {
            if (res) {
              // alert("加入购物车成功");
              this.$notify({
            title: '成功',
            message: '加入购物车成功',
            type: 'success',
            position: 'top-left',
          })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      details(index) {
        this.$router.push({
          path: "/details",
          query: { id: this.tableData[index].cid },
        });
      },
      },
      created() {
        const _this = this;
        this.axios
          .get("http://localhost:8080/goods/findGoodsBySid?pageSize=" + 50)
          .then(function (resp) {
            console.log(resp.data);
            _this.tableData = resp.data.list;
            console.log(_this.tableData);
            _this.total = resp.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
  }
  </script>
  
  <style>
  .main__newnacks{
    /* border:1px solid #0cbbea; */
    width: 1200px;
    margin: auto;
  }
  .snacklist {
    width: 150px;
    height: 245px;
    float: left;
    margin-left: 45px;
    margin-top: 20px;
    border-radius: 23px;
    box-shadow: 0px 1px 3px #909090;
    overflow: hidden;
  }
  .image {
    width: 140px;
    height: 140px;
    border-radius: 23px;
    margin-bottom: 26px;
    margin-left: 5px;
    margin-top: 5px;
    /* border:1px solid black; */
  }
  .cname {
      width: 130px;
      margin-top: -20px;
      font-size: 16px;
      text-align: left;
      margin-left: 10px;
      overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
  .introduction {
    width: 130px;
    font-size: 14px;
    text-align: left;
    margin-left: 10px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
  .price {
    width: 50px;
    margin-left: 10px;
    float: left;
    font-size: 19px;
    margin-top: 7px;
  }
  .shopcar {
    width: 40px;
    height: 43px;
    float: left;
    line-height: 40px;
    text-align: center;
    border-radius: 23px 0px 23px 0px;
    background-color: #03c03c;
    margin-top: -28px;
    color: white;
    font-size: 30px;
    cursor: pointer;
    margin-left: 110px;
  }
  </style>
  