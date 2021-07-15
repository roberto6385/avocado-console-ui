import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Dropzone from '../Dropzone';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {formatByteSizeString} from '../listConversion';
import styled from 'styled-components';
import {
	arrowCircleDownIcon,
	arrowCircleUpIcon,
	buildCircleIcon,
	deleteIcon,
	fileUploadIcon,
	pauseCircleIcon,
	playCircleIcon,
	removeCircleIcon,
} from '../../../icons/icons';
import {HEIGHT_48, HEIGHT_132} from '../../../styles/length';
import {
	activeColor,
	borderColor,
	historyDeleteColor,
	historyDownloadColor,
	fontColor,
	highColor,
	historyEditColor,
	iconColor,
	historyPauseColor,
	tabColor,
	historyUploadColor,
} from '../../../styles/color';

import {PreventDragCopy} from '../../../styles/function';
import {
	ClickableIconButton,
	IconBox,
	PrimaryGreenButton,
} from '../../../styles/button';
import {
	ADD_HISTORY,
	ADD_HISTORY_HI,
	ADD_PAUSED_LIST,
	commandPwdAction,
	createNewWebsocket,
	HISTORY_READY,
	INITIAL_HISTORY_HI,
	PUSH_PAUSE_WRITE_LIST,
	PUSH_READ_LIST,
	PUSH_WRITE_LIST,
	REMOVE_HISTORY,
	removeNewWebsocket,
	WRITE_SUCCESS,
} from '../../../reducers/sftp';
import {put} from 'redux-saga/effects';

const DropSpaceDiv = styled.div`
	height: ${HEIGHT_132};
	margin: 8px;
	border: 1px dashed;
	border-color: ${(props) => props.bcolor};
	background: ${(props) => props.back};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const _Ul = styled.ul`
	${PreventDragCopy}
	width:${(props) => props.width};
	list-style: none;
	margin: 0px;
	padding: 0px;
	outline: none;
	position: relative;
`;

const _Li = styled.li`
	line-height: 0;
	position: relative;
	height: ${HEIGHT_48};
	// padding: 16px;
	display: flex;
	align-items: center;
	background: ${(props) =>
		props.clicked
			? highColor[props.theme_value]
			: tabColor[props.theme_value]};
	white-space: nowrap;
	border-bottom: 1px solid;
	border-color: ${(props) => borderColor[props.theme_value]};
`;

const DropSpace_Button = styled(PrimaryGreenButton)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 160px;
	margin: 16px 40px 30px 40px;
`;

const HistoryText = styled.div`
	flex: 1;
	line-height: 1.43;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-right: 6px;
	color: ${(props) =>
		props.progress ? historyPauseColor : fontColor[props.theme_value]};
`;

const Progress = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
`;

const Bar = styled.div`
	width: ${(props) => props?.width || '0%'};
	height: 2px;
	background: ${(props) => props.back};
`;

const _AnnounceText = styled.div`
	color: ${(props) => iconColor[props.theme_value]};
	padding: 32px 30px 12px 30px;
	line-height: 1.43;
	letter-spacing: 0.25px;
`;

const _BrowseButtonText = styled.div`
	font-size: 13px;
	letter-spacing: 0.13px;
`;

const _HistorySizeText = styled.span`
	color: ${(props) => fontColor[props.theme_value]};
	font-size: 12px;
	letter-spacing: 0.25px;
	line-height: 1.67;
`;

const HistoryContents = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('historyContents');
	const [prevOffset, setPrevOffset] = useState(0);
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const {
		path: sftp_pathState,
		history: sftp_historyState,
		socket: sftp_socketState,
		upload: sftp_uploadState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {theme, server, tab, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const corTab = useMemo(
		() => tab.find((it) => it.uuid === uuid),
		[tab, uuid],
	);
	const {path} = useMemo(
		() => sftp_pathState.find((it) => it.uuid === uuid),
		[sftp_pathState, uuid],
	);
	const {socket: sftp_socket} = useMemo(
		() => sftp_socketState.find((it) => it.uuid === uuid),
		[sftp_socketState, uuid],
	);
	const {history, history_highlight, pause} = useMemo(
		() => sftp_historyState.find((it) => it.uuid === uuid),
		[sftp_historyState, uuid],
	);
	const corServer = useMemo(
		() => server.find((it) => it.key === corTab.server.key),
		[corTab.server.key, server],
	);
	const correspondedIdentity = useMemo(
		() =>
			identity.find(
				(it) => it.key === corTab.server.key && it.checked === true,
			),
		[identity, corTab],
	);
	const {writeSocket} = useMemo(
		() => sftp_uploadState.find((it) => it.uuid === uuid),
		[sftp_uploadState, uuid],
	);

	const openUpload = useCallback(async () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const files = e.target.files;
			const array = [];
			for await (let value of files) {
				array.push({path, file: value, todo: 'write'});
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: value.name,
						size: value.size,
						todo: 'write',
						progress: 0,
						path: path,
						file: value,
						ready: 1,
					},
				});
			}
			dispatch({
				type: PUSH_WRITE_LIST,
				payload: {uuid, array},
			});
			if (!writeSocket) {
				dispatch(
					createNewWebsocket({
						token: userTicket.access_token, // connection info
						host: corServer.host,
						port: corServer.port,
						user: correspondedIdentity.user,
						password: correspondedIdentity.password,
						todo: 'write',
						uuid: uuid,
					}),
				);
			}
		};
		document.body.removeChild(uploadInput);
	}, [
		writeSocket,
		dispatch,
		uuid,
		path,
		userTicket,
		corServer,
		correspondedIdentity,
	]);

	const upload = useCallback(
		async (files) => {
			const array = [];
			for await (let value of files) {
				array.push({path, file: value, todo: 'write'});
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: value.name,
						size: value.size,
						todo: 'write',
						progress: 0,
						path: path,
						file: value,
						ready: 1,
					},
				});
				console.log(value);
			}
			dispatch({
				type: PUSH_WRITE_LIST,
				payload: {uuid, array},
			});
			if (!writeSocket) {
				dispatch(
					createNewWebsocket({
						token: userTicket.access_token, // connection info
						host: corServer.host,
						port: corServer.port,
						user: correspondedIdentity.user,
						password: correspondedIdentity.password,
						todo: 'write',
						uuid: uuid,
					}),
				);
			}
		},
		[
			writeSocket,
			dispatch,
			uuid,
			path,
			userTicket,
			corServer,
			correspondedIdentity,
		],
	);
	const compareNumber = useCallback(
		(first, second) => {
			console.log(first, second);
			dispatch({type: INITIAL_HISTORY_HI, payload: {uuid}});

			let list = [];
			if (first <= second) {
				for (let i = first; i <= second; i++) {
					list.push(history[i]);
				}
			} else {
				for (let i = first; i >= second; i--) {
					list.push(history[i]);
				}
			}
			dispatch({
				type: ADD_HISTORY_HI,
				payload: {
					uuid,
					history: list,
				},
			});
		},
		[dispatch, history, uuid],
	);

	const selectItem = useCallback(
		(selectValue, index) => (e) => {
			e.stopPropagation();
			const prev_history = history.slice();
			const prev_history_hi = history_highlight.slice();
			if (e.metaKey) {
				if (prev_history_hi.find((item) => item === selectValue)) {
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {
							uuid,
							history: prev_history_hi.filter(
								(item) => item !== selectValue,
							),
						},
					});
				} else {
					prev_history_hi.push(selectValue);
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {uuid, history: prev_history_hi},
					});
				}
			} else if (e.shiftKey) {
				if (prev_history_hi.length === 0) {
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {
							uuid,
							history: [selectValue],
						},
					});
				} else {
					compareNumber(
						prev_history.findIndex(
							(item) => item === prev_history_hi[0],
						),
						index,
					);
				}
			} else {
				dispatch({
					type: ADD_HISTORY_HI,
					payload: {
						uuid,
						history: [selectValue],
					},
				});
			}
		},
		[compareNumber, dispatch, history, history_highlight, uuid],
	);

	const removeHistory = useCallback(
		(history) => () => {
			dispatch({type: REMOVE_HISTORY, payload: {uuid, history}});
		},
		[dispatch, uuid],
	);

	const onPause = useCallback(
		(history) => (e) => {
			e.stopPropagation();
			console.log(history);
			if (history.progress !== 100 && history.progress !== 0) {
				if (history.ready === 1) {
					dispatch({
						type: HISTORY_READY,
						payload: {
							uuid: uuid,
							history: history,
						},
					});
					if (history.todo === 'write') {
						if (history.path === path) {
							dispatch(
								commandPwdAction({
									socket: sftp_socket,
									uuid: uuid,
									pwd_path: path,
									dispatch: dispatch,
								}),
							);
						}
					}
					dispatch(
						removeNewWebsocket({
							socket: writeSocket,
							uuid: uuid,
							todo: history.todo,
							path: history.path,
							file: history.file,
						}),
					);
				} else {
					const item = pause
						.slice()
						.find(
							(v) =>
								v.file === history.file &&
								v.path === history.path &&
								v.todo === history.todo,
						);

					if (!item || item.offset === prevOffset) return;
					setPrevOffset(item.offset);

					dispatch({
						type:
							history.todo === 'write'
								? PUSH_PAUSE_WRITE_LIST
								: PUSH_READ_LIST,
						payload: {
							uuid,
							array: {...item, historyId: history.HISTORY_ID},
						},
					});

					dispatch(
						createNewWebsocket({
							token: userTicket.access_token, // connection info
							host: corServer.host,
							port: corServer.port,
							user: correspondedIdentity.user,
							password: correspondedIdentity.password,
							todo: history.todo,
							uuid: uuid,
						}),
					);
				}
			}
		},
		[
			writeSocket,
			corServer,
			correspondedIdentity,
			dispatch,
			path,
			pause,
			prevOffset,
			sftp_socket,
			userTicket,
			uuid,
		],
	);

	return (
		<Dropzone onDrop={(files) => upload(files)}>
			{history?.length === 0 ? (
				<DropSpaceDiv back={tabColor[theme]} bcolor={iconColor[theme]}>
					<_AnnounceText theme_value={theme}>
						{t('paragraph')}
					</_AnnounceText>
					<DropSpace_Button theme_value={theme} onClick={openUpload}>
						<IconBox
							size='sm'
							margin_right={'8px'}
							color={theme === 0 ? 'white' : 'black'}
						>
							{fileUploadIcon}
						</IconBox>
						<_BrowseButtonText>{t('browse')}</_BrowseButtonText>
					</DropSpace_Button>
				</DropSpaceDiv>
			) : (
				<_Ul>
					{history.map((history, index) => {
						return (
							<_Li
								className={'history_contents'}
								key={history.HISTORY_ID}
								onClick={selectItem(history, index)}
								theme_value={theme}
								borderWidth={`${history.progress}%`}
								clicked={
									history_highlight.find(
										(item) => item === history,
									)
										? 1
										: 0
								}
							>
								<ClickableIconButton
									onClick={onPause(history)}
									size='20px'
									margin={'10px'}
									color={
										history.progress !== 100
											? historyPauseColor
											: history.todo === 'write'
											? historyUploadColor
											: history.todo === 'read'
											? historyDownloadColor
											: history.todo === 'edit'
											? historyEditColor
											: history.todo === 'rm' &&
											  historyDeleteColor
									}
								>
									{history.progress !== 100
										? history.ready === 3
											? playCircleIcon
											: pauseCircleIcon
										: history.todo === 'write'
										? arrowCircleUpIcon
										: history.todo === 'read'
										? arrowCircleDownIcon
										: history.todo === 'edit'
										? buildCircleIcon
										: history.todo === 'rm' &&
										  removeCircleIcon}
								</ClickableIconButton>
								<HistoryText
									className={'history_contents'}
									flex={1}
									progress={history.progress !== 100 ? 1 : 0}
									theme_value={theme}
								>
									{history.name}
								</HistoryText>
								<_HistorySizeText
									theme_value={theme}
									className={'history_contents'}
								>
									{formatByteSizeString(history.size)}
								</_HistorySizeText>
								<ClickableIconButton
									size={'sm'}
									margin={'10px'}
									theme_value={theme}
									onClick={removeHistory(history)}
									className={'history_contents'}
								>
									{deleteIcon}
								</ClickableIconButton>

								{history.progress !== 100 && (
									<Progress>
										<Bar
											back={activeColor[theme]}
											width={`${history.progress}%`}
										/>
									</Progress>
								)}
							</_Li>
						);
					})}
				</_Ul>
			)}
			{/*<HistoryContextMenu*/}
			{/*	uuid={uuid}*/}
			{/*	// highlight={highlight}*/}
			{/*	// setHighlight={setHighlight}*/}
			{/*/>*/}
		</Dropzone>
	);
};
HistoryContents.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default HistoryContents;
