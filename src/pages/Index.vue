<template>
  <div>
    <!-- <header-search></header-search> -->
    <!-- <div class="search-fix"> -->
    <div class="search-wrap">
      <div class="search">
        <van-icon name="search"></van-icon>
        <input
          type="text"
          placeholder="请输入搜索内容"
          @click="toSearch"
        >
      </div>
    </div>
    <!-- </div> -->
    <!-- 新闻资讯 -->
    <div class="news">
      <van-notice-bar
        text="江南皮革厂倒闭了，老板带着小姨子跑了，全场29元！29元你买不了吃亏，买不了上当！先到先选，量大从优！"
        mode="closeable"
        :speed="30"
        left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
      />
    </div>

    <!-- banner 轮播图 -->
    <van-swipe
      :autoplay="3000"
      class="banner"
    >
      <van-swipe-item
        v-for="(item,index) in bannerList"
        :key="index"
        class="swiper-item"
      >
        <!-- <img v-lazy="item.src" alt=""> -->
        <img
          :src="item.src"
          alt=""
        >
        <p>{{item.intro}}</p>
      </van-swipe-item>
    </van-swipe>

    <!-- 类别栏目 -->
    <van-row
      type="flex"
      justify="space -between"
      class="category"
    >
      <van-col
        span="6"
        v-for="(item,index) in categoryData"
        :key="index"
      >
        <div @click="categoryClick(item)">
          <img
            :src="'http://www.foreveral.com:3000/images/'+item.image"
            alt=""
          > {{item.name}}
          <!-- <img :src="'http://localhost:3000/images/'+item.image" alt=""> {{item.name}} -->
        </div>

      </van-col>
    </van-row>

    <!-- 商品专区 -->
    <div class="title">商品专区
      <router-link to="/shop">查看更多</router-link>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      class="goods-list"
    >
      <ul>
        <li
          v-for="(item,index) in goodsData"
          :key="index"
          @click="goGoodsDetail(item)"
        >
          <img
            :src="item.IMAGE1"
            alt=""
          >
          <h2>
            {{item.NAME}}
          </h2>
          <p>
            ￥ {{item.PRESENT_PRICE}}
          </p>
        </li>
      </ul>
    </van-list>
    <!-- <div class="no-data">
      我也是有底线的
    </div> -->
  </div>
</template>

<script>
import { Toast } from 'vant'
import headerSearch from "@/components/search-bar";
export default {
  data () {
    return {
      bannerList: [
        {
          src: require('../assets/images/banner1.jpg'),
          intro: "小龙虾全场满299减60"
        },
        {
          src: require('../assets/images/banner2.jpg'),
          intro:
            "天天海鲜 天天特价"
        }
      ],
      categoryData: [], //栏目数据
      searchVal: "",  //搜索值
      loading: false,
      finished: false,
      page: 1,
      goodsData: [] //商品数据
    };
  },
  created () {

  },
  mounted () {
    this.getGoods();
    this.getCategory();
  },
  methods: {
    // 获取商品
    getGoods () {
      this.$axios({
        url: this.$serverUrl.getPageGoods,
        method: "POST",
        data: {
          page: this.page
        }
      })
        .then(response => {
          let res = response.data;
          if (res.code == 200 && res.message.length) {
            this.finished = false;
            this.page++;
            this.goodsData = this.goodsData.concat(res.message);
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取栏目
    getCategory () {
      this.$axios
        .get(this.$serverUrl.category)
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.categoryData = res.data.message.filter(item => item.isShow);
          } else {
            Toast.fail("获取类别失败");
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("获取类别失败");
        });
    },
    // 上拉加载更多
    onLoad () {
      setTimeout(() => {
        this.getGoods();
      }, 500);
    },
    // 跳转商品详情
    goGoodsDetail (item) {
      this.$router.push({ path: "/goods", query: { goodsId: item.ID } });
    },
    // 跳转搜索页
    toSearch () {
      this.$router.push({ path: "/search" });
    },
    // 栏目点击跳转
    categoryClick (item) {
      this.$router.push({ path: "/shop", query: { categoryID: item.id } });
    }
  },
  components: {
    headerSearch
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/index.scss";
</style>