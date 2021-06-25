import {WebSocketExternalAccessUrl} from '../../ws/ws_values';

export function initWebsocket() {
	return new Promise((resolve, reject) => {
		const ws = new WebSocket(`ws://${WebSocketExternalAccessUrl}/ws/ssh`);

		ws.binaryType = 'arraybuffer';

		ws.onopen = function () {
			resolve(ws);
		};

		ws.onerror = function (e) {
			reject(e);
		};
	});
}
