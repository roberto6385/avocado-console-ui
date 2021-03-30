import React from 'react';
import AUTH from '../dist/auth_pb';
import * as PropTypes from 'prop-types';

const LoginRequest = () => {
	const message = new AUTH.Message();
	const request = new AUTH.Request();
	const login = new AUTH.LoginRequest();
	login.setUser('root');
	login.setPassword('Netand141)');

	request.setLogin(login);
	message.setRequest(request);

	return message.serializeBinary();
};

const LogoutRequest = () => {
	const message = new AUTH.Message();
	const request = new AUTH.Request();
	const logout = new AUTH.LogoutRequest();

	request.setLogin(logout);
	message.setRequest(request);

	return message.serializeBinary();
};

const auth_ws = ({keyword, ws_auth, user, password}) => {
	return new Promise((resolve) => {
		switch (keyword) {
			case 'LoginRequest':
				console.log('LoginRequest');
				ws_auth.send(LoginRequest());
				break;

			case 'LogoutRequest':
				console.log('LogoutRequest');
				ws_auth.send(LogoutRequest());
				break;

			default:
				break;
		}

		ws_auth.binaryType = 'arraybuffer';

		ws_auth.onmessage = (evt) => {
			console.log('on data, ', evt.data);
			if (evt.data instanceof ArrayBuffer) {
				const message = AUTH.Message.deserializeBinary(evt.data);

				if (message.getTypeCase() === AUTH.Message.TypeCase.RESPONSE) {
					const response = message.getResponse();

					if (
						response.getResponseCase() ===
						AUTH.Response.ResponseCase.LOGIN
					) {
						const login = response.getLogin();
						console.log('LOGIN');
						resolve({
							type: 'LOGIN',
							result: login.getToken(),
						});
					} else if (
						response.getResponseCase() ===
						AUTH.Response.ResponseCase.LOGOUT
					) {
						console.log('LOGOUT');
						resolve({type: 'LOGOUT'});
					}
				}
			}
		};
	});
};

auth_ws.propTypes = {
	keyword: PropTypes.string.isRequired,
	ws_auth: PropTypes.object.isRequired,
	user: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
};

export default auth_ws;
