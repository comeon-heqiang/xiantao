<template>
  <div>
    <van-nav-bar title="地区"></van-nav-bar>
    <ul class="region">
      <li v-for="(item,index) in regionData" :key="index" @click="toRegionDetail(item)">
        <p>{{item.NAME}}</p>
        <img :src="item.IMAGE" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import url from "@/serviceAPI.config";
export default {
  data() {
    return {
      regionData: []
    };
  },
  created() {
    this.getRegion();
  },
  methods: {
    // 获取地区列表
    getRegion() {
      axios(url.region)
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.regionData = res.data.message;
            
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("获取地区失败");
        });
    },
    // 根据id跳转地区详情
    toRegionDetail(item){
      this.$router.push({name:"RegionDetail",params:{regionID:item.ID,regionName:item.NAME}})
    }
  }
};
</script>

<style scoped lang="scss">
.region {
  padding-bottom: 50px;
  li {
    position: relative;

    img {
      display: block;
      width: 100%;
      height: 210px;
    }
    p {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      padding: 0 20px;
      line-height: 35px;
      font-size: 16px;
    }
  }
}
</style>