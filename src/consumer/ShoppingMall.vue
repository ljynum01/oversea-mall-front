<template>
    <div class="box">
      <div class="box__contain">
        <el-container direction="vertical">
          <el-header height="60px">
            <TheHeader></TheHeader>
          </el-header>
          <el-container direction="horizontal">
            <!-- <el-aside width="200px">
              <TheAside></TheAside>
            </el-aside> -->
            <el-container direction="vertical">
              <TheAside></TheAside>
              <el-main>
                <div class="carousel">
                  <TheCarousel></TheCarousel>
                </div>
                <TheMain></TheMain>
              </el-main>
            </el-container>
          </el-container>
        </el-container>
      </div>
    </div>
  </template>
  <script>
  import TheCarousel from './TheCarousel.vue'
  import TheHeader from './TheHeader.vue'
  import TheAside from './TheAside.vue'
  import TheMain from './TheMain.vue'
  
  
  export default {
      components: {TheCarousel, TheHeader, TheAside, TheMain},
      // data() {
      //   return {
      //     loading: false,
      //   }
      // },
      // mounted(){
      //   window.onload=function(){
      //     alert("加载页面")
      //   }
      // }
  }
  </script>