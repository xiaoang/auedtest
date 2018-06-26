var http = require('http');
var express = require('express');
var app = express();
var router = express.Router();
var urllib = require('url');
var dom = require('jsdom');
var deps = require('jquery');
var jsondata = {notice:{status:'1',message :'公告数据更新成功,请通知相关人员上线'}};
var pageSize = 1;
var resdata = {};
var articles = new Set();
var artlists = [];
var co = require('co');
//app.get('/getArticles',function(req,res){
    console.log('已进入getArticles接口中');
    while(pageSize < 15){
        var htmlstr = '';
        var aurl = 'http://www.75team.com/post/?page='+pageSize;
      co(function *(){
        //var result = yield (function(){
        //var result = yield Promise.resolve(function(){
        http.get(aurl, function (html) {
            html.on('data',function (content) {
                htmlstr += content;
            })
            html.on('end',function () {
                dom.env(htmlstr, deps ,function(err, window){
                    var $ = deps(window);
                    var contp = $('p:contains("原文")');
                    //console.log(contp.html());
                    $(contp).each(function(i,item){
                        var ahref = $(this).children('a').attr('href');
                        if(ahref !== undefined){
                            artlists.push(ahref);
                            //console.log(ahref);
                        }
                    })
                });
                //artlists.push(htmlstr);
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        })
        return artlists;
    }).then(function(value){
        pageSize += 1;
   //     console.log(value);
        console.log('yield结束');
    },function(err){
        console.erreo(err.stack);
    })
    }
    /*if(pageSize == 15){
        console.log(artlists);
       // resdata.articles = Array.from(articles);
        console.log('getarticles接口结束');
       // console.log(resdata);
        res.end(JSON.stringify(resdata));
    }*/
//})
//app.listen('8088');
module.exports = app;
