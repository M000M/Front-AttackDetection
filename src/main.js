import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "@/router";
import axios from "axios";
import echarts from 'echarts';


Vue.use(ElementUI, axios, echarts)
Vue.config.productionTip = false

require('echarts/map/js/world')

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
