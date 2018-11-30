import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Index from '@/pages/Index'
import Main from '@/pages/Main'

import Cart from '@/pages/Cart'
import Shop from '@/pages/Shop'
import Region from '@/pages/Region'
import RegionDetail from '@/pages/RegionDetail'
import Goods from '@/pages/Goods'
import Order from '@/pages/Order'
import Pay from '@/pages/pay'
import UserCenter from '@/pages/UserCenter'
import MyOrder from '@/pages/MyOrder'
import About from '@/pages/About'
import AddressList from '@/pages/AddressList'
import AddContact from '@/pages/AddContact'
import Opinion from '@/pages/Opinion'
import EditUser from '@/pages/editUser'
import Search from '@/pages/Search'
import SearchResult from '@/pages/SearchResult'
import Error404 from '@/pages/404'
Vue.use(Router);
import {
  Toast,
  Dialog
} from 'vant';
const router = new Router({
  mode: 'history',
  routes: [{
      path: "/login",
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: "/",
      name: "Main",
      component: Main,
      children: [{
        path: '/',
        name: "Index",
        component: Index
      }, {
        path: "/shop",
        name: "Shop",
        component: Shop
      }, {
        path: "/region",
        name: 'Region',
        component: Region
      }, {
        path: '/cart',
        name: "Cart",
        component: Cart
      }, {
        path: '/userCenter',
        name: "UserCenter",
        component: UserCenter
      }]
    }, {
      path: "/regionDetail",
      name: "RegionDetail",
      component: RegionDetail
    },
    {
      path: '/order',
      name: "Order",
      component: Order,
      beforeEnter: (to, from, next) => {
        if (from.name == 'Pay') {
          Toast.fail("请勿重复提交订单！");
          setTimeout(() => {
            next({
              path: "/cart"
            })
          }, 500);
        } else {
          next()
        }
      }
    },
    {
      path: '/pay',
      name: "Pay",
      component: Pay,
      beforeEnter: (to, from, next) => {
        if (from.name == 'order') {         
          setTimeout(() => {
            Toast.fail("请勿重复提交订单")
            next({
              path: "/"
            })
          }, 500);
        } else {
          next()
        }
      }

    }, {
      path: "/myOrder",
      name: "MyOrder",
      component: MyOrder
    }, {
      path: '/about',
      name: "About",
      component: About
    },
    {
      path: '/addressList',
      name: "AddressList",
      component: AddressList
    },
    {
      path: '/addContact',
      name: 'AddContact',
      component: AddContact
    }, {
      path: "/opinion",
      name: 'Opinion',
      component: Opinion
    }, {
      path: '/editUser',
      name: "EditUser",
      component: EditUser
    }, {
      path: "/search",
      name: "Search",
      component: Search
    },
    {
      path: "/searchResult",
      name: "SearchResult",
      component: SearchResult
    },
    // 404页面
    {
      path: "*",
      name:"404",
      component:Error404
      // redirect: "/"
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  let path = to.path; //进入的路由地址
  var isCookie = document.cookie.indexOf("userId") > -1 ? true : false;
  const routerGuards = ['/myOrder', '/addressList'];
  // 如果cookie存在 则不进行拦截
  if (isCookie) {
    next();
  } else {
    if (routerGuards.indexOf(path) > -1) {
      // Toast.fail('请登录后继续操作')
      Dialog.confirm({
        title: "提示",
        message: "请登陆后继续操作",
        confirmButtonText: "去登陆",
        cancelButtonText: "取消"
      }).then(res => {
        next({
          path: "/login"
        })
      }).catch(err => {

      })
    } else {
      next();
    }

  }


})
export default router;
