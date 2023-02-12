import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ajax from 'axios'
import CueAdios from "vue-axios"
import * as echarts from 'echarts';
import Cueecharts from 'vue-echarts'
import moment from 'moment'


createApp(App).use(store).use(ElementPlus).use(CueAdios, ajax).use(Cueecharts, echarts).use(moment).use(router).mount('#app')
