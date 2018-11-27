<template>
  <div>
    <van-nav-bar title="商城">

    </van-nav-bar>
    <van-row>
      <van-col span="6">
        <div class="leftNav" id="leftNav">
          <ul>
            <!-- <li>所有商品</li> -->
            <li v-for="(item,index) in categoryData" :key="index" :class="{on:index==active}" @click="categoryClick(item,index)">
              {{item.name}}
            </li>
          </ul>
        </div>
      </van-col>
      <van-col span="18">
        <div class="goods-list" id="goods">
          <ul>
            <li v-for="(item,index) in GoodsData" :key="index" @click="toGoodsDetail(item)">

              <img :src="item.IMAGE1" alt="">
              <div class="name">
                {{item.NAME}}
              </div>
              <div class="price">
                ￥{{item.PRESENT_PRICE}}
              </div>
            </li>
          </ul>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 0,
      categoryID: "",
      categoryData: [],
      GoodsData: []
    };
  },
  created() {    
    if (this.$route.params.categoryID) {
      this.categoryID = this.$route.params.categoryID;
      switch (this.categoryID) {
        case "2":
          this.active = 0;
          break;
        case "3":
          this.active = 1;
          break;
        case "1":
          this.active = 2;
          break;
        case "4":
          this.active = 3;
          break;
        case "5":
          this.active = 4;
          break;
        case "6":
          this.active = 5;
          break;
        case "7":
          this.active = 6;
          break;
      }
    }
    this.getCategory();
  },
  mounted() {
    let leftNav = document.getElementById("leftNav");
    leftNav.style.height = window.innerHeight - 46 - 50 + "px";
    let goods = document.getElementById("goods");
    goods.style.height = window.innerHeight - 46 - 50 + "px";
  },
  methods: {
    //   获取分类数据
    getCategory() {
      axios
        .get(url.category)
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.categoryData = res.data.message;
            this.categoryID = this.categoryID
              ? this.categoryID
              : this.categoryData[0].id;
            this.getGoods();
          } else {
            Toast.fail("获取类别失败");
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("获取类别失败");
        });
    },
    // 获取所有商品
    getAllGoods() {
      axios(url.goods)
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.allGoods = response.data.message;
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("获取所有商品信息失败");
        });
    },
    // 分类点击
    categoryClick(item, index) {
      this.active = index;
      this.categoryID = item.id;
      this.getGoods();
    },
    // 根据分类获取商品数据
    getGoods() {
      axios({
        url: url.categoryGoods,
        method: "post",
        data: {
          CategoryID: this.categoryID
        }
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.GoodsData = res.data.message;
          } else {
          }
        })
        .catch(err => {
          console.log(err);
          Toast.fail("获取商品数据失败");
        });
    },
    // 跳转到商品详情页
    toGoodsDetail(item) {
      this.$router.push({ path: "/goods", query: { goodsId: item.ID } });
    }
  }
};
</script>

<style scoped lang="scss">
.leftNav {
  background: #f8f8f8;
  li {
    color: #333;
    font-size: 14px;
    line-height: 46px;
    text-align: center;
    &.on {
      color: #e93b3d;
      background: #fff;
    }
  }
}
.goods-list {
  overflow: scroll;
  background: #fff;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      flex-basis: 50%;
      box-sizing: border-box;
      padding: 0 10px;
      margin-bottom: 10px;
      img {
        width: 100%;
      }
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 13px;
        height: 36px;
        line-height: 18px;
        margin-top: 8px;
      }
      .price {
        margin-top: 5px;
        font-size: 12px;
        color: #f23030;
      }
    }
  }
}
</style>