<template>
  <div class="login">
    <van-nav-bar title="注册">

    </van-nav-bar>
    <div class="login-form">
      <div class="login-header">
        <img
          src="../assets/images/login.jpg"
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import loginStatus from "../util/isLogin.js";
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
          password: this.password
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
.login {
  background: url("../assets/images/bg-login.jpg") no-repeat 0 0 /100% 100%;
  height: 100vh;
}
.login-header {
  img {
    display: block;
    margin: 0 auto 30px;
    border-radius: 50%;
    width: 50%;
  }
}
.login-form {
  background: rgba(233, 244, 251, 0.8);
  margin: 30px 30px 15px;
  border-radius: 5px;
  padding: 30px 20px;
  .form-group {
    display: flex;
    border: 1px solid #ccc;
    border-radius: 50px;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 30px;
    position: relative;
  }
  p {
    position: absolute;
    right: 0;
    left: 0;
    color: #ff6a4c;
    top: 100%;
    padding-left: 56px;
    line-height: 30px;
  }
  input {
    border: 0;
    background: none;
    flex: 1;
    font-size: 14px;
    box-sizing: border-box;
    padding: 10px 10px 10px 20px;
  }
}
.submit {
  width: 100%;
  border: 1px solid #ff6a4c;
  background: #ff6a4c;
  color: #fff;
  padding: 7px 0;
  border-radius: 30px;
}
.tips {
  color: #fff;
  padding: 0 30px;
}
.tips a {
  color: #ff6a4c;
}
</style>