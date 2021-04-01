import React, {useCallback, useEffect, useRef} from 'react';
import {Terminal} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import {SearchAddon} from 'xterm-addon-search';
import * as PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import useInput from '../../hooks/useInput';
import {SSHTerminal, TerminalSearchForm} from '../../styles/ssht';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {GetMessage} from '../../ws/ssht_ws_logic';

const SSHT = ({index, display, height, width, ws, uuid}) => {
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
			ssht_ws_request({keyword: 'SendDisconnect', ws: ws});
		};

		ws.onmessage = (evt) => {
			const message = GetMessage(evt);
			console.log(message);
			if (message.type === 'COMMAND')
				sshTerm.current.write(message.result);
			else console.log('V SSHT onmessage: ', message);
		};

		sshTerm.current.onData(function (data) {
			ssht_ws_request({
				keyword: 'SendCommand',
				ws: ws,
				data: data,
			});
		});

		return () => {
			sshTerm.current.dispose();
			ssht_ws_request({keyword: 'SendDisconnect', ws: ws});
		};
	}, [index, uuid, ws]);

	useEffect(() => {
		sshTerm.current.setOption('fontSize', font_size);

		if (display) {
			fitAddon.current.fit();

			ssht_ws_request({
				keyword: 'SendWindowChange',
				ws: ws,
				data: {
					cols: sshTerm.current.cols,
					rows: sshTerm.current.rows,
					width: width,
					height: height,
				},
			});
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
		<SSHTerminal>
			<SSHTerminal id={`terminal_${String(index)}`} />
			<TerminalSearchForm
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
