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

import {useDebouncedResizeObserver} from '../../hooks/useDebouncedResizeObserver';
import {
	arrowDropDownIcon,
	arrowDropUpIcon,
	closeIcon,
	searchIcon,
} from '../../icons/icons';
import {useTranslation} from 'react-i18next';
import {
	borderColor,
	contextHover,
	fontColor,
	sshSearch,
	terminalColor,
	terminalFontColor,
	terminalSelectionColor,
} from '../../styles/color';
import {ClickableIconButton, IconBox} from '../../styles/button';

const _Container = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
	padding: 20px;
	background-color: ${(props) => terminalColor[props.theme_value]};
`;

const _Terminal = styled(_Container)`
	height: 100%;
	width: 100%;
	overflow: scroll;
	padding: 0px;
`;

const SearchInput = styled.input`
	flex: 1;
	margin-right: 5px;
	background: transparent;
	border: none;
	color: ${(props) => fontColor[props.theme_value]};
`;

const _SearchPopupContainer = styled.div`
	width: 400px;
	height: 42px;
	align-items: center;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.24);
	background: ${(props) => sshSearch[props.theme_value]};
	border-radius: 4px;
	padding-left: 13px;
	position: absolute;
	right: 10px;
	bottom: 10px;
	display: none;
	// xterm.js 의 canvas가 z-index:3을 갖고 있어서 5를 넣어줌.
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
	background: ${(props) => sshSearch[props.theme_value]};
`;

const _ListGroupItem = styled(ListGroup.Item)`
	padding: 6px 5.8px;
	overflow: auto;
	background: ${(props) =>
		props.clicked
			? contextHover[props.theme_value]
			: sshSearch[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
	border: none;
`;

const _FooterListGroupItem = styled(_ListGroupItem)`
	font-size: 10px;
	border-top: 1px solid ${(props) => borderColor[props.theme_value]};
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
		() =>
			currentLine === ''
				? []
				: ssh_history
						.filter((v) => v.startsWith(currentLine))
						.slice(-5)
						.reverse(),
		[ssh_history, currentLine],
	);
	const [ignoreAutoCompletion, setIgnoreAutoCompletion] = useState(false);
	const sshTerm = useMemo(
		() => ssh.find((v) => v.uuid === uuid).terminal,
		[ssh, uuid],
	);
	const {current: ws} = useRef(ssh.find((v) => v.uuid === uuid).ws);
	const {current: fitAddon} = useRef(new FitAddon());
	const {current: searchAddon} = useRef(new SearchAddon());
	//do not work with current
	const searchRef = useRef(null);
	const {
		ref: ref,
		width: width,
		height: height,
	} = useDebouncedResizeObserver(500);
	const [isComponentMounted, setIsComponentMounted] = useState(true);

	const onPressEnter = useCallback(
		(e) => {
			if (e.key === 'Enter') searchAddon.findPrevious(search);
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
		fitAddon.fit();

		return () => {
			setIsComponentMounted(false);
		};
	}, [sshTerm, uuid]);
	//terminal get input data
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
			} else {
				dispatch({
					type: SSH_SEND_COMMAND_REQUEST,
					data: {
						uuid: uuid,
						ws: ws,
						input: data,
					},
				});
				if (data.charCodeAt(0) === 13 && ignoreAutoCompletion)
					setIgnoreAutoCompletion(false);
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
			document.getElementById('ssh_search_' + uuid).style.display =
				'flex';
			searchRef.current.focus();
		} else {
			document.getElementById('ssh_search_' + uuid).style.display =
				'none';
			setSearch('');
			searchAddon.findPrevious('');
		}
	}, [current_tab, uuid, search_mode, searchRef]);
	//search a word on the terminal
	useEffect(() => {
		if (current_tab === uuid) {
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
			ref={ref}
			theme_value={theme}
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
					currentLine.length > 1 &&
					current_tab === uuid &&
					auto_completion_mode &&
					!ignoreAutoCompletion &&
					historyList.length > 0
						? 'flex'
						: 'none'
				}
			>
				{historyList.map((v, i) => (
					<_ListGroupItem
						clicked={i === currentHistory ? 1 : 0}
						theme_value={theme}
						onClick={onClickCommand(v)}
						key={i}
					>
						{v}
					</_ListGroupItem>
				))}
				<_FooterListGroupItem theme_value={theme}>
					{t('autoCompletionFooter')}
				</_FooterListGroupItem>
			</_ListGroup>

			<_SearchPopupContainer
				theme_value={theme}
				id={`ssh_search_${uuid}`}
			>
				<IconBox
					size={'xs'}
					theme_value={theme}
					margin_right={'5px'}
					onClick={onClickArrowUp}
				>
					{searchIcon}
				</IconBox>
				<SearchInput
					onKeyPress={onPressEnter}
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
			</_SearchPopupContainer>
		</_Container>
	);
};

SSH.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SSH;
