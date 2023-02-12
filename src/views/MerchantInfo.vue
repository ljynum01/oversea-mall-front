<template>
    <div style="width: 100%; margin: 0 auto">
     <el-table :data="tableData" style="width: 100%">
       <el-table-column fixed prop="sid" label="商家编号"> </el-table-column>
       <el-table-column prop="sname" label="名称"> </el-table-column>
       <!-- <el-table-column prop="spasswd" label="密码"> </el-table-column> -->
       <el-table-column prop="sphone" label="商家电话"> </el-table-column>
       <el-table-column prop="area.saddress" label="商家地址"> </el-table-column>
       <el-table-column label="操作" #default="scope">
       <el-button type="danger" @click="deleteById(scope.row)">删除</el-button>
       </el-table-column>
     </el-table>
   </div>
   </template>
   <script>
   export default {
     created() {
       const _this = this;
       this.axios
         .get("http://localhost:8080/merchant/findMerchant")
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
         total : null,
         tableData: [
 
         ],
       };
     },
     methods: {
         deleteById(row) {
       const _this = this;
       this.axios
         .get("http://localhost:8080/merchant/deleteById?id=" + row.sid)
         .then(function (resp) {
           console.log(resp.data);
           if (resp) {
             alert("删除成功")
             _this.$router.go(0);
           }
         })
         .catch(function (error) {
           console.log(error);
         });
     },
     },
   }
   </script>
 
 <style>
 .el-table .warning-row {
   --el-table-tr-background-color: var(--el-color-warning-lighter);
 }
 .el-table .success-row {
   --el-table-tr-background-color: var(--el-color-success-lighter);
 }
 </style>