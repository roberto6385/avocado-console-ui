export function createWebsocket(host) {
	return new Promise((resolve, reject) => {
		const socket = new WebSocket(`ws://${host}:8081/ws/sftp`);
		socket.binaryType = 'arraybuffer';

		socket.onopen = function () {
			resolve(socket);
		};

		socket.onerror = function (evt) {
			reject(evt);
		};
	});
}
