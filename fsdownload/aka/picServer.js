const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const express = require('express')
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser());
app.use(express.static('public'));

http.createServer(app);


app.get('/',(req,res)=>{
    showIndex(res);
})
app.get('/list',(req,res)=>{
    showList(res);//图片列表
})
app.post('/upload',(req,res)=>{
    uploadFile(req,res);
})
app.get('/getlist',(req,res)=>{
    var urlObj = url.parse(req.url);
    var pathName = urlObj.pathname;
    if(pathName.indexOf("upload")>=0&&req.method=="GET"){
        var imgSrc = path.join(__dirname,pathName);
        var imgContent = fs.readFileSync(imgSrc);
        if(pathName.indexOf("jpg")>=0){
            console.log('jpg');
            res.writeHead(200,{"Content-Type":"image/jpeg"});
        }
        if(pathName.indexOf("png")>=0){
            console.log('png');
            res.writeHead(200,{"Content-Type":"image/png"});
        }
        
        res.end(imgContent);
    }
    var files = fs.readdirSync(__dirname+"/public/upload");
    var fileStr = JSON.stringify(files);
    res.end(fileStr);//json数组
})

app.listen(8091)
console.log('server is listening 8091')

function showIndex(res){
    var indexPath = path.join(__dirname,"/index.html");
    var fileContent = fs.readFileSync(indexPath);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end(fileContent);
}
function showList(res){
    var listPath = path.join(__dirname,"/list.html");
    var fileContent = fs.readFileSync(listPath);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(fileContent);
}
function uploadFile(req,res){
    var dataStr = "";
    req.setEncoding("binary");
    req.on("data",function(chunk){
        dataStr+=chunk;
    })
    req.on("end",function(){
        var totalArr = dataStr.split('\r\n');
        var bufArr = totalArr.slice(4,totalArr.length-2);
        var imgData = "";
        for(var i=0;i<bufArr.length;i++){
            imgData += bufArr[i];
        }
        var buf = Buffer.from(imgData,"binary");
        var timer = (new Date()).getTime();
        fs.writeFileSync(__dirname+"/public/upload/"+timer+".png",buf,{"encoding":"binary"});
        res.end("submit sucess");
    })
}
/**
 * 地址栏中发起http请求
 * 超链接发起http
 * 提交表单发起请求
 * ajax发起请求
 * 
 */