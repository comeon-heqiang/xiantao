const router = require('koa-router')();
const mongoose = require('mongoose');
const path = require("path")
const fs = require("fs");
router.get("/", async (ctx) => {
  const regionModel = mongoose.model('Region');
  await regionModel.find({}).sort({
    'SORT': 0
  }).then(res => {
    ctx.body = {
      code: 200,
      message: res
    }
  }).catch(err => {
    console.log(err);
    ctx.body = {
      code: 500,
      message: err
    }
  })
})
// 获取地区数据
router.post('/regionDetail', async (ctx) => {  
  let regionID = ctx.request.body.regionID;
  const DetailModel = mongoose.model("RegionDetail");
  try {
    let result = await DetailModel.findOne({
      subID: regionID
    });
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
router.get("/writeData", async (ctx) => {

  new Promise((resolve, reject) => {
    fs.readFile("./data_json/region.json", 'utf-8', (err, data) => {
      if (err) {
        reject();
        throw '读取文件失败';
        return;
      } else {
        resolve(data)
      }
    })
  }).then(data => {
    let newData = JSON.parse(data);
    const regionModel = mongoose.model("Region");
    newData.map((value, index) => {
      let region = new regionModel(value);
      region.save().then(res => {
        ctx.body = "存入数据成功";
      }).catch(err => {
        console.log(err)
        ctx.body = "存入数据失败"
      })
    })
  }).catch(err => {
    console.log(err)
  })

})
router.get('/writeRegionDetail', async (ctx) => {
  const DetailModel = mongoose.model('RegionDetail');
  await fs.readFile("./data_json/regionDetail.json", 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      return;
    }
    data = JSON.parse(data);
    data.forEach(item => {
      let regionDetail = new DetailModel(item);
      regionDetail.save().then(res => {

      }).catch(err => {
        console.log(err)
      })
    })
  })
})
module.exports = router;
