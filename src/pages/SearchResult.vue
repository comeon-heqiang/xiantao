<template>
  <div>
    <nav-bar title="搜索结果"></nav-bar>
    <div class="result">
      <!-- 所有商品 -->
      <van-list v-model="loading" :finished="finished" @load="onLoad" class="goods-list" v-if="goodsData.length">
        <ul>
          <li v-for="(item,index) in goodsData" :key="index" @click="goGoodsDetail(item)">
            <img :src="item.IMAGE1" alt="">
            <div>
              <h2>
                {{item.NAME}}
              </h2>
              <p>
                ￥ {{item.PRESENT_PRICE}}
              </p>
            </div>
          </li>
        </ul>
      </van-list>
      <div v-else class="no-goods">
        <img src="../assets/images/no-goods.png" alt="">
        暂无商品 <router-link to="/shop">去商城逛逛吧</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import headerSearch from "@/components/search-bar";
import noData from "@/components/noData";
import navBar from "@/components/NavBar";
import axios from "axios";
import url from "@/serviceAPI.config";
import { Toast } from "vant";
export default {
  data() {
    return {
      searchVal: "",
      loading: false,
      finished: false,
      goodsData: [],
      page: 1
    };
  },
  created() {
    this.searchVal = this.$route.query.searchVal;
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      axios({
        method: "POST",
        url: url.searchGoods,
        data: {
          searchVal: this.searchVal,
          page: this.page
        }
      })
        .then(response => {
          let res = response.data;
          console.log(res);
          if (res.code == 200 && res.message.length) {
            this.finished = false;
            this.page++;
            this.goodsData = this.goodsData.concat(res.message);
          } else {
            this.finished = true;
            // Toast.fail("无数据");
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          Toast.fail("搜索失败");
        });
    },
    goGoodsDetail(item){
      
      this.$router.push({path:"/goods",query:{goodsId:item.ID}})
    },
    onLoad() {
      setTimeout(() => {
        this.getGoodsList();
      }, 500);
    }
  },
  components: {
    navBar,
    noData
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/searchResult.scss";
</style>