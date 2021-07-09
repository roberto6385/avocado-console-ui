import {buffers, END, eventChannel} from 'redux-saga';

export function subscribe(socket, buffer) {
	return eventChannel((emit) => {
		socket.onmessage = (event) => {
			emit(event.data);
		};

		socket.onerror = (event) => {
			console.log(event);
			socket.close();
		};

		socket.onclose = () => {
			console.log('close');
			emit(END);
		};

		return () => {
			socket.onmessage = null;
		};
	}, buffer || buffers.none());
}

export function fileSubscribe(socket, buffer) {
	return eventChannel((emit) => {
		socket.onmessage = (event) => {
			emit(event.data);
		};

		socket.onerror = (event) => {
			console.log(event);
			socket.close();
		};

		socket.onclose = () => {
			console.log('sftp socket close');
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
