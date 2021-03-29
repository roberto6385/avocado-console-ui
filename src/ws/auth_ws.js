import React from 'react';
import AUTH from '../dist/auth_pb';
import * as PropTypes from 'prop-types';

const auth_ws = ({keyword, ws_auth, user, password}) => {
	var message = new AUTH.Message();
	var request = new AUTH.Request();
	return new Promise((resolve) => {
		switch (keyword) {
			case 'LoginRequest':
				var login = new AUTH.LoginRequest();
				login.setUser(user);
				login.setPassword(password);
				request.setLogin(login);
				break;

			case 'LogoutRequest':
				var logout = new AUTH.LogoutRequest();
				request.setLogin(logout);
				break;

			default:
				break;
		}

		message.setRequest(request);
		ws_auth.send(message.serializeBinary());

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
						console.log('login');
						resolve(login);
					} else if (
						response.getResponseCase() ===
						AUTH.Response.ResponseCase.LOGOUT
					) {
						console.log('logout');
						resolve(response);
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
