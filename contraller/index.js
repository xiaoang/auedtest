module.exports = function(app){
    app.get('/',function(req, res){
        res.render('index.html',{
            username:'2xiaoang',
            data:['xiaoang','yangxue','xupinge']
        })
    });
    app.get('/about',function(req, res){
        res.render('about.html',{
            username:'xiaoang',
            data:['xiaoang','yangxue','xupinge']
        })
    });
    app.get('/login',function(req, res){
        res.send('login');
    });
    app.get('/logout',function(req, res){
        res.send('loginout');
    });
    app.get('/article/lists',function(req, res){
        res.send('ok');
    });
}

