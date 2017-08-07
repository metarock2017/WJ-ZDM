setInterval(_=> {
	document.querySelector('#r1').innerHTML = new Date() + ' &nbsp ' + new Date().getMilliseconds();
}, 200)

const worker = new Worker('./worker.js');


let list = Array.apply(null, {length: 20000}).map(item => Math.random() * 100);


console.time('main');
for (let i = 0, le = list.length; i < le; i++) {
		for (let j = 0; j < i; j++) {
			if (list[i] < list[j]) {
				let tmp = list[i];
				list[i] = list[j];
				list[j] = tmp;
			}
		}
	}
console.timeEnd('main')


worker.postMessage(list);

worker.addEventListener('message', (e) => {
	console.log(e.data);
});