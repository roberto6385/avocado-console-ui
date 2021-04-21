import {END, eventChannel} from 'redux-saga';

export function subscribe(socket) {
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
			// socket.onmessage = null;
		};
	});
}

export function closeChannel(channel) {
	channel && channel.close();
}
