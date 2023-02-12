  <template>
    <div class="dd">
    <div class="daohan1">
      <div class="daohan" @click="drawer = true" type="primary">全部</div>
      <div class="daohan"> 镇店之宝 </div> 
      <div class="daohan"> 新品发布 </div>
      <div class="daohan"> 莱奥折扣 </div>
      <div class="daohan"> 耐克专场 </div>
      <div class="daohan"> 全球开店 </div>
      <div class="daohan" @click="back1">返回首页</div>
    </div>
    </div>
   
  <el-drawer v-model="drawer" :with-header="false">
    <span class="title">商品分类</span>
    <el-menu
      background-color="#FFFFFF"
      text-color="#000000"
      active-text-color="var(--color-primary-light)"
      router
      :default-active="this.$router.path"
    >
      <el-menu-item-group>
        <el-menu-item
          v-for="(item, index) in typeData"
          :key="index"
          :index="'/type/' + index"
          :route="{path: '/type', query: { id: index+1} }"
          >{{ item.category }}</el-menu-item
        >
      </el-menu-item-group>
    </el-menu>
  </el-drawer>
  </template>
  
  <script>
    export default {
      data() {
        return {
          drawer: false,
          typeData: [],
        };
      },
      created() {
    const _this = this;
    this.axios
      .get("http://localhost:8080/types/findAll")
      .then(function (resp) {
        _this.typeData = resp.data;
        console.log(_this.typeData);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    back1(){
        this.$router.push("/consumer")
      },
  },
    }
  </script>

<style>
.title{
  font-size: 20px;
}
.dd{
  /* border: 1px solid #000000; */
  width: 100%;
  margin: auto;
}
.daohan1{
    justify-content: center;
    display: flex;
}
.daohan{
    float: left;
    padding: 10px;
    font-size: 15px;
    /* border: 1px solid #000000; */
}
.daohan:hover{
    color: orange;
    cursor: pointer;
}
</style>