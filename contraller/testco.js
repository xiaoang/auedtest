var http = require('http');
var urllib = require('url');
var co = require('co');
var arr1 = new Set();
co(function* () {
    for(var i=1;i<5;i++){
        //n+=1;
        arr1.add(i);
        /*while(n < 5){
            arr1.add(n);
          //var result = yield Promise.resolve(100);
          //return result;
            n += 1;
            return arr1;
        }*/
    }
    return arr1;
}).then(function (value) {
    var ar1 = Array.from(value);
    console.log(ar1);
}, function (err) {
  console.error(err.stack);
})
