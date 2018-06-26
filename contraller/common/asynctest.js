var http = require('http'),
    fs = require('fs'),
    async = require('async'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    dbtxt = '/home/xiaoang/git/web/site/static/data/article1.txt',
    pageUrls = [],
    pageNum = 15;
for(var i = 1; i <= pageNum; i++){
    pageUrls.push('http://www.75team.com/post/?page='+i)
}
/*async.concat(pageUrls,function(item,callback){
    //callback(null,getdata(item));
    setTimeout(function(){
        callback(null,getdata(item));
    },100)
},function(err,values){
    console.log(err);
    console.log(values);
})*/

async.mapSeries(pageUrls, function(item, callback) {
    setTimeout(function() {
        callback(null,getdata(item)+item);
    }, item.delay);
}, function(err,values) {
    console.log(err);
    console.log(values);
});


function getdata(url){
    var articalUrl;
    superagent.get(url)
    .end(function(err,page){
        var $ = cheerio.load(page.text);
        var quoteUrls = $('.entry-content blockquote a');
        for(var i = 0;i < quoteUrls.length; i++){
            articalUrl +='{ahref:"'+ quoteUrls.eq(i).attr("href") +'"},';
        }
    })
    return articalUrl;
}

/*pageUrls.forEach(function(pageUrl,j){
    superagent.get(pageUrl)
    .end(function(err,page){
        var $ = cheerio.load(page.text);
        var quoteUrls = $('.entry-content blockquote a');
        for(var i = 0;i < quoteUrls.length; i++){
            var articalUrl ='{ahref:"'+ quoteUrls.eq(i).attr("href") +'"},';
            fs.writeFile(dbtxt, articalUrl,{'flag':'a'}, function (err) {
                if (err) throw err;
                if(j == 14) console.log('It\'s saved!');
            })
        }
    })
})*/
/*fs.readFile(dbtxt, 'utf-8', function(err, data) {
    if (err) {
        throw err;
    }
    console.log(data);
});*/
