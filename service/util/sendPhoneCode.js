var QcloudSms = require("qcloudsms_js");

// 短信应用SDK AppID
var appid = 1400171618; // SDK AppID是1400开头
// 短信应用SDK AppKey
var appkey = "f755bc3d4d5bf7dfc9eccf02a2995e63";

// 需要发送短信的手机号码
// var phoneNumbers = ["15243970879"];

// 短信模板ID，需要在短信应用中申请
var templateId = 252302; // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
// 签名
var SmsSign = ""; // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`
// 实例化QcloudSms
var qcloudsms = QcloudSms(appid, appkey);
// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
function callback(err, res, resData) {
  if (err) {
  
    console.log("err: ", err);
  } else {

    console.log("request data: ", res.req);
    console.log("response data: ", resData);

  }
}
// 发送手机验证码
async function sendPhoneCode(phoneNumbers) {
  // 如果不为数组
  if (!(phoneNumbers instanceof Array)) {
    var arr = [];
    arr.push(phoneNumbers);
    phoneNumbers = arr;
  }
  var ssender = qcloudsms.SmsSingleSender();
  var ranDom = Math.floor(Math.random() * 9000 + 1000) //获取四位随机验证码
  var params = [ranDom]; //数组具体的元素个数和模板中变量个数必须一致，例如事例中templateId:5678对应一个变量，参数数组中元素个数也必须是一个
  return new Promise((resolve, reject) => {
    // 发送手机验证码
    ssender.sendWithParam(86, phoneNumbers[0], templateId, params, SmsSign, "", "", function (err, res, resData) {
      if (err) {
        reject(err)
      } else {      
        let result={
          code:ranDom,
          resData:resData
        }
        resolve(result)
      }
    });
  })
}

module.exports = sendPhoneCode;
