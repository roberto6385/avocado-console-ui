import {buffers, END, eventChannel} from 'redux-saga';

export default function useSubscribe({socket, buffer}) {
	return eventChannel((emit) => {
		socket.onmessage = (event) => {
			emit(event.data);
		};

		socket.onerror = (event) => {
			console.log(event);
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
