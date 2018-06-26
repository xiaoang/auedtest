var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    async = require('async'),
    mongoose = require('mongoose'),
    mongourl = 'mongodb://localhost/mydb1',
    dbtxt = '/home/xiaoang/git/web/site/static/data/article.txt',
    pageUrls = [],
    pageNum = 15,
    co = require('co'),
    articalUrls = new Set();
for(var i = 1; i <= pageNum; i++){
    pageUrls.push('http://www.75team.com/post/?page='+i)
}
//mongoose.connect(mongourl);
/*var Schema = mongoose.Schema;
//骨架模版
var movieSchema = new Schema({
    ahref : String
})
//模型
var Movie = mongoose.model('Movie', movieSchema);*/
//存储数据
pageUrls.forEach(function(pageUrl,j){
    superagent.get(pageUrl)
    .end(function(err,page){
        var $ = cheerio.load(page.text);
        var quoteUrls = $('.entry-content blockquote a');
        for(var i = 0;i < quoteUrls.length; i++){
            //var articalUrl ='{ahref:"'+ quoteUrls.eq(i).attr("href") +'"},';
            var articalUrl = quoteUrls.eq(i).attr("href");
            articalUrls.add(articalUrl);
            //res.write(articalUrl+'<br/>');
            /*var moive = new Movie({
                ahref : articalUrls
            })
            //保存数据库
            moive.save(function(err) {
                if (err) {
                    console.log('保存失败')
                    return;
                }
                console.log('meow');
            })*/
            /*fs.writeFile(dbtxt, articalUrl,{'flag':'a'}, function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            })*/
        }
        if(j == 14){
            console.log(articalUrls);
        }
    })
})
/*fs.readFile(dbtxt, 'utf-8', function(err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
});*/
