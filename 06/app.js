// const express = require('express');
// const socketio = require('socket.io');


// var app = express();



// app.use(express.atatic('src/'));
// app.listen('3000');





var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , mysql = require('mysql')
  , cookieParser = require('cookie-parser');

server.listen(3000);
app.use(cookieParser);


// var db = mysql.createConnection({
// 	user: 'root',
// 	host: 'localhost',
// 	password: '1',
// 	database: 'mysql'
// });

// db.connect();





app.get('/', function (req, res) {
	res.send('src/index.html');
	console.log(req.cookie);
});

io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
});
















var xxxx = document.createElement('script');
xxxx.src = 'https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js';
document.body.appendChild(xxxx);

setTimeout(_=> {

}, 500)

var i = 1;
setInterval(_=> {
	document.querySelector('#tgb').contentWindow.document.querySelector('#veditor1_Iframe').contentWindow.document.querySelector('div').innerHTML = '第' + i++ + '个 hello!'
	document.querySelector('#tgb').contentWindow.document.querySelector('#btnPostMsg').click()
}, 100)

















    document.querySelector('.app_canvas_frame').contentWindow.document.querySelector('#btnBatch').click()
    setInterval(function() {
        document.querySelector('.app_canvas_frame').contentWindow.document.querySelector('#chkSelectAll').click()
        document.querySelector('.app_canvas_frame').contentWindow.document.querySelector('#btnDeleteBatchBottom').click()
        setTimeout(function() {
                    document.querySelector('.qz_dialog_layer_btn.qz_dialog_layer_sub').click();
        },
        500);
    },
    2000);




setInterval(_=> {
	document.querySelector('.delBtn').click();
	document.querySelector('.delChose input[value=确定]');
}, 100)






