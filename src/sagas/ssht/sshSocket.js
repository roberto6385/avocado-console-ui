import {buffers, END, eventChannel} from 'redux-saga';

export function initWebsocket(host) {
	return new Promise((resolve, reject) => {
		console.log(host);
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

export function initChannel(socket, buffer) {
	return eventChannel((emit) => {
		socket.onmessage = (event) => {
			emit(event.data);
		};

		socket.onerror = () => {
			socket.close();
		};

		socket.onclose = () => {
			emit(END);
		};

		return () => {
			socket.onmessage = null;
		};
	}, buffer || buffers.none());
}
