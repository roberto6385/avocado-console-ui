import SFTP from '../../../dist/sftp_pb';
import * as PropTypes from 'prop-types';
import {Close} from '../../../dist/ssht_ws';

const usePostMessage = ({keyword, ws, uuid, data, path}) => {
	let progress = 0;
	return new Promise((resolve) => {
		const msgObj = new SFTP.Message();
		msgObj.setType(SFTP.Message.Types.REQUEST);
		const reqObj = new SFTP.Request();
		let postObj = null;
		let cmdObj = null;

		switch (keyword) {
			case 'Connection':
				reqObj.setType(SFTP.Request.Types.CONNECT);
				postObj = new SFTP.ConnectRequest();
				postObj.setHost(data.host);
				postObj.setUser(data.user);
				postObj.setPassword(data.password);
				postObj.setPort(data.port);
				break;

			case 'Disconnection':
				reqObj.setType(SFTP.Request.Types.DISCONNECT);
				postObj = new SFTP.DisconnectRequest();
				postObj.setUuid(uuid);
				break;

			case 'CommandByCd':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);
				cmdObj = new SFTP.CommandByCd();
				cmdObj.setPath(path);
				postObj.setCd(cmdObj);
				break;

			case 'CommandByPwd':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);
				cmdObj = new SFTP.CommandByPwd();
				postObj.setPwd(cmdObj);
				break;

			case 'CommandByLs':
				reqObj.setType(SFTP.Request.Types.MESSAGE);
				postObj = new SFTP.MessageRequest();
				postObj.setUuid(uuid);
				cmdObj = new SFTP.CommandByLs();
				cmdObj.setPath(path);
				postObj.setLs(cmdObj);

				break;

			default:
				break;
		}

		reqObj.setBody(postObj.serializeBinary());
		msgObj.setBody(reqObj.serializeBinary());

		ws.send(msgObj.serializeBinary());

		ws.onmessage = (evt) => {
			if (evt.data instanceof ArrayBuffer) {
				const message = SFTP.Message.deserializeBinary(evt.data);

				if (message.getType() === SFTP.Message.Types.RESPONSE) {
					const response = SFTP.Response.deserializeBinary(
						message.getBody(),
					);
					console.log('[receive]response type', response.getType());
					if (response.getType() === SFTP.Response.Types.CONNECT) {
						const conObj = SFTP.ConnectResponse.deserializeBinary(
							response.getBody(),
						);
						console.log('[receive]connect', conObj);
						console.log(
							'[receive]connect to json',
							conObj.toObject(),
						);
						if (conObj.getStatus() === 'connected') {
							resolve({
								uuid: conObj.getUuid(),
							});
						}
					} else if (
						response.getType() === SFTP.Response.Types.DISCONNECT
					) {
						const conObj = SFTP.DisconnectResponse.deserializeBinary(
							response.getBody(),
						);
						console.log('[receive]disconnect', conObj);
						console.log(
							'[receive]disconnect to json',
							conObj.toObject(),
						);

						if (conObj.getStatus() === 'disconnected') {
							resolve();
						}
					} else if (
						response.getType() === SFTP.Response.Types.MESSAGE
					) {
						const msgObj = SFTP.MessageResponse.deserializeBinary(
							response.getBody(),
						);
						console.log('[receive]message', msgObj);
						console.log(
							'[receive]message to json',
							msgObj.toObject(),
						);

						var percent = progress;

						if (
							msgObj.getStatus() !== undefined &&
							msgObj.getStatus() === 'progress'
						) {
							percent = msgObj
								.getResult()
								.replace('percent : ', '');
							console.log('[progress]..........', percent);
						}

						resolve(msgObj.toObject());
					}
				}
			}
		};
	});
};

usePostMessage.propTypes = {
	keyword: PropTypes.string.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string,
	data: PropTypes.object,
	path: PropTypes.string,
};

export default usePostMessage;
