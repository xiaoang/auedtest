var http = require('http'),
    fs = require('fs'),
    superagent = require('superagent'),
    cheerio = require('cheerio');
var dbtxt = '/home/xiaoang/git/web/site/static/data/article1.txt',
    articleUrls = [],
    pageUrls = [],
    pageNum = 15;
for(var i = 1; i <= pageNum; i++){
    pageUrls.push('http://www.75team.com/post/?page='+i)
}
pageUrls.forEach(function(pageUrl,j){
    superagent.get(pageUrl)
    .end(function(err,page){
        var $ = cheerio.load(page.text);
        var quoteUrls = $('.entry-content blockquote a');
        for(var i = 0;i < quoteUrls.length; i++){
            var articleUrl ='{ahref:"'+ quoteUrls.eq(i).attr("href") +'"},';
            fs.writeFile(dbtxt, articleUrl,{'flag':'a'}, function (err) {
                if (err) throw err;
            })
        }
        if(j == 14)
        console.log('It\'s saved!');
    })
})
/*fs.readFile(dbtxt, 'utf-8', function(err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
});*/
