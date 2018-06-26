var express = require('express'),
    app = express(),
    router = express.Router();
console.log('11111');
//app.get('/',function(req,res){
router.get('/',function(req,res){
    res.end('12314');
})
var server = app.listen(0, function() {
    console.log('Express server started on port %s', 80);
});
