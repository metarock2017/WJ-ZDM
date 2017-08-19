var koa = require('koa');
var app = new koa();
var fs = require('fs');

app.use(function*(next) {
	var xxx = fs.readFileSync('./src/123.jpg'); 
	this.set('Content-Type', 'image/jpeg');
	this.body = xxx; 
	yield next; 
})


app.listen(3000);  