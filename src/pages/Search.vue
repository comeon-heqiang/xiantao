<template>
  <div>
    <header-search></header-search>
    <!-- 搜索历史 -->
    <div class="hot-search search-history">
      <h2>
        搜索记录
        <span @click="clearHistory">清空记录</span>
      </h2>
      <ul>
        <li v-for="(item,index) in searchHistory" :key="index" @click="toSearchResult(item)">
          {{item}}
        </li>
      </ul>

    </div>
    <!-- 热门搜索 -->
    <div class="hot-search">
      <h2>
        热门搜索
      </h2>
      <ul>
        <li v-for="(item,index) in hotData" :key="index" @click="toSearchResult(item)" :style="{background:bgColor[index]}">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headerSearch from "@/components/search-bar";
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      hotData: ["龙虾", "大米", "藕", "酱", "仙桃"],
      searchHistory: [],
      bgColor: []
    };
  },
  created() {
    //   获取搜索历史
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchHistory) {
      this.searchHistory = searchHistory;
    }
    this.ranDomColor();
  },
  methods: {
    //   跳转搜索结果页
    toSearchResult(item) {
      var arr = JSON.parse(localStorage.getItem("searchHistory")) || [];
      if (arr.indexOf(item) < 0) {
        arr.push(item);
      }
      localStorage.setItem("searchHistory", JSON.stringify(arr));
      // this.$router.push({
      //   path: "/searchResult",
      //   query: { searchVal: this.searchVal }
      // });
      this.$router.push({ path: "/searchResult", query: { searchVal: item } });
    },
    // 清除搜索历史
    clearHistory() {
      Dialog.confirm({
        title: "提示",
        message: "确定清除搜索历史?"
      })
        .then(res => {
          localStorage.removeItem("searchHistory");
          this.searchHistory = [];
          Toast("清除成功");
        })
        .catch(err => {});
    },
    ranDomColor() {
      for (var i in this.hotData) {
        this.bgColor.push(
          "rgb(" +
            this.random(100, 255) +
            "," +
            this.random(100, 255) +
            "," +
            this.random(100, 300) +
            ")"
        );
      }
    },
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  components: {
    headerSearch
  }
};
</script>

<style scoped lang="scss">
.hot-search {
  margin-top: 20px;
  padding: 0 10px;
  h2 {
    font-size: 15px;
    font-weight: normal;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 12px;
      color: #666;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      padding: 5px 10px;
      background: #ececec;
      color: #fff;
      border-radius: 2px;
      margin: 5px 10px 10px 0;
    }
  }
}
.search-history {
  ul {
    li {
      color: #666;
    }
  }
}
</style>