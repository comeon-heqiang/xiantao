// 格式化日期
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
var html = [
  '<style>',
  '*{margin: 0;padding: 0;}',
  'body {margin: 0px auto;font-size: 10pt;-webkit-text-size-adjust: none;background-color:#ebebeb; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", Helvetica, STHeiTi, sans-serif;color: #333;}',
  '*,*:after,*:before {box-sizing:border-box;outline:none}',
  'body,html {height:100%;line-height:1.42857143}',
  'a {text-decoration:none;cursor:pointer}',
  'img{border: 0;}',
  'html{font-size: 14px;}',
  '#diyswt{position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 99999999999999999999;width: 100%; height:100%;}',
  '#header {position: absolute;top: 0;left: 0;width: 100%;height: 0;padding: 0;z-index: 99999999999999999999;}',
  '#headerBox p {float:left;  font-size:18px; color:#FFF; line-height:42px;z-index: 99999999999999999999;}',
  '#headerBox img { margin-left:8px;float:left;height:70%;margin-top:6px;}',
  '.bottomsend {width: 100%;}',
  '#footer {background-color:#fff; position: absolute;bottom:0;left: 0;width: 100%;padding: 0;}',
  '#mainContent {position:absolute;background-color:#fff;top:42px;bottom:65px;left:0;width:100%;overflow: auto;overflow-x:hidden;}',
  '#chatMessageArea{position:absolute;-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;padding-top:10px; padding-bottom: 10px;padding-left:10px;padding-right:10px;}',
  'a.button_1 {width: 30px;height: 30px;display: block;margin: 0px;}',
  '.btn-camera {display: block;height: 76px;cursor: pointer;}',
  '.icon-camera {background-repeat: no-repeat;display: block;height: 76px;background-size: contain;}',
  '#cameraFile,#cameraFile1 {position: absolute;visibility: hidden;}',
  '.logo11 {background-image: url(../newMobile/up3.gif);width: 30px;height: 30px;top: 6px;left: 6px;position: absolute;z-index: 101;}',
  '.toptitle {width: 100%;height: 42px;background-color:#393a3f;top: 0px;left: 0px;position: absolute;z-index: 100;}',
  '.topclose {height: 30px;position: absolute;right: 8px;top: 8px;width: 30px;z-index: 101;}',
  '#bottomtip{display:block;white-space:nowrap;overflow:hidden;width: 100%;height: 20px;top: 45px;left: 0px;position: absolute;z-index: 100;}',
  '.editor {font: 12pt/16px Arial;BORDER: 0;width: 100%;overflow: hidden;resize: none;border-bottom-width: 1px;border-top-style: none;border-right-style: none;border-bottom-style: solid;border-left-style: none;border-bottom-color: #ebebeb;  padding-top: 8px; height: 30px;}',
  '#emotionsBox, #emotionsBox1 {margin: 0px; padding: 0px;width: 100%;position:absolute;display:none;z-Index:999999;padding:0px;left:0px; background-color:#fcfcfc;bottom:66px;border-top-width: 1px;border-bottom-style: none;border-right-style: none;border-top-style: solid;border-left-style: none;border-top-color: #ebebeb;  }',
  'ol, ul, li, dl, dt, dd {list-style: outside none none;}#emotionsBox li{width:72px; height:72px; float:left;}',
  '#emotionsBox li img{width:64px; height:64px; margin:4px;}.msg-box {margin-bottom:16px}',
  '.msg-agent,.msg-client {position:relative;width:100%;}',
  '.msg-agent:after,.msg-client:after {display:block;clear:both;content:""}',
  '.msg-agent .bubble,.msg-client .bubble {position:relative;padding:8px 12px;line-height:20px;border-radius:6px;word-wrap:break-word;word-break:break-all}',
  '.msg-agent .bubble .text .emoji,.msg-client .bubble .text .emoji {width:20px;height:20px;vertical-align:middle}',
  ' .text {font-size:15px;}',
  '.text1 {font-size:12px;color: #58595b;line-height:20px;margin-top:-2px}.msg-agent .bubble .text a,.msg-client .bubble .text a {text-decoration:underline}',
  '.msg-agent .photo,.msg-client .photo {position:relative}',
  '.msg-agent .photo img,.msg-client .photo img {width:auto;max-width:100%;max-height:280px;border-radius:4px}',
  '.msg-agent .arrow,.msg-agent .arrow-bg,.msg-client .arrow,.msg-client .arrow-bg {position:absolute;display:block;width:0;height:0;font-size:0}',
  '.msg-client .bubble,.msg-client .photo {float:right;width:auto;max-width:100%;margin-left:35px}',
  '.msg-client .arrow {top:14px;right:-6px;border-top:5px solid transparent;border-bottom:5px solid transparent}',
  '.msg-agent .agent-avatar {position:absolute;top:0;left:0}.msg-agent .agent-avatar>img {width:36px;height:36px;margin-top:1px;border-radius:18px}',
  '.msg-client .client-avatar {position:relative;right:0px;top:0;float:right;}',
  '.msg-client .client-avatar>img {width:36px;height:36px;margin-top:1px;border-radius:18px}',
  '.msg-agent .bubble,.msg-agent .photo {float:left;width:auto;max-width:100%;margin-right:35px;margin-left:50px}',
  '.msg-agent .bubble {color:#000;background-color:#fff;border:1px solid #f0f0f0}',
  '.msg-agent .bubble a {color:#000}',
  '.msg-agent .arrow-bg {top:13px;left:-7px;border-top:6px solid transparent;border-bottom:6px solid transparent;border-right:7px solid #f0f0f0}',
  '.msg-agent .arrow {top:14px;left:-6px;border-top:5px solid transparent;border-bottom:5px solid transparent;border-right:6px solid #fff}',
  '.msg-system {overflow:hidden;width:100%;margin-bottom:20px;color:#999;text-align:center;font-size:9pt;}',
  '.bubble-prologue{margin-left:0px!important;margin-right:0px!important; width:100%!important;float:none!important;}',
  '.msg-client {color:#000;}.msg-client a {color:blue;}',
  '.innerHeader{background-color: #393a3f;color:#fff;-webkit-box-shadow: 0 3px 5px rgba(148,144,133,0.5);}',
  '.headinfo{height:42px;text-align: left;text-indent:10px;border-top: 1px solid rgb(174,203,237);}',
  '.innerContainer{padding:5px 0px 5px 20px;position:relative;left:0;top:0;}',
  '.pl10{padding-left:10%}.surveyul{list-style: none;}',
  '.surveyul-item{margin-top:10px;}.surveyul-item input{margin-right:5px;}',
  '.surveyul-mcomments{display:none;margin-top:15px;}',
  '.surveyul-mcomments textarea{width:220px;height:80px;max-width:220px;max-height: 80px;overflow: auto; border: 1px solid #EAEAEA}',
  '.surveyul-showcom,.surveyul-btn{text-align: right;margin-top:15px;padding-right:10%}',
  '.button{min-width:65px;height:35px;color:#45c01a;border: 1px solid #45c01a;background: none;border-radius: 6px;}',
  '.tipwords{color:#5079AA;margin-top:6px;margin-bottom:6px;line-height:25px;}',
  '.errorMessage{margin:10px 0;text-align:left;color:#F6BD86;}.ml-20{margin-left:20px;}',
  '.tips{position: absolute;background: #FFF8E8;border: 1px solid #FFBA00;padding: 10px;-moz-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;z-index:10000}',
  'h1{padding:0; margin: 0;font-weight:normal; }',
  'form{ vertical-align: top;}',
  '.rechat{width:180px; margin:13px 0 0 0; height:42px; border:none; background:#06a5ef; color:#fff; -webkit-appearance:none; -moz-border-radius:0; -webkit-border-radius:0; -o-border-radius:0; -ms-border-radius:0; border-radius:0; outline:none;}',
  '.zi {color: #bdbebf;font-size: 10px;height: auto;line-height: 16px;text-align: center;width: auto;}',
  '.zi img {border: 0 none;vertical-align: top;}',
  '.arrow_box,.arrow_box_left,.arrow_box_vote {position: relative;border-radius: 6px;padding: 8px 12px;max-width: 82%;width: auto;word-break: break-all;word-wrap: break-word;}',
  '.arrow_box {margin-right:10px;background: #b2e866;float: right;border: 1px solid #94d03f;}',
  '.arrow_box_left {margin-right: 15px;background: #fff;float: left;border: 1px solid #d8d8d8;}',
  '.arrow_box_vote {margin-top: -30px;background: #b2e866;border: 1px solid #94d03f;color: #000;}',
  '.arrow_box:after, .arrow_box:before,.arrow_box_left:after, .arrow_box_left:before,.arrow_box_vote:after, .arrow_box_vote:before {border: solid transparent;content: " ";height: 0;width: 0;position: absolute;pointer-events: none;top: 16px;}',
  '.arrow_box:after, .arrow_box:before {left: 100%;}',
  '.arrow_box_left:after, .arrow_box_left:before,.arrow_box_vote:after, .arrow_box_vote:before{right: 100%;}',
  '.arrow_box:after,.arrow_box_left:after,.arrow_box_vote:after {border-width: 6px;margin-top: -6px;}',
  '.arrow_box:after {margin-left: -1px;border-left-color: #b2e866;}',
  '.arrow_box_left:after {margin-right: -1px;border-right-color: #fff; }',
  '.arrow_box_vote:after {margin-right: -1px;border-right-color: #b2e866; }',
  '.arrow_box:before,.arrow_box_left:before,.arrow_box_vote:before {border-width: 6px;margin-top: -6px;}',
  '.arrow_box:before{border-left-color: #94d03f;}.arrow_box_left:before {border-right-color: #d8d8d8;}',
  '.arrow_box_vote:before {border-right-color: #94d03f;}',
  '.tooltd {cursor:pointer;background-size: contain;background-repeat: no-repeat;width:56px;color:#58595b;font-size: 12px;text-align: center;}',
  '.btm-tip{text-align: center;font-size: 14px;margin:10px 0;}',
  '.btm-tip span{color: red;}',
  '.btm-tip a{color: orange;}',
  '.info{margin-top:10px;display: flex;flex-direction: column;align-items: center;color:#666;}',
  '.info .date{background: #c9c9c9;color: #fff;padding: 2px 10px;border-radius: 5px;margin-top: 10px;}',
  '.info span{color:orange;padding:0 5px;}',

  '.red{color: #e70a0a;font-weight: bold;}',
  '.return-bar{display: inline-block;margin: 10px;padding: 3px 15px;background: #f6ea68;border: 1px solid #ebda22;border-radius: 15px;text-align: center;font-weight: bold;}',
  '.main{display: flex;flex-direction: column;align-items: center;justify-content: center;width: 70%;margin: 0 auto;text-align: center;}',
  '.main h2{font-size: 20px;color: #333;}',
  '.main h3{font-weight: normal;font-size: 18px;}',
  '.main .qr-code{width: 100%;margin: 20px 0 10px;}',
  '.main .code{line-height: 43px;margin-top: 20px;padding: 0px 20px;border: 1px solid #d1d1d1;color: #ec3e3e;font-size: 22px;font-weight: bold;}',
  '.btn{display: flex;align-items: center;justify-content: center;width: 85%;margin: 20px auto 0;padding: 10px 0;border-radius: 5px;color: #fff;font-size: 20px;}',
  '.btn img{width: 30px;margin-left: 10px;}',
  '.btn-copy{background: #e7650a;}',
  '.btn-advisory{background: #48a636;}',
  '.modal-bg{position: fixed;z-index: 9999999999999999999999999999;top: 0;right: 0;bottom: 0;left: 0;background: rgba(0, 0, 0, 0.6);opacity: 0;visibility: hidden;transition: all .35s;}',
  '.modal-bg.on{opacity: 1;visibility: visible;}',
  '.modal{position: fixed;z-index: 9999999999999999999999999999;top: 100%;left: 50%;background: #fff;transform: translate(-50%, 100%);width: 80%;padding: 20px 0;transition: all .4s ease-in-out;max-width: 640px;}',
  '.modal .icon-close{width: 35px;position: absolute;right: 5px;top: 5px;}',
  '.modal .main{width: 90%;}',
  '.modal .main h2, .modal .main h3{font-size: 16px;}',
  '.modal .main .qr-code{width: 78%;margin: 10px 0;}',
  '.modal .main .code{padding: 3px 20px;margin-top: 10px;line-height: 1.5;font-size: 18px;}',
  '.modal .btn{width: 85%;margin-top: 15px;padding: 7px 0;font-size: 16px;}',
  '.modal.on{transform: translate(-50%, -50%);top:50%}',
  '#returnMsg{margin-top: 30px;text-align: center;color:#bdbebf;font-size:12px;margin-top:100px;}',
  '</style>',
  '<div id="diyswt">',
  '<div id="chatwrap" style="">',
  '<div id="header" style="position: absolute; top: 0px; display: block;">',
  '<div id="headerBox" class="toptitle">',
  '<a href="tel:{__TEL__}">',
  '<img id="phoneimg" style="margin-left:8px;float:left;margin-top: 6px;width:30px;" src="http://m.305h.cn/Public/fl/phone1.png" >',
  '<p>{__TITLE__}</p>',
  '</a>',
  '</div>',
  '<div class="topclose" onclick="topcloss()"> ',
  '<a  id="closeWindow" href="javascript:void(0)">',
  '<img src="http://m.305h.cn/Public/fl/down.png" border="0" style="width:25px;">',
  '</a>',
  '</div>',
  '</div>',
  '<div id="mainContent" style="background-color:#fff;margin-top: 0px; position: absolute; top: 42px; bottom: 65px; padding-bottom: 0px;">',
  '<div class="info"><p>目前<span>' + Math.ceil(Math.random() * 3) + '位</span>医生空闲  预约挂号：<span>' + Math.ceil(Math.random() * 10) * 10 + '人</span></p><div class="date">' + new Date().Format('yyyy年MM月dd日 hh:mm:ss') + '</div></div>',
  '<div id="chatMessageArea" style="position: absolute; width: 100%;">',
  '<div class="msg-box" style="margin-right:10px;">',
  '<div class="msg-client">',
  '<div class="client-avatar">',
  '<img src="{__USERPIC__}" style="width:36px;">',
  '</div>',
  '<div class="arrow_box" style="margin-right:12px;">',
  '<div class="text" id="wds">{__WD__}</div>',
  '</div>',
  '</div>',
  '</div>',
  '<div class="msg-box" id="swtdh1" style="display:none">',
  '<div class="msg-agent">',
  '<div class="agent-avatar">',
  '<img src="{__PICDOC__}">',
  '</div> ',
  '<div class="arrow_box_left" style="margin-left:50px;">',
  '<div class="text">{__TALKONE__}</div>',
  '</div>',
  '</div>',
  '</div>',
  '<div class="msg-box" id="swtdh2" style="display:none">',
  '<div class="msg-agent">',
  '<div class="agent-avatar">',
  '<img src="{__PICDOC__}"> ',
  '</div>',
  '<div class="arrow_box_left" style="margin-left:50px;">',
  '<div class="text">{__TALKTOW__}</div>',
  '</div>',
  '</div>',
  '</div>',
  '</div>',
  '</div>',
  '<div id="footer" style="position: absolute; height: 85px; bottom: 0px;z-index:999999999999">',
  '<div class="btm-tip"><span>建议：</span>如打字不方便加微信就诊&#8594; <a onclick="wxtc()">【点击加微信】</a></div>',
  '<ul style="display:none;" id="emotionsBox"></ul>',
  '<ul style="display:none;" id="emotionsBox1"></ul>',
  '<div class="bottomsend" id="bottomsend">',
  '<table width="100%" border="0" cellpadding="0" cellspacing="0" id="duihua">',
  '<tbody>',
  '<tr> ',
  '<td width="78" align="right" style="padding-right:6px; padding-left:2px;">',
  '<img src="http://m.305h.cn/Public/fl/emoticon.png" border="0" style="cursor:pointer;width:30px;">',
  '</td>',
  '<td width="100%" id="toolbar_editor">',
  '<textarea id="texteditor" name="texteditor" oninput="" onfocus="" onblur="" class="editor" rows="1" placeholder="请在此输入..." style="border-bottom-color: rgb(69, 192, 26);"></textarea>',
  '</td>',
  '<td align="right" style="padding-right:2px; padding-left:8px;cursor:pointer;" onclick="func_clickt()">',
  '<input type="image" src="http://m.305h.cn/Public/fl/button_cn.png" border="0" style="cursor:pointer;height:30px" id="sentButton">',
  '</td>',
  '</tr>',
  '</tbody>',
  '</table>',
  '<p id="returnMsg"><img style="margin-right:4px;" src="https://mgb.zoosnet.net/lr/chatm2imgs/anniu.png"> 点击返回对话窗口</p>',
  '</div>',
  '</div>',
  '</div>',
].join('\r\n');
// 复制的弹出窗
var wxtchtmls = [
  '<div class="modal-bg" id="modal-bg"></div>',
  '<div class="modal" id="modal">',
  '<img src="https://m.305h.cn/Public/images/icon-close.png" class="icon-close" id="close">',
  '<div class="main">',
  '<h2>{__BREACKTITLE__}</h2>',
  '<img src={__WXPIC__} class="qr-code">',
  '<h3>',
  '<span class="red" id="succ">点击复制添加微信号</span>',
  '</h3>',
  '<p class="code">{__WX__}</p>',
  '</div>',
  '<p class="btn btn-copy wxbtn" data-clipboard-text="{__WX__}">点击复制<img src="https://m.305h.cn/Public/images/icon-click.png" alt=""> </p>',
  '<p class="btn btn-advisory"  onclick="quweixing()">去微信咨询<img src="https://m.305h.cn/Public/images/icon-zixun.png" alt=""> </p>',
  '</div>',
].join('\r\n');

function parseURL(url) {
  var a = document.createElement('a');
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function () {
      var ret = {},
        seg = a.search.replace(/^\?/, '').split('&'),
        len = seg.length,
        i = 0,
        s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
    hash: a.hash.replace('#', ''),
    path: a.pathname.replace(/^([^\/])/, '/$1'),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
    segments: a.pathname.replace(/^\//, '').split('/')
  };
}

function getKeyWord(refer) {
  if (refer == null) {
    return "";
  }
  var url = refer;
  var obj = parseURL(url);
  if (obj.host.indexOf('youxuan.baidu.com') >= 0) {
    return getYouxuanKeyword(obj.query.split('&'));
  }
  if (!obj.params) {
    return "";
  }
  var word = obj.params.word || obj.params.keyword || obj.params.wd || obj.params.q;
  if (obj.host == 'cpro.baidu.com') {
    word = obj.params.ori || obj.params.k || obj.params.k0 || obj.params.k1 || obj.params.k2 || obj.params.k3 || obj.params.k4;
  }
  return word;
}

function getYouxuanKeyword(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].indexOf('p=') == 0) {
      var p = unescape(arr[i].substring(2));
      var s = p.indexOf('=');
      var e = p.indexOf('&');
      return escape(p.substring(s + 1, e));
    }
  }
  return "";
}

document.write('{__SWTJS__}');

function topcloss() {
  var styleElement1 = document.getElementById('diyswt');
  styleElement1.style.display = 'none';
  setTimeout(function () {
    styleElement1.style.display = 'block';
  }, 8000);
}


$wd = getKeyWord(document.referrer);
$wd = decodeURI($wd, "utf-8");

if ($wd == 'undefined' || $wd.length < 0) {
  $wd = "{__MRGJC__}";
}

func_click = function () {
  $val = encodeURI(document.getElementById('texteditor').value, "utf-8");
  openZoosUrl();
};

func_clickt = function () {
  $val = encodeURI(document.getElementById('texteditor').value, "utf-8");
  openZoosUrl('chatwin', '&e={__BS__}' + encodeURI(encodeURI($wd, "utf-8")) + '&wd=' + encodeURI(encodeURI($wd, "utf-8")) + '&input_wd=' + encodeURI($val));
};

html = html.replace(/{__WD__}/, $wd);

var h = document.documentElement.clientHeight;
setTimeout(function () {
  //输出浮动层
  var div = document.createElement("div"),
    os = document.createElement('div');
  div.innerHTML = html;
  while (div.firstElementChild) {
    document.body.appendChild(div.firstElementChild);
  };
  os.innerHTML = wxtchtmls;
  while (os.firstElementChild) {
    document.body.appendChild(os.firstElementChild);
  };
  //延时输出对话
  try {
    // document.getElementById('texteditor').focus();
    setTimeout(function () {
      var styleElement2 = document.getElementById('swtdh1');
      styleElement2.style.display = 'block';
    }, 1000);
    setTimeout(function () {
      var styleElement3 = document.getElementById('swtdh2');
      styleElement3.style.display = 'block';
    }, 2000);
  } catch (e) {}

  //输入框框焦点获取
  // setTimeout(function () {
  //   try {
  //     document.getElementById('texteditor').focus();
  //   } catch (e) {}
  // }, 500);
  var textEditor = document.getElementById('texteditor');
  var footerElm = document.getElementById("footer");
  var returnMsg = document.getElementById('returnMsg')
  textEditor.addEventListener("focus", function () {
    footerElm.style.bottom = (h / 2) + "px"
  }, false)
  textEditor.addEventListener("blur", function () {
    footerElm.style.bottom = 0
  }, false)
  returnMsg.addEventListener("click", function () {
    footerElm.style.bottom = 0
  }, false)
}, 1000);

//键盘呼出兼容     

// try {
//   var winHeight = $(window).height(); //获取当前页面高度
//   $(window).resize(function () {
//     var thisHeight = $(this).height();
//     if (winHeight - thisHeight > 50) {
//       $('#diyswt').css('position', 'absolute');
//       $("#diyswt").attr("style", "height:" + winHeight - thisHeight + "px;");
//     } else {
//       $("#diyswt").attr("style", "height:100%;");
//     }
//   });
// } catch (e) {};


var s = document.createElement("script");
s.setAttribute("src", "https://m.305h.cn/Public/js/clipboard.min.js");
document.body.appendChild(s);


var modal2 = "";
window.onload = function () {
  var clipboard = new ClipboardJS('.wxbtn', {
    text: function () {
      return '{__WX__}';
    }
  });

  clipboard.on('success', function (e) {
    document.getElementById('succ').innerHTML = "复制成功,去微信添加"
  });

  clipboard.on('error', function (e) {
    console.log(e);
  });
  setTimeout(() => {
    function Modal(modal, modalBg, close) {
      this.close = document.getElementById(close);
      this.modalBg = document.getElementById(modalBg);
      this.modal = document.getElementById(modal);
      this.init();
    }
    Modal.prototype.toggleModal = function () {
      this.modalBg.classList.toggle("on");
      this.modal.classList.toggle("on");
    }
    Modal.prototype.init = function () {
      var _this = this;
      this.close.addEventListener("click", function () {
        _this.toggleModal()
      }, false)
      this.modalBg.addEventListener("click", function () {
        _this.toggleModal()
      }, false)
    }
    modal2 = new Modal("modal", "modal-bg", "close");
  }, 1000);


};

function wxtc() {
  modal2.toggleModal();
};

function quweixing() {
  if (/baiduboxapp/i.test(navigator.userAgent)) {
    window.location.replace("bdbox://utils?action=sendIntent&minver=7.4&params=%7B%22intent%22%3A%22weixin://%23Intent%3Bend%22%7D");
  } else {
    window.location.replace("weixin://");
  }
};
