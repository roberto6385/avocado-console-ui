import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FitAddon} from 'xterm-addon-fit';
import {SearchAddon} from 'xterm-addon-search';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ListGroup} from 'react-bootstrap';
import styled from 'styled-components';
import {
	IoCloseOutline,
	MdKeyboardArrowDown,
	MdKeyboardArrowUp,
	MdSearch,
} from 'react-icons/all';

import useInput from '../../hooks/useInput';
import {
	SSH_SEND_WINDOW_CHANGE_REQUEST,
	SSH_SEND_COMMAND_REQUEST,
	SET_SEARCH_MODE,
} from '../../reducers/ssh';

import {
	AVOCADO_FONTSIZE,
	IconButton,
	ICON_DARK_COLOR,
	LIGHT_MODE_SIDE_COLOR,
	TERMINAL_SEARCH_FORM_HEIGHT,
	TERMINAL_SEARCH_FORM_WIDTH,
	iconColor,
} from '../../styles/global';
import {useDebouncedResizeObserver} from '../../hooks/useDebouncedResizeObserver';
import {
	arrowDropDownIconMidium,
	arrowDropUpIconMidium,
	closeIconMedium,
} from '../../icons/icons';

const _Container = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
	padding: 20px;
	background-color: #f8f9fa;
`;

const _Terminal = styled(_Container)`
	height: 100%;
	width: 100%;
	overflow: hidden;
	padding: 0px;
`;

const _Form = styled.form`
	position: absolute;
	right: 3px;
	bottom: 31px;
	width: ${TERMINAL_SEARCH_FORM_WIDTH};
	display: none;
	align-items: center;
	border-radius: 4px;
	padding: 12px;
	height: ${TERMINAL_SEARCH_FORM_HEIGHT};
	background: ${LIGHT_MODE_SIDE_COLOR};
	// xterm.js 의 canvas가 z-index:3을 갖고 있어서 5를 넣어줌.
	z-index: 5;
`;
const _Input = styled.input`
	flex: 1;
	margin: 0px 5px;
	font-size: ${AVOCADO_FONTSIZE};
	border: none;
`;

const SSH = ({uuid}) => {
	const dispatch = useDispatch();
	const {current_tab, theme} = useSelector((state) => state.common);
	const {font, font_size, search_mode, ssht} = useSelector(
		(state) => state.ssht,
	);
	const [search, onChangeSearch, setSearch] = useInput('');
	const sshTerm = ssht.find((v) => v.uuid === uuid).terminal;
	const ws = useRef(ssht.find((v) => v.uuid === uuid).ws);
	const fitAddon = useRef(new FitAddon());
	const searchAddon = useRef(new SearchAddon());
	// const [cookies, setCookie, removeCookie] = useCookies(['search_cokkies']);
	// const [prompt, setPrompt] = useState('');
	const [currentLine, setCurrentLine] = useState('');
	const {ref: ref, width: width, height: height} = useDebouncedResizeObserver(
		1000,
	);

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
		while (document.getElementById('terminal_' + uuid).hasChildNodes()) {
			document
				.getElementById('terminal_' + uuid)
				.removeChild(
					document.getElementById('terminal_' + uuid).firstChild,
				);
		}
		sshTerm.loadAddon(fitAddon.current);
		sshTerm.loadAddon(searchAddon.current);
		sshTerm.open(document.getElementById('terminal_' + uuid));

		// setCookie('search_cokkies', []);
		return () => {};
	}, [uuid]);

	useEffect(() => {
		const processInput = sshTerm.onData((data) => {
			// setCurrentLine(currentLine + data);
			dispatch({
				type: SSH_SEND_COMMAND_REQUEST,
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
	//window size change
	useEffect(() => {
		// console.log(width, height);
		if (width > 0 && height > 0) {
			fitAddon.current.fit();
			dispatch({
				type: SSH_SEND_WINDOW_CHANGE_REQUEST,
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
		}
	}, [ws, uuid, sshTerm, width, height]);

	const onClickOpenSearchBar = useCallback(() => {
		if (current_tab !== null) dispatch({type: SET_SEARCH_MODE});
	}, [current_tab, dispatch]);
	//click search button
	useEffect(() => {
		if (current_tab === uuid && search_mode) {
			document.getElementById('search_' + uuid).style.display = 'flex';
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
		<_Container ref={ref}>
			<_Terminal id={`terminal_${uuid}`} />
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
			<_Form onSubmit={onSubmitSearch} id={`search_${uuid}`}>
				<MdSearch />
				<_Input
					onChange={onChangeSearch}
					value={search}
					placeholder='Search...'
					type='text'
				/>
				<IconButton color={iconColor[theme]}>
					{arrowDropUpIconMidium}
				</IconButton>
				<IconButton color={iconColor[theme]}>
					{arrowDropDownIconMidium}
				</IconButton>
				<IconButton
					color={iconColor[theme]}
					onClick={onClickOpenSearchBar}
				>
					{closeIconMedium}
				</IconButton>
			</_Form>
		</_Container>
	);
};

SSH.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SSH;
