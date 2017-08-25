var ws = new WebSocket('ws://' + document.domain + ':3001/');

var Canvas = document.querySelector('#game'),
	_id = document.cookie.replace(/(__id)=(\d+);?/, '$2'),
    isLinked = false,
    _bullet = [],
    _craft = [],
    loopFlag = 0,
    prevCraftId = 0,
    isNeedDraw = true;


ws.onopen = function(e) {
	ws.send(JSON.stringify({
		type: 0, 
		id: window._id,
		name: 'player1'
	}));
}
ws.onmessage = function(e) {
	var tData = JSON.parse(e.data);
	if (tData.type === 0) {
		if (tData.status === 1) {
			// 连接成功
			window.isLinked = true;
			window.playerId = tData.playerId;
			console.log("success");
		}
	}

	else if (tData.type = 1) {
		if (isNeedDraw) {
			isNeedDraw = false;
			setTimeout(_=> isNeedDraw = true, 20);
			// console.log(tData);
			var isFirstDraw = true;
			loopFlag++;
			tData.data.player.forEach(function(a) {
				if (a && a.rocketPosition) {
					// 尽可能快地在刚清空 canvas 时就draw
					if (isFirstDraw) {
						C.clearRect(0, 0, 1000, 1000);
						isFirstDraw = false;
						draw({
							url: './images/bg.jpg',
							width: Canvas.width,
							height: Canvas.height,
							x: 0,
							y: 0
						})
					}
					draw({
						url: './images/rocket' + a.rocketType + '.png',
						width: '100',
						height: '100',
						x: a.rocketPosition.x - 50,
						y: a.rocketPosition.y - 50,
					})
					if (!(loopFlag%a.bulletFrequency)) {
						_bullet.push({
							x: a.rocketPosition.x - 10,
							y: a.rocketPosition.y - 10,
							type: a.bulletType,
							number: a.bulletNumber,
							speed: a.bulletSpeed,
						})
					}
					// 敌人飞船 逻辑
					if (tData.data.enemy.craftId && tData.data.enemy.craftId != prevCraftId) {
						prevCraftId = tData.data.enemy.craftId;
												console.log(tData.data.enemy.craftX);
						_craft.push({
							type: tData.data.enemy.craftType,
							speed: tData.data.enemy.craftSpeed,
							x: tData.data.enemy.craftX,
							y: -100,
							id: tData.data.enemy.craftId,
						})
					}
					_craft.forEach(function(a, b, c) {
						draw({
							url: './images/craft' + a.type + '.png',
							width: '100',
							height: '100',
							x: a.x - 50,
							y: a.y - 50,
						})
						a.y += a.speed;
						// 死亡
						if (a.y >= 800) {
							delete c[b];
							alert('You losed!');
						}
						_bullet.forEach(function(_a, _b, _c) {
							if (_a.x > a.x - 50 && _a.x < a.x + 50) {
								if (_a.y > a.y - 50 && _a.y < a.y + 50) {
									// 击中飞船 传数据
									delete c[b];
									delete _c[_b];
									ws.send(JSON.stringify({
										type: 2,
										data: {
											id: a.id
										}
									}))
								}
							}
						})
					})
				}
				_bullet.forEach(function(a, b, c) {
					if (a) {
						for (var i = a.number; i > 0; i--) {
							draw({
								url: './images/zidan' + a.type + '.png',
								width: '20',
								height: '20',
								x: a.x - a.number * 10 - 20 + (10 + i * 20),
								y: a.y
							})
						}
						a.y -= a.speed * 0.2;
						if (a.y < 0) {
							delete c[b];
						}
					}
				})
			});
		}
	}





}

Canvas.onmousemove = function(e) {
	if (window.isLinked) {
		ws.send(JSON.stringify({
			type: 1,
			playerId: window.playerId,
			data: {
				x: e.offsetX,
				y: e.offsetY,
			}
		}));
	}
}









// DOM
document.querySelector('button').onclick = function() {
	document.querySelector('#cover').style.display = 'none';
}




// Canvas
var C = Canvas.getContext('2d');
/*
	url / color 二选一
	width, height
	x, y
	scroll
*/
function draw(obj) {
	if (!(obj.url || obj.color)) throw new Error('Exo me?');
	if (!(obj.width && obj.height)) throw new Error('Exo me?');
	if (obj.url) {
		var im = new Image();
		im.src = obj.url;
		C.drawImage(im, obj.x, obj.y, obj.width, obj.height);
	}
}