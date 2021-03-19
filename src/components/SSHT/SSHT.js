import React, {useEffect, useRef} from 'react';
import {Terminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import {PropTypes} from 'prop-types';
import {useDispatch} from 'react-redux';
import SSH from '../../dist/ssh_pb';
import {CLOSE_TAB} from '../../reducers/common';

const SSHT = ({index, ws, uuid}) => {
	const dispatch = useDispatch();
	const sshTerm = useRef(
		new Terminal({
			cursorBlink: true,
			minimumContrastRatio: 7,
			theme: {selection: '#FCFD08'},
			rows: 10,
		}),
	);
	const fitAddon = useRef(new FitAddon());

	useEffect(() => {
		sshTerm.current.loadAddon(fitAddon.current);
		sshTerm.current.open(
			document.getElementById('terminal_' + String(index)),
		);
		fitAddon.current.fit();

		ws.onerror = () => {
			console.log('Connection Error');
		};

		ws.onclose = () => {
			console.log('Client Closed Not Sure');
			const msgObj = new SSH.Message();
			msgObj.setType(SSH.Message.Types.REQUEST);

			const reqObj = new SSH.Request();
			reqObj.setType(SSH.Request.Types.DISCONNECT);

			const disObj = new SSH.DisconnectRequest();
			disObj.setUuid(uuid);

			reqObj.setBody(disObj.serializeBinary());
			msgObj.setBody(reqObj.serializeBinary());

			ws.send(msgObj.serializeBinary());
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
					const conObj = SSH.DisconnectResponse.deserializeBinary(
						response.getBody(),
					);

					if (conObj.getStatus() === 'disconnected')
						dispatch({type: CLOSE_TAB, data: index});
				} else {
					console.log('여기 올까요?');
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
			console.log('Client Closed Terminal');
			const msgObj = new SSH.Message();
			msgObj.setType(SSH.Message.Types.REQUEST);

			const reqObj = new SSH.Request();
			reqObj.setType(SSH.Request.Types.DISCONNECT);

			const disObj = new SSH.DisconnectRequest();
			disObj.setUuid(uuid);

			reqObj.setBody(disObj.serializeBinary());
			msgObj.setBody(reqObj.serializeBinary());

			ws.send(msgObj.serializeBinary());
			sshTerm.current.dispose();
		};
	}, [index, uuid, ws]);

	return <div id={`terminal_${String(index)}`} />;
};

SSHT.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default SSHT;
