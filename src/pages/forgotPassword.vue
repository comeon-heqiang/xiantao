<template>
  <div class="forgot">
    <nav-bar title="修改密码"></nav-bar>
    <div class="form">
      <div class="group">
        <img
          src="../assets/images/icon-yanzhengma.png"
          alt=""
        >
        <input
          type="text"
          placeholder="请输入手机号"
          v-model="phone"
        >
        <p @click="sendCode">{{sendcodeText}}</p>
      </div>
      <div
        class="tips"
        v-if="phoneMessage"
      >{{emailMessage}}</div>
      <div class="group">
        <img
          src="../assets/images/icon-email.png"
          alt=""
        >
        <input
          type="text"
          v-model="code"
          placeholder="请输入验证码"
        >
      </div>
      <div
        class="tips"
        v-if="codeMessage"
      >{{codeMessage}}</div>
      <div class="group">
        <img
          src="../assets/images/icon-password.png"
          alt=""
        >
        <input
          type="text"
          v-model="password"
          placeholder="请输入密码"
        >
      </div>
      <div
        class="tips"
        v-if="passwordMessage"
      >{{passwordMessage}}</div>
      <div class="group">
        <img
          src="../assets/images/icon-password.png"
          alt=""
        >
        <input
          type="text"
          v-model="password2"
          placeholder="请再次输入密码"
        >
      </div>
      <div
        class="tips"
        v-if="password2Message"
      >{{password2Message}}</div>
      <van-row
        type="flex"
        justify="center"
      >
        <van-button
          type="danger"
          @click="verify"
        >确认修改</van-button>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "../serviceAPI.config.js";

import { Toast, Dialog } from "vant";
import navBar from "../components/NavBar";
export default {
  data() {
    return {
      sendcodeText: "获取验证码",
      userData: "",
      phone: "",
      code: "",
      password: "",
      password2: "",
      serverCode: "", //服务端返回的验证码
      codeMessage: "",
      phoneMessage: "",
      passwordMessage: "",
      password2Message: ""
    };
  },
  methods: {
    // 获取验证码
    sendCode() {
      let timer = "";
      clearInterval(timer);
      if (!this.phone) {
        Toast.fail("请输入手机号");
        return false;
      }
      if (this.sendcodeText != "获取验证码") {
        return false;
      }
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        Toast.fail("请输入正确的手机号");
        return false;
      }
      let time = 30;
      timer = setInterval(() => {
        if (time > 0) {
          this.sendcodeText = "再次获取(" + time + "s)";
          time--;
        } else {
          clearInterval(timer);
          this.sendcodeText = "获取验证码";
        }
      }, 1000);

      axios({
        url: url.sendPhoneCode,
        method: "POST",
        data: {
          phone: this.phone
        }
      })
        .then(response => {
          let res = response.data;
          if (res.code == 200 && res.message) {
            console.log('验证码:'+res.message)
            this.serverCode = res.message;
          } else {
            Toast.fail("获取验证码失败，请检查手机号是否正确");
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("获取验证码失败");
        });
    },
    // 表单验证
    checkForm() {
      let isOk = true;
      if (!this.password) {
        this.passwordMessage = "密码不能为空";
        isOk = false;
      } else {
        this.passwordMessage = "";
      }
      if (this.password != this.password2) {
        this.password2Message = "两次输入密码不一致";
        isOk = false;
      } else {
        this.password2Message = "";
      }
      if (this.serverCode != this.code) {
        this.codeMessage = "验证码输入错误";
        isOk = false;
      } else {
        this.codeMessage = "";
      }

      return isOk;
    },
    verify() {
      this.checkForm() && this.submit();
    },
    submit() {
      axios({
        url: url.editPassword,
        method: "POST",
        data: {
          phone: this.phone,
          password: this.password
        }
      })
        .then(response => {
          let res = response.data;
          if (res.code == 200 && res.message) {
            console.log("密码修改成功");
            // Toast.success("密码修改成功");\
            Dialog.alert({
              title: "提示",
              message: "密码修改成功",
              confirmButtonText: "去登录"
            }).then(res => {
              this.$router.push({ path: "/login" });
            });
          } else {
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("密码更改失败");
        });
    }
  },
  components: {
    navBar
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/forgotPassword.scss";
</style>