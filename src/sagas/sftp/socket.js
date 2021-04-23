export function createWebsocket(payload) {
	return new Promise((resolve, reject) => {
		const socket = new WebSocket(`ws://${payload.host}:8081/ws/sftp`);
		socket.binaryType = 'arraybuffer';

		socket.onopen = function () {
			resolve(socket);
		};

		socket.onerror = function (evt) {
			reject(evt);
		};
	});
}
