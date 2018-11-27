// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Vant from 'Vant'
import 'vant/lib/vant-css/index.css';
Vue.use(Vant)
Vue.use(Vuex)
Vue.config.productionTip = false;


const store = new Vuex.Store({
  state: {
    cartCount: 0
  },
  mutations: {
    initCartCount(state, cartCount) {
      state.cartCount = cartCount
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
