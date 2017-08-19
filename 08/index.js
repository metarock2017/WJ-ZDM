
var point = {
	colorList: ['#dddddd', '#ff88c2', '#ff8888', '#ffa488', '#ffbb66' ,'#ffdd55', '#ffff77', '#bbff66', '#66ff66', '#77ffcc', '#77ffee', '#66ffff'],
	draw(obj) {
		obj = obj || {};
		var el = document.createElement('div');
		el.className = 'point';
		el.style.width = obj.size || '50px';
		el.style.height = obj.size || '50px'; 
		el.style.background = point.colorList[Math.floor(Math.random() * point.colorList.length)];
		el.scrollX = obj.scrollX || (Math.random() - .5) * 16;
		el.scrollY = obj.scrollY || (Math.random() - .5) * 16;
		el.style.top = '300px';
		el.style.left = '300px';
		document.body.appendChild(el);
	}
}
setInterval(_=> {
	document.querySelectorAll('.point').forEach(function(a, b, c) {
		if (parseFloat(a.style.top) < 0 || parseFloat(a.style.top) + parseFloat(a.style.height) > parseFloat(window.screen.availHeight)) {
			a.scrollY = -a.scrollY;
			a.style.background = point.colorList[Math.floor(Math.random() * point.colorList.length)];
		}
		if (parseFloat(a.style.left) < 0 || parseFloat(a.style.left) - parseFloat(a.style.width) > parseFloat(window.screen.availWidth)) {
			a.scrollX = -a.scrollX;
			a.style.background = point.colorList[Math.floor(Math.random() * point.colorList.length)];
		}
		[a.style.top, a.style.left,] = [parseFloat(a.style.top) + parseFloat(a.scrollY) + 'px', parseFloat(a.style.left) + parseFloat(a.scrollX) + 'px',];
	})
}, 10)
Array.apply(null, {length: 20}).forEach(_=> point.draw());
/*
	draw参数：scrollY, scrollX 分别为向下向右的移动速度 number 可以为负值
			 size 方块的大小 string
	默认弹出点为300px, 300px;
*/