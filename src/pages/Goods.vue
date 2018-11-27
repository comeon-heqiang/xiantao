<template>
  <div>
    <nav-bar title="商品详情"></nav-bar>
    <div class="goods-thumb">
      <img
        :src="goodsData.IMAGE1"
        alt=""
      >
    </div>
    <div class="goods-name">
      {{goodsData.NAME}}
    </div>
    <div class="info">
      <div class="price">￥{{goodsData.PRESENT_PRICE}}</div>
      <div class="stepper">
        <span @click="changeNum('minus',goodsNum)"></span>
        <input
          type="text"
          @blur="changeNum('focus',goodsNum)"
          v-model.number="goodsNum"
        >
        <span @click="changeNum('add',goodsNum)"></span>
      </div>
    </div>
    <div class="goods-detail">
      <img
        v-for="(item,index) in goodsData.DETAIL"
        :key="index"
        :src="item"
        alt=""
      >
    </div>

    <van-row class="btn-group">
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
    </van-row>

  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config";
import { Toast, Dialog } from "vant";
import NavBar from "@/components/NavBar";
export default {
  data() {
    return {
      goodsId: "",
      goodsData: {},
      value: 1,
      goodsNum: 1
    };
  },
  computed: {
    CartCount() {
      return this.$store.state.cartCount;
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId;
    this.getGoods();
    this.getcartCount();
  },
  methods: {
    // 获取商品信息
    getGoods() {
      axios({
        url: url.getDetailGoodsInfo,
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
    joinCart() {
      if (this.getLoginStatus()) {
        axios({
          url: url.joinCart,
          method: "post",
          data: {
            goodsId: this.goodsId,
            goodsNum: this.goodsNum
          },
          withCredentials: true
        })
          .then(res => {
            console.log(res);
            if (res.data.code == 200 && res.data.message) {
              Toast.success("加入购物车成功");
              this.getcartCount();
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
          .catch(err => {});
        // Toast.fail('请登录后加入购物车')
      }
    },
    getcartCount() {
      axios({
        url: url.getCartCount,
        method: "get",
        withCredentials: true
      }).then(res => {
        if (res.data.code == 200 && res.data.message) {
          this.$store.commit("initCartCount", res.data.message);
        } else {
          this.$store.commit("initCartCount", 0);
        }
      });
    },
    // 立即购买
    buy() {},
    //改变商品数量
    changeNum(flag, item) {
      let goodsNum = parseInt(this.goodsNum);
      let goodsId = this.goodsData.ID;
      if (flag == "add") {
        this.goodsNum++;
      } else if (flag == "minus") {
        if (Num > 1) {
          this.goodsNum--;
        } else {
          this.goodsNum = 1;
        }
      } else {
        if (Num < 1 || !Num) {
          this.goodsNum = 1;
        }
      }
      // axios({
      //   url: url.changeGoodsNum,
      //   method: "POST",
      //   data: {
      //     goodsId: goodsId,
      //     goodsNum: goodsNum
      //   },
      //   withCredentials: true
      // })
      //   .then(res => {
      //     if (res.data.code == 200 && res.data.message) {
      //       // this.getCartList();
      //     } else {
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     Toast.fail("商品数量更新失败");
      //   });
    },
    toCart() {
      this.$router.push("/cart");
    },
    // 获取cookie
    getLoginStatus() {
      return document.cookie.indexOf("userId") > -1 ? true : false;
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
.goods-detail {
  padding-bottom: 50px;
  img {
    width: 100%;
  }
}
.info {
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: start;
  flex-direction: column;
}
.price {
  color: #e4393c;
  font-weight: 700;
  font-size: 18px;
}
.stepper {
  margin-top: 10px;
}
.btn-group {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  text-align: center;
  background: #fff;
}
.btn-group .btn {
  text-align: center;
  line-height: 50px;
  color: #fff;
  background: #ff9600;
}
.btn-group .btn-buy {
  background: #e4393c;
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
.stepper {
  display: flex;
  text-align: center;
  align-items: center;
  border: 1px solid #e5e5e5;
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
</style>