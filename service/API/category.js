const router = require("koa-router")();
const fs = require("fs");
const mongoose = require('mongoose');
//获取类别
router.get("/", async (ctx) => {
  const categoryModel = mongoose.model("Category");
  try {
    let result = await categoryModel.find({});
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    console.log(err);
    ctx.body = {
      code: 500,
      message: err
    }
  }
})
//批量插入类别数据
router.get("/insertCategory", async (ctx) => {
  fs.readFile("./data_json/category.json", 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      return;
    }
    const categoryModel = mongoose.model("Category");
    data = JSON.parse(data);
    data.forEach(item => {
      let category = new categoryModel(item);
      category.save().then(res => {}).catch(err => {
        console.log(err);
      })
    })
  })
  ctx.body = "开始存入数据";
})
module.exports = router;
