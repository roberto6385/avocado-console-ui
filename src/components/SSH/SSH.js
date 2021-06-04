import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FitAddon} from 'xterm-addon-fit';
import {SearchAddon} from 'xterm-addon-search';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ListGroup} from 'react-bootstrap';
import styled from 'styled-components';

import useInput from '../../hooks/useInput';
import {
	SSH_SEND_WINDOW_CHANGE_REQUEST,
	SSH_SEND_COMMAND_REQUEST,
	SET_SEARCH_MODE,
} from '../../reducers/ssh';
import {
	AVOCADO_FONTSIZE,
	IconButton,
	LIGHT_MODE_SIDE_COLOR,
	TERMINAL_SEARCH_FORM_HEIGHT,
	TERMINAL_SEARCH_FORM_WIDTH,
} from '../../styles/global';
import {useDebouncedResizeObserver} from '../../hooks/useDebouncedResizeObserver';
import {
	arrowDropDownIconMidium,
	arrowDropUpIconMidium,
	closeIconMedium,
	searchIcon,
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
	const {current_tab} = useSelector((state) => state.common);
	const {
		font,
		font_size,
		search_mode,
		ssht,
		ssh_history,
		auto_complete_mode,
		current_line,
	} = useSelector((state) => state.ssht);
	const [search, onChangeSearch, setSearch] = useInput('');
	const [currentHistory, setCurrentHistory] = useState(0);
	const [historyList, setHistoryList] = useState(
		ssh_history.filter((v) => v.startsWith(current_line)),
	);
	const sshTerm = ssht.find((v) => v.uuid === uuid).terminal;
	const ws = useRef(ssht.find((v) => v.uuid === uuid).ws);
	const fitAddon = useRef(new FitAddon());
	const searchAddon = useRef(new SearchAddon());
	const searchRef = useRef();
	const {ref: ref, width: width, height: height} = useDebouncedResizeObserver(
		500,
	);

	const onSubmitSearch = useCallback(
		(e) => {
			e.preventDefault();
			searchAddon.current.findPrevious(search);
		},
		[search],
	);

	const onClickCommand = useCallback(
		(v) => () => {
			dispatch({
				type: SSH_SEND_COMMAND_REQUEST,
				data: {
					uuid: uuid,
					ws: ws.current,
					input: v.substring(current_line.length),
				},
			});
		},
		[sshTerm, current_line, uuid, ws],
	);

	const onClickOpenSearchBar = useCallback(() => {
		if (current_tab !== null) dispatch({type: SET_SEARCH_MODE});
	}, [current_tab, dispatch]);

	const onClickArrowUp = useCallback(() => {
		searchAddon.current.findPrevious(search);
	}, [searchAddon, search]);

	const onClickArrowDown = useCallback(() => {
		searchAddon.current.findNext(search);
	}, [searchAddon, search]);
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
		fitAddon.current.fit();
		return () => {};
	}, [uuid]);

	useEffect(() => {
		const processInput = sshTerm.onData((data) => {
			if (auto_complete_mode && data.charCodeAt(0) === 27) {
				if (data.substr(1) === '[A') {
					console.log('UP');
					if (currentHistory === 0)
						setCurrentHistory(historyList.length - 1);
					else setCurrentHistory(currentHistory - 1);
				} else if (data.substr(1) === '[B') {
					if (currentHistory === historyList.length - 1)
						setCurrentHistory(0);
					else setCurrentHistory(currentHistory + 1);
				}
				console.log(currentHistory);
			} else {
				dispatch({
					type: SSH_SEND_COMMAND_REQUEST,
					data: {
						uuid: uuid,
						ws: ws.current,
						input: data,
					},
				});
			}
		});
		return () => {
			processInput.dispose();
		};
	}, [uuid, ws, sshTerm, auto_complete_mode]);
	//current tab terminal is focused
	useEffect(() => {
		if (current_tab === uuid) sshTerm.focus();
	}, [current_tab, uuid, sshTerm]);
	//change font
	useEffect(() => {
		sshTerm.setOption('fontFamily', font);
		fitAddon.current.fit();
	}, [font]);
	//change font size
	useEffect(() => {
		sshTerm.setOption('fontSize', font_size);
		fitAddon.current.fit();
	}, [font_size]);
	//window size change
	useEffect(() => {
		if (width > 0 && height > 0 && uuid) {
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
	//click search button
	useEffect(() => {
		if (current_tab === uuid && search_mode) {
			document.getElementById('search_' + uuid).style.display = 'flex';
			searchRef.current.focus();
		} else {
			document.getElementById('search_' + uuid).style.display = 'none';
			setSearch('');
			searchAddon.current.findPrevious('');
		}
	}, [current_tab, uuid, search_mode, searchRef]);
	//search a word on the terminal
	useEffect(() => {
		if (current_tab === uuid && search !== '') {
			searchAddon.current.findPrevious('');
			searchAddon.current.findPrevious(search);
		}
	}, [current_tab, uuid, search]);
	//set History List
	useEffect(() => {
		if (auto_complete_mode && current_line !== '') {
			setHistoryList(
				ssh_history.filter((v) => v.startsWith(current_line)),
			);
			setCurrentHistory(0);
		}
	}, [auto_complete_mode, ssh_history, current_line]);

	return (
		<_Container ref={ref}>
			<_Terminal id={`terminal_${uuid}`} />
			<ListGroup
				style={{
					position: 'absolute',
					right: '0',
					bottom: '0',
					zIndex: '5',
				}}
			>
				{current_line !== '' &&
					auto_complete_mode &&
					historyList.map((v, i) =>
						i === currentHistory ? (
							<ListGroup.Item
								style={{backgroundColor: 'red'}}
								onClick={onClickCommand(v)}
								key={i}
							>
								{v}
							</ListGroup.Item>
						) : (
							<ListGroup.Item onClick={onClickCommand(v)} key={i}>
								{v}
							</ListGroup.Item>
						),
					)}
			</ListGroup>

			<_Form onSubmit={onSubmitSearch} id={`search_${uuid}`}>
				{searchIcon}
				<_Input
					onChange={onChangeSearch}
					value={search}
					placeholder='Search...'
					type='text'
					ref={searchRef}
				/>
				<IconButton
					type='button'
					color='#757575'
					onClick={onClickArrowUp}
				>
					{arrowDropUpIconMidium}
				</IconButton>
				<IconButton
					type='button'
					color='#757575'
					onClick={onClickArrowDown}
				>
					{arrowDropDownIconMidium}
				</IconButton>
				<IconButton
					type='button'
					color='#757575'
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
