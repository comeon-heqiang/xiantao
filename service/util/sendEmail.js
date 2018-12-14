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
// 创建发送邮件实例
let transporter = nodemailer.createTransport(smtpConfig);


module.exports = function (to, html, subject) {
  // 参数配置 from:发件人 to:收件人  subject主题 html:html内容
  let setSubject = subject || '找回密码'
  let options = {
    from: "3097951776@qq.com",
    to: to,
    subject: setSubject,
    html: html
  }
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (err, res) => {
      if (err) {
        console.log("邮件发送失败,错误详情:" + err)
        reject()
      } else {
        resolve(res)
      }
    })
  })
}
