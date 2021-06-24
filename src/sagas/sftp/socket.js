import {
	WebSocketExternalAccessUrl,
	WebSocketInternalAccessUrl,
} from '../../ws/ws_values';

export function createWebsocket() {
	return new Promise((resolve, reject) => {
		const socket = new WebSocket(
			`ws://${WebSocketExternalAccessUrl}/ws/sftp`,
		);

		socket.binaryType = 'arraybuffer';

		socket.onopen = function () {
			resolve(socket);
		};

		socket.onerror = function (evt) {
			reject(evt);
		};
	});
}
