import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "@/router"
import * as echarts from 'echarts'

Vue.use(ElementUI, echarts)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    /*路由发生变化修改页面title*/
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
