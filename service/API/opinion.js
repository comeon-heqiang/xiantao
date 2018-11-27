const router = require('koa-router')();
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const info = require('../middlewares/info')
router.post('/message', async (ctx) => {

  let {
    message,
    tel,
    imgUrl
  } = ctx.request.body.message;

  let base64Data = imgUrl.replace(/^data:image\/\w+;base64,/, "");
  let dataBuffer = new Buffer(base64Data, 'base64');
  let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now();
  let imgPath = path.join(__dirname, '../') + 'assets/upload/' + getName + '.jpg';
  try {
    await fs.writeFile(imgPath, dataBuffer, err => {
      if (err) {
        throw err;
      }
      console.log('图片上传成功')
    })


    let opinionModel = mongoose.model('opinion');
    let opinionData = {
      message: message,
      tel: tel,
      imgUrl: imgPath
    }
    let opinion = new opinionModel(opinionData);
    await opinion.save().then(res => {
      ctx.body = info.success('success')
    })
  } catch (error) {
    console.log(err);
    ctx.body = info.err(err)
  }

})
module.exports = router;
