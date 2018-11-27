<template>
    <div>
        <nav-bar title="关于我们"></nav-bar>
        <div class="contact">
            <ul>
                <li>
                    <p>姓名：</p>
                    {{contactData.name}}
                </li>
                <li>
                    <p>联系方式：</p>
                    {{contactData.tel}}
                </li>
                <li>
                    <p>
                        地址：
                    </p>
                    {{contactData.address}}
                </li>
                <!-- <li>
                    <p>
                        内容：
                    </p>
                    
                </li> -->
            </ul>
            <div class="content">
                {{contactData.content}}
            </div>
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
      contactData: {}
    };
  },
  created() {
    this.getContact();
  },
  methods: {
    //   获取联系信息
    getContact() {
      axios({
        url: url.getContact,
        method: "GET"
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.contactData = res.data.message;
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
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
    }
  }
}
.content {
  color: #a7a7a7;
  line-height: 25px;
  margin-top: 60px;
}
</style>