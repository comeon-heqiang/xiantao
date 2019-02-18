// const LOCALURL = 'http://118.24.219.75:3000/';
// const LOCALURL = '/apis/';
const LOCALURL = 'http://localhost:3000/';
let URL = {
  register: LOCALURL + 'user/register', //用户注册
  login: LOCALURL + 'user/login', //用户登录
  logout: LOCALURL + 'user/logout', //退出登录
  sendCode: LOCALURL + 'user/sendCode', //发送邮箱验证码
  sendPhoneCode:LOCALURL+"user/sendPhoneCode",//发送手机验证码
  editPassword: LOCALURL + 'user/editPassword', //修改密码
  getUserInfo: LOCALURL + "user/getUserInfo", //获取用户信息
  getAllOrder: LOCALURL + "user/getAllOrder", //获取订单
  delOrder: LOCALURL + 'user/delOrder', //删除订单
  region: LOCALURL + "region", //获取地区列表
  regionDetail: LOCALURL + "region/regionDetail", //获取地区详情
  category: LOCALURL + 'category', //获取类别信息
  goods: LOCALURL + 'Goods', //获取所有商品
  getPageGoods: LOCALURL + 'goods/getPageGoods',
  categoryGoods: LOCALURL + 'goods/CategoryGoods', //获取指定类别下的商品
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品详情
  joinCart: LOCALURL + 'goods/joinCart', //加入购物车
  searchGoods: LOCALURL + 'goods/search', //搜索商品
  getCartList: LOCALURL + 'user/getCartList', //获取购物车商品
  checkAll: LOCALURL + 'user/checkAll', //全选 取消全选
  goodsCheck: LOCALURL + 'user/goodsCheck', //单个商品选中与取消选中
  delGoods: LOCALURL + 'user/delGoods', //删除购物车单个商品
  getCartCount: LOCALURL + 'user/getCartCount', //获取购物车商品数量
  changeGoodsNum: LOCALURL + 'user/changeGoodsNum', //改变购物车商品数量
  getAddress: LOCALURL + 'user/getAddress', //获取收货地址
  setDefault: LOCALURL + 'user/setDefault', //设为默认地址
  delAddress: LOCALURL + 'user/delAddress', //删除地址
  editAddress: LOCALURL + 'user/editAddress', //编辑地址后保存
  pay: LOCALURL + 'user/pay', //支付
  editUserInfo: LOCALURL + 'user/editUserInfo', //编辑用户资料
  getOrderInfo: LOCALURL + 'user/getOrderInfo', //获取订单信息
  getContact: LOCALURL + 'contact', //获取联系信息
  editContact: LOCALURL + 'contact/editContent', //编辑联系信息  
  opinion: LOCALURL + 'opinion/message' //提交反馈  
}
module.exports = URL;
