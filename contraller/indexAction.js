var express = require('express')
var app = express()
var articleRouter = require('./article/list1')
app.use(articleRouter);
module.exports = app;
