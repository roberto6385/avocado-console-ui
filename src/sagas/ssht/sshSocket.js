import {buffers, END, eventChannel} from 'redux-saga';

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

export function initChannel(ws, buffer) {
	return eventChannel((emit) => {
		ws.onmessage = (e) => {
			emit(e.data);
		};

		ws.onerror = (err) => {
			console.log(err);
			ws.close();
		};

		ws.onclose = () => {
			emit(END);
		};

		return () => {
			ws.onmessage = null;
		};
	}, buffer || buffers.none());
}

export function closeChannel(channel) {
	channel && channel.close();
}
