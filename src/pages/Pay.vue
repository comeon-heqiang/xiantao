<template>
  <div>
    <nav-bar title="支付成功"></nav-bar>
    <van-cell-group>
      <van-cell title="订单编号" :value="orderData.orderId" />
      <van-cell title="创建时间" :value="orderData.createDate|GMTToStr" />
      <van-cell title="收货人" :value="orderData.addressInfo.userName" />
      <van-cell title="联系方式" :value="orderData.addressInfo.tel" />
      <van-cell title="收货地址" :value="orderData.addressInfo.streetName" />
    </van-cell-group>
    <router-link to="/shop" class="btn-buy">继续购物</router-link>
  </div>
</template>

<script>
import url from "@/serviceAPI.config";
import axios from "axios";
import NavBar from "@/components/NavBar";
export default {
  data() {
    return {
      orderId: "",
      orderData: {
        orderId: "",
        createDate: "",
        addressInfo: {
          userName: "",
          tel: "",
          streetName: ""
        }
      }
    };
  },
  filters: {
    GMTToStr(time) {
      let date = new Date(time);
      let Str =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      return Str;
    }
  },
  components: {
    NavBar
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrderInfo();
  },
  methods: {
    getOrderInfo() {
      axios({
        url: url.getOrderInfo,
        method: "POST",
        data: {
          orderId: this.orderId
        },
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.orderData = res.data.message;
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("获取订单信息失败");
        });
    }
  }
};
</script>

<style scoped lage="scss">
.btn-buy {
  display: block;
  width: 90%;
  margin: 20px auto 0;
  font-size: 16px;
  background: #f44;
  line-height: 50px;
  text-align: center;
  border-radius: 3px;
  color: #fff;
}
</style>