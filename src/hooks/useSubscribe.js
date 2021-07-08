import {buffers, END, eventChannel} from 'redux-saga';
import {READY_STATE} from '../reducers/sftp/list';

export default function useSubscribe({socket, buffer, dispatch}) {
	return eventChannel((emit) => {
		socket.onmessage = (event) => {
			emit(event.data);
		};

		socket.onerror = (event) => {
			console.log(event);
			socket.close();
		};

		socket.onclose = () => {
			console.log('socket close!');
			console.log(dispatch);
			dispatch();
			emit(END);
		};

		return () => {
			socket.onmessage = null;
		};
	}, buffer || buffers.none());
}
