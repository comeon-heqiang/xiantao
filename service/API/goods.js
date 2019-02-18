const router = require("koa-router")();
const fs = require('fs');
const mongoose = require("mongoose");
const info = require('../middlewares/info')

// 获取所有商品
router.get('/', async (ctx) => {
  const goodsModel = mongoose.model("Goods");
  try {
    let result = await goodsModel.find({});
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})



// 获取指定分类商品
router.post('/CategoryGoods', async (ctx) => {
  const goodsModel = mongoose.model("Goods");
  let subID = ctx.request.body.CategoryID;
  try {
    let result = await goodsModel.find({
      SUB_ID: subID
    });

    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: err
    }
  }

})
// 获取商品
router.post("/getPageGoods", async (ctx) => {

  const goodsModel = mongoose.model("Goods");
  let page = ctx.request.body.page;
  let size = 10;
  let start = (page - 1) * size;

  try {
    let result = await goodsModel.find({}).skip(start).limit(size);

    ctx.body = info.success(result)
  } catch (error) {
    console.log(error)
    ctx.body = info.err(error)
  }
})
router.get("/insertGoods", async (ctx) => {
  fs.readFile("./data_json/goods.json", 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      return;
    }
    data = JSON.parse(data);
    const goodsModel = mongoose.model("Goods");
    data.map((value, index) => {
      let goods = new goodsModel(value);
      goods.save().then(res => {}).catch(err => {
        console.log(err)
      })
    })
  })
  ctx.body = "存入商品数据";
})
// 获取商品详情
router.post("/getDetailGoodsInfo", async (ctx) => {
  let goodsId = ctx.request.body.goodsId;
  const goodsModel = mongoose.model("Goods");
  try {
    let result = await goodsModel.findOne({
      ID: goodsId
    });
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      message: error
    }
  }

})
// 加入购物车
router.post("/joinCart", async (ctx) => {
  let goodsId = ctx.request.body.goodsId;
  let userId = ctx.cookies.get('userId');
  const goodsModel = mongoose.model("Goods");
  const userModel = mongoose.model("User");
  let flag = false; //判断购物车商品是否存在
  let userDoc = ""; // 查找用户    
  let goodsNum = ctx.request.body.goodsNum ? ctx.request.body.goodsNum : 1;
  try {
    userDoc = await userModel.findOne({
      _id: userId
    });
    userDoc.cartList.forEach(item => {
      if (item.ID == goodsId) {
        item.productNum = parseInt(item.productNum) + goodsNum;
        flag = true;
      }
    })
    if (flag) {
      let result = await userDoc.save();

      ctx.body = {
        code: 200,
        message: '加入购物车成功'
      }
    } else {

      let goodsdoc = await goodsModel.findOne({
        ID: goodsId,
      }, null, {
        lean: true
      });
      goodsdoc.productNum = goodsNum;
      goodsdoc.checked = 1;
      userDoc.cartList.push(goodsdoc);
      let reuslt2 = await userDoc.save();
      ctx.body = {
        code: 200,
        message: '加入购物车成功'
      }
    }

  } catch (err) {
    console.log(err);
    ctx.body = {
      code: 500,
      message: err
    }
  }
})
// 搜索商品
router.post("/search", async (ctx) => {
  let body = ctx.request.body;
  let {
    searchVal,
    page
  } = body; //获取查询关键字与分页码
  let limit = 10; //显示条数
  let start = (page - 1) * limit; //跳过n条
  const goodsModel = mongoose.model("Goods");
  let count = 0;
  //查询条件  
  let findWhere = {   
      'NAME': {
        $regex: searchVal
      }   
  }
  //总条数
  await goodsModel.count(findWhere, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      count = doc;
    }
  });


  try {
    const result = await goodsModel.find(findWhere).skip(start).limit(limit);
    if (result) {
      ctx.body = info.success(result);
    } else {
      ctx.body = info.success("noData")
    }
  } catch (error) {
    console.log(error)
    ctx.body = info.err(error)
  }


})
module.exports = router;
