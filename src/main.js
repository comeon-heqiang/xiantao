// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Vant from 'Vant'
import 'vant/lib/vant-css/index.css';
import axios from 'axios';
import url from '@/serviceAPI.config.js'
Vue.use(Vant)
Vue.use(Vuex)
Vue.config.productionTip = false;


const store = new Vuex.Store({
  state: {
    cartCount: 0
  },
  getters: {
    getCartTotal(state) {
      return state.cartCount;
    }
  },
  mutations: {
    initCartCount(state, cartCount) {
      state.cartCount = cartCount
    }
  },
  actions: {
    // 获取购物车数量
    getCartCount(context) {
      axios({
        url: url.getCartCount,
        withCredentials: true,
      }).then(response => {
        let res = response.data;
        if (res.code == 200 && res.message) {
          context.commit('initCartCount', res.message)
        } else {
          context.commit("initCartCount", 0)
        }
      }).catch(err => {
        console.log(err);
      })

    }
  }
})
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
