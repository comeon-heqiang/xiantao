<template>
    <div>
        <nav-bar title="关于我们"></nav-bar>
        <div class="contact">
            <ul>
                <li>
                    <p>姓名：</p>
                    <input type="text" v-model="contactData.name" placeholder="联系姓名">
                </li>
                <li>
                    <p>联系方式：</p>
                    <input type="text" v-model="contactData.tel" placeholder="联系方式">
                </li>
                <li>
                    <p>
                        地址：
                    </p>
                    <input type="text" v-model="contactData.address" placeholder="详细地址">
                </li>
                <li>
                    <p>
                        内容：
                    </p>
                    <textarea rows="7" v-model="contactData.content" placeholder="内容"></textarea>
                </li>
            </ul>
            <van-button type="danger" @click="submit">保存</van-button>
        </div>
    </div>
</template>

<script>

import NavBar from "@/components/NavBar";
export default {
  data() {
    return {
      contactData: {}
    };
  },
  created() {
    this.getContact();
  },
  methods: {
    //   获取联系信息
    getContact() {
      this.$axios({
        url: this.$serverUrl.getContact,
        method: "GET"
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.contactData = res.data.message;
            console.log(res)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submit() {
      this.$axios({
        url: this.$serverUrl.editContact,
        method: "POST",
        data: {
          contact: this.contactData
        }
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.$toast.success("保存成功");
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("保存失败");
        });
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped lang="scss">
.contact {
  margin: 30px;
  ul {
    li {
      display: flex;
      margin-bottom: 10px;
      p {
        width: 80px;
      }
      input,
      textarea {
        flex: 1;
        border-radius: 5px;
        line-height: 35px;
        box-sizing: border-box;
        border: 1px solid #d8d8d8;
        padding: 0 10px;
      }
      textarea {
        line-height: 20px;
      }
    }
  }
}
</style>