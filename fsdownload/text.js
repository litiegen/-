//引入模块
const nodemailer = require('nodemailer');
const fs = require('fs')
const http = require("http");
const express = require('express')
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser());
app.use(express.static('public'));

http.createServer(app);

app.get('/',(req,res)=>{

//获取发送方邮箱并验证
var transporter = nodemailer.createTransport({
    service: 'QQ',
    auth: {
        user: '517206296@qq.com',
        pass: 'tfzkolrksfwpbifg'
    }
});

//生成随机字符串
function randomString(len) {
    　　len = len || 32;
    　　var $chars = '1234567890';
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
    }
    var aa = randomString(6);
    console.log(aa)

//邮件信息
var mailOptions = {
    from: '来自<517206296@qq.com>',
    to: '1069439948@qq.com',
    subject: '我就是来测试的',
    // text: '嘿嘿嘿嘿嘿', 
    html: '<h1>'+'您的验证码是：'+aa+'</h1>'
};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
res.end();

})

app.listen(8019);