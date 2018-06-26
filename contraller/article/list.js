var express = require('express')
var app = express()
var router = express.Router();
router.get('/article/lists',function(req,res){
    var data = {};
    data.title = '京东金融招聘前端开发工程师, 京东金融，于2013年10月...',
    data.date = '2015-12-08',
    data.type = '前端开发',
    data.link= 'http://e.360.cn',
    data.read = '722',
    data.comment = '22',
    data.desc = '京东金融，于2013年10月开始独立运营。经营多元化的金融业务，依托京东生态平台积累的交易记录数据和信用体系，向客户提供融资贷款、理财、支付、众筹等各类金融服务。 京东金融现已建立七大业务板块，分别是供应链金融、消费金融、众筹、财富管理、支..';
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8'});
    res.end(JSON.stringify({ code:1,msg:'成功',data:data}),encoding='utf-8');
})
router.get('/article/edit',function(req,res){
    edit(req,res)
})
function edit(req,res){
    res.end('22222222222222');
}
module.exports = router;
