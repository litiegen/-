const fs = require('fs')
const http = require("http");
const express = require('express')
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser());
app.use(express.static('public'));

http.createServer(app);

app.get('/',(req,res)=>{
    var fileContent = fs.readFileSync(__dirname+'/index.html');
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(fileContent);
});
app.listen(8080);
console.log('server is listening 8080')