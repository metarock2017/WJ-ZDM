const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const opn = require('opn');

let player = [];
let enemy = [];

let scope = this;


let ws = new WebSocket.Server({
	port: 3001
})

ws.on('connection', S => {
	let playerId = player.length;
	S.on('message', e => {
		let tData = JSON.parse(e);

		// type === 0 注册用户

		if (tData.type === 0) {
			player.push({
				id: tData.id,
				rocketType: Math.ceil(Math.random() * 4),
				bulletType: Math.ceil(Math.random() * 3),
				bulletNumber: Math.ceil(Math.random() * 3),
				bulletSpeed: Math.ceil(Math.random() * 8) + 10,
				bulletFrequency: Math.ceil(Math.random() * 5) + 6,
				name: tData.name,
			});
			try {
				S.send(JSON.stringify({
					type: 0,
					status: 1,
					playerId
				}))
			}catch(err) {
				console.log(err);
			}
		}

		// type === 1 传回鼠标数据
		else if (tData.type === 1) {
			player[tData.playerId].rocketPosition = tData.data;
		}

		// type === 2 传回击中的数据
		else if (tData.type === 2) {
			// console.log(tData.data.id);
		}
	})

	_sendData();
	// 广播函数
	// let interval = setInterval(_sendData.bind(scope, S), 20);

	// IntervalRoom.push(S);
	S.on('close', _=> {
		delete player[playerId];
	})
})


let isNewEnemy = false;
setInterval(_=> {
	enemy.push({
		craftType: 1,
		craftSpeed: Math.random() * 3,
		craftX: Math.ceil(Math.random() * 900) + 50,
		craftId: new Date().getTime(),
	});
	isNewEnemy = true;
}, 1000)




function _sendData() {
	clearInterval(scope._inter);
	scope._inter = setInterval(_=> {
		console.log(ws.clients.size);
		ws.clients.forEach(S => {
			if (S.readyState === WebSocket.OPEN) {
				try {
					S.send(JSON.stringify({
						type: 1,
						data: {
							player,
							enemy: isNewEnemy ? enemy[enemy.length-1] : {}
						}
					}));
				}catch(err) {
					console.log(err);
				}
			}
		})
		isNewEnemy = false;
	}, 20);
}




// function _sendData(S) {
// 	try {
// 		S.send(JSON.stringify({
// 			type: 1,
// 			data: {
// 				player,
// 				enemy: enemy[enemy.length-1]
// 			}
// 		}));
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// wss.broadcast = _sendData;






























http.createServer((req, res) => {
	if (!req.headers.cookie) {
		res.writeHead(200, {
		    'Set-Cookie': '__id=' + new Date().getTime(),
		    'Content-Type': 'text/html'
		});
	}
	fs.readFile('src' + req.url, (err, file) => {
		if (err) {
			console.log(err);
		}else {
			res.end(file);
		}
	})

}).listen(3000, _=> {
	console.log("运行在3000端口");
	opn('http://127.0.0.1:3000/index.html')
});