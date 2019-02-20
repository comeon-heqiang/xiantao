<template>
  <div>
    <nav-bar title="关于我们"></nav-bar>
    <div class="contact">
      <div class="logo">
        <img
          src="../assets/images/icon-logo.png"
          alt=""
        >
      </div>
      <ul>
        <li>
          <span>官方微信：</span>
          <p>heqiangV587</p>
          <!-- {{contactData.name}} -->
        </li>
        <li>
          <span>官方微博：</span>
          <p>风吹散心语</p>
        </li>
        <li>
          <span>官方网站：</span>
          <p>www.foreveral.com</p>
        </li>
        <li>
          <span>联系方式：</span>
          <p>15826888343</p>
        </li>
        <li>
          <span>公司邮箱</span>
          <p>3097951776@qq.com</p>
        </li>
      </ul>
      <div class="content">
        {{contactData.content}}
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  data () {
    return {
      contactData: {}
    };
  },
  created () {
    this.getContact();
  },
  methods: {
    //   获取联系信息
    getContact () {
      this.$axios({
        url: this.$serverUrl.getContact,
        method: "GET"
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.contactData = res.data.message;
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
  padding: 30px;
  background: #fff;
  ul {
    li {
      display: flex;
      padding: 15px 5px;
      border-bottom: 1px solid #ddd;
      font-size: 15px;
      color: #636363;
      span {
        width: 80px;
      }
      p {
        flex: 1;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.logo {
  text-align: center;
  img {
    width: 150px;
  }
}
.content {
  color: #a7a7a7;
  line-height: 25px;
  margin-top: 60px;
  display: none;
}
</style>