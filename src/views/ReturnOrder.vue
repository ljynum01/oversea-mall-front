<template>
    <div style="width: 100%; margin: 0 auto">
      <el-table :data="tableData" stripe="true" style="width: 100%">
        <el-table-column fixed prop="did" label="订单编号" />
        <el-table-column prop="goods.cname" label="商品名称" />
        <el-table-column prop="goods.image" label="商品图">
          <template #default="scope">
            <div
              v-if="
                scope.row.goods &&
                scope.row.goods.imageList[0] &&
                scope.row.goods.imageList[0].image
              "
            >
              <el-image
                :src="require('@/assets/' + scope.row.goods.imageList[0].image)"
                style="width: 50px"
                :preview-src-list="[
                  require('@/assets/' + scope.row.goods.imageList[0].image),
                ]"
                preview-teleported="true"
              ></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="goods.price" label="价格" />
        <el-table-column prop="number" label="订购数量" />
        <el-table-column prop="consumer.uname" label="客户姓名" />
        <el-table-column prop="consumer.uphone" label="客户电话" />
        <el-table-column prop="consumer.uaddress" label="送货地址" />
        <el-table-column prop="dtime" label="订单时间" />
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small"
              >删除订单</el-button
            >
            <!-- <el-button type="primary" size="small">删除商品</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  
    <el-pagination
      background
      layout="prev, pager, next"
      v-model:current-page="currentPage"
      :total="pageInfo.total"
      :page-size="pageInfo.size"
      :pager-count="5"
      @current-change="page(currentPage)"
    />
  </template>
  <script>
  export default {
    methods: {
      handleClick(row) {
        this.axios
          .get("http://localhost:8080/orders/deleteById?id=" + row.did)
          .then(function (resp) {
            console.log(resp.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        alert("删除成功");
        this.$router.go(0);
      },
      page(currentPage) {
        const _this = this;
        if (JSON.parse(sessionStorage.getItem("user")).role == "merchant") {
          this.axios
            .get(
              "http://localhost:8080/orders/findAllByStatus?status=2&sid=" +
                JSON.parse(sessionStorage.getItem("user")).id +
                "&pageNum=" +
                currentPage +
                "&pageSize=5"
            )
            .then(function (resp) {
              _this.tableData = resp.data.list;
              _this.pageInfo.total = resp.data.total;
              console.log(resp.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else if (JSON.parse(sessionStorage.getItem("user")).role == "admin") {
          this.axios
            .get(
              "http://localhost:8080/orders/findAllByStatus?status=2" +
                "&pageNum=" +
                currentPage +
                "&pageSize=5"
            )
            .then(function (resp) {
              _this.tableData = resp.data.list;
              _this.pageInfo.total = resp.data.total;
              console.log(resp.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
    },
    created() {
      const _this = this;
      if (JSON.parse(sessionStorage.getItem("user")).role == "merchant") {
        this.axios
          .get(
            "http://localhost:8080/orders/findAllByStatus?status=2&sid=" +
              JSON.parse(sessionStorage.getItem("user")).id
          )
          .then(function (resp) {
            _this.tableData = resp.data.list;
            _this.pageInfo.total = resp.data.total;
            _this.pageInfo.size = resp.data.size;
            console.log(resp.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (JSON.parse(sessionStorage.getItem("user")).role == "admin") {
        this.axios
          .get("http://localhost:8080/orders/findAllByStatus?status=2")
          .then(function (resp) {
            _this.tableData = resp.data.list;
            _this.pageInfo.total = resp.data.total;
            _this.pageInfo.size = resp.data.size;
            console.log(resp.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    data() {
      return {
        pageInfo: {
          total: 1,
          pageNum: 1,
          pageSize: 1,
        },
        tableData: [
          {
            did: "1",
            cname: "解忧炸货店",
            image: "123345",
            number: "1",
            price: "12",
            uname: "老王",
            uphone: "1331123111",
            uaddress: "广东省中山市",
            dtime: "22-12-1",
          },
        ],
      };
    },
  };
  </script>
  
  <style>
  .el-table .warning-row {
    --el-table-tr-background-color: var(--el-color-warning-lighter);
  }
  .el-table .success-row {
    --el-table-tr-background-color: var(--el-color-success-lighter);
  }
  </style>
  