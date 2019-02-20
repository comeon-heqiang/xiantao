// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vant from 'vant'
import 'vant/lib/index.css';
import axios from 'axios';
import url from '@/serviceAPI.config.js' //请求接口

import { Lazyload } from 'vant'; //使用图片懒加载
Vue.use(Lazyload);
Vue.use(Vant)

Vue.config.productionTip = false;
Vue.prototype.$axios = axios
Vue.prototype.$serverUrl = url
import store from './store/store'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
