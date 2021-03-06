/**
 * 登录接口:(post)
 * 传入userid；pwd
 * 返回是否成功登陆信息
 */
const express = require('express');
const router = express.Router();
const connection = require('./usemysql');

let  sql = 'SELECT * FROM user_table';
var islogin = false;

router.post('/',(req,res)=>{
    let user = {
        userid:'',
        pwd:''
    }
    var data = '';
    req.on('data',(chunk)=>{
      data += chunk;
    });
    req.on('end',()=>{
        // console.log(data);
        data = data.split('&');
        for(let i= 0 ;i<data.length;i++){
            data[i]=data[i].split('=');
            user[data[i][0]]=data[i][1];
        }

        console.log(data);
        console.log(user);
        connection.query(sql, (error,results,fields)=> {
        //error,results,fields:错误对象，json数组，数据信息数组
            // console.log(results[1].userid);
            islogin = false;
            if (error) console.log(error.message);
            for(let i=0;i<results.length;i++){
                if(results[i].userid === user.userid && results[i].pwd === user.pwd){
                    islogin = true;
                    break;
                }
            }
            if(!islogin){
                console.log("Landing failed");
                db = { state: 200, message: '登陆失败', content: islogin };
            }else{
                console.log("Landing successfully");
                db = { state: 200, message: '登陆成功', content: islogin };
            };
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(db);
        });
    });

});

module.exports = router;
