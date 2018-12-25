const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const router = require('koa-router')();
const static = require('koa-static') //处理静态资源
const bodyparser = require('koa-bodyparser')
const path = require("path");
let goods = require('./API/goods');
let user = require("./API/user");
let region = require("./API/region")
let category = require("./API/category")
let contact = require('./API/contact')
let opinion = require('./API/opinion')

let {
  connect,
  initSchemas
} = require("./database/init");
const staticPath = "./assets";
app.use(static(path.join(__dirname, staticPath)))
// 装载子路由
app.use(bodyparser()) //解析客户端请求的body中的内容

app.use(cors({
  origin: "http://www.foreveral.com", //线上地址
  // origin: "http://118.24.219.75", //线上地址
  // origin: "http://localhost:8080",    
  credentials: true
})) //解决跨域

//404处理
app.use(async (ctx, next) => {
  await next();
  if (ctx.status == 400) {
    ctx.status = 404;
    ctx.body = "这是一个404页面"
  }
})
router.use('/goods', goods.routes());
router.use('/user', user.routes())
router.use("/region", region.routes())
router.use("/category", category.routes())
router.use('/contact', contact.routes())
router.use('/opinion', opinion.routes())
app.use(router.routes()); //使用路由
app.use(router.allowedMethods()); //使用路由所有方法

(async () => {
  await connect();
  initSchemas()
})();


app.listen(3000, () => {
  console.log("服务器启动,端口号3000")
})
// echo "/root/usr/local/mongodb-linux/bin/mongod --dbpath=/root/data/mongo/data –logpath=/root/data/mongo/logs –logappend  --auth -–port=27017" >> /etc/rc.local
