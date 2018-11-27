const mongoose = require('mongoose');
const router = require("koa-router")();
let info = require("../middlewares/info");
let Util = require("../util/util");
const multer = require('koa-multer');
const path = require("path")
// const upload = multer({ dest: './upload/' });
// 配置图片上传
let storage = multer.diskStorage({
  // 文件保存路径
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../assets/upload/'))
    // cb(null, 'http://localhost:3000/upload/')
  },
  //修改文件名称
  filename: (req, file, cb) => {
    var fileFormat = file.originalname.split('.');
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1])
  }
})
//加载配置
var upload = multer({
  storage: storage
});
// 用户注册
router.post("/register", async (ctx) => {
  const UserModel = mongoose.model('User');
  let user = new UserModel(ctx.request.body);
  await user.save().then(() => {
    ctx.body = {
      code: 200,
      message: "注册成功"
    }
    // ctx.body=info.success('注册成功')
  }).catch(error => {
    console.log(error);
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

// 用户登录
router.post("/login", async (ctx) => {
  let {
    userName,
    password
  } = ctx.request.body; //接收客户端传递的数据
  const userModel = mongoose.model("User");
  //根据用户名判断数据是否存在
  try {
    let result = await userModel.findOne({
      userName: userName,
      password: password
    });

    if (result) {
      ctx.cookies.set("userId", result._id, {
        domain: 'localhost',
        path: '/', //cookie写入的路径
        maxAge: 1000 * 60 * 60 * 24,
        expires: new Date('2018-10-06'),
        httpOnly: false,
        overwrite: false
      })
      ctx.body = info.success('登录成功')
      // #region
      // 用户名存在，开始匹对密码
      // let user = new userModel(); 

      // await user.comparePassword(password, result.password).then(isMatch => {
      //   if (isMatch) {
      //     ctx.cookies.set("userId", result._id, {
      //       domain: 'localhost',
      //       path: '/', //cookie写入的路径
      //       maxAge: 1000 * 60 * 60 * 24,
      //       expires: new Date('2018-10-06'),
      //       httpOnly: false,
      //       overwrite: false
      //     })
      //     ctx.body = info.success(isMatch)
      //   } else {
      //     console.log("用户名密码错误")
      //     ctx.body = info.err('用户名密码错误')
      //   }
      // }).catch(err => {
      //   console.log(err);
      //   ctx.body = info.err(err)
      // });
      // #endregion
    } else {
      ctx.body = info.err("用户名密码错误");
    }

    //#region 
    // await userModel.findOne({
    //   userName: userName
    // }).then(async (result) => {
    //   if (result) {
    //     // 当用户名存在，开始匹对密码
    //     let user = new userModel();

    //     await user.comparePassword(password, result.password).then(isMatch => {
    //       console.log(isMatch)
    //       // 写入cookie                
    //       ctx.cookies.set("userId", result._id, {
    //         domain: 'localhost',
    //         path: '/', //cookie写入的路径
    //         maxAge: 1000 * 60 * 60 * 24,
    //         expires: new Date('2018-10-06'),
    //         httpOnly: false,
    //         overwrite: false
    //       })

    //       // console.log(ctx.cookies.get('userId'))
    //       ctx.body = {
    //         code: 200,
    //         message: isMatch
    //       }
    //     }).catch(err => {
    //       console.log(err);
    //       ctx.body = {
    //         code: 500,
    //         message: err
    //       }
    //     })
    //   } else {
    //     ctx.body = {
    //       code: 200,
    //       message: '用户名不存在'
    //     }
    //   }

    // }).catch(err => {
    //   ctx.body = {
    //     code: 500,
    //     message: err
    //   }
    // })
    // #endregion
  } catch (error) {
    console.log(error)
    ctx.body = info.err(error)
  }
})
// 退出登录
router.get("/logout", async (ctx) => {
  ctx.cookies.set('userId','',{
    domain: 'localhost',
    path: '/',
    maxAge: 0
  })
  console.log(ctx.cookies.get('userId'));
  ctx.body = info.success("success")
})
//获取用户信息
router.get("/getUserInfo", async (ctx) => {
  let userId = ctx.cookies.get("userId");

  const userModel = mongoose.model("User");
  try {
    let result = await userModel.findOne({
      _id: userId
    });
    if (result) {
      ctx.body = info.success(result);
    } else {
      console.log('无此用户')
      ctx.body = info.success("无此用户")
    }
  } catch (error) {
    console.log(error);
    ctx.body = info.err(error)
  }


})
//获取用户购物车商品
router.get('/getCartList', async (ctx) => {
  const UserModel = mongoose.model('User');
  let userId = ctx.cookies.get("userId");
  try {
    let result = await UserModel.findOne({
      _id: userId
    });
    ctx.body = info.success(result.cartList);

  } catch (error) {
    console.log(error);
    ctx.body = info.err(error);
  }
})
//购物车 单个商品选中与取消选中
router.post('/goodsCheck', async (ctx) => {
  let {
    goodsId,
    checkFlag
  } = ctx.request.body;
  let userId = ctx.cookies.get("userId");
  const UserModel = mongoose.model("User");
  try {
    let result = await UserModel.update({
      _id: userId,
      "cartList.ID": goodsId
    }, {
      "cartList.$.checked": checkFlag
    });
    ctx.body = info.success("success")
  } catch (error) {
    ctx.body = info.err(error);
  }
})
// 购物车全选与取消全选
router.post('/checkAll', async (ctx) => {
  let checkAllFlag = ctx.request.body.checkAllFlag ? 1 : 0;
  let userId = ctx.cookies.get("userId")  
  const UserModel = mongoose.model('User');

  try {
    let result = await UserModel.findOne({
      _id: userId
    });
    result.cartList.forEach(item => {
      item.checked = checkAllFlag
    })
    await result.save().then(res => {
      ctx.body = info.success("全选/取消全选成功");
    }).catch(err => {
      console.log(err)
      ctx.body = info.err(err)
    })
  } catch (error) {
    console.log(error);
    ctx.body = info.err(error)
  }
});
// 获取购物车商品数量
router.get("/getCartCount", async (ctx) => {
  const userModel = mongoose.model("User");
  let userId = ctx.cookies.get("userId");
  if (userId) {
    try {
      let result = await userModel.findOne({
        _id: userId
      });
      let count = 0;
      result.cartList.forEach(item => {
        count += item.productNum;
      })
      ctx.body = info.success(count);
    } catch (error) {
      console.log(error);
      ctx.body = info.err(error)
    }
  } else {
    console.log("未登录");
    ctx.body = info.success(0)
  }
})
// 删除购物车单个商品
router.post("/delGoods", async (ctx) => {
  let userId = ctx.cookies.get('userId');
  let goodsId = ctx.request.body.goodsId;
  let userModel = mongoose.model("User");
  try {
    let result = await userModel.update({
      _id: userId
    }, {
      $pull: {
        "cartList": {
          "ID": goodsId
        }
      }
    });
    
    ctx.body = info.success("删除成功")
  } catch (error) {
    console.log(error);
    ctx.body = info.err(error);
  }

});
// 更新商品数量
router.post('/changeGoodsNum', async (ctx) => {
  let userId = ctx.cookies.get('userId');
  let {
    goodsId,
    goodsNum
  } = ctx.request.body;
  const userModel = mongoose.model('User');
  try {
    let user = await userModel.update({
      _id: userId,
      "cartList.ID": goodsId
    }, {
      "cartList.$.productNum": goodsNum
    });
    ctx.body = info.success("购物车商品数量更新成功");
  } catch (error) {
    console.log(error);
    ctx.body = info.err(error);
  }
})
//获取收货地址列表
router.get('/getAddress', async (ctx) => {
  let userId = ctx.cookies.get("userId");
  const userModel = mongoose.model("User");
  try {
    let result = await userModel.findOne({
      _id: userId
    });
    ctx.body = info.success(result.addressList);
  } catch (err) {
    ctx.body = info.err(err)
  }
})
//设置默认地址
router.post('/setDefault', async (ctx) => {
  let userId = ctx.cookies.get('userId');
  let addressId = ctx.request.body.addressId
  const userModel = mongoose.model("User");
  try {
    let result = await userModel.findOne({
      _id: userId
    });
    result.addressList.forEach(item => {
      if (item.addressId == addressId) {
        item.isDefault = true;
      } else {
        item.isDefault = false;
      }
    })
    await result.save().then(res => {
      ctx.body = info.success("设为默认地址成功")
    }).catch(err => {
      ctx.body = info.err(err)
    })
  } catch (error) {
    console.log(error);
    ctx.body = info.err(error)
  }
})
//删除地址
router.post('/delAddress', async (ctx) => {
  let userId = ctx.cookies.get('userId');
  let addressId = ctx.request.body.addressId;
  const userModel = mongoose.model('User');
  try {
    let result = await userModel.update({
      _id: userId
    }, {
      $pull: {
        "addressList": {
          "addressId": addressId
        }
      }
    });
    ctx.body = info.success("地址删除成功");
  } catch (error) {
    console.log(error);
    ctx.body = info.err(error)
  }
})
//编辑地址和添加地址
router.post("/editAddress", async (ctx) => {
  let addressInfo = ctx.request.body.addressInfo; //获取地址信息
  let flag = ctx.request.body.flag; //判断添加还是编辑地址
  // let addressDetail = [addressInfo.province, addressInfo.city, addressInfo.county, addressInfo.addressDetail].join('-');
  let userId = ctx.cookies.get("userId");
  const userModel = mongoose.model("User");
  
  try {
    if (addressInfo.isDefault) {
      let result2 = await userModel.findOne({
        _id: userId
      });
      result2.addressList.forEach(item => {
        item.isDefault = false
      })
      await result2.save().then().catch(err => {
        console.log(err)
        // ctx.body = info.err(err)
      })


    }
    if (flag) {
      // 添加地址
      let result = await userModel.findOne({
        _id: userId
      });
      // 生成随机地址编号
      var platForm = '100';
      var r1 = Math.floor(Math.random() * 10);
      var r2 = Math.floor(Math.random() * 10);
      var sysDate = new Date().Format('yyyyMMddhhmmss');
      var orderId = platForm + r1 + sysDate + r2;
      addressInfo.addressId = orderId;
      result.addressList.push(addressInfo);
      await result.save().then(res => {
        ctx.body = info.success('添加成功')
      }).catch(err => {
        ctx.body = info.err("添加失败")
      })

    } else {
      // 编辑地址
      let result = await userModel.update({
        _id: userId,
        "addressList.addressId": addressInfo.addressId
      }, {
        "addressList.$.userName": addressInfo.userName,
        "addressList.$.streetName": addressInfo.streetName,
        "addressList.$.postCode": addressInfo.postCode,
        "addressList.$.tel": addressInfo.tel,
        "addressList.$.areaCode": addressInfo.areaCode,
        "addressList.$.isDefault": addressInfo.isDefault
      });
      ctx.body = info.success("保存成功")
    }

  } catch (error) {
    ctx.body = info.err(error)
  }

})
//生成订单
router.post('/pay', async (ctx) => {
  let userId = ctx.cookies.get("userId");
  let {
    addressId,
    totalMoney
  } = ctx.request.body;

  const userModel = mongoose.model("User");
  try {
    let result = await userModel.findOne({
      _id: userId
    });
    let addressInfo = "";
    let goodsList = [];
    result.addressList.forEach(item => {
      if (item.addressId == addressId) {
        addressInfo = item;
      }
    })
    result.cartList.forEach(item => {
      if (item.checked) {
        goodsList.push(item);
      }
    })
    // 生成随机订单号
    var platForm = '932';
    var r1 = Math.floor(Math.random() * 10);
    var r2 = Math.floor(Math.random() * 10);
    var sysDate = new Date().Format('yyyyMMddhhmmss');    
    var orderId = platForm + r1 + sysDate + r2;
    let order = {
      orderId: orderId,
      orderTotal: totalMoney,
      addressInfo: addressInfo,
      goodsList: goodsList,
      orderStatus: "1",
      createDate:new Date().Format('yyyy-MM-dd hh:mm:ss')
    }
    result.orderList.push(order);
    await result.save().then(res => {
      ctx.body = info.success(orderId)
    }).catch(err => {
      console.log(err);
      ctx.body = info.err(err)
    })

  } catch (error) {
    console.log(error);
    ctx.body = info.err(error)
  }

})
// 获取所有订单
router.get("/getAllOrder", async (ctx) => {
  let userId = ctx.cookies.get('userId');
  const userModel = mongoose.model("User");
  try {
    let result = await userModel.findOne({
      _id: userId
    });

    ctx.body = info.success(result.orderList)
  } catch (error) {
    console.log(error)
    ctx.body = info.err(error)
  }
})
// 支付后的订单信息
router.post("/getOrderInfo", async (ctx) => {
  let userId = ctx.cookies.get('userId');
  let orderId = ctx.request.body.orderId;
  const userModel = mongoose.model("User");
  try {
    let result = await userModel.findOne({
      _id: userId
    });

    let message = "";
    result.orderList.forEach(item => {
      if (item.orderId == orderId) {
        message = item
      }
    })
    ctx.body = info.success(message)
  } catch (error) {
    console.log(error);
    ctx.body = info.err(error)
  }

})
// 删除订单
router.post('/delOrder', async (ctx) => {
  let userId = ctx.cookies.get("userId");
  let orderId = ctx.request.body.orderId;
  try {
    const usermodel = mongoose.model("User");
    let result = await usermodel.update({
      _id: userId
    }, {
      $pull: {
        "orderList": {
          "orderId": orderId
        }
      }
    });
    ctx.body = info.success("删除成功")
  } catch (error) {
    ctx.body = info.err(error)
  }
})
//上传头像 要注意filename要和前端的表单元素的name一致
router.post('/upload', upload.single('file'), async (ctx) => {

  ctx.body = info.success('http://localhost:3000/upload/' + ctx.req.file.filename);  
  //originalname 源文件名称，path上传后文件的临时路径，mimetype文件类型
  // { fieldname: 'file',
  // originalname: 'bg-brand2.jpg',
  // encoding: '7bit',
  // mimetype: 'image/jpeg',
  // destination: './upload/',
  // filename: 'fd71016c94b025cb899f3b0f5b6f1988',
  // path: 'upload\\fd71016c94b025cb899f3b0f5b6f1988',
  // size: 108989 }
})
// 编辑用户资料
router.post('/editUserInfo', async (ctx) => {  
  let userInfo = ctx.request.body.userInfo;
  let userId = ctx.cookies.get('userId');
  const userModel = mongoose.model('User');

  try {
    let result = await userModel.update({
      _id: userId
    }, {
      "nickName": userInfo.nickName,
      "userPic": userInfo.userPic,
      "radio": userInfo.radio,
      "birthDay": userInfo.birthDay,
      "areaDetail": userInfo.areaDetail,
      "areaCode": userInfo.areaCode
    });
    ctx.body = info.success('success')
  } catch (error) {
    console.log(error)
    ctx.body = info.err(error)
  }


})
module.exports = router;
