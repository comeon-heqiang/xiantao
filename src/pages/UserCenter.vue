<template>
  <div>
    <div class="user">
      <template v-if="isLogin">
        <template v-if="userInfo.userPic">
          <img
            :src="'http://118.24.219.75/upload/'+userInfo.userPic"
            alt=""
            @click="toEditUser"
          >
        </template>
        <template v-else>
          <img
            src="../assets/images/userPic.png"
            alt=""
            @click="toEditUser"
          >
        </template>
        <div class="nick-name">
          <template v-if="userInfo.nickName">
            {{userInfo.nickName}}
          </template>
          <template v-else>
            {{userInfo.userName}}
          </template>
        </div>
      </template>
      <template v-else>
        <router-link
          to="/login"
          class="button-login"
        >去登录</router-link>
      </template>
    </div>

    <div class="user-center">
      <ul>
        <li>
          <router-link to="/myOrder">
            <van-icon name="pending-orders"></van-icon>
            我的订单
            <van-icon name="arrow"></van-icon>
          </router-link>
        </li>
        <li>
          <router-link to="/addressList">
            <van-icon name="location"></van-icon>
            地址管理
            <van-icon name="arrow"></van-icon>
          </router-link>
        </li>
        <li>
          <router-link to="/about">
            <van-icon name="info-o"></van-icon>
            关于我们
            <van-icon name="arrow"></van-icon>
          </router-link>
        </li>
        <li>
          <router-link to="/opinion">
            <van-icon name="records"></van-icon>
            意见反馈
            <van-icon name="arrow"></van-icon>
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="isLogin">
      <van-row
        type="flex"
        justify="center"
      >
        <van-col span="17">
          <van-button
            type="danger"
            size="large"
            @click="logoOut"
          >退出登录</van-button>
        </van-col>
      </van-row>
    </div>
  </div>

</template>

<script>
import loginStatus from "../util/isLogin.js";
import axios from "axios";
import url from "@/serviceAPI.config";
export default {
  data() {
    return {
      userInfo: "",
      isLogin: false
    };
  },
  created() {    
    this.getUserInfo();
    this.isLogin = this.getLoginStatus();
  },
  mounted() {},
  methods: {
    // 获取用户信息
    getUserInfo() {
      axios({
        url: url.getUserInfo,
        method: "GET",
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.userInfo = res.data.message;
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail(err);
        });
    },
    toEditUser() {
      this.$router.push({
        name: "EditUser"
      });
    },
    // 退出登录
    logoOut() {
      axios({
        url: url.logout,
        method: "GET",
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.$toast.success("退出登录");
            this.isLogin = this.getLoginStatus();           
            setTimeout(() => {
              this.$router.push("/login");
            }, 500);
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail(err);
        });
    },
    // 获取cookie
    getLoginStatus() {
      return document.cookie.indexOf("userId") > -1 ? true : false;
    }
  }
};
</script>

<style scoped lang="scss">
.user {
  text-align: center;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  padding: 30px 0;
  font-size: 16px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 15px;
    background: #fff;
    border: 3px solid #fff;
  }
}
.user-center {
  background: #fff;
  margin-bottom: 50px;
  li {
    padding: 0 15px;
    line-height: 45px;
    border-bottom: 1px solid #e8e8e8;
    position: relative;
    a {
      color: inherit;
      display: flex;
      align-items: center;
    }
    i:first-child {
      font-size: 20px;
      margin-right: 10px;
    }
    i:last-child {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
    }
  }
}
.button-login {
  display: inline-block;
  color: #38f;
  width: 80px;
  line-height: 80px;
  border-radius: 50%;
  background: #fff;
  font-size: 16px;
  box-shadow: 0 0 10px #fff;
}
</style>