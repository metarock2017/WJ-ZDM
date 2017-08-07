onmessage = function(e) {
	let data = e.data;
	console.time('worker');
	for (let i = 0, le = data.length; i < le; i++) {
		for (let j = 0; j < i; j++) {
			if (data[i] < data[j]) {
				let tmp = data[i];
				data[i] = data[j];
				data[j] = tmp;
			}
		}
	}
	console.timeEnd('worker');
	postMessage(data);
}