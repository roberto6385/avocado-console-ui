import {buffers, END, eventChannel} from 'redux-saga';

export function subscribe(socket, buffer) {
	return eventChannel((emit) => {
		socket.onmessage = (event) => {
			emit(event.data);
		};

		socket.onerror = () => {
			console.log(
				'error errorerror errorerror errorerror errorerror errorerror error',
			);
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

export function closeChannel(channel) {
	channel && channel.close();
}
