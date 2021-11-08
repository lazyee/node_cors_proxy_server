var express = require('express');
var {createProxyMiddleware} = require('http-proxy-middleware')
var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method === 'OPTIONS') return res.sendStatus(200)
    next();
   });

app.use('/crm',createProxyMiddleware({target: 'http://crmapi.cmnt.vip', changeOrigin: true}));
app.use('/media',createProxyMiddleware({target: 'https://image.cmnt.vip', changeOrigin: true}));

var server = app.listen(5566,'127.0.0.1',function(){
    var host = server.address().address;
    var port = server.address().port;
});


//启动node服务器
//node cors_server.js