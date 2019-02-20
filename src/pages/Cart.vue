<template>
  <div>
    <van-nav-bar title="购物车"></van-nav-bar>
    <!-- 购物车商品列表 -->
    <div
      v-if="GoodsList.length>0"
      class="cart-list"
    >
      <ul>
        <li
          v-for="(item,index) in GoodsList"
          :key="index"
        >
          <!-- 商品选中状态 -->
          <van-icon
            v-if="item.checked"
            name="passed"
            class="icon-checked"
            @click="goodsCheck(item)"
          ></van-icon>
          <van-icon
            v-else
            name="circle"
            class="icon-checked icon-no-checked"
            @click="goodsCheck(item)"
          ></van-icon>
          <div class="pic">
            <img
              :src="item.IMAGE1"
              alt=""
            >
          </div>

          <!-- 商品信息 -->
          <div class="info">
            <div class="name">
              {{item.NAME}}
            </div>
            <div class="price">
              ￥{{item.PRESENT_PRICE}}
              <div class="stepper">
                <span @click="changeNum('minus',item)"></span>
                <input
                  type="text"
                  @blur="changeNum('focus',item)"
                  v-model="item.productNum"
                >
                <span @click="changeNum('add',item)"></span>
              </div>
            </div>
          </div>
          <div
            class="del"
            @click="delGoods(item.ID)"
          >
            <van-icon name="delete"></van-icon>
          </div>
        </li>

      </ul>
    </div>
    <!-- 购物车无商品 -->
    <div
      v-else
      class="no-data"
    >
      <img
        src="../assets/images/no-goods.png"
        alt=""
      >
      <p>
        购物车里没有商品是件忧伤的事情<br>赶紧去逛逛~
      </p>
      <van-button
        type="danger"
        size="large"
        @click="goShop"
      >去逛逛</van-button>
    </div>

    <!-- 商品全选及总价计算 -->
    <template v-if="GoodsList.length>0">
      <div class="fixed-btm">
        <div class="checkAll">
          <van-icon
            name="passed"
            class="icon-checkAll icon-checked"
            @click="checkAll"
            v-if="checkAllFlag"
          ></van-icon>
          <van-icon
            name="circle"
            class="icon-checkAll icon-no-checked"
            @click="checkAll"
            v-else
          ></van-icon>
          全选
        </div>
        <div class="buy-info ">
          总计:
          <strong>￥{{TotalMoney}}</strong>
        </div>
        <div
          class="btn-buy"
          @click="toOrder"
          :class="this.checkCount.CheckNum<1?'noCheck':''"
        >
          去结算
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { Toast } from "vant";
import loginStatus from "../util/isLogin.js";
export default {
  data () {
    return {
      GoodsList: []
    };
  },
  created () {
    // this.getCartList();
  },
  mounted () {
    if (this.getLoginStatus()) {
      this.getCartList();
    }
  },
  computed: {
    //   总金额计算
    TotalMoney () {
      return this.checkCount.totalPrice;
    },
    // 全选
    checkAllFlag () {
      return (this.GoodsList.length > 0 && this.checkCount.CheckNum == this.GoodsList.length);
    },
    // 商品总金额计算
    checkCount () {
      let total = { CheckNum: 0, totalPrice: 0 };
      this.GoodsList.forEach(item => {
        if (item.checked == 1) {
          total.CheckNum++;
          total.totalPrice += parseInt(item.productNum * item.PRESENT_PRICE);
        }
      });
      return total;
    }
  },
  methods: {
    // 获取购物车列表
    getCartList () {
      this.$axios({
        url: this.$serverUrl.getCartList,
        method: "GET",
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.GoodsList = res.data.message;
          } else {
            Toast.fail("获取购物车信息失败");
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("获取购物车信息失败");
        });
    },

    //全选 取消全选
    checkAll () {
      let flag = !this.checkAllFlag;
      this.GoodsList.forEach(item => {
        item.checked = flag;
      });
      this.$axios({
        url: this.$serverUrl.checkAll,
        method: "POST",
        withCredentials: true,
        data: {
          checkAllFlag: flag
        }
      })
        .then(res => { })
        .catch(err => {
          console.log(err);
          Toast.fail("操作失败");
        });
    },
    // 商品选中
    goodsCheck (item) {
      item.checked = item.checked ? 0 : 1;
      this.$axios({
        url: this.$serverUrl.goodsCheck,
        method: "POST",
        data: {
          goodsId: item.ID,
          checkFlag: item.checked
        },
        withCredentials: true
      })
        .then(res => {

        })
        .catch(err => {
          console.log(err);
          Toast.fail("操作失败");
        });
    },
    // 删除商品
    delGoods (id) {
      this.$axios({
        url: this.$serverUrl.delGoods,
        method: "POST",
        data: {
          goodsId: id
        },
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.getCartList();
            this.getcartCount();
          } else {
            Toast.fail("删除失败");
          }
        })
        .catch(err => {
          Toast.fail("删除失败");
        });
    },
    //改变商品数量
    changeNum (flag, item) {

      let productNum = parseInt(item.productNum);
      let isok = true;
      if (flag == "add") {
        productNum = ++item.productNum;
      } else if (flag == "minus" && productNum > 1) {
        productNum = --item.productNum;
      } else if (flag == 'focus' && productNum > 1) {
        productNum = item.productNum;
      } else {
        item.productNum = 1
        isok = false
      }

      // 如果数量<=1则不发送请求
      if (isok) {
        this.$axios({
          url: this.$serverUrl.changeGoodsNum,
          method: "POST",
          data: {
            goodsId: item.ID,
            goodsNum: productNum
          },
          withCredentials: true
        })
          .then(res => {
            if (res.data.code == 200 && res.data.message) {
              this.getcartCount()
            } else {
            }
          })
          .catch(err => {
            console.log(err);
            Toast.fail("商品数量更新失败");
          });
      }

    },
    // 获取购物车数量
    getcartCount () {
      this.$store.dispatch('getCartCount')
    },
    // 跳转结算页
    toOrder () {
      if (this.checkCount.CheckNum > 0) {
        this.$router.push({ name: "Order" });
      }
    },
    // 购物车无商品时跳转商城页面
    goShop () {
      this.$router.push("/shop");
    },
    // 获取cookie
    getLoginStatus () {
      return document.cookie.indexOf("userId") > -1 ? true : false;
    }
  }
};
</script>

<style scoped lang="scss">
.icon-checked {
  font-size: 20px;
  color: #e4393c;
}
.icon-no-checked {
  font-size: 20px;
  color: #999;
}
// 商品列表
.cart-list {
  padding-bottom: 120px;
  li {
    display: flex;
    background: #fff;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid #e5e5e5;
    .pic {
      margin: 0 10px;
      img {
        display: block;
        width: 100px;
      }
    }

    .info {
      margin-right: 10px;
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price {
        margin-top: 10px;
        color: #e4393c;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
// 底部商品总价计算
.fixed-btm {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: hsla(0, 0%, 100%, 0.95);
  .checkAll {
    text-align: center;
    line-height: 25px;
    padding-left: 10px;
    color: #999;
    display: flex;

    flex-direction: column;
  }
  .btn-buy {
    background: #e4393c;
    color: #fff;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    font-weight: 700;
    width: 100px;
    margin-left: 10px;
    &.noCheck {
      background-color: #ccc;
      color: #fff;
    }
  }
  .buy-info {
    flex: 1;
    font-size: 16px;
    font-weight: 700;
    text-align: right;
    strong {
      color: #e4393c;
    }
  }
}
// 改变商品数量
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
//无数据
.no-data {
  position: absolute;
  top: 17%;
  left: 0;
  right: 0;
  width: 60%;
  margin: auto;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: #999;
    line-height: 20px;
    margin: 20px 0;
    text-align: center;
  }
}
</style>