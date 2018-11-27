<template>
  <div>
    <div class="search-wrap">
      <van-icon name="arrow-left" @click="back"></van-icon>
      <div class="search">
        <van-icon name="search"></van-icon>
        <input type="text" placeholder="请输入搜索内容" v-model="searchVal">
      </div>
      <van-button size="small" type="primary" @click="search">搜索</van-button>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      searchVal: ""
    };
  },
  methods: {
    search() {
      if (!this.searchVal) {
        Toast("搜索内容不能为空");
        return;
      }
      var arr = JSON.parse(localStorage.getItem("searchHistory")) || [];
      if (arr.indexOf(this.searchVal) < 0) {
        arr.push(this.searchVal);
      }
      localStorage.setItem("searchHistory", JSON.stringify(arr)); 
      this.$router.push({
        path: "/searchResult",
        query: { searchVal: this.searchVal }
      });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.search-fix {
  // position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  box-sizing: border-box;
}
.search-wrap {
  padding: 10px;
  background: #fdcf1b;
  display: flex;
  align-items: center;
}
.search {
  display: flex;
  flex: 1;
  align-items: center;
  background: #fff;
  padding: 0 10px;
  margin: 0 10px;
  border-radius: 3px;
  box-shadow: 0 0 5px #ccc;
  input {
    height: 30px;
    border: 0;
    line-height: 30px;
    background: none;
    flex: 1;
    padding-left: 5px;
  }
}
.search-hot {
  background: #fff;
  padding: 0 20px;
  li {
  }
}
</style>