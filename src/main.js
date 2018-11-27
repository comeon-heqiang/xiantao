// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import {
//   Button,
//   Lazyload 
// } from 'Vant'
// import Vant from 'Vant';
import {
  Lazyload,
  Toast,
  Dialog,
  Button,
  Icon,
  Row,
  Col,
  Uploader,
  List,
  Swipe,
  SwipeItem,
  NavBar,
  Tabbar,
  TabbarItem,
  AddressEdit,
  AddressList,
  Area,
  Field,
  Cell,
  CellGroup,
  NoticeBar 
} from 'vant';
import Vuex from 'vuex'
Vue.use(Lazyload).use(Toast).use(Dialog).use(Button)
  .use(Icon).use(Row).use(Col)
  .use(Uploader).use(List).use(Swipe).use(SwipeItem).use(NavBar)
  .use(Tabbar).use(TabbarItem).use(AddressEdit).use(AddressList)
  .use(Area).use(Field).use(Cell).use(CellGroup).use(NoticeBar);
import 'vant/lib/vant-css/index.css';
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
