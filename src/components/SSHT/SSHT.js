import React, {useCallback, useEffect, useRef} from 'react';
import {FitAddon} from 'xterm-addon-fit';
import {SearchAddon} from 'xterm-addon-search';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ListGroup} from 'react-bootstrap';

import useInput from '../../hooks/useInput';
import {SSHTerminal, TerminalSearchForm} from '../../styles/ssht';
import {useCookies} from 'react-cookie';
import {
	SSHT_SEND_COMMAND_REQUEST,
	SSHT_SEND_WINDOW_CHANGE_REQUEST,
} from '../../reducers/ssht';

const SSHT = ({uuid, height, width}) => {
	const dispatch = useDispatch();
	const {current_tab} = useSelector((state) => state.common);
	const {font, font_size, search_mode, ssht} = useSelector(
		(state) => state.ssht,
	);
	const [search, onChangeSearch, setSearch] = useInput('');
	const sshTerm = useRef(ssht.find((v) => v.uuid === uuid).terminal);
	const ws = useRef(ssht.find((v) => v.uuid === uuid).ws);
	const fitAddon = useRef(new FitAddon());
	const searchAddon = useRef(new SearchAddon());
	const terminalRef = useRef(null);
	// const [cookies, setCookie, removeCookie] = useCookies(['search_cokkies']);
	// const [prompt, setPrompt] = useState('');

	const onSubmitSearch = useCallback(
		(e) => {
			if (e.key === 'Enter') searchAddon.current.findPrevious(search);
		},
		[search],
	);

	const resizeRequest = useCallback(() => {
		if (width > 0 && height > 0) {
			fitAddon.current.fit();

			dispatch({
				type: SSHT_SEND_WINDOW_CHANGE_REQUEST,
				data: {
					ws: ws.current,
					uuid: uuid,
					data: {
						cols: sshTerm.current.cols,
						rows: sshTerm.current.rows,
						width: width,
						height: height,
					},
				},
			});
		}
	}, [sshTerm, width, height, uuid, ws]);

	// const onClickCommand = useCallback(
	// 	(v) => () => {
	// 		console.log(v);
	// 		sshTerm.write(v.substring(prompt.length));
	// 	},
	// 	[prompt, sshTerm],
	// );

	//terminal setting
	useEffect(() => {
		sshTerm.current.loadAddon(fitAddon.current);
		sshTerm.current.loadAddon(searchAddon.current);
		sshTerm.current.open(terminalRef.current);
		fitAddon.current.fit();
		// setCookie('search_cokkies', []);
	}, [sshTerm, terminalRef, fitAddon, searchAddon]);

	useEffect(() => {
		sshTerm.current.onData((data) => {
			dispatch({
				type: SSHT_SEND_COMMAND_REQUEST,
				data: {
					uuid: uuid,
					ws: ws.current,
					input: data,
				},
			});
		});
	}, [uuid, ws, sshTerm]);
	//current tab terminal is focused
	useEffect(() => {
		if (current_tab === uuid) sshTerm.current.focus();
	}, [current_tab, uuid, sshTerm]);
	//change font
	useEffect(() => {
		sshTerm.current.setOption('fontFamily', font);
		resizeRequest();
	}, [font, sshTerm, ssht, width, height]);
	//change font size
	useEffect(() => {
		sshTerm.current.setOption('fontSize', font_size);
		resizeRequest();
	}, [font_size, sshTerm, ssht, width, height]);
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
				{/*{cookies['search_cokkies']*/}
				{/*	.filter((v) => v.indexOf(prompt) === 0 && prompt !== '')*/}
				{/*	.map((v) => (*/}
				{/*		<ListGroup.Item onClick={onClickCommand(v)} key={v}>*/}
				{/*			{v}*/}
				{/*		</ListGroup.Item>*/}
				{/*	))}*/}
			</ListGroup>
			<TerminalSearchForm
				id={`search_${uuid}`}
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
	uuid: PropTypes.string.isRequired,
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
};

export default SSHT;
