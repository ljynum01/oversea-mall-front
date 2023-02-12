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
        ],
        Categories:[],
        categoryNameList:[],
        categorySums:[],
        pieName: [],
        myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
      };
    },
    mounted() {
      //数据初始化
      this.initEcharts();
    },
    methods: {
      initEcharts() {
        // 饼图
       let chartDom = document.getElementById('mychart');
       let mychart = echarts.init(chartDom);
       const _this = this;
       this.axios 
       .get("http://localhost:8080/orders/findSell?sid=" + JSON.parse(sessionStorage.getItem("user")).id)
        .then(res => {
            this.Categories = res.data
            for(var i=0;i<this.Categories.length;i++){
                this.pieData.push({value:this.Categories[i].value,name:this.Categories[i].name})
            }
        }).then(res=> {
            mychart.setOption({
                series: [{
                    data:this.pieData
                }]
            })
        });
        mychart.setOption({

            title: {
            text: '商品销售情况',
            padding: [5,10,20,10],
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>商品编号: {b}<br/>出售个数: {c}<br/>占比 ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '售出个数',
              type: 'pie',
              radius: '80%',
              top:'20%',
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      }
    }
  };
  </script>
  