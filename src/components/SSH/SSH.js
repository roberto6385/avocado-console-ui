import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FitAddon} from 'xterm-addon-fit';
import {SearchAddon} from 'xterm-addon-search';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {ListGroup} from 'react-bootstrap';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import {
	SSH_SEND_WINDOW_CHANGE_REQUEST,
	SSH_SEND_COMMAND_REQUEST,
	SSH_SET_SEARCH_MODE,
} from '../../reducers/ssh';

import {useDebouncedResizeObserver} from '../../hooks/useDebouncedResizeObserver';
import {
	arrowDropDownIcon,
	arrowDropUpIcon,
	closeIcon,
	searchIcon,
} from '../../icons/icons';
import {
	borderColor,
	contextHover,
	fontColor,
	sshSearch,
	terminalColor,
	terminalFontColor,
	terminalSelectionColor,
} from '../../styles/color';
import {ClickableIconButton, IconBox} from "../../styles/icon";

const _Container = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
	padding: 20px;
	background-color: ${(props) => terminalColor[props.theme_value]};
`;

const _Terminal = styled(_Container)`
	overflow: scroll;
	padding: 0px;
`;

const _SearchInput = styled.input`
	flex: 1;
	margin-right: 5px;
	background-color: transparent;
	border: none;
	color: ${(props) => fontColor[props.theme_value]};
`;

const _SearchContainer = styled.div`
	width: 400px;
	height: 42px;
	align-items: center;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.24);
	background-color: ${(props) => sshSearch[props.theme_value]};
	border-radius: 4px;
	padding-left: 13px;
	position: absolute;
	right: 10px;
	bottom: 10px;
	display: none;
	z-index: 5;
`;

const _ListGroup = styled(ListGroup)`
	position: absolute;
	left: ${(props) => props.left};
	top: ${(props) => props.top};
	bottom: ${(props) => props.bottom};
	display: ${(props) => props.display};
	width: 130px;
	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.19);
	zindex: 5;
	padding: 8px 0;
	background-color: ${(props) => sshSearch[props.theme_value]};
`;

const _ListGroupItem = styled(ListGroup.Item)`
	padding: 6px 5.8px;
	overflow: auto;
	background-color: ${(props) =>
		props.clicked
			? contextHover[props.theme_value]
			: sshSearch[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
	border: none;
`;

const _AutoCompletionListFooter = styled(_ListGroupItem)`
	font-size: 10px;
	border-top: 1px solid ${(props) => borderColor[props.theme_value]};
`;

const SSH = ({uuid, isToolbarUnfold}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('SSH');

	const {current_tab, theme} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {
		font,
		font_size,
		search_mode,
		ssh,
		ssh_history,
		auto_completion_mode,
	} = useSelector((state) => state.ssh, shallowEqual);

	const currentCommand = useMemo(
		() => ssh.find((v) => v.uuid === uuid).current_line,
		[ssh, uuid],
	);
	const [search, onChangeSearch, setSearch] = useInput('');
	const historyList = useMemo(
		() =>
			currentCommand === ''
				? []
				: ssh_history
						.filter((v) => v.startsWith(currentCommand))
						.slice(-5)
						.reverse(),
		[ssh_history, currentCommand],
	);
	const [clickedHistory, setClickedHistory] = useState(0);
	const [ignoreAutoCompletionMode, setIgnoreAutoCompletionMode] =
		useState(false);
	const sshTerm = useMemo(
		() => ssh.find((v) => v.uuid === uuid).terminal,
		[ssh, uuid],
	);
	const {current: ws} = useRef(ssh.find((v) => v.uuid === uuid).ws);
	const {current: fitAddon} = useRef(new FitAddon());
	const {current: searchAddon} = useRef(new SearchAddon());
	//do not work with {current}
	const searchRef = useRef(null);
	const {
		ref: sshContainerRef,
		width: width,
		height: height,
	} = useDebouncedResizeObserver(3000);
	const [isComponentMounted, setIsComponentMounted] = useState(true);

	const onKeyPressSearchEnter = useCallback(
		(e) => {
			if (e.key === 'Enter') searchAddon.findPrevious(search);
		},
		[search, searchAddon],
	);

	const onClickCommandHistory = useCallback(
		(v) => () => {
			dispatch({
				type: SSH_SEND_COMMAND_REQUEST,
				data: {
					uuid: uuid,
					ws: ws,
					input: v.substring(currentCommand.length),
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
		[currentCommand.length, dispatch, uuid, ws],
	);

	const onClickOpenSearchBar = useCallback(() => {
		if (current_tab !== null) dispatch({type: SSH_SET_SEARCH_MODE});
	}, [current_tab]);

	const onClickArrowUp = useCallback(() => {
		searchAddon.findPrevious(search);
	}, [search, searchAddon]);

	const onClickArrowDown = useCallback(() => {
		searchAddon.findNext(search);
	}, [search, searchAddon]);
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

		return () => {
			setIsComponentMounted(false);
		};
	}, [fitAddon, searchAddon, sshTerm, uuid]);
	//terminal get input data
	useEffect(() => {
		const processInput = sshTerm.onData((data) => {
			if (
				auto_completion_mode &&
				currentCommand.length > 1 &&
				data.charCodeAt(0) === 27
			) {
				if (data.substr(1) === '[A') {
					//Up
					if (clickedHistory === 0)
						setClickedHistory(historyList.length - 1);
					else setClickedHistory(clickedHistory - 1);
				} else if (data.substr(1) === '[B') {
					//Down
					if (clickedHistory === historyList.length - 1)
						setClickedHistory(0);
					else setClickedHistory(clickedHistory + 1);
				} else {
					setIgnoreAutoCompletionMode(true);
				}
			} else if (
				currentCommand.length > 1 &&
				auto_completion_mode &&
				!ignoreAutoCompletionMode &&
				historyList.length > 0 &&
				data.charCodeAt(0) === 13
			) {
				//Enter
				dispatch({
					type: SSH_SEND_COMMAND_REQUEST,
					data: {
						uuid: uuid,
						ws: ws,
						input: historyList[clickedHistory].substring(
							currentCommand.length,
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
			} else {
				dispatch({
					type: SSH_SEND_COMMAND_REQUEST,
					data: {
						uuid: uuid,
						ws: ws,
						input: data,
					},
				});
				if (data.charCodeAt(0) === 13 && ignoreAutoCompletionMode)
					setIgnoreAutoCompletionMode(false);
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
		clickedHistory,
		historyList,
		ignoreAutoCompletionMode,
		currentCommand,
		dispatch,
	]);
	//current tab terminal is focused
	useEffect(() => {
		if (current_tab === uuid) sshTerm.focus();
	}, [current_tab, uuid, sshTerm]);
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
	}, [ws, uuid, sshTerm, width, height, isComponentMounted, fitAddon]);
	//click search button
	useEffect(() => {
		if (current_tab === uuid && search_mode) {
			document.getElementById('ssh_search_' + uuid).style.display =
				'flex';
			searchRef.current.focus();
		} else {
			document.getElementById('ssh_search_' + uuid).style.display =
				'none';
			setSearch('');
			searchAddon.findPrevious('');
		}
	}, [current_tab, uuid, search_mode, searchRef, setSearch, searchAddon]);
	//search a word on the terminal
	useEffect(() => {
		if (current_tab === uuid) {
			searchAddon.findPrevious('');
			searchAddon.findPrevious(search);
		}
	}, [current_tab, uuid, search, searchAddon]);
	//set History List
	useEffect(() => {
		if (auto_completion_mode && currentCommand.length > 1) {
			setClickedHistory(0);
		}
	}, [
		auto_completion_mode,
		ssh_history,
		currentCommand,
		ignoreAutoCompletionMode,
	]);
	//change font
	useEffect(() => {
		sshTerm.setOption('fontFamily', font);
		fitAddon.fit();
	}, [sshTerm, fitAddon, font]);

	//change font size
	useEffect(() => {
		sshTerm.setOption('fontSize', font_size);
		fitAddon.fit();
	}, [sshTerm, fitAddon, font_size]);
	//change terminal theme
	useEffect(() => {
		sshTerm.setOption('theme', {
			background: terminalColor[theme],
			foreground: terminalFontColor[theme],
			selection: terminalSelectionColor[theme],
		});
		fitAddon.fit();
	}, [sshTerm, fitAddon, theme]);

	return (
		<_Container
			id={`terminal_container_${uuid}`}
			ref={sshContainerRef}
			theme_value={theme}
			className={!isToolbarUnfold && 'close-nav-terminal'}
		>
			<_Terminal id={`terminal_${uuid}`} />
			<_ListGroup
				id={`auto_complete_list_${uuid}`}
				theme_value={theme}
				left={
					width -
						Number(
							sshTerm._core.textarea?.style.left.substring(
								0,
								sshTerm._core.textarea?.style.left.length - 2,
							),
						) -
						140 >
					0
						? String(
								Number(
									sshTerm._core.textarea?.style.left.substring(
										0,
										sshTerm._core.textarea?.style.left
											.length - 2,
									),
								) + 30,
						  ) + 'px'
						: String(
								Number(
									sshTerm._core.textarea?.style.left.substring(
										0,
										sshTerm._core.textarea?.style.left
											.length - 2,
									),
								) - 150,
						  ) + 'px'
				}
				top={
					height -
						Number(
							sshTerm._core.textarea?.style.top.substring(
								0,
								sshTerm._core.textarea?.style.top.length - 2,
							),
						) -
						document.getElementById(`auto_complete_list_${uuid}`)
							?.clientHeight >
					100
						? String(
								Number(
									sshTerm._core.textarea?.style.top.substring(
										0,
										sshTerm._core.textarea?.style.top
											.length - 2,
									),
								) + 100,
						  ) + 'px'
						: 'undefine'
				}
				bottom={
					height -
						Number(
							sshTerm._core.textarea?.style.top.substring(
								0,
								sshTerm._core.textarea?.style.top.length - 2,
							),
						) -
						document.getElementById(`auto_complete_list_${uuid}`)
							?.clientHeight <=
					100
						? String(
								height -
									Number(
										sshTerm._core.textarea?.style.top.substring(
											0,
											sshTerm._core.textarea?.style.top
												.length - 2,
										),
									) +
									30,
						  ) + 'px'
						: 'undefine'
				}
				display={
					currentCommand.length > 1 &&
					current_tab === uuid &&
					auto_completion_mode &&
					!ignoreAutoCompletionMode &&
					historyList.length > 0
						? 'flex'
						: 'none'
				}
			>
				{historyList.map((v, i) => (
					<_ListGroupItem
						clicked={i === clickedHistory ? 1 : 0}
						theme_value={theme}
						onClick={onClickCommandHistory(v)}
						key={i}
					>
						{v}
					</_ListGroupItem>
				))}
				<_AutoCompletionListFooter theme_value={theme}>
					{t('autoCompletionFooter')}
				</_AutoCompletionListFooter>
			</_ListGroup>

			<_SearchContainer theme_value={theme} id={`ssh_search_${uuid}`}>
				<IconBox
					size={'xs'}
					theme_value={theme}
					margin_right={'5px'}
					onClick={onClickArrowUp}
				>
					{searchIcon}
				</IconBox>
				<_SearchInput
					onKeyPress={onKeyPressSearchEnter}
					onChange={onChangeSearch}
					value={search}
					placeholder={t('search')}
					type='text'
					ref={searchRef}
					theme_value={theme}
				/>
				<ClickableIconButton
					size={'sm'}
					type='button'
					theme_value={theme}
					margin='8px'
					onClick={onClickArrowUp}
				>
					{arrowDropUpIcon}
				</ClickableIconButton>
				<ClickableIconButton
					size={'sm'}
					type='button'
					theme_value={theme}
					margin_right='8px'
					onClick={onClickArrowDown}
				>
					{arrowDropDownIcon}
				</ClickableIconButton>
				<ClickableIconButton
					size={'sm'}
					type='button'
					theme_value={theme}
					margin='11px'
					onClick={onClickOpenSearchBar}
				>
					{closeIcon}
				</ClickableIconButton>
			</_SearchContainer>
		</_Container>
	);
};

SSH.propTypes = {
	uuid: PropTypes.string.isRequired,
	isToolbarUnfold: PropTypes.bool.isRequired,
};

export default SSH;
