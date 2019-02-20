<template>
  <div>
    <nav-bar title="商品详情"></nav-bar>
    <!-- 商品缩略图 -->
    <div class="goods-thumb">
      <img
        :src="goodsData.IMAGE1"
        alt=""
      >
    </div>

    <div class="goods-name">
      {{goodsData.NAME}}
    </div>

    <!-- 商品价格等信息 -->
    <div class="info">
      <div class="price">￥{{goodsData.PRESENT_PRICE}}</div>
      <div class="stepper">
        <span @click="changeNum('minus')"></span>
        <input
          type="text"
          @blur="changeNum('focus')"
          v-model.number="goodsNum"
        >
        <span @click="changeNum('add')"></span>
      </div>
    </div>

    <!-- 店铺信息 -->
    <div class="store">
      <h2>
        <img
          src="../assets/images/store.jpg"
          alt=""
        >
        中国特产·仙桃馆
      </h2>
      <div class="info-tab">
        <div class="item">
          <p class="num">
            48795
          </p>
          <p class="desc">
            粉丝人数
          </p>
        </div>
        <div class="item">
          <p class="num">
            143
          </p>
          <p class="desc">
            全部商品
          </p>
        </div>
        <ul>
          <li><span>评价</span>9.17 | 高</li>
          <li><span>物流</span>9.19 | 高</li>
          <li><span>售后</span>9.38 | 高</li>
        </ul>

      </div>
    </div>

    <!-- 商品详情 -->
    <div class="goods-detail">
      <img
        v-for="(item,index) in goodsData.DETAIL"
        v-lazy="item"
        :key="index"
        :src="item"
        alt=""
      >
    </div>

    <!-- 底部加入购物车 -->
    <!-- <van-row class="btn-group">
      <van-col
        span="4"
        class="cart"
      >
        <div @click="toCart">
          <van-icon name="cart"></van-icon>
          <div
            class="num"
            v-if="CartCount>0"
          >
            {{CartCount}}
          </div>
        </div>
      </van-col>
      <van-col span="10">
        <div
          class="btn btn-join"
          @click="joinCart"
        >
          加入购物车
        </div>
      </van-col>
      <van-col span="10">
        <div
          class="btn btn-buy"
          @click="buy"
        >
          立即购买
        </div>
      </van-col>
    </van-row> -->

    <!-- 新版加入购物车 -->
    <div class="new-join-car">
      <router-link
        class="item"
        tag="div"
        to="/"
      >
        <van-icon name="home-o"></van-icon>
        首页
      </router-link>

      <router-link
        tag="div"
        to="/cart"
        class="item"
      >
        <van-icon name="shopping-cart-o"></van-icon>
        <div
          class="num"
          v-if="CartCount>0"
        >{{CartCount}}</div>
        购物车
      </router-link>
      <div class="btn-cart">
        <button @click="joinCart">
          加入购物车
        </button>
      </div>

    </div>

    <!-- 返回顶部 -->
    <div
      class="goTop"
      @click="goTop"
      v-show="goTopShow"
    >
      <img
        src="../assets/images/icon-goTop.png"
        alt=""
      >
    </div>
  </div>
</template>

<script>
import { Toast, Dialog, Lazyload } from "vant";
import NavBar from "@/components/NavBar";
export default {
  data () {
    return {
      goodsId: "",
      goodsData: {},
      goodsNum: 1, //商品数量选择
      goTopShow: false
    };
  },
  computed: {
    // 获取购物车数量
    CartCount () {
      return this.$store.getters.getCartTotal;
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId;
    this.getGoods();
    this.$store.dispatch("getCartCount");
  },
  mounted () {
    var _this = this;
    window.addEventListener("scroll", function () {
      var pageScrollY = this.scrollY;
      if (pageScrollY > 400) {
        _this.goTopShow = true
      }
      else {
        _this.goTopShow = false
      }
    }, false)
  },
  methods: {
    // 获取商品信息
    getGoods () {
      this.$axios({
        url: this.$serverUrl.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.goodsData = res.data.message;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 加入购物车
    joinCart () {
      if (this.getLoginStatus()) {
        this.$axios({
          url: this.$serverUrl.joinCart,
          method: "post",
          data: {
            goodsId: this.goodsId,
            goodsNum: this.goodsNum
          },
          withCredentials: true
        })
          .then(res => {
            if (res.data.code == 200 && res.data.message) {
              Toast.success("加入购物车成功");
              this.$store.dispatch("getCartCount");
            }
          })
          .catch(err => {
            console.log(err);
            Toast.fail("加入购物车失败");
          });
      } else {
        Dialog.confirm({
          title: "提示",
          message: "请登录后加入购物车",
          confirmButtonText: "去登陆",
          cancelButtonText: "取消"
        })
          .then(res => {
            this.$router.push({ path: "/login" });
          })
          .catch(err => { });
      }
    },
    // 立即购买
    buy () { },
    //改变商品数量
    changeNum (flag) {
      let goodsNum = parseInt(this.goodsNum);
      if (flag == "add") {
        this.goodsNum++;
      } else if (flag == "minus") {
        if (goodsNum > 1) {
          this.goodsNum--;
        } else {
          this.goodsNum = 1;
        }
      } else {
        if (goodsNum < 1 || !goodsNum) {
          this.goodsNum = 1;
        }
      }
    },
    toCart () {
      this.$router.push("/cart");
    },
    // 获取cookie
    getLoginStatus () {
      return document.cookie.indexOf("userId") > -1 ? true : false;
    },
    // 返回顶部
    goTop () {
      window.scroll(0, 0)
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped lang="scss">
.goods-thumb {
  img {
    display: block;
    width: 100%;
  }
}
.goods-name {
  font-size: 16px;
  padding: 10px 10px 0;
  background: #fff;
}
// 商品详情
.goods-detail {
  padding-bottom: 50px;
  img {
    width: 100%;
  }
}
// 商品名称、价格等信息
.info {
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: start;
  flex-direction: column;
  .price {
    color: #e4393c;
    font-weight: 700;
    font-size: 18px;
  }
  // 数量选择
  .stepper {
    display: flex;
    text-align: center;
    align-items: center;
    border: 1px solid #e5e5e5;
    margin-top: 10px;
    span {
      width: 25px;
      height: 20px;
      line-height: 20px;
      border-right: 1px solid #e5e5e5;
      position: relative;
      &::before,
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #cecaca;
        border-radius: 1px;
      }
      &::before {
        width: 10px;
        height: 2px;
      }
      &:last-child {
        border: 0;
        border-left: 1px solid #e5e5e5;
        &::after {
          width: 2px;
          height: 10px;
        }
      }
    }
    input {
      width: 45px;
      border: none;
      padding: 0 10px;
      color: #cecaca;
      font-weight: normal;
      box-sizing: border-box;
      text-align: center;
    }
  }
}
// 店铺信息
.store {
  background: #fff;
  margin: 10px 0;
  padding: 10px;
  h2 {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: normal;
    img {
      width: 90px;
      margin-right: 20px;
      border: 1px solid #ddd;
    }
  }
  .info-tab {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      position: relative;
      &:first-child::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 1px;
        background: #ddd;
      }
      .num {
        line-height: 21px;
        margin-bottom: 5px;
      }
      .desc {
        color: #999;
        font-size: 12px;
      }
    }
    ul {
      li {
        font-size: 12px;
        color: #e4393c;
        line-height: 1.5;
        span {
          color: #999;
          margin-right: 5px;
        }
      }
    }
  }
}

.btn-group {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  text-align: center;
  background: #fff;
  .btn {
    text-align: center;
    line-height: 50px;
    color: #fff;
    background: #ff9600;
    .btn-buy {
      background: #e4393c;
    }
  }
}
.cart {
  position: relative;
  padding-top: 13px;
  box-sizing: border-box;
  font-size: 20px;
  .num {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 25px;
    font-size: 15px;
    line-height: 25px;
    border-radius: 50%;
    background: #e4393c;
    color: #fff;
  }
}
// 新版加入购物车
.new-join-car {
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 7px 20px;
  background: hsla(0, 0%, 100%, 0.96);
  box-shadow: 0 0 10px #ccc;
  border-radius: 8px;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    font-size: 13px;
    color: #0000008a;
    position: relative;
    .num {
      position: absolute;
      left: 50%;
      top: 0;
      height: 17px;
      line-height: 17px;
      min-width: 8px;
      padding: 0 4px;
      border-radius: 14px;
      background: #ed4d41;
      color: #fff;
      text-align: center;
    }
    i {
      color: #0000008a;
      font-size: 22px;
    }
  }
  .btn-cart {
    flex: 1;
    text-align: right;
    button {
      padding: 6px 25px;
      background: #ff6700;
      font-size: 15px;
      color: #fff;
      border-radius: 16px;
      border: 0;
      outline: 0;
    }
  }
}
.goTop {
  position: fixed;
  right: 5px;
  bottom: 70px;
  width: 40px;
  img {
    width: 100%;
  }
}
</style>