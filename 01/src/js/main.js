var myCanvas = $('#in'),
	point = {}, //指针信息
	zidan = [], //子弹列表
	intervalFlag = 0, //定时器次数标 
	isIntervalRun = true, //暂停flag
	enemy = [], //敌人列表
	xx;
myCanvas.attr('height', $(window).height()).attr('width', $(window).width())
		
myCanvas.click(function() {
			isIntervalRun = !isIntervalRun;
			myCanvas.css('cursor', myCanvas.css('cursor') === 'default' ? 'none' : 'default');
		})

var canWidth = parseInt(myCanvas.attr('width')),
	canHeight = parseInt(myCanvas.attr('height'));


myCanvas.mousemove(function(e) {
	point.x = e.offsetX;
	point.y = e.offsetY;
})

setInterval(function() {
	if (isIntervalRun) {
	 	intervalFlag++;

		// 小火箭
		myCanvas
			.clearCanvas()
			.drawImage({
				source: 'images/rocket1.png',
				x: point.x,
				y: point.y,
				width: 100,
				height: 100
			})



		// 子弹列表 
		if (intervalFlag % (10 - app.zidanPl) === 0) {
			zidan.push({
				x: point.x,
				y: point.y
			})
		}
		// 敌人
		// blood指血量
		if (intervalFlag % Math.floor((100/app.enemyPl)) === 0) {
			enemy.push({
				x: Math.random() * canWidth,
				y: -100,
				blood: app.blood,
				width: 100,
				height: 100
			})
		}




		// 子弹轨迹
		zidan.forEach(function(a, b, c) {
			a.y -= app.zidanSpeed * 10;
			if (a.y < -50) {  //删除超出边界的子弹
				delete c[b];
			}
			myCanvas.drawImage({
				source: 'images/zidan1.png',
				x: a.x,
				y: a.y,
				width: 40,
				height: 40,
			})
			enemy.forEach(function(_a, _b, _c) {
				if (a.x <= _a.x + _a.width/2 && a.x >= _a.x - _a.width/2) {
					if (a.y <= _a.y + _a.height/2 && a.y >= _a.y - _a.height/2) {
						delete c[b];
						_a.blood -= app.zidanWl;
						myCanvas.drawImage({
							source: 'images/zidan1.png',
							x: _a.x,
							y: _a.y,
							width: _a.width * 1.2,
							height: _a.height * 1.2,
						}).drawImage({
							source: 'images/ufo1.png',
							x: _a.x,
							y: _a.y,
							width: _a.width * 1.2,
							height: _a.height * 1.2,
						})
					}
				}
			})
		})

		// 敌人
		enemy.forEach(function(a, b, c) {
			a.y += app.enemySpeed * 5;
			if (a.y > canHeight + 100) {
				playFailed();
			}
			if (a.blood <= 0) {
				delete c[b];
				app.countBord++;
			}
			myCanvas.drawImage({
				source: 'images/ufo1.png',
				x: a.x,
				y: a.y,
				width: a.width,
				height: a.height,
			})
		})
	}
}, 20);



function playFailed() {
	alert('You losed!');
	myCanvas.clearCanvas();
	app.countBord = 0;
	zidan = [];
	enemy = [];
}

var app = new Vue({
	el: '#control',
	data: {
		blood: 5,
		enemySpeed: 1,
		enemyPl: 1,
		zidanSpeed: 1,
		zidanPl: 1,
		zidanWl: 1,
		countBord: 0
	},
	methods: {
		upSth: function(a) {
			if (app[a] >= 9) {
				return alert('不能超过9！')
			}
			app[a]++;
		},
		lowSth: function(a) {
			if (app[a] <= 1) {
				return alert('不能为负值！')
			}
			app[a]--;
		}
	}
})







