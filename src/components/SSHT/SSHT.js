import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FitAddon} from 'xterm-addon-fit';
import {SearchAddon} from 'xterm-addon-search';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ListGroup} from 'react-bootstrap';

import {useCookies} from 'react-cookie';
import {debounce, throttle} from 'lodash';

import useResizeObserver from 'use-resize-observer';

import useInput from '../../hooks/useInput';
import {
	SSHT_SEND_COMMAND_REQUEST,
	SSHT_SEND_WINDOW_CHANGE_REQUEST,
} from '../../reducers/ssht';

import {SSHTerminal} from '../../styles/divs';
import {BaseInput, TerminalSearchForm} from '../../styles/forms';
import styled from 'styled-components';

const SSHT_Container = styled.div``;

const SSHT = ({uuid}) => {
	const dispatch = useDispatch();
	const {current_tab} = useSelector((state) => state.common);
	const {font, font_size, search_mode, ssht} = useSelector(
		(state) => state.ssht,
	);
	const [search, onChangeSearch, setSearch] = useInput('');
	const sshTerm = ssht.find((v) => v.uuid === uuid).terminal;
	const ws = useRef(ssht.find((v) => v.uuid === uuid).ws);
	const fitAddon = useRef(new FitAddon());
	const searchAddon = useRef(new SearchAddon());
	const terminalRef = useRef(null);
	// const [cookies, setCookie, removeCookie] = useCookies(['search_cokkies']);
	// const [prompt, setPrompt] = useState('');
	const [currentLine, setCurrentLine] = useState('');
	const {ref, width, height} = useResizeObserver();

	const onSubmitSearch = useCallback(
		(e) => {
			e.preventDefault();
			searchAddon.current.findPrevious(search);
		},
		[search],
	);

	// const onClickCommand = useCallback(
	// 	(v) => () => {
	// 		console.log(v);
	// 		sshTerm.write(v.substring(prompt.length));
	// 	},
	// 	[prompt, sshTerm],
	// );

	//terminal setting
	useEffect(() => {
		console.log(sshTerm);
		sshTerm.loadAddon(fitAddon.current);
		sshTerm.loadAddon(searchAddon.current);
		// sshTerm.open(document.getElementById('terminal_' + uuid));
		sshTerm.open(terminalRef.current);
		// setCookie('search_cokkies', []);
		return () => {};
	}, [terminalRef]);

	useEffect(() => {
		const processInput = sshTerm.onData((data) => {
			// setCurrentLine(currentLine + data);
			dispatch({
				type: SSHT_SEND_COMMAND_REQUEST,
				data: {
					uuid: uuid,
					ws: ws.current,
					input: data,
				},
			});
		});

		return () => {
			// console.log(currentLine);
			processInput.dispose();
		};
	}, [uuid, ws, sshTerm, currentLine]);
	//current tab terminal is focused
	useEffect(() => {
		if (current_tab === uuid) sshTerm.focus();
	}, [current_tab, uuid, sshTerm]);
	//change font
	useEffect(() => {
		sshTerm.setOption('fontFamily', font);
	}, [font]);
	//change font size
	useEffect(() => {
		sshTerm.setOption('fontSize', font_size);
	}, [font_size]);

	useEffect(() => {
		const windowChangeDebounce = debounce(() => {
			fitAddon.current.fit();
			dispatch({
				type: SSHT_SEND_WINDOW_CHANGE_REQUEST,
				data: {
					ws: ws.current,
					uuid: uuid,
					data: {
						cols: sshTerm.cols,
						rows: sshTerm.rows,
						width: width,
						height: height,
					},
				},
			});
		}, 500);

		windowChangeDebounce();
		return windowChangeDebounce.cancel;
	}, [uuid, sshTerm, width, height]);

	//click search button
	useEffect(() => {
		if (current_tab === uuid && search_mode) {
			document.getElementById('search_' + uuid).style.display = 'block';
		} else {
			document.getElementById('search_' + uuid).style.display = 'none';
			setSearch('');
			searchAddon.current.findPrevious('');
		}
	}, [current_tab, uuid, search_mode]);
	//search a word on the terminal
	useEffect(() => {
		if (current_tab === uuid && search !== '') {
			searchAddon.current.findPrevious('');
			searchAddon.current.findPrevious(search);
		}
	}, [current_tab, uuid, search]);

	return (
		<SSHT_Container ref={ref}>
			<SSHTerminal id={`terminal_${uuid}`} ref={terminalRef} />
			<ListGroup
				style={{
					position: 'absolute',
					right: '0',
					bottom: '0',
				}}
			>
				{/*{cookies['search_cokkies']*/}
				{/*	.filter((v) => v.indexOf(prompt) === 0 && prompt !== '')*/}
				{/*	.map((v) => (*/}
				{/*		<ListGroup.Item onClick={onClickCommand(v)} key={v}>*/}
				{/*			{v}*/}
				{/*		</ListGroup.Item>*/}
				{/*	))}*/}
			</ListGroup>
			<TerminalSearchForm onSubmit={onSubmitSearch} id={`search_${uuid}`}>
				<BaseInput
					flex={1}
					onChange={onChangeSearch}
					value={search}
					placeholder='Search...'
					type='text'
				/>
			</TerminalSearchForm>
		</SSHT_Container>
	);
};

SSHT.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SSHT;
