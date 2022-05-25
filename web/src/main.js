import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './axiosconfig'
Vue.prototype.$http=http
Vue.use(ElementUI);
Vue.config.productionTip = false
// import './assets/second.scss'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
