<template>
  <div>
    <nav-bar title="我的订单"></nav-bar>
    <template v-if="isLogin">
      <ul class="order-list">
        <li
          v-for="(item,index) in orderList"
          :key="index"
        >
          <div class="order-id">订单编号：{{item.orderId}}
            <van-icon
              name="delete"
              @click="delOrder(item.orderId)"
            ></van-icon>
          </div>
          <ul class="goods">
            <li
              v-for="(goods,goodsIndex) in item.goodsList"
              :key="goodsIndex"
            >
              <img
                :src="goods.IMAGE1"
                alt=""
              >
              <div class="main">
                <p class="goods-name">
                  {{goods.NAME}}
                </p>
                <p class="goods-num">
                  x{{goods.productNum}}
                </p>
              </div>
            </li>
          </ul>
          <div class="total-money">
            总金额：
            <strong>￥{{item.orderTotal}}</strong>
          </div>
        </li>
      </ul>
    </template>
    <div
      v-else
      class="no-login"
    >
      请登录后查看订单
      <van-button
        type="danger"
        @click="goLogin"
      >去登录</van-button>
    </div>

  </div>
</template>

<script>
import loginStatus from "../util/isLogin.js";
import axios from "axios";
import NavBar from "@/components/NavBar";
import url from "@/serviceAPI.config";
export default {
  data() {
    return {
      orderList: "",
      isLogin: false
    };
  },
  components: {
    NavBar
  },
  created() {
    this.getOrder();    
    this.isLogin = this.getLoginStatus();
  },
  methods: {
    // 获取订单
    getOrder() {
      axios({
        url: url.getAllOrder,
        method: "GET",
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
         
            this.orderList = res.data.message;
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("获取订单列表失败");
        });
    },
    // 删除订单
    delOrder(id) {
      axios({
        url: url.delOrder,
        method: "POST",
        data: {
          orderId: id
        },
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.$toast("删除成功");
            this.getOrder();
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("删除失败");
        });
    },
    // 获取cookie
    getLoginStatus() {
      return document.cookie.indexOf("userId") > -1 ? true : false;
    },
    goLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped lang="scss">
.order-list {
  & > li {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 0;
    .order-id {
      padding: 0 15px;
      font-size: 14px;
      margin-bottom: 10px;
      color: #999;
      display: flex;
      justify-content: space-between;
      align-content: center;
    }
    .goods {
      border-bottom: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;
      padding: 10px 0;
      margin-bottom: 10px;
      li {
        display: flex;
        align-items: center;
        padding: 10px 15px 0;
        img {
          width: 100px;
          height: 100px;
        }
        .main {
          flex: 1;
          margin: 0 10px;
          align-items: center;
          .goods-name {
            font-family: -apple-system, Helvetica, sans-serif;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 21px;
          }
          .goods-num {
            color: #999;
            font-size: 12px;
            margin-top: 10px;
          }
        }
      }
    }
    .total-money {
      color: #e93b3d;
      text-align: right;
      padding: 0 15px;
      font-size: 16px;
    }
  }
}
.no-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  button {
    margin-top: 20px;
  }
}
</style>