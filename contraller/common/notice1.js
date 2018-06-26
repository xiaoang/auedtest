var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var urllib = require('url');
var dom = require('jsdom');
var deps = require('jquery');
var htmlstr = '';
var port = 3000;
var jsondata = {notice:{status:'1',message :'公告数据更新成功,请通知相关人员上线'},policy:{status:'1',message:'政策数据更新成功,请通知相关人员上线'}};
app.get('/notice',function(req,res){
    //console.log(jsondata.notice.message);
    show('notice',req,res,'.list li:lt(4)');
})

app.get('/policy',function(req,res){
    show('policy',req,res,'.list li:lt(4)');
})
function show(fname,req,res,ele){
    var act = fname == 'notice' ? 'http://e.360.cn/static/notice/list.html' : 'http://e.360.cn/static/policy/list.html';
    var type = fname == 'notice' ? jsondata.notice : jsondata.policy;
    var params = urllib.parse(req.url, true);
    var data = params.query.callback + '(' + JSON.stringify(type) + ')'; //jsonp
    http.get(act, function (html) {
        html.on('data',function (content) {
            htmlstr += content;
        })
        html.on('end',function () {
            var str ='';
            dom.env(htmlstr, deps ,function(err, window){
                var $ = deps(window);
                $(ele).each(function(i,item){
                    var a = $(this).children('a');
                    str+='<li><a href="'+a.attr('href')+'" target="_blank">'+a.html().slice(0,20)+'</a></li>';
                })
                //fs.writeFile(fname+'.html', str, function (err) {
                fs.writeFile('/home/xiaoang/dianjing_web/trunk/include/notice.html', str, function (err) {
                    if (err) throw err;
                    console.log('It\'s saved!');
                    res.end(data,encoding='utf8');
                });
            });
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

app.listen(port);
