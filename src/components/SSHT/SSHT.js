import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FitAddon} from 'xterm-addon-fit';
import {SearchAddon} from 'xterm-addon-search';
import * as PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {ListGroup} from 'react-bootstrap';

import useInput from '../../hooks/useInput';
import {SSHTerminal, TerminalSearchForm} from '../../styles/ssht';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {useCookies} from 'react-cookie';

const SSHT = ({index, height, width}) => {
	const {current_tab, tab} = useSelector((state) => state.common);
	const {font, font_size, search_mode} = useSelector((state) => state.ssht);
	const [search, onChangeSearch, setSearch] = useInput('');
	const sshTerm = tab.find((v) => v.id === index).terminal;
	const ws = tab.find((v) => v.id === index).socket.ws;
	const fitAddon = useRef(new FitAddon());
	const searchAddon = useRef(new SearchAddon());
	const terminalRef = useRef(null);
	const [cookies, setCookie, removeCookie] = useCookies(['search_cokkies']);
	const [prompt, setPrompt] = useState('');

	const onSubmitSearch = useCallback(
		(e) => {
			if (e.key === 'Enter') searchAddon.current.findPrevious(search);
		},
		[search],
	);

	const resizeRequest = useCallback(() => {
		if (width > 0 && height > 0) {
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
	}, [ws, sshTerm, width, height]);

	const onClickCommand = useCallback(
		(v) => () => {
			console.log(v);
			sshTerm.write(v.substring(prompt.length));
		},
		[prompt, sshTerm],
	);
	//websocket setting
	useEffect(() => {
		ws.onerror = () => {
			console.log('Terminal Error');
		};

		ws.onmessage = (evt) => {
			const message = GetMessage(evt);
			if (message.type === 'COMMAND') {
				sshTerm.write(message.result);
				// console.log(message.result);
				// console.log(sshTerm.buffer);
				// console.log(sshTerm._bufferService.buffer.x);
				// console.log(sshTerm._bufferService.buffer.y);
				if (message.result.length === 1) {
					setPrompt(prompt + message.result);
				} else if (
					message.result.charCodeAt(0) === 8 &&
					message.result.length === 4
				) {
					setPrompt(prompt.slice(0, -1));
				} else {
					if (
						prompt !== '' &&
						message.result.slice(0, 2) === '\r\n'
					) {
						if (!cookies['search_cokkies'].includes(prompt))
							setCookie('search_cokkies', [
								...cookies['search_cokkies'],
								prompt,
							]);
						setPrompt('');
						console.log('cookies:', cookies['search_cokkies']);
					}
				}
			} else console.log('V SSHT onmessage: ', message);
		};
	}, [index, ws, sshTerm, prompt, cookies]);
	//terminal setting
	useEffect(() => {
		sshTerm.loadAddon(fitAddon.current);
		sshTerm.loadAddon(searchAddon.current);
		sshTerm.open(terminalRef.current);
		fitAddon.current.fit();
		setCookie('search_cokkies', []);

		sshTerm.onData(function (data) {
			ssht_ws_request({
				keyword: 'SendCommand',
				ws: ws,
				data: data,
			});
		});
	}, [index, ws, sshTerm]);
	//current tab terminal is focused
	useEffect(() => {
		if (current_tab === index) sshTerm.focus();
	}, [current_tab, index, sshTerm]);
	//change font
	useEffect(() => {
		sshTerm.setOption('fontFamily', font);
		resizeRequest();
	}, [font, sshTerm, ws, width, height]);
	//change font size
	useEffect(() => {
		sshTerm.setOption('fontSize', font_size);
		resizeRequest();
	}, [font_size, sshTerm, ws, width, height]);
	//click search button
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
	//search a word on the terminal
	useEffect(() => {
		if (current_tab === index && search !== '') {
			searchAddon.current.findPrevious('');
			searchAddon.current.findPrevious(search);
		}
	}, [current_tab, index, search]);

	return (
		<SSHTerminal>
			<SSHTerminal ref={terminalRef} />
			<ListGroup
				style={{
					position: 'absolute',
					right: '0',
					bottom: '0',
					zIndex: '999',
				}}
			>
				{cookies['search_cokkies']
					.filter((v) => v.indexOf(prompt) === 0 && prompt !== '')
					.map((v) => (
						<ListGroup.Item onClick={onClickCommand(v)} key={v}>
							{v}
						</ListGroup.Item>
					))}
			</ListGroup>
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
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
};

export default SSHT;
