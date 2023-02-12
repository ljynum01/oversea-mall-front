<template>
  <div style="width: 100%; margin: 0 auto" v-if="tableData">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column fixed prop="cid" label="商品编号" />
      <el-table-column prop="cname" label="商品名称" />
      <el-table-column prop="imageList" label="商品图">
        <template #default="scope">
          <div v-if="scope.row.imageList[0] && scope.row.imageList[0].image">
            <el-image
              :src="require('@/assets/' + scope.row.imageList[0].image)"
              style="width: 50px"
              :preview-src-list="[
                require('@/assets/' + scope.row.imageList[0].image),
              ]"
              preview-teleported="true"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="introduction" label="介绍" width="300px"/>
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="inventory" label="库存" />
      <el-table-column prop="type.category" label="商品类别" />
      <el-table-column type="expand" label="评论" width="100">
        <template #default="props">
          <h1 style="font-size: 20px; padding-left: 20px">商品评论</h1>
          <el-table :data="props.row.commentList">
            <el-table-column label="评论编号" prop="pid" />
            <el-table-column label="用户名称" prop="consumer.uname" />
            <el-table-column label="用户电话" prop="consumer.uphone" />
            <el-table-column label="评论内容" prop="content" min-width="200" />
            <el-table-column label="评论时间" prop="ptime" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  @click="deleteComment(scope.row.pid)"
                  type="danger"
                  size="small"
                  >删除评论</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button
            :disabled="buttonAbled"
            @click="handleClick(scope.row)"
            type="primary"
            size="small"
            >修改商品</el-button
          >
          <el-button
            @click="deleteForId(scope.row.cid)"
            type="danger"
            size="small"
            >删除商品</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-pagination
    background
    layout="prev, pager, next"
    v-model:current-page="currentPage"
    :total="total"
    :page-size="6"
    :pager-count="6"
    @current-change="page(currentPage)"
  />

  <el-dialog title="修改商品信息" v-model="dialogFormVisible">
    <el-form label-position="left" label-width="100px" :model="rowData">
      <el-form-item label="编号">
        <el-input v-model="rowData.cid" disabled />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="rowData.cname" />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="rowData.introduction" />
      </el-form-item>
      <el-form-item label="价格">
        <el-input-number v-model="rowData.price" />
      </el-form-item>
      <el-form-item label="库存">
        <el-input-number v-model="rowData.inventory" />
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="rowData.type.category" placeholder="请选择商品类别">
          <el-option
            v-for="item in options"
            :key="item.lid"
            :label="item.category"
            :value="item.category"
            @click="
              () => {
                this.rowData.lid = item.lid;
              }
            "
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="upload-demo"
          action="http://localhost:8080/upload/"
          :on-remove="handleRemove"
          name="fileUpload"
          list-type="picture"
          multiple
          :on-success="setfileList"
          :on-exceed="handleExceed"
          :limit="1"
        >
          <el-button size="small" type="primary">重新上传图片</el-button>
          <template #tip>
            <div class="el-upload__tip">
              只能上传 jpg/png 文件，且不超过 500kb（不上传默认不修改）
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateGoods">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  inject: ["reload"],
  data() {
    return {
      options: [],
      tableData: [],
      total: 1,
      rowData: null,
      dialogFormVisible: false,
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  computed: {
    buttonAbled() {
      let role = JSON.parse(sessionStorage.getItem("user")).role;
      if (role == "admin") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    page(currentPage) {
      console.log(currentPage);
      const _this = this;
      if (JSON.parse(sessionStorage.getItem("user")).role == "merchant") {
        this.axios
          .get(
            "http://localhost:8080/goods/findGoodsBySid?pageNum=" +
              currentPage +
              "&pageSize=6" +
              "&sid=" +
              JSON.parse(sessionStorage.getItem("user")).id
          )
          .then(function (resp) {
            _this.tableData = resp.data.list;
            _this.total = resp.data.total;
            console.log(resp.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (JSON.parse(sessionStorage.getItem("user")).role == "admin") {
        this.axios
          .get(
            "http://localhost:8080/goods/findGoodsBySid?pageNum=" +
              currentPage +
              "&pageSize=6"
          )
          .then(function (resp) {
            _this.tableData = resp.data.list;
            _this.total = resp.data.total;
            console.log(resp.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    handleClick(row) {
      this.dialogFormVisible = true;
      this.rowData = JSON.parse(JSON.stringify(row));
      this.rowData.lid = this.rowData.type.lid;
      console.log(this.rowData);
    },
    setfileList(res, file, files) {
      console.log("res=" + res);
      this.rowData.imgUrl = res[0];
    },
    updateGoods() {
      console.log(this.rowData);
      const _this = this;
      this.axios({
        method: "post",
        url: "http://localhost:8080/goods/updateGoods",
        data: this.rowData,
      })
        .then((res) => {
          if (res) {
            alert("《" + _this.rowData.cname + "》 修改成功！", "消息", {
              confirmButtonText: "确定",
              callback: (action) => {
                _this.$router.push("/Goods");
              },
            });
          }
          this.$router.go(0);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.dialogFormVisible = false;
    },
    deleteComment(pid) {
      const _this = this;
      this.axios
        .get("http://localhost:8080/comment/delete?id=" + pid)
        .then(function (resp) {
          if (resp) {
            ElMessage("删除成功");
            _this.$router.go(0);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteForId(id) {
      const _this = this;
      this.axios
        .get("http://localhost:8080/goods/deleteById?id=" + id)
        //添加商品编号删除
        .then(function (resp) {
          if (resp) {
            ElMessage("删除成功");
            _this.$router.go(0);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      this.init();
    },
    init() {
      const _this = this;

      this.axios
        .get("http://localhost:8080/types/findAll")
        .then(function (resp) {
          console.log(resp.data);
          _this.options = resp.data;
        })
        .catch(function (error) {
          console.log(error);
        });

      if (JSON.parse(sessionStorage.getItem("user")).role == "merchant") {
        this.axios
          .get(
            "http://localhost:8080/goods/findGoodsBySid?sid=" +
              JSON.parse(sessionStorage.getItem("user")).id
          )
          .then(function (resp) {
            console.log(resp.data);
            _this.tableData = resp.data.list;
            console.log(_this.tableData);
            _this.total = resp.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (JSON.parse(sessionStorage.getItem("user")).role == "admin") {
        this.axios
          .get("http://localhost:8080/goods/findGoodsBySid")
          .then(function (resp) {
            console.log(resp.data);
            _this.tableData = resp.data.list;
            console.log(_this.tableData);
            _this.total = resp.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
