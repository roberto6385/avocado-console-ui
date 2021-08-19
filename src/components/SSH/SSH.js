import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FitAddon} from 'xterm-addon-fit';
import {SearchAddon} from 'xterm-addon-search';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import {sshAction, sshSelector} from '../../reducers/ssh';

import {useDebouncedResizeObserver} from '../../hooks/useDebouncedResizeObserver';
import {
	arrowDropDownIcon,
	arrowDropUpIcon,
	closeIcon,
	searchIcon,
} from '../../icons/icons';
import {HoverButton, Icon} from '../../styles/components/icon';
import {
	terminalColor,
	terminalFontColor,
	terminalSelectionColor,
} from '../../styles/color';
import {tabBarSelector} from '../../reducers/tabBar';
import {settingSelector} from '../../reducers/setting';

const _Container = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
	padding: 20px;
	background-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.ssh.terminal.backgroundColor};
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
	color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.ssh.searchBox.textBoxs.font
			.color};
`;

const _SearchContainer = styled.div`
	width: 400px;
	height: 42px;
	align-items: center;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.24);
	background-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.ssh.searchBox
			.backgroundColor};
	border-radius: 4px;
	padding-left: 13px;
	position: absolute;
	right: 10px;
	bottom: 10px;
	display: none;
	z-index: 5;
`;

const _ListGroup = styled.ul`
	position: absolute;
	display: flex;
	flex-direction: column;
	left: ${(props) => props.left};
	top: ${(props) => props.top};
	bottom: ${(props) => props.bottom};
	display: ${(props) => props.display};
	width: 130px;
	box-shadow: 0 2px 10px 0
		${(props) =>
			props.theme.pages.webTerminal.main.panels.ssh.autoComplete.boxShadow
				.color};
	zindex: 5;
	padding: 8px 0;
	background-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.ssh.autoComplete
			.backgroundColor};
`;

const _ListGroupItem = styled.li`
	padding: 6px 5.8px;
	border: none;
	overflow: auto;
	color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.ssh.autoComplete.font.color};
	background-color: ${(props) =>
		props.selected
			? props.theme.pages.webTerminal.main.panels.ssh.autoComplete.items
					.selectedStyle.backgroundColor
			: props.theme.pages.webTerminal.main.panels.ssh.autoComplete.items
					.normalStyle.backgroundColor};
`;

const _AutoCompletionListFooter = styled(_ListGroupItem)`
	font-size: 10px;
	border-top: 1px solid
		${(props) =>
			props.theme.pages.webTerminal.main.panels.ssh.autoComplete.border
				.color};
`;

const SSH = ({uuid, isToolbarUnfold}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('ssh');

	const {selectedTab} = useSelector(tabBarSelector.all);
	const {theme} = useSelector(settingSelector.all);
	const {font, searchMode, ssh, sshHistory, autoCompleteMode} = useSelector(
		sshSelector.all,
	);

	const currentCommand = useMemo(
		() => ssh.find((v) => v.uuid === uuid).current_line,
		[ssh, uuid],
	);
	const [searchVal, onChangeSearchVal, setSearchVal] = useInput('');
	const historyList = useMemo(
		() =>
			currentCommand === ''
				? []
				: sshHistory
						.filter((v) => v.startsWith(currentCommand))
						.slice(-5)
						.reverse(),
		[sshHistory, currentCommand],
	);
	const [selectedHistory, setSelectedHistory] = useState(0);
	const [ignoreAutoCompleteMode, setIgnoreAutoCompleteMode] = useState(false);
	const sshTerm = useMemo(
		() => ssh.find((v) => v.uuid === uuid).terminal,
		[ssh, uuid],
	);
	const {current: ws} = useRef(ssh.find((v) => v.uuid === uuid).ws);
	const {current: fitAddon} = useRef(new FitAddon());
	const {current: searchAddon} = useRef(new SearchAddon());
	//do not work with {current}
	const searchTextBoxRef = useRef(null);
	const {
		ref: sshTermContainerRef,
		width: width,
		height: height,
	} = useDebouncedResizeObserver(3000);
	const [isComponentMounted, setIsComponentMounted] = useState(true);

	const onKeyPressSearchePreviousVal = useCallback(
		(e) => {
			if (e.key === 'Enter') searchAddon.findPrevious(searchVal);
		},
		[searchVal, searchAddon],
	);

	const onClickRequestHistoryCommand = useCallback(
		(v) => () => {
			dispatch(
				sshAction.sendCommandRequest({
					uuid: uuid,
					ws: ws,
					input: v.substring(currentCommand.length),
				}),
			);
			dispatch(
				sshAction.sendCommandRequest({
					uuid: uuid,
					ws: ws,
					input: '\r',
				}),
			);
		},
		[currentCommand.length, dispatch, uuid, ws],
	);

	const onClickOpenSearchBar = useCallback(() => {
		if (selectedTab !== null) dispatch(sshAction.setSearchMode());
	}, [dispatch, selectedTab]);

	const onClickSearchPreviousVal = useCallback(() => {
		searchAddon.findPrevious(searchVal);
	}, [searchVal, searchAddon]);

	const onClickSearchNextVal = useCallback(() => {
		searchAddon.findNext(searchVal);
	}, [searchVal, searchAddon]);
	//terminal setting
	useEffect(() => {
		while (document.getElementById('terminal-' + uuid).hasChildNodes()) {
			document
				.getElementById('terminal-' + uuid)
				.removeChild(
					document.getElementById('terminal-' + uuid).firstChild,
				);
		}

		sshTerm.loadAddon(fitAddon);
		sshTerm.loadAddon(searchAddon);
		sshTerm.open(document.getElementById('terminal-' + uuid));

		return () => {
			setIsComponentMounted(false);
		};
	}, [fitAddon, searchAddon, sshTerm, uuid]);
	//process command on terminal
	useEffect(() => {
		const processInput = sshTerm.onData((data) => {
			if (
				autoCompleteMode &&
				currentCommand.length > 1 &&
				data.charCodeAt(0) === 27
			) {
				if (data.substr(1) === '[A') {
					//Up
					if (selectedHistory === 0)
						setSelectedHistory(historyList.length - 1);
					else setSelectedHistory(selectedHistory - 1);
				} else if (data.substr(1) === '[B') {
					//Down
					if (selectedHistory === historyList.length - 1)
						setSelectedHistory(0);
					else setSelectedHistory(selectedHistory + 1);
				} else {
					setIgnoreAutoCompleteMode(true);
				}
			} else if (
				currentCommand.length > 1 &&
				autoCompleteMode &&
				!ignoreAutoCompleteMode &&
				historyList.length > 0 &&
				data.charCodeAt(0) === 13
			) {
				//Enter
				dispatch(
					sshAction.sendCommandRequest({
						uuid: uuid,
						ws: ws,
						input: historyList[selectedHistory].substring(
							currentCommand.length,
						),
					}),
				);
				dispatch(
					sshAction.sendCommandRequest({
						uuid: uuid,
						ws: ws,
						input: '\r',
					}),
				);
			} else {
				dispatch(
					sshAction.sendCommandRequest({
						uuid: uuid,
						ws: ws,
						input: data,
					}),
				);
				if (data.charCodeAt(0) === 13 && ignoreAutoCompleteMode)
					setIgnoreAutoCompleteMode(false);
			}
		});

		return () => {
			processInput.dispose();
		};
	}, [
		uuid,
		ws,
		sshTerm,
		autoCompleteMode,
		selectedHistory,
		historyList,
		ignoreAutoCompleteMode,
		currentCommand,
		dispatch,
	]);
	//current tab terminal is focused
	useEffect(() => {
		if (selectedTab === uuid) sshTerm.focus();
	}, [selectedTab, uuid, sshTerm]);
	//window size change
	useEffect(() => {
		if (width > 0 && height > 0 && uuid && isComponentMounted) {
			fitAddon.fit();
			dispatch(
				sshAction.windowChangeRequest({
					ws: ws,
					uuid: uuid,
					data: {
						cols: sshTerm.cols,
						rows: sshTerm.rows,
						width: width,
						height: height,
					},
				}),
			);
		}
	}, [
		ws,
		uuid,
		sshTerm,
		width,
		height,
		isComponentMounted,
		fitAddon,
		dispatch,
	]);
	//click search button
	useEffect(() => {
		if (selectedTab === uuid && searchMode) {
			document.getElementById('ssh-search-' + uuid).style.display =
				'flex';
			searchTextBoxRef.current.focus();
		} else {
			document.getElementById('ssh-search-' + uuid).style.display =
				'none';
			setSearchVal('');
			searchAddon.findPrevious('');
		}
	}, [
		selectedTab,
		uuid,
		searchMode,
		searchTextBoxRef,
		setSearchVal,
		searchAddon,
	]);
	//search val
	useEffect(() => {
		if (selectedTab === uuid) {
			searchAddon.findPrevious('');
			searchAddon.findPrevious(searchVal);
		}
	}, [selectedTab, uuid, searchVal, searchAddon]);

	//set History List
	useEffect(() => {
		if (autoCompleteMode && currentCommand.length > 1) {
			setSelectedHistory(0);
		}
	}, [autoCompleteMode, sshHistory, currentCommand, ignoreAutoCompleteMode]);
	//change font family
	useEffect(() => {
		sshTerm.setOption('fontFamily', font.family);
		fitAddon.fit();
	}, [sshTerm, fitAddon, font]);

	//change font size
	useEffect(() => {
		sshTerm.setOption('fontSize', font.size);
		fitAddon.fit();
	}, [sshTerm, fitAddon, font]);
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
			id={`terminal-container-${uuid}`}
			ref={sshTermContainerRef}
			className={!isToolbarUnfold && 'close-nav-terminal'}
		>
			<_Terminal id={`terminal-${uuid}`} />
			<_ListGroup
				id={`auto-complete-list-${uuid}`}
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
						document.getElementById(`auto-complete-list-${uuid}`)
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
						document.getElementById(`auto-complete-list-${uuid}`)
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
					selectedTab === uuid &&
					autoCompleteMode &&
					!ignoreAutoCompleteMode &&
					historyList.length > 0
						? 'flex'
						: 'none'
				}
			>
				{historyList.map((v, i) => (
					<_ListGroupItem
						selected={i === selectedHistory ? 1 : 0}
						onClick={onClickRequestHistoryCommand(v)}
						key={i}
					>
						{v}
					</_ListGroupItem>
				))}
				<_AutoCompletionListFooter>
					{t('autoCompleteFooter')}
				</_AutoCompletionListFooter>
			</_ListGroup>

			<_SearchContainer id={`ssh-search-${uuid}`}>
				<Icon
					size={'xs'}
					margin_right={'5px'}
					onClick={onClickSearchPreviousVal}
				>
					{searchIcon}
				</Icon>
				<_SearchInput
					onKeyPress={onKeyPressSearchePreviousVal}
					onChange={onChangeSearchVal}
					value={searchVal}
					placeholder={t('search')}
					type='text'
					ref={searchTextBoxRef}
				/>
				<HoverButton
					size={'sm'}
					margin='8px'
					onClick={onClickSearchPreviousVal}
				>
					{arrowDropUpIcon}
				</HoverButton>
				<HoverButton
					size={'sm'}
					margin_right='8px'
					onClick={onClickSearchNextVal}
				>
					{arrowDropDownIcon}
				</HoverButton>
				<HoverButton
					size={'sm'}
					margin='11px'
					onClick={onClickOpenSearchBar}
				>
					{closeIcon}
				</HoverButton>
			</_SearchContainer>
		</_Container>
	);
};

SSH.propTypes = {
	uuid: PropTypes.string.isRequired,
	isToolbarUnfold: PropTypes.bool.isRequired,
};

export default SSH;
