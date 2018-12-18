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
          class="btn-code"
          @click="sendCode"
        >{{sendcodeText}}</van-button>
        <p v-if="emailErrMsg">
          {{emailErrMsg}}
        </p>
      </div>
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
import crypto from "@/util/crypto";
import { Toast, Dialog } from "vant";

export default {
  data() {
    return {
      sendcodeText: "获取验证码",
      userName: "",
      password: "",
      code: "", //验证码
      serverCode: "", //服务端返回的验证码
      email: "",
      emailErrMsg: "",
      userNameErrMsg: "",
      passwordErrMsg: "",
      codeErrMsg: "",
      openLoading: false,
      timer: ""
    };
  },
  created() {
    clearInterval(this.timer);
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
          password:crypto.set(this.password),
          email: this.email
        }
      })
        .then(response => {          
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
      console.log(this.code);
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
      if (!this.code || this.code != this.serverCode) {
        this.codeErrMsg = "验证码错误";
        isOk = false;
      } else {
        this.codeErrMsg = "";
      }
      if (!this.email) {
        this.emailErrMsg = "邮箱不能为空";
        isOk = false;
      } else {
        this.emailErrMsg = "";
      }
      return isOk;
    },
    // 发送验证码
    sendCode() {
      if (!this.email) {
        Toast.fail("请输入邮箱");
        return false;
      }
      if (this.sendcodeText != "获取验证码") {
        return false;
      }
      let time = 30;
      this.sendcodeText = "再次获取(" + time + "s)";
      this.timer = setInterval(() => {
        if (time > 0) {
          time--;
          this.sendcodeText = "再次获取(" + time + "s)";
        } else {
          clearInterval(this.timer);
          this.sendcodeText = "获取验证码";
        }
      }, 1000);

      axios({
        url: url.sendCode,
        method: "POST",
        data: {
          email: this.email,
          register: true
        }
      })
        .then(response => {
          let res = response.data;
          console.log(response);
          if (res.code == 200 && res.message != "exist") {
            this.serverCode = res.message;
          } else if (res.code == 200 && res.message == "exist") {
            clearInterval(this.timer);
            this.sendcodeText = "获取验证码";
            Toast.fail("邮箱已经注册,请重新输入邮箱");
          } else {
            clearInterval(this.timer);
            this.sendcodeText = "获取验证码";
            Toast.fail("邮件发送失败,请检查邮箱地址是否正确");
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