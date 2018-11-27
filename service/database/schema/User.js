const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
// const bcrypt = require("bcrypt"); //密码加盐加密
// const SALT_WORK_FACTOR = 10;
let UserSchema = new Schema({
  userId: {
    type: ObjectId
  },
  userName: {
    unique: true,
    type: String
  },
  password: {
    type: String,
    default: ''
  },
  nickName: {
    type: String,
    default: ''
  },
  userPic: {
    type: String,
    default: ''
  },
  radio: {
    type: String,
    default: ''
  },
  birthDay: {
    type: String,
    default: ''
  },
  areaDetail: {
    type: String,
    default: ''
  },
  areaCode: {
    type: String,
    default: ''
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  },
  orderList: [{
    orderId: String,
    orderTotal: Number,
    addressInfo: Object,
    goodsList: [{
      ID: String, //编号
      GOODS_NUMBER: String, //商品编号
      SUB_ID: String, //类别
      STATE: Number, //状态
      NAME: String, //商品名称
      ORI_PRICE: Number, //促销价格
      PRESENT_PRICE: Number, //市场价
      AMOUNT: Number, //库存
      DETAIL: Array, //详情页 图片列表
      IMAGE1: String, //商品缩略图
      productNum: Number, //商品数量
      checked: Number //是否选中    
    }],
    orderStatus: String, //订单状态
    createDate: {
      type: Date,
      default: Date.now()
    }
  }],
  cartList: [{
    ID: String, //编号
    GOODS_NUMBER: String, //商品编号
    SUB_ID: String, //类别
    STATE: Number, //状态
    NAME: String, //商品名称
    ORI_PRICE: Number, //促销价格
    PRESENT_PRICE: Number, //市场价
    AMOUNT: Number, //库存
    DETAIL: Array, //详情页 图片列表
    IMAGE1: String, //商品缩略图
    productNum: Number,
    checked: Number
  }],
  addressList: [{
    addressId: String,
    userName: String,
    streetName: String,
    postCode: String,
    tel: String,
    areaCode: String,
    isDefault: Boolean
  }]
})
// 每次保存时执行 对密码进行加密
// UserSchema.pre("save", function (next) {
//   bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//     if (err) return next(err);
//     bcrypt.hash(this.password, salt, (err, hash) => {
//       if (err) return next(err);
//       this.password = hash;
//       next();
//     })
//   })
// })
// 匹对密码
// UserSchema.methods = {
//   comparePassword: function (_password, password) {
//     return new Promise((resolve, reject) => {
//       bcrypt.compare(_password, password, (err, isMatch) => {
//         if (!err) {
//           resolve(isMatch)
//         } else {
//           reject(err)
//         }
//       })
//     })
//   }
// }
mongoose.model("User", UserSchema)
