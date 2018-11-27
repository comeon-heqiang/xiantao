<template>
  <div>
    <nav-bar :title="regionName"></nav-bar>
    <div class="article" v-html="regionDetail.content" v-if="regionDetail.content">

    </div>
    <div v-else class="no-data">
      暂无数据
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import url from "@/serviceAPI.config";
import NavBar from "@/components/NavBar";
export default {
  data() {
    return {
      regionName: "",
      regionID: "",
      regionDetail: ""
    };
  },
  created() {
    this.regionID = this.$route.params.regionID;
    this.regionName = this.$route.params.regionName;
    this.getRegionDetail();
  },
  components: {
    NavBar
  },
  methods: {
    //   获取地区详情
    getRegionDetail() {
      axios({
        url: url.regionDetail,
        method: "post",
        data: {
          regionID: this.regionID
        }
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.regionDetail = res.data.message;
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("数据获取失败");
        });
    }
  }
};
</script>

<style scoped lang="scss">
.article {
  color: #939393;
  font-size: 13px;
  line-height: 2;
  padding: 0 15px;
  margin-top: 30px;
  img{
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }
}
.no-data{
     margin-top: 100px;
    text-align: center;
    font-size: 16px
}
</style>