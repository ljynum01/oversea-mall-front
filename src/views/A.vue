<template>
  <div class="echart" id="mychart" :style="myChartStyle"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      myChart: {},
      pieData: [
        {
          value: 463,
          name: "北京"
        },
        {
          value: 395,
          name: "浙江"
        },
        {
          value: 157,
          name: "山东"
        },
        {
          value: 149,
          name: "广东"
        },
        {
          value: 147,
          name: "湖南"
        }
      ],
      Categories:[],
      categoryNameList:[],
      categorySums:[],
      pieName: [],
      myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
    };
  },
  mounted() {
    // this.getData(); 
    this.initDate(); //数据初始化
    this.initEcharts();
  },
  methods: {
     initDate() {
      const _this = this;
      this.axios
        .get("http://localhost:8080/orders/findSell?sid=" + "1")
        .then(function (resp) {
          console.log(resp.data);
          _this.pieData = resp.data;
          console.log(_this.pieData);
        })
        .catch(function (error) {
          console.log(error);
        })
      for (let i = 0; i < this.pieData.length; i++) {
        this.pieName[i] = this.pieData[i].name;
        console.log(this.pieName[i])
      }
    },
    initEcharts() {
      // 饼图
      const option = {
        legend: {
          // 图例
          data: this.pieName,
          right: "10%",
          top: "30%",
          orient: "vertical"
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: "国内院士前五省份图示",
          top: "0%",
          left: "center"
        },
        series: [
          {
            type: "pie",
            label: {
              show: true,
              formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            },
            radius: "50%", //饼图半径
            data: this.pieData,
          },
          // console.log(this.pieData)
        ]
      };      
      // console.log(this.seriesData);
      const optionFree = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            data: this.seriesData,
            type: "line",
            smooth: true
          }
        ]
      };
      this.myChart = echarts.init(document.getElementById("mychart"));
      this.myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }
  }
};
</script>
