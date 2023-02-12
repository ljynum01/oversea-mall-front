<template>
    <el-table :data="tableData">
           <el-table-column label="评论编号" prop="pid" />
           <el-table-column label="用户编号" prop="uid" />
           <el-table-column label="商品编号" prop="cid" />
           <el-table-column label="评论内容" prop="content" min-width="200" />
           <el-table-column label="评论时间" prop="ptime" />
           <el-table-column label="操作" #default="scope">
               <el-button
                 type="danger"
                 size="small"
                 @click="deleteComment(scope.row.pid)"
                 >删除评论</el-button
               >
           </el-table-column>
         </el-table>
</template>
<script>
export default {
   data(){
       return{
           total: null,
           tableData: [
           ]
       }
   },
   methods:{
     deleteComment(pid) {
     console.log(pid);
     const _this = this;
     this.axios
       .get("http://localhost:8080/comment/delete?id=" + pid)
       .then(function (resp) {
         if (resp) {
           alert("删除成功");
           _this.$router.go(0)
         }
       })
       .catch(function (error) {
         console.log(error);
       });
   },
   },
   created() {
       const _this = this;
       this.axios
       .get("http://localhost:8080/comment/findAll")
       .then(function (resp) {
           console.log(resp.data);
           _this.tableData = resp.data;
           _this.total = resp.data.total;
       })
       .catch(function (error) {
           console.log;
       }) 
   }
}
</script>