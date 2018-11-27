const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let GoodsSchema = new Schema({
  ID: String, //编号
  GOODS_NUMBER: String, //商品编号
  SUB_ID: String, //类别
  STATE: Number, //状态
  NAME: String, //商品名称
  ORI_PRICE: Number, //促销价格
  PRESENT_PRICE: Number, //市场价
  AMOUNT: Number, //库存
  DETAIL: Array, //详情页 图片列表
  IMAGE1: String //商品缩略图
})
mongoose.model("Goods", GoodsSchema, 'Goods')
