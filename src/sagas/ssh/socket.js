export function initWebsocket(host) {
	return new Promise((resolve, reject) => {
		const ws = new WebSocket(`ws://${host}:8081/ws/ssh`);
		ws.binaryType = 'arraybuffer';

		ws.onopen = function () {
			resolve(ws);
		};

		ws.onerror = function (e) {
			console.log(e);
			reject(e);
		};
	});
}
