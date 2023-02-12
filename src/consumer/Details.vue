<template>
    <div class="box">
      <div class="box__contain">
        <el-container direction="vertical">
          <el-header height="60px">
            <TheHeader></TheHeader>
          </el-header>
          <TheAside></TheAside>
          <div class="box_top">
            <div class="box_sname">
            <div v-if="mall && mall.merchant">
            <el-popover
      placement="top-start"
      title="商家信息"
      :width="200"
      trigger="hover"
    >
      <template #reference>
        <el-button>店铺名:  {{ mall.merchant.sname }} </el-button>
      </template>
      <div>店铺名: {{ mall.merchant.sname }} </div>
      <br/>
      <div>店铺电话: {{ mall.merchant.sphone }} </div>
      <br/>
      <div>店铺地址: {{ mall.merchant.area.saddress}} </div>
      <br/>
      <div>送达期限: {{ mall.merchant.area.time }} 天</div>
    </el-popover>
      </div>
          </div>
          </div>
          <div class="box_main">
            <div class="box_image">
                  <div
                    v-if="
                      mall.imageList &&
                      mall.imageList[0] &&
                      mall.imageList[0].image
                    "
                  >
                    <img
                      :src="require('@/assets/' + mall.imageList[0].image)"
                      style="width: 500px; height: 500px"
                    />
                  </div>
                </div>
                <div class="box_main2">
                  <div class="box_introduction">
                    {{ mall.introduction }}
                  </div>
                  <div class="star">
                    <el-rate
                      v-model="star"
                      disabled
                      show-score
                      text-color="#ff9900"
                      >
                  </el-rate>
                  </div>
                   <div class="price_box"><p style="float:left;font-size: 16px;line-height: 30px;">¥</p>{{ mall.price }}</div>
                   <div style="margin-left: 50px;"> <hr/> </div>
                   
                   <div class="haiwai">
                      <div class="logo1">
                      <img src="../assets/logo1.svg" class="logo" />
                      </div>
                      <div class="ziti">白鲸鱼海外购</div>
                  </div>
                  <!-- <div class="logo1">
                      <img src="../assets/suo.svg" class="logo" />
                      </div> -->
                </div>
                <div class="card">
                  <el-col :span="200">
                   <el-card shadow="hover"> 
                    <div class="price1"><p style="float:left;font-size: 16px;line-height: 30px;">¥</p>{{ mall.price }}</div> 
                    <div class="time1" v-if="mall && mall.merchant">免费配送，预计 {{ mall.merchant.area.time }} 天后送达。</div>
                    <div class="dizi" @click="chooseaddress"><img src="../assets/dizi.svg" class="logo2" />选择配送地址</div>
                    <div class="youhuo">现在有货</div>
                    <div class="num1">单人仅限购买10份</div>
                    <div class="num">
                      <el-input-number
                      v-model="num"
                      :min="1"
                      :max="10"
                    ></el-input-number></div>
                    <div><button class="addcar" @click="addbuy">加入购物车</button></div>
                    <div><button class="addcar" @click="buy">立即购买</button></div>
                  </el-card>
                  </el-col>
                    </div>
          </div>
                  <div style="width:1200px;margin:auto;margin-top:100px"><hr/></div>
                    <div class="comment">
                <div class="comment2">此商品在白鲸鱼代购商城中的商品评论</div>
                <div class="comment3">
                  <el-rate
                      v-model="star"
                      disabled
                      show-score
                      text-color="#ff9900"
                      >
                  </el-rate>
                </div>
                <div class="comment4">
                  <el-input
                    type="textarea"
                    :rows="2"
                    :autosize="{ minRows: 5, maxRows: 7 }"
                    placeholder="亲～给个好评吧！"
                    v-model="textarea"
                    maxlength="50"
                    show-word-limit
                  >
                  </el-input>
                  <button class="comment4_button" @click="addcomment">
                    发表评论
                  </button>
                  <span v-text="showInput"></span>
                </div>
                <div class="comment5">用户评论</div>
  
                <div class="box_comment5">
                  <div
                    class="comment6"
                    v-for="(item, index) in comment"
                    :key="index"
                  >
                    <div class="comment6_uname">
                      <div class="comment6_uname1"><img src="../assets/bighead.svg" style="width:40px;height:40px;"/></div>
                      {{ item.consumer.uname }}</div>
                    <div class="comment6_content">{{ item.content }}</div>
                    <div class="comment6_bottom">
                      <div class="comment6_ptime">{{ item.ptime }}</div>
                      <p style="color:orange">已确认购买</p>
                    </div>
                  </div>
                </div>
              </div>
        </el-container>
      </div>
    </div>
  </template>
  
  <script>
  import TheHeader from "./TheHeader.vue";
  import TheAside from "./TheAside.vue";
  import TheMain from "./TheMain.vue";
  import moment from "moment";
  import forbiddenArray from "@/js/BadWord";
  export default ({
    components: {TheHeader, TheAside, TheMain},
    data() {
      return {
        forbiddenArray:[],
        star: 4.5,
        total: null,
        value: null,
        mall: {},
        uuu: {},
        num: 1,
        comment: null,
        textarea: "",
        commentForm: {
          uid: "",
          cid: "",
          content: "",
        //   ptime: "",
        },
        shopcarForm: {
          uid: null,
          cid: null,
          number: null,
        },
        user: JSON.parse(sessionStorage.getItem("user")),
        order: {
          cid: null,
          uid: null,
          number: null,
          sid: null,
        },
      };
    },
    methods: {
      addbuy() {
        this.shopcarForm.uid = JSON.parse(sessionStorage.getItem("user")).id;
        this.shopcarForm.cid = this.$route.query.id;
        this.shopcarForm.number = this.num;
        console.log(this.shopcarForm);
        const _this = this;
        this.axios({
          method: "post",
          url: "http://localhost:8080/shopCar/addGoodForCar",
          data: _this.shopcarForm,
        })
          .then((res) => {
            if (res) {
              this.$notify({
            title: '成功',
            message: '加入购物车成功',
            type: 'success',
            position: 'top-left',
          })
            }
            c;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      buy() {
        this.order.uid = JSON.parse(sessionStorage.getItem("user")).id;
        this.order.cid = this.$route.query.id;
        this.order.number = this.num;
        this.order.sid = this.mall.merchant.sid;
        console.log(this.order);
        const _this = this;
        this.axios({
          method: "post",
          url: "http://localhost:8080/orders/createOrders",
          data: this.order,
        }).then((res) => {
          if (res){
          }
        });
        alert("购买成功！");
        this.$router.push("/myorders");
      },
      chooseaddress() {
        this.$router.push("/myself");
      },
      addcomment() {
        this.forbiddenArray = forbiddenArray.forbiddenArray;
        var re = '';
        for(var i=0;i<forbiddenArray.length;i++){
              if(i==forbiddenArray.length-1)
                 re+=forbiddenArray[i];
             else
               re+=forbiddenArray[i]+"|";
         }
         var pattern = new RegExp(re,"gi")
         this.textarea = this.textarea.replace(pattern,"***")
        console.log(JSON.parse(sessionStorage.getItem("user")).id);
        this.commentForm.uid = JSON.parse(sessionStorage.getItem("user")).id;
        this.commentForm.cid = this.$route.query.id;
        this.commentForm.content = this.textarea;
        const _this = this;
        this.axios({
          method: "post",
          url: "http://localhost:8080/comment/insert",
          data: _this.commentForm,
        })
          .then((res) => {
            if (res) {
              alert("评论发布成功");
              this.$router.go(0);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(this.commentForm);
        console.log(this.textarea);
      },
    },
    created() {
      let id = this.$route.query.id;
      console.log(id);
      const _this = this;
      this.axios
        .get("http://localhost:8080/goods/findGoodsById?id=" + id)
        .then(function (resp) {
          console.log(resp);
          _this.mall = resp.data;
          console.log(_this.mall);
          _this.total = resp.data.total;
          _this.comment = resp.data.commentList;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // created() {
    //   const _this = this;
    //   this.axios
    //     .get(
    //       "http://localhost:8080/consumer/findById?id=" +
    //         JSON.parse(sessionStorage.getItem("user")).id
    //     )
    //     .then(function (resp) {
    //       console.log(resp.data);
    //       _this.uuu = resp.data;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
  });
  </script>
  <style>
  .box_top {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    background-color: #ff9999;
    align-items: center;
    margin-top: 10px;
  }
  .box_sname{
    width: 350px;
    height: 60px;
    float: left;
    text-align: left;
    margin-left: 950px;
    color: white;
    text-align: center;
    line-height: 17px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 22px;
  }
  .box_main {
    width: 1200px;
    height: 100%;
    height: max-content;
    margin: auto;
    margin-top: 50px;
    display: table;
  }
  .box_image {
    width: 500px;
    height: 500px;
    float: left;
    border-radius: 10px;
    overflow: hidden;
  }
  .box_main2 {
    float: left;
    /* height: 500px; */
  }
  .box_introduction{
    margin-left: 50px;
    font-size: 24px!important;
    line-height: 32px!important;
    width: 350px;
  }
  .star{
    margin-left: 50px;
    text-align: left;
  }
  .price_box{
    margin-left: 50px;
    font-size: 30px;
    text-align: left;
    height: 40px;
  }
  .haiwai{
    margin-left: 50px;
  }
  .logo1{
    text-align: left;
    float: left;
  }
  .ziti{
    font-size: 15px;
    margin-top: 15px;
    color: blue;
    margin-left: 6px;
    text-align: left;
    float: left;
  }
  .card{
    /* border: 1px solid black; */
    float: left;
    margin-top: 50px;
    margin-left: 15px;
  }
  .price1{
    font-size: 30px;
    text-align: left;
  }
  .time1{
    margin-top: 10px;
    font-size: 16px;
  }
  .dizi{
    text-align: left;
    margin-top: 10px;
    cursor:pointer;
   
  }
  .logo2{
    width:20px;
    height: 20px;
  }
  .youhuo{
    text-align: left;
    color: green;
    margin-top: 10px;
    font-size: 17px;
  }
  .num1{
    text-align: left;
    margin-top: 10px;
    font-size: 13px;
  }
  .num{
    margin-top: 20px;
    width: 200px;
    text-align: left;
    height: 60px;
  }
  .addcar{
    margin-top: 10px;
    width: 200px;
    height: 30px;
    background-color: orange;
    border-radius: 20px;
    border: none;
  }
  .addcar:hover{
    background-color:orangered;
  }
  
  
  .comment {
    height: 100%;
    width: 1100px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .comment2 {
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    margin-left: 30px;
    color: #c45500!important;
  }
  .comment3 {
    height: 30px;
    line-height: 30px;
    text-align: left;
    margin-left: 30px;
    /* border: 1px solid black; */
  }
  .comment4 {
    margin-left: 30px;
  }
  .comment4_button {
    width: 100px;
    height: 36px;
    margin-left: 960px;
    margin-top: 10px;
    font-size: 15px;
    color: white;
    background-color: #00a97f;
    border-radius: 20px;
  }
  .comment5 {
    height: 40px;
    /* width: 1100px; */
    /* border: 1px solid black; */
    margin: 0 auto;
    text-align: left;
    line-height: 40px;
    margin-left: 30px;
    font-size: 18px;
  }
  .box_comment5 {
    margin: 0 auto;
    margin-left: 30px;
    height: 200px;
    margin-top: 20px;
  }
  .comment6 {
    height: 100%;
    margin-top: 20px;
    box-shadow: 0px 2px 20px #0000000f;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .comment6_uname1{
    /* border: 1px solid black; */
    float: left;
    margin-top: -10px;
  }
  .comment6:last-child {
    margin-bottom: 100px;
  }
  
  .comment6_uname {
    color: #c45500;
    font-size: 18px;
    text-align: left;
    padding: 0 65px;
    width: 100%;
  }
  .comment6_content {
    flex-shrink: 1;
    font-size: 18px;
    text-align: left;
    width: 60%;
  }
  .comment6_ptime {
    margin: 0 20px;
  }
  .comment6_jubao {
    border: 1px solid green;
    border-radius: 10px;
    color: blue;
  }
  .comment6_jubao:hover {
    color: red;
  }
  .comment6_bottom {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    width: 100%;
    padding: 0 20px;
  }
  </style>