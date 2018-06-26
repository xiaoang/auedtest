var http = require('http'),
    url = require('url'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    articalUrls = [],
    pageUrls = [],
    pageNum = 15;
for(var i = 1; i <= pageNum; i++){
    pageUrls.push('http://www.75team.com/post/?page='+i)
}
function onRequest(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    pageUrls.forEach(function(pageUrl,j){
        superagent.get(pageUrl)
        .end(function(err,page){
            var $ = cheerio.load(page.text);
            var quoteUrls = $('.entry-content blockquote a');
            for(var i = 0;i < quoteUrls.length; i++){
                var articalUrl = quoteUrls.eq(i).attr('href');
                articalUrls.push(articalUrl);
            }
            if(j == 14){
                res.write('<img src="http://img.zcool.cn/community/01013d56ebaea86ac7257d204ec3c8.gif"/><br/>请等待，数据汇总中');
                setTimeout(function(){
                    res.end(JSON.stringify(articalUrls));
                },5000)
            }
        })
    })
}
http.createServer(onRequest).listen(3000);

