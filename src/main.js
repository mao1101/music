import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios' // 引入axios
import vant from 'vant' // 引入vant
import 'vant/lib/index.css' // 引入vant.css样式
import rem from '@/assets/rem.js' // 引入移动端rem.js
import './assets/css/reset.css'
import Swiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(Swiper)
Vue.use(vant) // 使用vant
Vue.use(rem) // 使用rem
Vue.prototype.axios = axios // 把数据请求的axios方法绑定在vue的原型对象上

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
