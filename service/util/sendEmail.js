const nodemailer = require('nodemailer');
// smtp配置
let smtpConfig = {
  host: 'smtp.qq.com',
  port: 465,
  auth: {
    user: '3097951776@qq.com',
    pass: 'yeafjsqubwwwdhad'
  }
};
module.exports = function (to, html, subject) {
  return new Promise((resovle, reject) => {
    // 创建发送邮件实例
    let transporter = nodemailer.createTransport(smtpConfig);
    // 参数配置 from:发件人 to:收件人  subject主题 html:html内容
    let setSubject = subject || '此邮件来自浮生若梦'
    let options = {
      from: "3097951776@qq.com",
      to: to,
      subject: setSubject,
      html: html
    }
    transporter.sendMail(options, (err, res) => {
      if (err) {
        console.log("邮件发送失败,错误详情:" + err)
        reject()      
      } else {
        resovle(res)
      }
    })
  })


}
