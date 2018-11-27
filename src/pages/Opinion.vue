<template>
  <div>
    <nav-bar title="意见反馈"></nav-bar>
    <div class="message">
      <textarea cols="30" rows="7" v-model="message.message" placeholder="您的意见是我们进步的动力"></textarea>
      <input type="text" v-model="message.tel" placeholder="请留下联系方式（选填）"> 上传图片


      <van-uploader :after-read="onRead" multiple accept="image/jpg,image/jpeg" :max-size="3145728" @oversize="oversize">
        <van-icon name="photograph" class="icon-upload" />
      </van-uploader>


      <div class="upload-img">
        <img :src="message.imgUrl" alt="">
      </div>
      <van-button type="danger" @click="submit" class="btn-submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config";
import NavBar from "@/components/NavBar";
export default {
  data() {
    return {    
      message: {
        message: "",
        tel: "",
        imgUrl: ""
      }
    };
  },
  methods: {
    //图片读取完成后的回调
    onRead(file) {
      console.log(file);
      this.message.imgUrl = file.content;
    },
    // 提交
    submit() {
      axios({
        url: url.opinion,
        method: "POST",
        data: {
          message: this.message
        }
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.$toast.success("感谢您的宝贵意见");
            this.message = {};
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 超出大小
    oversize() {
      this.$toast.fail("超出大小,请上传3M以内的照片！");
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped lang="scss">
.message {
  margin: 30px 10px;
  display: flex;
  flex-direction: column;
  textarea,
  input {
    border: none;
    flex: 1;
    padding: 10px;
    margin-bottom: 20px;
  }
  button {
    margin: 0 20%;
  }
}
.icon-upload {
  font-size: 50px;
  margin: 30px 0;
}
.upload-img {
  flex: 1;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  img {
    width: 33.33%;
  }
}
</style>