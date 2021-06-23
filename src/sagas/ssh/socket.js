import {
	WebSocketExternalAccessUrl,
	WebSocketInternalAccessUrl,
} from '../../ws/ws_values';

export function initWebsocket(host, wsPort) {
	return new Promise((resolve, reject) => {
		const ws = new WebSocket(
			'ws://' + WebSocketExternalAccessUrl + '/ws/ssh',
			// wsPort ? `ws://${host}:${wsPort}/ws/ssh` : `ws://${host}/ws/ssh`,
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
