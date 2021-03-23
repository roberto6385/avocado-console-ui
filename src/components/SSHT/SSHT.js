import React, {useEffect, useRef} from 'react';
import {Terminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import SSH from '../../dist/ssh_pb';
import {CLOSE_TAB} from '../../reducers/common';
import {Close, GetMessage, SendMessage, Resize} from '../../dist/SSHTWs';

const SSHTerminal = styled.div`
	height: 100%;
	width: 100%;
	max-height: 100%;
	max-width: 100%;
`;

const SSHT = ({index, display, height, width, ws, uuid}) => {
	const dispatch = useDispatch();
	const {font_size} = useSelector((state) => state.ssht);

	const sshTerm = useRef(
		new Terminal({
			cursorBlink: true,
			minimumContrastRatio: 7,
			theme: {selection: '#FCFD08'},
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

		ws.onmessage = (e) => {
			const result = GetMessage(e);
			switch (result.type) {
				case 'disconnected':
					dispatch({type: CLOSE_TAB, data: index});
					break;
				case 'message':
					sshTerm.current.write(result.result);
					break;
				default:
					console.log('도달하면 안되는 공간2');
					break;
			}
		};

		sshTerm.current.onData(function (data) {
			ws.send(SendMessage(uuid, data));
		});

		return () => {
			if (ws.readyState !== 3) {
				ws.send(Close(uuid));
			}
			sshTerm.current.dispose();
		};
	}, [index, uuid, ws]);

	useEffect(() => {
		sshTerm.current.setOption('fontSize', font_size);

		if (display) {
			fitAddon.current.fit();

			ws.send(
				Resize(
					uuid,
					sshTerm.current.cols,
					sshTerm.current.rows,
					width,
					height,
				),
			);
		}
	}, [font_size, height, width]);

	return <SSHTerminal id={`terminal_${String(index)}`} />;
};

SSHT.propTypes = {
	index: PropTypes.number.isRequired,
	display: PropTypes.bool.isRequired,
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default SSHT;
