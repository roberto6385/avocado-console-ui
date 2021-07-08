import {buffers, END, eventChannel} from 'redux-saga';
import {READY_STATE} from '../reducers/sftp/list';
import {useEffect, useState} from 'react';

const useSubscribe = ({socket, buffer, uuid}) => {
	const [evtChannel, setEvtChannel] = useState(null);

	useEffect(() => {
		setEvtChannel(
			eventChannel((emit) => {
				socket.onmessage = (event) => {
					emit(event.data);
				};

				socket.onerror = (event) => {
					console.log(event);
					socket.close();
				};

				socket.onclose = function () {
					console.log('socket close!');
					console.log(uuid);
					emit(END);
				};

				return () => {
					socket.onmessage = null;
				};
			}, buffer || buffers.none()),
		);
	}, []);

	return evtChannel;
};

export default useSubscribe;
