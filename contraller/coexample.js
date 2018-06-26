var co = require('co');

//co(function *(){
//  // yield any promise
//  var result = yield Promise.resolve(true);
//}).catch(onerror);
co(function* () {
  //var result = yield Promise.resolve(100);
  //return result;
    return 100;
}).then(function (value) {
  console.log(value);
}, function (err) {
  console.error(err.stack);
});
/*co(function *(){
  // resolve multiple promises in parallel
  //var a = Promise.resolve(1);
  //var b = Promise.resolve(2);
  //var c = Promise.resolve(3);
    var a = function(){
        console.log(1)
    }
    var b = function(){
        console.log(2)
    }
    var c = function(){
        console.log(3)
    }
    var d = function(){
        console.log(6)
    }
  var res = yield [a(), b(), c(),d()];
  //console.log(res);
  // => [1, 2, 3]
}).catch(onerror);*/

// errors can be try/catched
//co(function *(){
//  try {
//    yield Promise.reject(new Error('boom'));
//  } catch (err) {
//    console.error(err.message); // "boom"
// }
//}).catch(onerror);

function onerror(err) {
  // log any uncaught errors
  // co will not throw any errors you do not handle!!!
  // HANDLE ALL YOUR ERRORS!!!
  console.error(err.stack);
}
