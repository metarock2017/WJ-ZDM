const express = require('express');
var app = express();

app.use('/', express.static('./src'))
   .listen(8000, _=> {
   	console.log('运行在localhost:8000/index.html');
   });