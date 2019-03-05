import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ajax from './ajax/index'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index' // 默认没有配置css扩展名，自己配置或加后缀.css

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$echarts = echarts;

Vue.prototype.https = ajax;

new Vue({
	render: h => h(App),
  router, store
}).$mount('#app')
