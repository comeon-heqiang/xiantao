<template>
  <div class="login">
    <van-nav-bar title="登录">

    </van-nav-bar>
    <div class="login-form">
      <div class="login-header">
        <img
          src="../assets/images/login2.jpg"
          alt=""
        >
      </div>
      <div class="form-group">
        <van-icon name="contact" />
        <input
          type="text"
          v-model="userName"
          placeholder="请输入您的账号"
        >
        <p v-if="userNameErrMsg">
          {{userNameErrMsg}}
        </p>
      </div>
      <div class="form-group">
        <van-icon name="password-not-view" />
        <input
          type="password"
          v-model="password"
          placeholder="请输入您的密码"
        >
        <p v-if="passwordErrMsg">
          {{passwordErrMsg}}
        </p>
      </div>
      <van-button
        type="danger"
        @click="loginAction"
        :loading="openLoading"
        size="large"
      >立即登录</van-button>
      <!-- <button class="submit" @click="loginAction">注册</button> -->
    </div>
    <div class="tips">
      没有用户名?
      <router-link to="/register">去注册</router-link>
      <router-link to="/forgotPassword">忘记密码?</router-link>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import loginStatus from "../util/isLogin.js";
import crypto from "@/util/crypto";
export default {
  data() {
    return {
      userName: "",
      password: "",
      userNameErrMsg: "",
      passwordErrMsg: "",
      openLoading: false,
      isLogin: false
    };
  },
  created() {
    // this.isLogin = loginStatus;
    // if (localStorage.userInfo) {
    //   Toast("已登录");
    //   this.$router.push("/");
    // }
    this.isLogin = this.getLoginStatus();
    if (this.isLogin) {
      Toast("已登录");
      this.$router.push("/");
    }
  },
  mounted() {},
  methods: {
    loginAction() {
      this.checkForm() && this.Login();
    },
    // 服务端验证用户名密码
    Login() {
      this.openLoading = true;   
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.userName,
          password: crypto.set(this.password) //对密码进行加密
        },
        withCredentials: true
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = {
                userName: this.userName
              };
              resolve();
            })
              .then(res => {
                Toast.success("登录成功");                
                setTimeout(() => {
                  this.$router.push("/");
                }, 500);
              })
              .catch(err => {
                Toast.fail("登录状态保存失败");
              });
          } else {
            console.log(response);
            Toast.fail(response.data.message);
            this.openLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
    // 表单验证
    checkForm() {
      let isOk = true;
      if (this.userName.length < 5) {
        this.userNameErrMsg = "用户名不得少于5位";
        isOk = false;
      } else {
        this.userNameErrMsg = "";
      }
      if (this.password.length < 5) {
        this.passwordErrMsg = "密码不得少于5位";
        isOk = false;
      } else {
        this.passwordErrMsg = "";
      }
      return isOk;
    },
    // 获取cookie
    getLoginStatus() {
      return document.cookie.indexOf("userId") > -1 ? true : false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/login.scss";
</style>