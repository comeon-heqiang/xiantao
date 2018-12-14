<template>
  <div class="login">
    <van-nav-bar title="注册">

    </van-nav-bar>
    <div class="login-form">
      <div class="login-header">
        <img
          src="../assets/images/xiaowo.jpg"
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
      <div class="form-group">
        <van-icon name="location" />
        <input
          type="text"
          v-model="email"
          placeholder="请输入邮箱地址"
        >
        <van-button
          type="primary"
          size="small"
          :disabled="codeDisabled"
          class="btn-code"
          @click="sendCode"
        >{{codeText}}</van-button>
        <p v-if="emailErrMsg">
          {{emailErrMsg}}
        </p>
      </div>
      <!-- <span class="tip">警告:如果未填写邮箱地址,无法找回密码,请知悉！</span> -->
      <div class="form-group">
        <van-icon name="pending-orders" />
        <input
          type="text"
          v-model="code"
          placeholder="请填写邮箱验证码"
        >
        <p v-if="codeErrMsg">
          {{codeErrMsg}}
        </p>
      </div>
      <van-button
        type="danger"
        @click="loginAction"
        :loading="openLoading"
        size="large"
      >注册</van-button>
    </div>
    <div class="tips">
      已有用户名?
      <router-link to="/login">去登录</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      codeText: "发送验证码",
      codeDisabled: false,
      userName: "",
      password: "",
      code: "", //验证码
      serverCode: "", //服务端返回的验证码
      email: "",
      emailErrMsg: "",
      userNameErrMsg: "",
      passwordErrMsg: "",
      codeErrMsg: "",
      openLoading: false
    };
  },
  methods: {
    loginAction() {
      this.checkForm() && this.Register();
    },
    // 服务端验证用户名密码
    Register() {
      this.openLoading = true;
      axios({
        url: url.register,
        method: "post",
        data: {
          userName: this.userName,
          password: this.password,
          email: this.email
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            Toast.success("注册成功");
            this.$router.push("/login");
          } else {
            console.log(response.data.message);
            Toast.fail("注册失败,用户名重复");

            this.openLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
          Toast.fail("注册失败");
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
      } else {
        this.passwordErrMsg = "";
      }
      // 判断验证码与服务端返回的验证码
      if (this.code != this.serverCode) {
        this.codeErrMsg = "验证码错误";
        isOk = false;
      } else {
        this.codeErrMsg = "";
      }
      if (!this.code) {
        this.codeErrMsg = "验证码不能为空";
      } else {
        this.codeErrMsg = "";
      }
      return isOk;
    },
    // 发送验证码
    sendCode() {
      if (!this.userEmail) {
        Toast.fail("请填写邮箱");
        return false;
      }
      axios({
        url: url.sendCode,
        method: "POST",
        data: {
          email: this.userEmail
        }
      })
        .then(response => {
          let res = response.data;
          if (res.code == 200 && res.message) {
            this.serverCode = res.message;
          }
        })
        .catch(err => {
          Toast.fail("验证码发送失败");
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/login.scss";
.login {
  background: url(../assets/images/bg3.jpg) no-repeat 0 0/100% 100%;
}
.tip {
  font-size: 12px;
  color: #ff4a4a;
  position: relative;
  top: -15px;
}
.login-form {
  .form-group {
    margin-bottom: 20px;
  }
}
.btn-code {
  box-sizing: border-box;
  line-height: 24px;
  height: 24px;
}
</style>