import React, {useCallback, useEffect, useRef} from 'react';
import {Terminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import {SearchAddon} from 'xterm-addon-search';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {Form} from 'react-bootstrap';

import {CLOSE_TAB} from '../../reducers/common';
import {Close, GetMessage, SendMessage, Resize} from '../../dist/ssht_ws';
import useInput from '../../hooks/useInput';

const SSHTerminal = styled.div`
	height: 100%;
	width: 100%;
	max-height: 100%;
	max-width: 100%;
	position: relative;
`;

const FormControl = styled(Form.Control)`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 200px;
	display: none;
`;

const SSHT = ({index, display, height, width, ws, uuid}) => {
	const dispatch = useDispatch();
	const {current_tab} = useSelector((state) => state.common);
	const {font_size, search_mode} = useSelector((state) => state.ssht);
	const [search, onChangeSearch, setSearch] = useInput('');

	const sshTerm = useRef(
		new Terminal({
			cursorBlink: true,
			minimumContrastRatio: 7,
			theme: {selection: '#FCFD08'},
		}),
	);
	const fitAddon = useRef(new FitAddon());
	const searchAddon = useRef(new SearchAddon());

	useEffect(() => {
		sshTerm.current.loadAddon(fitAddon.current);
		sshTerm.current.loadAddon(searchAddon.current);
		sshTerm.current.open(
			document.getElementById('terminal_' + String(index)),
		);
		fitAddon.current.fit();

		ws.onerror = () => {
			console.log('Connection Error');
		};

		ws.onclose = () => {
			console.log('이거는 잘못 닫음 실행되는건가욤??');
			ws.send(Close(uuid));
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
			// if (ws.readyState !== 3) {
			// 	ws.send(Close(uuid));
			// }
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

	useEffect(() => {
		if (current_tab === index && search_mode) {
			document.getElementById('search_' + String(index)).style.display =
				'block';
		} else {
			document.getElementById('search_' + String(index)).style.display =
				'none';
			setSearch('');
			searchAddon.current.findPrevious('');
		}
	}, [current_tab, index, search_mode]);

	useEffect(() => {
		if (current_tab === index && search !== '') {
			searchAddon.current.findPrevious('');
			searchAddon.current.findPrevious(search);
		}
	}, [current_tab, index, search]);

	const onSubmitSearch = useCallback(
		(e) => {
			if (e.key === 'Enter') searchAddon.current.findPrevious(search);
		},
		[search],
	);

	return (
		<SSHTerminal id={`terminal_${String(index)}`}>
			<FormControl
				id={`search_${String(index)}`}
				onChange={onChangeSearch}
				onKeyPress={onSubmitSearch}
				value={search}
				placeholder='Search...'
				size='sm'
				type='text'
			/>
		</SSHTerminal>
	);
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
