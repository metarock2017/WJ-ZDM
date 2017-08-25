var socket = io.connect('http://localhost:3000');

var S = {
	oberver: [],
	_realData: [],
	get data() {
		return S._realData;
	},
	set data(e) {
		S._realData = e;
		S.oberver.forEach((a) => a(S._realData));
	}
}
socket.on('news', (data) => {
	console.log(data);
	S.data.push(data);
});