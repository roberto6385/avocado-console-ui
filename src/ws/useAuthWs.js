import {useState, useEffect, useRef} from 'react';
import AUTH from '../dist/auth_pb';
import {useDispatch} from 'react-redux';
import {LOGIN, LOGOUT} from '../reducers/common';

const useAnthWs = () => {
	const socket = useRef(new WebSocket('ws://211.253.10.9:8081/ws/auth'));
	const [result, setMessages] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		socket.current.binaryType = 'arraybuffer';

		socket.current.onopen = () => {
			console.log('socket connected');
		};

		socket.current.onclose = () => {
			socket.current.close();
			socket.current = null;
		};

		socket.current.onmessage = (evt) => {
			if (evt.data instanceof ArrayBuffer) {
				const message = AUTH.Message.deserializeBinary(evt.data);

				if (message.getTypeCase() === AUTH.Message.TypeCase.RESPONSE) {
					const response = message.getResponse();

					if (
						response.getResponseCase() ===
						AUTH.Response.ResponseCase.LOGIN
					) {
						const login = response.getLogin();
						console.log('login');
						dispatch({type: LOGIN, data: login.getToken()});
						socket.current.close();
					} else if (
						response.getResponseCase() ===
						AUTH.Response.ResponseCase.LOGOUT
					) {
						console.log('logout');
						dispatch({type: LOGOUT});
					}
				}
			}
		};

		return () => {
			socket.current.close();
			socket.current = null;
		};
	}, []);
	return [(socket: socket.current), result];
};

export default useAnthWs;
