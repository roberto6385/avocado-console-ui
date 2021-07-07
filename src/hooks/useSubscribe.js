import React from 'react';
import {buffers, END, eventChannel} from 'redux-saga';
import {useDispatch} from 'react-redux';
import {READY_STATE} from '../reducers/sftp/list';

const useSubscribe = ({socket, buffer, uuid = ''}) => {
	console.log(socket, uuid);
	const dispatch = useDispatch();

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
			if (uuid !== '') {
				dispatch({type: READY_STATE, payload: {uuid}});
			}
			emit(END);
		};

		return () => {
			socket.onmessage = null;
		};
	}, buffer || buffers.none());
};

export default useSubscribe;
