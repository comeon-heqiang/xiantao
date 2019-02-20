import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import url from '@/serviceAPI.config.js'
import {
  resolve
} from 'path';
Vue.use(Vuex)
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

export default store;

