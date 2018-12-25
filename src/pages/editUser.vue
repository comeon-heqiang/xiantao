<template>
  <div class="user">
    <nav-bar title="编辑个人信息"></nav-bar>
    <ul>
      <li>
        <p>
          头像：
        </p>
        <div class="user-thumb" v-if="userInfo.userPic">
          <img :src="userInfo.userPic" v-if="userInfo.userPic">
          <img src="../assets/images/userPic.png" v-else>
        </div>
        <!-- VueCoreImageUpload -->
        <vue-core-image-upload @imageuploaded="uploadImage" text="选择头像" class="upload-component" crop="local" cropRatio="1:1" :maxWidth="150" :maxHeight="150" inputAccept='image/jpg,image/jpeg' :isXhr="true" :maxFileSize="5242880" inputOfFile="file" url="http://www.foreveral.com:3000/dsSystem/user/upload"></vue-core-image-upload>
        <!-- <vue-core-image-upload @imageuploaded="uploadImage" text="选择头像" class="upload-component" crop="local" cropRatio="1:1" :maxWidth="150" :maxHeight="150" inputAccept='image/jpg,image/jpeg' :isXhr="true" :maxFileSize="5242880" inputOfFile="file" url="http://localhost:3000/user/upload"></vue-core-image-upload> -->
        <van-icon name="arrow"></van-icon>
      </li>
      <li>
        <p>昵称：</p>
        <input type="text" v-model="userInfo.nickName" placeholder="请输入昵称">
        <van-icon name="arrow"></van-icon>
      </li>
      <li>
        <p>
          性别
        </p>
        <van-radio-group v-model="userInfo.radio">
          <van-radio name="0">男</van-radio>
          <van-radio name="1">女</van-radio>
        </van-radio-group>

      </li>
      <li @click="dateShow=true">
        <p>
          生日
        </p>
        <input type="text" v-model="userInfo.birthDay" placeholder="请选择日期">
        <van-icon name="arrow"></van-icon>
      </li>
      <li>
        <p>
          所在地
        </p>
        <input type="text" v-model="userInfo.areaDetail" placeholder="选择省市区" @click="areaShow=true">
        <van-icon name="arrow"></van-icon>
      </li>
    </ul>
    <van-popup v-model="dateShow" position="bottom">
      <van-datetime-picker v-model="currentDate" :min-date="minDate" type="date" @change="change" :max-date="maxDate" @cancel="cancel" @confirm="confirm" />
    </van-popup>
    <van-popup v-model="areaShow" position="bottom">
      <van-area :area-list="areaList" @cancel="areaShow=false" @confirm="areaConfirm" />
    </van-popup>
    <van-button type="danger" class="btn-submit" @click="submit">保存</van-button>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config";
import NavBar from "@/components/NavBar";
import util from "@/util/util";
import area from "@/data/area";
import VueCoreImageUpload from "@/components/vue-core-image-upload.vue";
export default {
  data() {
    return {
      userInfo: {},
      areaList: area,
      currentDate: new Date(),
      maxDate: new Date(),
      dateShow: false, //日期选择显示
      areaShow: false, //省市区弹窗显示
      areaCode: "",
       minDate: new Date(1950,1,1),
    };
  },
  mounted() {
    // this.userId = this.$route.params.userId;
    // console.log(this.userId)
  },
  created() {
    this.getUserInfo();
  },
  components: {
    NavBar,
    VueCoreImageUpload
  },
  methods: {
    // 获取用户基本信息
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
    // 选取图片后的回调
    onRead(file) {
      console.log(file);
    },

    cancel() {
      this.dateShow = false;
    },
    // 时间选择确定事件
    confirm(value) {
      this.dateShow = false;
      let val = new Date(value);
      let date =
        val.getFullYear() +
        "-" +
        (val.getMonth() + 1 < 10
          ? "0" + (val.getMonth() + 1)
          : val.getMonth() + 1) +
        "-" +
        (val.getDate() > 9 ? val.getDate() : "0" + val.getDate());
      this.userInfo.birthDay = date;
    },
    // 地区选择确定事件
    areaConfirm(value) {
      this.userInfo.areaDetail = [
        value[0].name,
        value[1].name,
        value[2].name
      ].join(" ");

      this.userInfo.areaCode = value[2].code;
      this.areaShow = false;
    },
    change(e) {
      // console.log(e.getValues());
    },
    // 图片上传后的回调
    uploadImage(res) {
      console.log(res);
      if (res.code == 200 && res.message) {
        this.userInfo.userPic = res.message;
      }
    },
    // 提交
    submit() {
      axios({
        url: url.editUserInfo,
        method: "POST",
        data: {
          userInfo: this.userInfo
        },
        withCredentials: true
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.$toast.success("保存成功");
            setTimeout(() => {
                this.$router.push('/userCenter')
            }, 500);
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("保存失败");
        });
    }
  }
};
</script>

<style scoped lang="scss">
.user {
  background: #fff;
  overflow: hidden;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ece9ec;
    padding: 12px 15px;
    font-size: 14px;
    position: relative;
    // .upload-component {
    //   position: absolute;
    //   z-index: 100;
    //   opacity: 0;
    //   top: 10px;
    //   right: 30px;
    //   width: 70px;
    //   height: 70px;
    // }
    .van-uploader {
      position: absolute;
      width: 70px;
      height: 70px;
      top: 15px;
      opacity: 0;
      right: 25px;
    }
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
    input {
      flex: 1;
      border: 0;
      text-align: right;
      padding: 0 10px;
    }
    // & > div {
    //   flex: 1;
    //   display: flex;
    //   justify-content: flex-end;
    // }
    .van-radio {
      margin-left: 10px;
    }
  }
}
.van-radio-group {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.btn-submit {
  display: block;
  margin: 20px auto;
  width: 60%;
  font-size: 16px;
}
.user-thumb {
  padding: 0 10px;
  flex: 1;
  text-align: right;
}
</style>