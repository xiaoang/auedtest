var http = require('http'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    eventproxy = require('eventproxy');
var articleUrls = [],
    pageUrls = [],
    pageNum = 15,
    ep = new eventproxy();
for(var i = 1; i <= pageNum; i++){
    pageUrls.push('http://www.75team.com/post/?page='+i)
}
function onRequest(req, res){
    pageUrls.forEach(function(pageUrl,j){
        superagent.get(pageUrl)
        .end(function(err,page){
            var $ = cheerio.load(page.text);
            var quoteUrls = $('.entry-content blockquote a');
            for(var i = 0;i < quoteUrls.length; i++){
                var articleUrl ='{ahref:"'+ quoteUrls.eq(i).attr("href") +'"},';
                articleUrls.push(articleUrl);
                ep.emit('gotdata', articleUrl);
            }
        })
    })
    ep.after('gotdata',150,function(articleUrls){
        setTimeout(function(){
            res.end(JSON.stringify(articalUrls));
        },100)
    })
}
http.createServer(onRequest).listen(3000);
