import React, {useEffect, useRef} from 'react';
import {Terminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import SSH from '../../dist/ssh_pb';

const SSHT = ({id, ws, uuid}) => {
	const dispatch = useDispatch();
	const sshTerm = useRef(
		new Terminal({
			cursorBlink: true,
			minimumContrastRatio: 7,
			theme: {selection: '#FCFD08'},
			// rows: 49,
		}),
	);
	const fitAddon = useRef(new FitAddon());

	useEffect(() => {
		sshTerm.current.loadAddon(fitAddon.current);
		sshTerm.current.open(document.getElementById(id));
		fitAddon.current.fit();

		ws.onerror = () => {
			console.log('Connection Error');
		};

		ws.onclose = () => {
			console.log('Client Closed');
			ws.send(
				JSON.stringify({
					requestType: 'Disconnect',
					uuid: uuid,
				}),
			);
			sshTerm.current.dispose();
		};

		ws.onmessage = (e) => {
			const message = SSH.Message.deserializeBinary(e.data);

			if (message.getType() === SSH.Message.Types.RESPONSE) {
				const response = SSH.Response.deserializeBinary(
					message.getBody(),
				);

				if (response.getType() === SSH.Response.Types.MESSAGE) {
					const msgObj = SSH.MessageResponse.deserializeBinary(
						response.getBody(),
					);
					sshTerm.current.write(msgObj.getResult());
				} else if (
					response.getType() === SSH.Response.Types.DISCONNECT
				) {
					console.log('Client Closed Done');
				}
			}
		};

		sshTerm.current.onData(function (data) {
			const msgObj = new SSH.Message();
			msgObj.setType(SSH.Message.Types.REQUEST);

			const reqObj = new SSH.Request();
			reqObj.setType(SSH.Request.Types.MESSAGE);

			const msgReqObj = new SSH.MessageRequest();
			msgReqObj.setUuid(uuid);
			msgReqObj.setMessage(data);

			reqObj.setBody(msgReqObj.serializeBinary());
			msgObj.setBody(reqObj.serializeBinary());

			ws.send(msgObj.serializeBinary());
		});

		return () => {
			console.log('Client Closed');
			const msgObj = new SSH.Message();
			msgObj.setType(SSH.Message.Types.REQUEST);

			const reqObj = new SSH.Request();
			reqObj.setType(SSH.Request.Types.DISCONNECT);

			const disObj = new SSH.DisconnectRequest();

			reqObj.setBody(disObj.serializeBinary());
			msgObj.setBody(reqObj.serializeBinary());

			ws.send(msgObj.serializeBinary());
			sshTerm.current.dispose();
		};
	}, [id, uuid, ws]);

	return <div id={id} />;
};

SSHT.propTypes = {
	id: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default SSHT;
