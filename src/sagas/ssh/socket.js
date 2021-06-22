import {
	WebSocketExternalAccessUrl,
	WebSocketInternalAccessUrl,
} from '../../ws/ws_values';

export function initWebsocket(host, wsPort) {
	return new Promise((resolve, reject) => {
		// const ws = new WebSocket(`ws://${host}:8081/ws/ssh`);
		// const ws = new WebSocket(
		// 	`ws://ec2-3-36-73-36.ap-northeast-2.compute.amazonaws.com/ws/ssh`,
		// );
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
