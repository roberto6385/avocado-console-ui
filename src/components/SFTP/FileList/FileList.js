import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import FileListContextMenu from '../../ContextMenu/FileListContextMenu';
import TableHead from './FileListTableHead';
import {
	ADD_HIGHLIGHT,
	ADD_HISTORY,
	ADD_ONE_HIGHLIGHT,
	commandCdAction,
	createNewWebsocket,
	INITIALIZING_HIGHLIGHT,
	PUSH_EDIT_READ_LIST,
	PUSH_READ_LIST,
	REMOVE_HIGHLIGHT,
} from '../../../reducers/sftp';
import {
	formatByteSizeString,
	sortFunction,
	dataFormater,
} from '../listConversion';
import {
	editIcon,
	fileDownloadIcon,
	fileIcon,
	folderOpenIcon,
} from '../../../icons/icons';
import {FONT_14, HEIGHT_48} from '../../../styles/length';
import {
	activeColor,
	borderColor,
	fileListHighColor,
	fontColor,
	tabColor,
} from '../../../styles/color';
import LoadingSpinner from '../../loadingSpinner';
import styled from 'styled-components';

import {HiddenScroll, PreventDragCopy} from '../../../styles/function';
import {ClickableIconButton, IconBox} from '../../../styles/button';

const _Table = styled.table`
	display: flex;
	background: ${(props) => props?.back};
	position: relative;
	flex: 1;
	flex-direction: column;
	font-size: ${FONT_14};
	overflow: scroll;
	margin: 0;
	padding: 0;
	border: none;
	${PreventDragCopy};
	${HiddenScroll};
`;

const _Tbody = styled.tbody`
	background: ${(props) => props?.back};
	flex: 1;
	width: 100%;
	min-width: 778px;
	position: absolute;
	top: ${HEIGHT_48};
	.active {
		background: ${(props) => props.active};
	}
`;

const _Th = styled.th`
	margin-right: 16px;
	display: flex;
	align-items: center;
	min-width: ${(props) => props?.min};
	width: ${(props) => props?.min};
	flex: ${(props) => props.flex};
	justify-content: ${(props) => props.justify || 'flex-start'};
	white-space: nowrap;
	border: none !important;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const _Tr = styled.tr`
	padding-left: 16px;
	display: flex;
	height: ${HEIGHT_48};
	color: ${(props) => props.color};
	background: ${(props) => props.back};
	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
	cursor: pointer;
`;

const FileList = ({uuid}) => {
	const dispatch = useDispatch();
	const {
		path: sftp_pathState,
		file: sftp_fileState,
		high: sftp_highState,
		etc: sftp_etcState,
		socket: sftp_socketState,
		download: sftp_downloadState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {theme, lang, server, tab, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {sortKeyword, toggle} = useMemo(
		() => sftp_etcState.find((it) => it.uuid === uuid),
		[sftp_etcState, uuid],
	);
	const {socket} = useMemo(
		() => sftp_socketState.find((it) => it.uuid === uuid),
		[sftp_socketState, uuid],
	);

	const {path, pathList} = useMemo(
		() => sftp_pathState.find((it) => it.uuid === uuid),
		[sftp_pathState, uuid],
	);
	const {fileList} = useMemo(
		() => sftp_fileState.find((it) => it.uuid === uuid),
		[sftp_fileState, uuid],
	);
	const {highlight} = useMemo(
		() => sftp_highState.find((it) => it.uuid === uuid),
		[sftp_highState, uuid],
	);
	const {readSocket, readList} = useMemo(
		() => sftp_downloadState.find((it) => it.uuid === uuid),
		[sftp_downloadState, uuid],
	);
	const corTab = useMemo(
		() => tab.find((it) => it.uuid === uuid),
		[tab, uuid],
	);
	const userTicket = useSelector((state) => state.userTicket.userTicket);
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

	const [currentFileList, setCurrentFileList] = useState([]);
	const [currentKey, setCurrentKey] = useState(sortKeyword);
	const {show} = useContextMenu({
		id: uuid + 'fileList',
	});

	const download = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			if (item.name !== '..' && item.type !== 'directory') {
				// 현재는 디렉토리 다운로드 막아두었음.
				dispatch({
					type: PUSH_READ_LIST,
					payload: {uuid, array: [{path, file: item, todo: 'read'}]},
				});
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: item.name,
						size: item.size,
						todo: 'read',
						progress: 0,
						path: path,
						file: item,
					},
				});
				if (!readSocket && readList.length === 0) {
					dispatch(
						createNewWebsocket({
							token: userTicket.access_token, // connection info
							host: corServer.host,
							port: corServer.port,
							user: correspondedIdentity.user,
							password: correspondedIdentity.password,
							todo: 'read',
							uuid: uuid,
						}),
					);
				}
			}
		},
		[
			readList,
			readSocket,
			dispatch,
			uuid,
			path,
			userTicket,
			corServer,
			correspondedIdentity,
		],
	);

	const edit = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			console.log(item);
			if (item.name !== '..' && item.type !== 'directory') {
				dispatch({
					type: PUSH_EDIT_READ_LIST,
					payload: {uuid, obj: {path, file: item, todo: 'edit'}},
				});
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: item.name,
						size: item.size,
						todo: 'edit',
						progress: 0,
						path: path,
						file: item,
					},
				});

				//TODO 편집은 readList 나중에
				if (!readSocket && readList.length === 0) {
					dispatch(
						createNewWebsocket({
							token: userTicket.access_token, // connection info
							host: corServer.host,
							port: corServer.port,
							user: correspondedIdentity.user,
							password: correspondedIdentity.password,
							todo: 'read',
							uuid: uuid,
						}),
					);
				}
			}
		},
		[
			readList,
			readSocket,
			dispatch,
			uuid,
			path,
			userTicket,
			corServer,
			correspondedIdentity,
		],
	);

	const contextMenuOpen = useCallback(
		(item = '') =>
			(e) => {
				e.preventDefault();
				if (item.name === '..' || item.name === '') return;
				show(e);
				!highlight
					.slice()
					.find(
						(v) =>
							JSON.stringify(v) ===
							JSON.stringify({...item, path}),
					) &&
					item !== '' &&
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {uuid, item: {...item, path}},
					});
			},
		[dispatch, highlight, uuid, path, show],
	);

	const compareNumber = useCallback(
		(list, first, second) => {
			dispatch({type: INITIALIZING_HIGHLIGHT, payload: {uuid}});

			if (first <= second) {
				for (let i = first; i <= second; i++) {
					dispatch({
						type: ADD_HIGHLIGHT,
						payload: {uuid, item: {...list[i], path}},
					});
				}
			} else {
				for (let i = first; i >= second; i--) {
					dispatch({
						type: ADD_HIGHLIGHT,
						payload: {uuid, item: {...list[i], path}},
					});
				}
			}
		},
		[dispatch, path, uuid],
	);

	const selectItem = useCallback(
		({item, index}) =>
			(e) => {
				if (item.name === '..') return;
				if (e.metaKey) {
					!highlight
						.slice()
						.find(
							(v) =>
								JSON.stringify(v) ===
								JSON.stringify({...item, path}),
						)
						? dispatch({
								type: ADD_HIGHLIGHT,
								payload: {uuid, item: {...item, path}},
						  })
						: dispatch({
								type: REMOVE_HIGHLIGHT,
								payload: {uuid, item: {...item, path}},
						  });
				} else if (e.shiftKey) {
					if (highlight.length === 0) {
						dispatch({
							type: ADD_HIGHLIGHT,
							payload: {uuid, item: {...item, path}},
						});
					} else {
						const firstIndex = currentFileList.findIndex(
							(it) => it.name === highlight[0].name,
						);
						compareNumber(currentFileList, firstIndex, index);
					}
				} else {
					!highlight
						.slice()
						.find(
							(v) =>
								JSON.stringify(v) ===
								JSON.stringify({...item, path}),
						) &&
						dispatch({
							type: ADD_ONE_HIGHLIGHT,
							payload: {uuid, item: {...item, path}},
						});
				}
			},
		[highlight, dispatch, uuid, path, currentFileList, compareNumber],
	);

	const changePath = useCallback(
		(item) => () => {
			if (item.type === 'directory') {
				// 디렉토리 클릭시 해당 디렉토리로 이동
				dispatch(
					commandCdAction({
						socket: socket,
						uuid: uuid,
						path: path,
						cd_path: item.name,
					}),
				);
				dispatch({type: INITIALIZING_HIGHLIGHT, payload: {uuid}});
			}
		},
		[dispatch, path, socket, uuid],
	);

	useEffect(() => {
		if (
			fileList.length === pathList.length &&
			pathList.length !== 0 &&
			fileList.length !== 0
		) {
			let nextList = fileList[fileList.length - 1];
			const sortedList = sortFunction({
				fileList: nextList,
				keyword: sortKeyword,
				toggle: currentKey === sortKeyword ? toggle : true,
			});
			setCurrentKey(sortKeyword);
			setCurrentFileList(sortedList);
		}
	}, [fileList, pathList, sortKeyword, toggle, currentKey]);

	return (
		<React.Fragment>
			{currentFileList.length === 0 && <LoadingSpinner />}
			<_Table onContextMenu={contextMenuOpen()} back={tabColor[theme]}>
				<TableHead uuid={uuid} />
				<_Tbody active={fileListHighColor[theme]}>
					{currentFileList.map((item, index) => {
						// . 파일은 표시하지 않음.
						// item.name !== '..'
						if (item.name !== '.') {
							return (
								<_Tr
									back={tabColor[theme]}
									color={fontColor[theme]}
									bcolor={borderColor[theme]}
									onContextMenu={contextMenuOpen(item)}
									onClick={selectItem({item, index})}
									onDoubleClick={changePath(item)}
									key={index + uuid}
									className={
										highlight.find(
											(v) =>
												JSON.stringify(v) ===
												JSON.stringify({...item, path}),
										)
											? 'filelist_contents active'
											: 'filelist_contents'
									}
								>
									<_Th min={'150px'} flex={1}>
										{item.type === 'directory' ? (
											<IconBox
												margin_right={'8px'}
												color={activeColor[theme]}
											>
												{folderOpenIcon}
											</IconBox>
										) : (
											<IconBox
												margin_right={'8px'}
												theme_value={theme}
											>
												{fileIcon}
											</IconBox>
										)}

										<span className='filelist_contents'>
											{item.name}
										</span>
									</_Th>
									<_Th min={'135px'} justify='flex-end'>
										{item.name !== '..' &&
											formatByteSizeString(item.size)}
									</_Th>
									<_Th min={'212px'}>
										{item.name !== '..' &&
											dataFormater({
												modify: item.lastModified,
												keyword: 'format',
												language: lang,
											})}
									</_Th>
									<_Th min={'105px'}>{item.permission}</_Th>
									<_Th min={'63px'} justify={'flex-end'}>
										{item.type === 'file' && (
											<ClickableIconButton
												theme_value={theme}
												margin_right={'12px'}
												onClick={edit(item)}
											>
												{editIcon}
											</ClickableIconButton>
										)}
										{item.name !== '..' && (
											<ClickableIconButton
												theme_value={theme}
												margin={'0px'}
												onClick={download(item)}
											>
												{fileDownloadIcon}
											</ClickableIconButton>
										)}
									</_Th>
								</_Tr>
							);
						}
					})}
				</_Tbody>
			</_Table>
			<FileListContextMenu uuid={uuid} />
		</React.Fragment>
	);
};

FileList.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileList;
