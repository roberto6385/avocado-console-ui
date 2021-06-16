export function initWebsocket(host) {
	return new Promise((resolve, reject) => {
		// const ws = new WebSocket(`ws://${host}:8081/ws/ssh`);
		// const ws = new WebSocket(
		// 	`ws://ec2-3-36-73-36.ap-northeast-2.compute.amazonaws.com/ws/ssh`,
		// );
		const ws = new WebSocket(
			`ws://ip-172-31-1-65.ap-northeast-2.compute.internal/ws/ssh`,
		);

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
