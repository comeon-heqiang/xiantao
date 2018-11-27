const router = require('koa-router')();
router.get("/", (ctx) => {
  ctx.body = '后台首页';
})
module.exports = router;
