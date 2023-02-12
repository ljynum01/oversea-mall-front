<template>
    <div class="box">
      <div class="box__contain">
        <el-container direction="vertical">
          <el-header height="60px">
            <TheHeader></TheHeader>
          </el-header>
          <TheAside></TheAside>
          <div class="box_myorders1">我的订单</div>
          <hr />
          <div style="width: 90%; margin: 0 auto">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="goods.cname" label="商品名称">
              </el-table-column>
              <el-table-column label="商品图">
                <template #default="scope">
                  <div
                    v-if="
                      scope.row.goods &&
                      scope.row.goods.imageList[0] &&
                      scope.row.goods.imageList[0].image
                    "
                  >
                    <el-image
                      :src="
                        require('@/assets/' + scope.row.goods.imageList[0].image)
                      "
                      style="width: 50px"
                      :preview-src-list="[
                        require('@/assets/' + scope.row.goods.imageList[0].image),
                      ]"
                      preview-teleported="true"
                    ></el-image>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="goods.price" label="价格">
                <template #default="scope">
                  <span class="symbol">￥</span>{{scope.row.goods.price * scope.row.number}}
                </template>
              </el-table-column>
              <el-table-column prop="number" label="订购数量"> </el-table-column>
  
              <el-table-column prop="consumer.uname" label="收货人姓名">
              </el-table-column>
              <el-table-column prop="consumer.uphone" label="我的电话">
              </el-table-column>
              <el-table-column
                prop="consumer.uaddress"
                label="收货地址"
              ></el-table-column>
  
              <el-table-column prop="dtime" label="订单时间"> </el-table-column>
              <el-table-column prop="status" label="订单状态">
                <template #default="scope">
                  <el-button v-if="scope.row.status == 0">未完成</el-button>
                  <el-button color="#b3e19d" v-if="scope.row.status == 1"
                    >已签收</el-button
                  >
                  <el-button color="#f8e3c5" v-if="scope.row.status == 2"
                    >退货</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                  <el-button
                    @click="takegoods(scope.row)"
                    v-if="scope.row.status == 0"
                    type="primary"
                    size="small"
                    >确认收货</el-button
                  >
                  <el-button
                    v-if="scope.row.status == 1 || scope.row.status == 2"
                    type="primary"
                    size="small"
                    disabled
                    >确认收货</el-button
                  >
                  <el-button
                    v-if="scope.row.status == 0"
                    @click="returngoods(scope.row)"
                    type="danger"
                    size="small"
                    >退货</el-button
                  >
                  <el-button
                    v-if="scope.row.status == 1 || scope.row.status == 2"
                    disabled
                    type="danger"
                    size="small"
                    >退货</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
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
        total: null,
        tableData: [],
        orderData: {
          did: null,
          status: null,
        },
      };
    },
    methods: {
      takegoods(row) {
        const _this = this;
        console.log(row);
        this.orderData.did = row.did;
        this.orderData.status = 1;
        this.$confirm("确认收货？, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.axios({
            method: "post",
            url: "http://localhost:8080/orders/updateStatus",
            data: this.orderData,
          }).then((res) => {
            console.log(res);
          });
          this.$message({
            type: "success",
            message: "收货成功!",
          });
          this.$router.go(0);
          // this.$router.push("/commentpage");
        });
      },
      returngoods(row) {
        this.orderData.did = row.did;
        this.orderData.status = 2;
        this.$confirm("确认退货？, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.axios({
            method: "post",
            url: "http://localhost:8080/orders/updateStatus",
            data: this.orderData,
          }).then((res) => {
            console.log(res);
          });
          this.$message({
            type: "success",
            message: "退货成功!",
          });
          this.$router.go(0);
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
          "http://localhost:8080/orders/findByUid?uid=" +
            JSON.parse(sessionStorage.getItem("user")).id
        )
        .then(function (resp) {
          console.log(resp.data);
          _this.tableData = resp.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  };
  </script>
  <style>
  .box_myorders {
    width: 100%;
    height: 60px;
    background-color: #ff9999;
  }
  .box_myorders1 {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
  }
  .symbol {
    font-weight: 600;
    color: orangered;
  }
  </style>
  