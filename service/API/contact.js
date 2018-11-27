const mongoose = require('mongoose');
const router = require('koa-router')();
let info = require('../middlewares/info')
router.get("/", async (ctx) => {
  const contactModel = mongoose.model("contact");
  try {
    let result = await contactModel.findOne({});
    if (result) {
      ctx.body = info.success(result)
    } else {
      ctx.body = info.success('')
    }
  } catch (error) {

  }
})
// 编辑联系信息
router.post('/editContent', async (ctx) => {
  const contactModel = mongoose.model("contact");
  let contactData = ctx.request.body.contact;
    
  let contactId = ctx.request.body.contact._id;
  try {
    let result = await contactModel.update({
      _id: contactId
    },{
        "name":contactData.name,
        "tel":contactData.tel,
        "address":contactData.address,
        "content":contactData.content
    });
    ctx.body=info.success("保存成功")
    console.log(result)
    // let contact = new contactModel(contactData);
    // await contact.save().then(res => {
    //   ctx.body = info.success('保存成功');
    // }).catch(err => {
    //   console.log(err);
    //   ctx.body = info.err(err);
    // })
  } catch (error) {
    console.log(error)
    ctx.body = info.err(error)
  }
})
module.exports = router;
