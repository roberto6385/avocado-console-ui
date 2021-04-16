import React, {useCallback, useEffect, useRef} from 'react';
import {FitAddon} from 'xterm-addon-fit';
import {SearchAddon} from 'xterm-addon-search';
import * as PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import useInput from '../../hooks/useInput';
import {SSHTerminal, TerminalSearchForm} from '../../styles/ssht';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {GetMessage} from '../../ws/ssht_ws_logic';

const SSHT = ({index, display, height, width}) => {
	const {current_tab, tab} = useSelector((state) => state.common);
	const {font, font_size, search_mode} = useSelector((state) => state.ssht);
	const [search, onChangeSearch, setSearch] = useInput('');
	const sshTerm = tab.find((v) => v.id === index).terminal;
	const ws = tab.find((v) => v.id === index).socket.ws;
	const fitAddon = useRef(new FitAddon());
	const searchAddon = useRef(new SearchAddon());
	const terminalRef = useRef(null);

	const onSubmitSearch = useCallback(
		(e) => {
			if (e.key === 'Enter') searchAddon.current.findPrevious(search);
		},
		[search],
	);

	const resizeRequest = useCallback(() => {
		if (display && width > 0 && height > 0) {
			fitAddon.current.fit();

			ssht_ws_request({
				keyword: 'SendWindowChange',
				ws: ws,
				data: {
					cols: sshTerm.cols,
					rows: sshTerm.rows,
					width: width,
					height: height,
				},
			});
		}
	}, [display, ws, sshTerm, width, height]);

	useEffect(() => {
		sshTerm.loadAddon(fitAddon.current);
		sshTerm.loadAddon(searchAddon.current);
		sshTerm.open(terminalRef.current);
		fitAddon.current.fit();

		ws.onerror = () => {
			console.log('Terminal Error');
		};

		ws.onmessage = (evt) => {
			const message = GetMessage(evt);
			if (message.type === 'COMMAND') sshTerm.write(message.result);
			else console.log('V SSHT onmessage: ', message);
		};

		sshTerm.onData(function (data) {
			ssht_ws_request({
				keyword: 'SendCommand',
				ws: ws,
				data: data,
			});
		});
	}, [index, ws, sshTerm]);

	useEffect(() => {
		sshTerm.setOption('theme', {fontFamily: font});
		resizeRequest();
	}, [font, sshTerm, display, ws, width, height]);

	useEffect(() => {
		sshTerm.setOption('fontSize', font_size);
		resizeRequest();
	}, [font_size, sshTerm, display, ws, width, height]);

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

	return (
		<SSHTerminal>
			<SSHTerminal ref={terminalRef} />
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
};

export default SSHT;
