<template>
    <div class="echarts-container" id="echarts-main"></div>
</template>

<script>
import * as echarts from "echarts";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        this.myChart = null
        return {
            datalist: [],
            ass: [],
        }
    },
    mounted() {
        this.getData()
        // this.drawEcharts()
    },
    methods: {
        getData() {
            let arr = [];
        const _this = this;
      this.axios
        .get("http://localhost:8080/orders/findSell?sid=" + "1")
        .then(function (resp) {
            console.log(resp.data)
            _this.datalist= resp.data
            console.log(_this.datalist)
          
        for (let i = 0; i < _this.datalist.length; i++) {
        _this.datalist[i] = _this.datalist[i].value;
        console.log(_this.datalist[i])
        arr[i] =_this.datalist[i]
      }
      console.log(arr)
      _this.ass = arr
      console.log(_this.ass)
        })
        .catch(function (error) {
          console.log(error);
        })
        this.drawEcharts()
    },
    drawEcharts(ass){
        console.log(ass)
            this.myChart = echarts.init(document.getElementById('echarts-main'))
            this.myChart.setOption({
                title: {
                    text: 'Echarts入门',
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    data: ['羊毛衫','裤子'],
                    // data: this.datalist,
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [4,5],
                    },
                ],
            })
        },
    },
})
</script>

<style scoped>
.echarts-container{
    position: relative;
}
#echarts-main{
    width: 800px;
    height: 600px;
    position: absolute;
}
</style>