const mongoose = require('mongoose');
const db = 'mongodb://localhost/xiantao'; //连接数据库
const glob = require('glob');
const {
  resolve
} = require("path");
exports.initSchemas = () => {
  // 使用了glob.sync同步引入所有的schema文件，然后用forEach的方法require（引入）进来。这比你一条条引入要优雅的多。
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require);
}
// 连接数据库配置
exports.connect = () => {
  mongoose.connect(db); //连接MongoDB
  return new Promise((resolve, reject) => {
    let maxLength = 0; //重连次数
    mongoose.connection.on('disconnected', () => {
      //重连超过3次则抛出错误
      if (maxLength < 3) {
        maxLength++;
        mongoose.connect(db);
      } else {
        reject();
        throw ("数据库连接断开")
      }
    })
    mongoose.connection.on("error", (error) => {
      //重连超过3次则抛出错误
      if (maxLength < 3) {
        maxLength++;
        mongoose.connect(db);
      } else {
        reject();
        throw ("数据库连接错误")
      }
    })
    mongoose.connection.on("open", () => {
      console.log("数据库连接成功");
      resolve();
    })
  })
}
