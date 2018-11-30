<template>
  <div>

    <van-tabbar v-model="active">
      <van-tabbar-item
        icon="home"
        to="/"
      >
        首页
      </van-tabbar-item>
      <van-tabbar-item
        icon="shop"
        to="/shop"
      >
        商品
      </van-tabbar-item>
      <van-tabbar-item
        icon="cart"
        to="/cart"
      >
        购物车
        <div
          class="cart-count"
          v-if="cartCount>0"
        >
          {{cartCount}}
        </div>
      </van-tabbar-item>
      <van-tabbar-item
        icon="location"
        to="/region"
      >
        地区
      </van-tabbar-item>
      <van-tabbar-item
        icon="contact"
        to="/userCenter"
      >
        个人中心
      </van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>

  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config";
export default {
  data() {
    return {
      active: 0
    };
  },
  computed: {
    cartCount() {
      return this.$store.getters.getCartTotal;
    }
  },
  created() {
    let path = this.$route.path;
    switch (path) {
      case "/":
        this.active = 0;
        break;
      case "/shop":
        this.active = 1;
        break;
      case "/cart":
        this.active = 2;
        break;
      case "/region":
        this.active = 3;
        break;
      case "/userCenter":
        this.active = 4;
        break;
    }
    this.$store.dispatch("getCartCount");
  },
  watch: {
    $route(to, from) {
      switch (to.path) {
        case "/":
          this.active = 0;
          break;
        case "/shop":
          this.active = 1;
          break;
        case "/cart":
          this.active = 2;
          break;
        case "/region":
          this.active = 3;
          break;
        case "/userCenter":
          this.active = 4;
          break;
      }
    }
  },
  mounted() {
    // this.getcartCount();
  },
  methods: {
    // 获取购物车数量，现改为vuex
    // getcartCount() {
    //   axios({
    //     url: url.getCartCount,
    //     method: "get",
    //     withCredentials: true
    //   }).then(res => {
    //     if (res.data.code == 200 && res.data.message) {
    //       this.$store.commit("initCartCount", res.data.message);
    //     } else {
    //       this.$store.commit("initCartCount", 0);
    //     }
    //   });
    // }
  }
};
</script>

<style scoped lang='scss'>
.van-tabbar-item {
  position: relative;
}
.cart-count {
  position: absolute;
  top: 6%;
  right: 22%;
  width: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  background: red;
  color: #fff;
}
</style>