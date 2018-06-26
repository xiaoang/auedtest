var http = require("http"),
    cheerio = require("cheerio");
 
exports.getBlog = function(req , res){
    var page = 1;
    var _res = res;
    http.get('http://www.cnblogs.com/axes/default.html?page='+page, function(res){
        var chunks = [],
            size = 0;
        res.on("data" , function(chunk){
            chunks.push(chunk);
            size += chunk.length;
        });
 
        res.on("end" , function(){
            //拼接buffer
            var data = Buffer.concat(chunks , size);
            var html = data.toString();
            var $ = cheerio.load(html);
            var blogs = [];
            for(var i=0;i<$('.postTitle2').length;i++){
                var blog = {};
                blog.title = $('.postTitle2').eq(i).html();
                blog.src = $('.postTitle2').eq(i).attr("href");
                blog.content = $(".c_b_p_desc").eq(i).html();
 
                var mess = $(".postDesc").eq(i).html().split("<a")[0].split(" ");
 
                blog.time = mess[2]+" "+mess[3];
                blog.read = mess[5];
                blog.say = mess[6];
 
                blogs.push(blog);
            }
            _res.json({
                blogs:blogs
            })
        })
    }).on('error' , function(e){
        console.log("error:"+e.message)
    });
};
