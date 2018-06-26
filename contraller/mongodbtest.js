var express = require('express');
var app = express();
var route = express.Router();
var mongodb = require('mongodb');
var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 }); 
var db = new mongodb.Db('mydb', mongodbServer);
/* GET home page. */
app.get('/', function(req, res, next) {
    /* open db */
    db.open(function(err) {
        /* Select 'contact' collection */
        db.collection('contact', function(err, collection) {
            /* Insert a data */
            collection.insert({
                name: 'Fred Chien111',
                email: 'cfsghost@gmail.com'
            }, function(err, data) {
                if(err){
                    console.log(err);
                }   
                if (data) {
                    console.log('Successfully Insert');
                } else {
                    console.log('Failed to Insert');
                }   
            }); 

            /* Querying */
            collection.find(function(err, data) {
                /* Found this People */
                if(err){
                    console.log(err);
                }   
                if (data) {
                    data.each(function(err, doc) {
                      if (doc != null) {
                         console.log('Name: ' + doc.name + ', email: ' + doc.email);
                         res.end('111');
                         db.close();
                      } else {
                        console.log('Cannot found');
                        //db.close();
                      }   
                    }); 
                }   
            }); 
        }); 
    }); 
});
app.listen('8088');
module.exports = app;
