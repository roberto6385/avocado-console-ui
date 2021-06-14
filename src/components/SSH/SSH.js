import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
import {IconButton, LIGHT_MODE_SIDE_COLOR} from '../../styles/global';
import {useDebouncedResizeObserver} from '../../hooks/useDebouncedResizeObserver';
import {
	arrowDropDownIconMidium,
	arrowDropUpIconMidium,
	closeIconMedium,
	searchIcon,
} from '../../icons/icons';
import {useTranslation} from 'react-i18next';
import {FONT_14, HEIGHT_42, WIDTH_400} from '../../styles/length';
import {fontColor, terminalColor} from '../../styles/color';

const _Container = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
	padding: 20px;
	background-color: ${(props) => props.back};
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
	width: ${WIDTH_400};
	display: none;
	align-items: center;
	border-radius: 4px;
	padding: 12px;
	height: ${HEIGHT_42};
	background: ${LIGHT_MODE_SIDE_COLOR};
	// xterm.js 의 canvas가 z-index:3을 갖고 있어서 5를 넣어줌.
	z-index: 5;
`;

const _Input = styled.input`
	flex: 1;
	margin: 0px 5px;
	font-size: ${FONT_14};
	border: none;
`;

const _ListGroup = styled(ListGroup)`
	position: absolute;
	left: ${(props) => props.left};
	top: ${(props) => props.top};
	bottom: ${(props) => props.bottom};
	display: ${(props) => props.display};
	width: 140px;
	border-radius: 4px;
	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.19);
	background-color: #ffffff;
	position: absolute;
	zindex: 5;
`;

const _ListGroupItem = styled(ListGroup.Item)`
	padding: 6px 5.8px;
	font-size: 14px;
	overflow: auto;
`;

const _FooterListGroupItem = styled(_ListGroupItem)`
	font-size: 10px;
`;

const SSH = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('SSH');
	const {current_tab, theme} = useSelector((state) => state.common);
	const {
		font,
		font_size,
		search_mode,
		ssh,
		ssh_history,
		auto_completion_mode,
	} = useSelector((state) => state.ssh);
	const currentLine = useMemo(
		() => ssh.find((v) => v.uuid === uuid).current_line,
		[ssh, uuid],
	);
	const [search, onChangeSearch, setSearch] = useInput('');
	const [currentHistory, setCurrentHistory] = useState(0);
	const historyList = useMemo(
		() => ssh_history.filter((v) => v.startsWith(currentLine)).slice(-5),
		[ssh_history, currentLine],
	);
	const [ignoreAutoCompletion, setIgnoreAutoCompletion] = useState(false);
	const sshTerm = useMemo(() => ssh.find((v) => v.uuid === uuid).terminal, [
		ssh,
		uuid,
	]);
	const {current: ws} = useRef(ssh.find((v) => v.uuid === uuid).ws);
	const {current: fitAddon} = useRef(new FitAddon());
	const {current: searchAddon} = useRef(new SearchAddon());
	const searchRef = useRef(null);
	const listRef = useRef(null);
	const {ref: ref, width: width, height: height} = useDebouncedResizeObserver(
		500,
	);
	const [isComponentMounted, setIsComponentMounted] = useState(true);

	const onSubmitSearch = useCallback(
		(e) => {
			e.preventDefault();
			searchAddon.findPrevious(search);
		},
		[search],
	);

	const onClickCommand = useCallback(
		(v) => () => {
			dispatch({
				type: SSH_SEND_COMMAND_REQUEST,
				data: {
					uuid: uuid,
					ws: ws,
					input: v.substring(currentLine.length),
				},
			});
			dispatch({
				type: SSH_SEND_COMMAND_REQUEST,
				data: {
					uuid: uuid,
					ws: ws,
					input: '\r',
				},
			});
		},
		[currentLine, uuid, ws],
	);

	const onClickOpenSearchBar = useCallback(() => {
		if (current_tab !== null) dispatch({type: SET_SEARCH_MODE});
	}, [current_tab]);

	const onClickArrowUp = useCallback(() => {
		searchAddon.findPrevious(search);
	}, [search]);

	const onClickArrowDown = useCallback(() => {
		searchAddon.findNext(search);
	}, [search]);
	//terminal setting
	useEffect(() => {
		while (document.getElementById('terminal_' + uuid).hasChildNodes()) {
			document
				.getElementById('terminal_' + uuid)
				.removeChild(
					document.getElementById('terminal_' + uuid).firstChild,
				);
		}
		sshTerm.loadAddon(fitAddon);
		sshTerm.loadAddon(searchAddon);
		sshTerm.open(document.getElementById('terminal_' + uuid));

		sshTerm.setOption('theme', {
			background: terminalColor[theme],
			foreground: fontColor[theme],
		});
		sshTerm.setOption('fontSize', font_size);
		sshTerm.setOption('fontFamily', font);

		fitAddon.fit();

		return () => {
			setIsComponentMounted(false);
		};
	}, [sshTerm, uuid, theme, font_size, font]);

	useEffect(() => {
		const processInput = sshTerm.onData((data) => {
			if (
				auto_completion_mode &&
				currentLine.length > 1 &&
				data.charCodeAt(0) === 27
			) {
				if (data.substr(1) === '[A') {
					//Up
					if (currentHistory === 0)
						setCurrentHistory(historyList.length - 1);
					else setCurrentHistory(currentHistory - 1);
				} else if (data.substr(1) === '[B') {
					//Down
					if (currentHistory === historyList.length - 1)
						setCurrentHistory(0);
					else setCurrentHistory(currentHistory + 1);
				} else {
					setIgnoreAutoCompletion(true);
				}
			} else if (
				currentLine.length > 1 &&
				auto_completion_mode &&
				!ignoreAutoCompletion &&
				historyList.length > 0 &&
				data.charCodeAt(0) === 13
			) {
				//Enter
				dispatch({
					type: SSH_SEND_COMMAND_REQUEST,
					data: {
						uuid: uuid,
						ws: ws,
						input: historyList[currentHistory].substring(
							currentLine.length,
						),
					},
				});
				dispatch({
					type: SSH_SEND_COMMAND_REQUEST,
					data: {
						uuid: uuid,
						ws: ws,
						input: '\r',
					},
				});
				if (ignoreAutoCompletion) setIgnoreAutoCompletion(false);
			} else {
				dispatch({
					type: SSH_SEND_COMMAND_REQUEST,
					data: {
						uuid: uuid,
						ws: ws,
						input: data,
					},
				});
			}
		});

		return () => {
			processInput.dispose();
		};
	}, [
		uuid,
		ws,
		sshTerm,
		auto_completion_mode,
		currentHistory,
		historyList,
		ignoreAutoCompletion,
		currentLine,
	]);
	//current tab terminal is focused
	useEffect(() => {
		if (current_tab === uuid) sshTerm.focus();
	}, [current_tab, uuid, sshTerm]);
	//change font
	useEffect(() => {
		sshTerm.setOption('fontFamily', font);
		fitAddon.fit();
	}, [sshTerm, font]);
	//change font size
	useEffect(() => {
		sshTerm.setOption('fontSize', font_size);
		fitAddon.fit();
	}, [sshTerm, font_size]);
	//window size change
	useEffect(() => {
		if (width > 0 && height > 0 && uuid && isComponentMounted) {
			fitAddon.fit();
			dispatch({
				type: SSH_SEND_WINDOW_CHANGE_REQUEST,
				data: {
					ws: ws,
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
	}, [ws, uuid, sshTerm, width, height, isComponentMounted]);
	//click search button
	useEffect(() => {
		if (current_tab === uuid && search_mode) {
			document.getElementById('search_' + uuid).style.display = 'flex';
			searchRef.current.focus();
		} else {
			document.getElementById('search_' + uuid).style.display = 'none';
			setSearch('');
			searchAddon.findPrevious('');
		}
	}, [current_tab, uuid, search_mode, searchRef]);
	//search a word on the terminal
	useEffect(() => {
		if (current_tab === uuid && search !== '') {
			searchAddon.findPrevious('');
			searchAddon.findPrevious(search);
		}
	}, [current_tab, uuid, search]);
	//set History List
	useEffect(() => {
		if (auto_completion_mode && currentLine.length > 1) {
			setCurrentHistory(0);
		}
	}, [auto_completion_mode, ssh_history, currentLine, ignoreAutoCompletion]);
	//change terminal theme
	useEffect(() => {
		sshTerm.setOption('theme', {
			background: terminalColor[theme],
			foreground: fontColor[theme],
		});
	}, [sshTerm, theme]);

	return (
		<_Container ref={ref} back={terminalColor[theme]}>
			<_Terminal id={`terminal_${uuid}`} />
			{currentLine.length > 0 &&
				auto_completion_mode &&
				!ignoreAutoCompletion &&
				historyList.length > 0 && (
					<_ListGroup
						ref={listRef}
						left={
							width -
								Number(
									sshTerm._core.textarea.style.left.substring(
										0,
										sshTerm._core.textarea.style.left
											.length - 2,
									),
								) -
								140 >
							0
								? String(
										Number(
											sshTerm._core.textarea.style.left.substring(
												0,
												sshTerm._core.textarea.style
													.left.length - 2,
											),
										) + 30,
								  ) + 'px'
								: String(
										Number(
											sshTerm._core.textarea.style.left.substring(
												0,
												sshTerm._core.textarea.style
													.left.length - 2,
											),
										) - 150,
								  ) + 'px'
						}
						top={
							height -
								Number(
									sshTerm._core.textarea.style.top.substring(
										0,
										sshTerm._core.textarea.style.top
											.length - 2,
									),
								) -
								listRef.current?.clientHeight -
								100 >
							0
								? String(
										Number(
											sshTerm._core.textarea.style.top.substring(
												0,
												sshTerm._core.textarea.style.top
													.length - 2,
											),
										) + 100,
								  ) + 'px'
								: 'undefine'
						}
						bottom={
							height -
								Number(
									sshTerm._core.textarea.style.top.substring(
										0,
										sshTerm._core.textarea.style.top
											.length - 2,
									),
								) -
								listRef.current?.clientHeight -
								100 <=
							0
								? String(
										height -
											Number(
												sshTerm._core.textarea.style.top.substring(
													0,
													sshTerm._core.textarea.style
														.top.length - 2,
												),
											) +
											30,
								  ) + 'px'
								: 'undefine'
						}
						display={currentLine.length > 1 ? 'block' : 'none'}
					>
						{historyList.map((v, i) =>
							i === currentHistory ? (
								<_ListGroupItem
									style={{
										backgroundColor: 'rgba(0, 0, 0, 0.04)',
									}}
									onClick={onClickCommand(v)}
									key={i}
								>
									{v}
								</_ListGroupItem>
							) : (
								<_ListGroupItem
									onClick={onClickCommand(v)}
									key={i}
								>
									{v}
								</_ListGroupItem>
							),
						)}
						<_FooterListGroupItem>
							{t('autoCompletionFooter')}
						</_FooterListGroupItem>
					</_ListGroup>
				)}
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
