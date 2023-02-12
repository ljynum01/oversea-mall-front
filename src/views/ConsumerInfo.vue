<template>
    <div style="width: 100%; margin: 0 auto">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="uid" label="消费者编号"> </el-table-column>
        <el-table-column prop="uname" label="名称"> </el-table-column>
        <!-- <el-table-column prop="upasswd" label="密码"> </el-table-column> -->
        <el-table-column prop="uphone" label="客户电话"> </el-table-column>
        <el-table-column prop="uaddress" label="收货地址"> </el-table-column>
        <el-table-column label="操作" #default="scope">
          <el-button type="danger" @click="deleteById(scope.row)">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
  
    <el-pagination
      :page-size="6"
      :pager-count="11"
      layout="prev, pager, next"
      :total="total"
      @current-change="page"
    />
  </template>
  <script>
  export default {
    methods: {
      page(currentPage) {
        const _this = this;
        this.axios
          .get("http://localhost:8080/consumer/findAll" + currentPage + "&pageSize=6")
          .then(function (resp) {
            _this.tableData = resp.data.content;
            _this.total = resp.data.totalElements;
            console.log(resp.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      deleteById(row) {
        console.log(row);
        const _this = this;
        this.axios({
          method: "post",
          url: "http://localhost:8080/consumer/delete",
          data: row,
        }).then((res) => {
          if (res) {
            alert("删除成功")
            _this.$router.go(0)
          }
        });
      },
    },
    created() {
      const _this = this;
      this.axios
        .get("http://localhost:8080/consumer/findAll")
        .then(function (resp) {
          console.log(resp.data);
          _this.tableData = resp.data;
          console.log(_this.tableData);
          _this.total = resp.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    data() {
      return {
        total: 1,
        tableData: [
          {
            pid: "1",
            cid: "2",
            uname: "老王",
            uphone: "1331123111",
            cname: "解忧炸货店",
            content: "好吃",
            ptime: "22-12-1",
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
  