<template>
  <div>
    <nav-bar title="订单"></nav-bar>
    <div @click="modalShow=true">
      <van-row type="flex" align="center" class="address">

        <van-col span="23">
          <van-row type="flex" class="name">
            {{address.userName}} {{address.tel}}
          </van-row>
          <van-row>
            {{address.streetName}}
          </van-row>
        </van-col>
        <van-col span="1" class="text-center">
          <van-icon name="arrow" class="icon-arrow"></van-icon>
        </van-col>
      </van-row>
    </div>
    <div class="goods">
      <ul>
        <li v-for="(item,index) in goodsList" :key="index">
          <img :src="item.IMAGE1" alt="">
          <div class="info">
            <div class="name">
              {{item.NAME}}
            </div>
            <div class="price">
              ￥ {{item.PRESENT_PRICE}}
              <div class="num">
                x {{item.productNum}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="buy-info">
      <ul>
        <li>
          商品金额
          <p>￥{{totalMoney}}</p>
        </li>
        <li>
          运费
          <p>+￥{{Shipping}}</p>
        </li>
      </ul>
      <div class="total-price">
        总价:
        <p>￥{{totalMoney+Shipping}}</p>
      </div>
    </div>
    <div class="btn-group">
      <van-button type="primary">货到付款</van-button>
      <van-button type="danger" @click="pay">在线支付</van-button>
    </div>

    <!-- 收货地址列表 -->
    <div class="modalbg" :class="modalShow?'on':''" @click="changeModelShow"></div>
    <div class="address-list" :class="modalShow?'on':''">
      <ul>
        <li v-for="(item,index) in addressList" :key="index">
          <div class="detail" @click="selectAddress(item)">
            {{item.userName}}
            <p class="tel">
              {{item.tel}}
            </p>
          </div>
          <div class="street-name" @click="selectAddress(item)">
            {{item.streetName}}
          </div>
          <div class="edit">
            <div class="checked">
              <van-icon name="passed" class="icon-checked" @click="setDefault(item)" v-if="item.isDefault"></van-icon>
              <van-icon name="check" class="icon-checked icon-no-checked" @click="setDefault(item)" v-else></van-icon>
              默认地址
            </div>
            <p @click="editAddress(item)">
              <van-icon name="edit"></van-icon>编辑
            </p>
            <p @click="delAddress(item)">
              <van-icon name="delete"></van-icon>删除
            </p>
          </div>

        </li>
      </ul>
      <van-button type="danger" class="addAddress" @click="editAddress()">新增收货地址</van-button>
    </div>
    <!-- 编辑地址弹窗 -->
    <van-dialog v-model="dialogShow" :show-cancel-button="false" :showConfirmButton="false">
      <van-address-edit :area-list="areaList" :address-info="addressInfo" show-postal show-set-default @save="onSave" />
    </van-dialog>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config";
import NavBar from "@/components/NavBar";
import areaData from "@/data/area.js";
import { Toast, Area, AddressEdit } from "vant";
export default {
  data() {
    return {
      areaList: areaData, //地区联动数据
      goodsList: [], //购物车商品数据
      addressList: [], //收货地址列表
      Shipping: 0, //运费
      modalShow: false, //选择地址弹窗
      address: {}, //选择后的地址
      addressInfo: {}, //编辑地址表单数据
      dialogShow: false, //编辑地址弹窗
      isAdd: true //判断添加或编辑地址
    };
  },
  filters: {
    replace(value) {
      console.log(value);
      // return value.replace("-"," ")
      return value;
    }
  },
  computed: {
    // 计算总金额
    totalMoney() {
      let money = 0;
      this.goodsList.forEach(item => {
        money += parseInt(item.PRESENT_PRICE * item.productNum);
      });
      return money;
    }
  },
  components: {
    NavBar
  },
  mounted() {
    this.getGoodsList();
    this.getAddress();
  },
  methods: {
    // 获取收货地址
    getAddress() {
      axios({
        url: url.getAddress,
        method: "GET",
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.addressList = res.data.message;
            var a = this.addressList.forEach(item => {
              if (item.isDefault) {
                this.address = item;
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("获取收货地址信息失败");
        });
    },
    // 获取购物车商品信息
    getGoodsList() {
      axios({
        url: url.getCartList,
        method: "GET",
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.goodsList = res.data.message;
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("获取信息失败");
        });
    },
    // 设置默认地址
    setDefault(item) {
      let addressId = item.addressId;
      axios({
        url: url.setDefault,
        method: "POST",
        data: {
          addressId: addressId
        },
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.getAddress();
          } else {
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("设置默认地址失败");
        });
    },
    // 删除地址
    delAddress(item) {
      axios({
        url: url.delAddress,
        method: "POST",
        data: {
          addressId: item.addressId
        },
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.getAddress();
          } else {
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("删除地址失败");
        });
    },
    // 选择地址
    selectAddress(item) {
      this.address = item;
      this.modalShow = false;
    },
    // 编辑地址
    editAddress(item) {
      this.dialogShow = true;
      console.log(item);
      if (item) {
        let addressDetail = item.streetName.split("-");
        // 初始化地址表单信息
        let addressInfo = {
          id: item.addressId,
          name: item.userName,
          tel: item.tel,
          province: addressDetail[0],
          city: addressDetail[1],
          county: addressDetail[2],
          areaCode: item.areaCode,
          addressDetail: addressDetail[3],
          postalCode: item.postCode,
          isDefault: item.isDefault
        };
        this.addressInfo = addressInfo;
        this.isAdd = false;
      }
      else{
        this.isAdd = true;
      }
    },
    changeModelShow() {
      this.modalShow = !this.modalShow;
    },

    // 编辑地址后保存
    onSave(item) {
      console.log(item);
         
      let streetName = [
        item.province,
        item.city,
        item.county,
        item.addressDetail
      ].join("-");
      let addressInfo = {
        addressId: item.id,
        userName: item.name,
        streetName: streetName,
        postCode: item.postalCode,
        tel: parseInt(item.tel),
        areaCode: item.areaCode,
        isDefault: item.isDefault
      };
      axios({
        url: url.editAddress,
        method: "POST",
        data: {
          addressInfo: addressInfo,
          flag: this.isAdd
        },
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.$toast.success(res.data.message);

            this.dialogShow = false;
            this.getAddress();
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail(err);
        });
    },
    // 在线支付
    pay() {
      axios({
        url: url.pay,
        method: "POST",
        data: {
          addressId: this.address.addressId,
          total: this.totalMoney
        },
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            const toast = Toast.loading({
              duration: 0, //持续展示loading
              mask: true, //遮罩层
              forbidClick: true, //禁用背景点击
              message: "支付中..."
            });
            let second = 2;
            const setTime = setInterval(() => {
              second--;
              if (!second) {
                clearInterval(setTime);
                Toast.clear();
                this.$toast.success("支付成功");
                this.$router.push({
                  name: "Pay",
                  params: { orderId: res.data.message }
                });
              }
            }, 1000);
          }
        })
        .catch(err => {
          this.$toast.fail("支付失败");
        });
    }
  }
};
</script>

<style scoped lang='scss'>
.icon-checked {
  font-size: 14px;
  color: #e4393c;
}
.icon-no-checked {
  color: #999;
}
.address {
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(
        to right,
        #ec6d6d 24px,
        transparent 0,
        transparent 31px,
        #8bb5e8 0,
        #8bb5e8 56px,
        transparent 0
      )
      repeat-x left bottom / 64px 5px;
    transform: skew(-30deg);
  }
  background: #fff;
  padding: 15px;
  .name {
    font-weight: bold;
    color: #333;
    line-height: 20px;
  }
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.icon-arrow {
  color: #cfcccf;
}
.goods {
  background: #fff;
  li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 15px 15px 20px;
    border-bottom: 1px solid #e5e5e5;
    img {
      width: 100px;
    }
    .info {
      flex: 1;
      padding: 10px;
      .price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        color: #e93b3d;
        font-size: 16px;
        .num {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
.buy-info {
  background: #fff;
  padding: 15px;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 25px;
    p {
      color: #e93b3d;
    }
  }
  .total-price {
    display: flex;
    justify-content: flex-end;
    color: #000;
    font-weight: bold;
    font-size: 16px;
    margin-top: 10px;
    p {
      color: #e93b3d;
      font-weight: normal;
    }
  }
}
.btn-group {
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  button {
    margin-top: 15px;
  }
}
.modalbg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 10;
  visibility: hidden;
  transition: all 0.2s;
  &.on {
    background: rgba(0, 0, 0, 0.6);
    visibility: visible;
  }
}
.address-list {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  width: 70%;
  background: #efeef3;
  transition: all 0.4s ease-in-out;
  transform: translateX(100%);
  &.on {
    transform: translateX(0);
  }
  ul {
    li {
      background: #fff;
      padding: 10px;
      margin-bottom: 10px;
      .detail {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        align-items: center;
      }
      .street-name {
        margin: 10px 0;
      }
      .edit {
        display: flex;
        justify-content: space-between;
        .checked {
          flex: 1;
          i {
            vertical-align: middle;
          }
        }
        p {
          margin-left: 10px;
          i {
            margin: 0 5px;
          }
        }
      }
    }
  }
  .addAddress {
    position: absolute;
    bottom: 40px;
    left: 10px;
    right: 13px;
    width: 63%;
    margin: auto;
  }
}
.van-address-list__add {
  position: initial;
  margin: 20px auto;
  display: block;
  width: 90%;
}
</style>