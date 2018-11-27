<template>
    <div>
        <!-- 收货地址列表 -->
       
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
import areaData from "@/data/area.js";
import axios from "axios";
import url from "@/serviceAPI.config";
export default {
  props: ["modalShow"],
  data() {
    return {
      areaList: areaData, //地区联动数据
      addressList: [], //收货地址列表
      dialogShow: false, //编辑地址弹窗
      address: {}, //选择后的地址
      addressInfo: {}, //编辑地址表单数据
      isAdd: true //判断添加或编辑地址
    };
  },
  created() {},
  mounted() {
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
    }, // 设置默认地址
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
      } else {
        this.isAdd = true;
      }
    }
  }
};
</script>

<style scoped lang="scss">

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