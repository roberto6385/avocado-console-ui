import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useContextMenu} from 'react-contexify';
import styled from 'styled-components';

import FileListContextMenu from '../../ContextMenu/FileListContextMenu';
import {
	ADD_HIGHLIGHT,
	ADD_ONE_HIGHLIGHT,
	commandCdAction,
	INITIALIZING_HIGHLIGHT,
	REMOVE_HIGHLIGHT,
	REMOVE_TEMP_HIGHLIGHT,
	TEMP_HIGHLIGHT,
} from '../../../reducers/sftp/sftp';
import {
	editIcon,
	fileDownloadIcon,
	fileIcon,
	folderOpenIcon,
} from '../../../icons/icons';
import {sortFunction} from '../listConversion';
import {HEIGHT_48, WIDTH_220} from '../../../styles/length';
import {
	activeColor,
	borderColor,
	fileListHighColor,
	fontColor,
	highColor,
	tabColor,
} from '../../../styles/color';

import {createNewWebsocket, PUSH_READ_LIST} from '../../../reducers/sftp/crud';

import {HiddenScroll, PreventDragCopy} from '../../../styles/function';
import {ClickableIconButton, IconBox} from '../../../styles/button';

const _Container = styled.div`
	display: flex;
	flex: 1;
	overflow-x: scroll;
	font-size: 14px;
`;

const _ItemContainer = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	min-width: 106px;
	margin-right: 16px;
`;

const _FirstItemContainer = styled(_ItemContainer)`
	display: flex;
	align-items: center;
	flex: 1;
	min-width: 200px;
	margin-left: 16px;
`;

const _ButtonContainer = styled(_ItemContainer)`
	display: flex;
	justify-content: flex-end;
	min-width: 63px;
`;

const _Ul = styled.ul`
	${PreventDragCopy}
	${HiddenScroll}
	height: 100%;
	min-width: ${(props) => props.width};
	flex: ${(props) => props.flex};
	list-style: none;
	overflow-y: scroll;
	margin: 0px;
	padding: 0px;
	outline: none;
	background: ${(props) => props.back};
	border-right: 1px solid;
	border-color: ${(props) => props.bcolor};
	color: ${(props) => props.color};
`;

const _Li = styled.li`
	background: ${(props) => props?.back};
	min-width: ${WIDTH_220};
	height: ${HEIGHT_48};
	white-space: nowrap;
	padding: 0px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
	font-weight: bold;
`;

const FileListDropDown = ({uuid}) => {
	const dispatch = useDispatch();
	const sftp = useSelector((state) => state.sftp.sftp);
	const {theme, tab, server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const corSftpInfo = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const corTab = useMemo(() => tab.find((it) => it.uuid === uuid), [
		tab,
		uuid,
	]);
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const corServer = useMemo(
		() => server.find((it) => it.key === corTab.server.key),
		[corTab],
	);

	const listState = useSelector((state) => state.list.listState);
	const corListInfo = useMemo(
		() => listState.find((it) => it.uuid === uuid),
		[listState, uuid],
	);
	const {path, fileList, pathList} = corListInfo;

	const correspondedIdentity = useMemo(
		() =>
			identity.find(
				(it) => it.key === corTab.server.key && it.checked === true,
			),
		[identity, corTab],
	);
	const {highlight, tempItem, sortKeyword, toggle} = corSftpInfo;
	const [currentFileList, setCurrentFileList] = useState([]);
	const [currentKey, setCurrentKey] = useState(sortKeyword);
	const {show} = useContextMenu({
		id: uuid + 'fileList',
	});

	const compareNumber = (list, first, second) => {
		console.log(list);
		console.log(first);
		console.log(second);

		if (first === -1) {
			dispatch({
				type: ADD_HIGHLIGHT,
				payload: {uuid, item: {...list[second], path}},
			});
			return;
		}

		if (first !== -1 && first <= second) {
			dispatch({
				type: INITIALIZING_HIGHLIGHT,
				payload: {uuid},
			});
			for (let i = first; i <= second; i++) {
				dispatch({
					type: ADD_HIGHLIGHT,
					payload: {uuid, item: {...list[i], path}},
				});
			}
		} else {
			dispatch({
				type: INITIALIZING_HIGHLIGHT,
				payload: {uuid},
			});
			for (let i = first; i >= second; i--) {
				dispatch({
					type: ADD_HIGHLIGHT,
					payload: {uuid, item: {...list[i], path}},
				});
			}
		}
	};

	const selectFile = useCallback(
		({item, listindex, itemIndex}) => (e) => {
			console.log(item, listindex, itemIndex);
			if (e.shiftKey) {
				if (path !== pathList[listindex]) {
					dispatch(
						commandCdAction({
							socket: corSftpInfo.socket,
							path: path,
							uuid: uuid,
							cd_path: pathList[listindex],
						}),
					);
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {uuid, item: {...item, path}},
					});
				} else {
					if (highlight.length === 0) {
						dispatch({
							type: ADD_ONE_HIGHLIGHT,
							payload: {uuid, item: {...item, path}},
						});
					} else {
						if (highlight[0].name === path.split('/').pop()) {
							dispatch({
								type: INITIALIZING_HIGHLIGHT,
								payload: {uuid},
							});
						}
						const corList = currentFileList[listindex];
						const firstIndex = corList.findIndex(
							(it) => it?.name === highlight[0].name,
						);
						compareNumber(corList, firstIndex, itemIndex);
					}
				}
			} else if (e.metaKey) {
				if (path !== pathList[listindex]) {
					if (
						tempItem !== null &&
						tempItem.path === pathList[listindex]
					) {
						dispatch(
							commandCdAction({
								socket: corSftpInfo.socket,
								path: path,
								uuid: uuid,
								cd_path: pathList[listindex],
							}),
						);
						dispatch({
							type: ADD_HIGHLIGHT,
							payload: {uuid, item: {...item, path}},
						});
						dispatch({
							type: ADD_HIGHLIGHT,
							payload: {uuid, item: {...tempItem.item, path}},
						});
						dispatch({
							type: REMOVE_TEMP_HIGHLIGHT,
							payload: {uuid},
						});
						return;
					}

					if (item.type === 'file') {
						dispatch(
							commandCdAction({
								socket: corSftpInfo.socket,
								path: path,
								uuid: uuid,
								cd_path: pathList[listindex],
							}),
						);
						dispatch({
							type: ADD_ONE_HIGHLIGHT,
							payload: {uuid, item: {...item, path}},
						});
					} else {
						dispatch(
							commandCdAction({
								socket: corSftpInfo.socket,
								path: path,
								uuid: uuid,
								cd_path: `${pathList[listindex]}/${item.name}`,
							}),
						);
						dispatch({
							type: TEMP_HIGHLIGHT,
							payload: {
								uuid,
								item,
								path: pathList[listindex],
							},
						});
					}
				} else {
					highlight.find((it) => it.name === item.name) === undefined
						? dispatch({
								type: ADD_HIGHLIGHT,
								payload: {uuid, item: {...item, path}},
						  })
						: dispatch({
								type: REMOVE_HIGHLIGHT,
								payload: {uuid, item: {...item, path}},
						  });
				}
			} else {
				const finalPath =
					item.type === 'directory'
						? pathList[listindex] === '/'
							? `${pathList[listindex]}${item.name}`
							: `${pathList[listindex]}/${item.name}`
						: pathList[listindex];
				if (path !== finalPath) {
					dispatch(
						commandCdAction({
							socket: corSftpInfo.socket,
							path: path,
							uuid: uuid,
							cd_path: finalPath,
						}),
					);
				}
				item.type === 'file' &&
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {uuid, item: {...item, path}},
					});
			}
		},
		[corSftpInfo, currentFileList, corListInfo],
	);

	const edit = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			if (item.name !== '..' && item.type !== 'directory') {
				dispatch({
					type: PUSH_READ_LIST,
					payload: {uuid, array: [{path, file: item, todo: 'edit'}]},
				});
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
		},
		[
			corServer,
			corSftpInfo,
			correspondedIdentity,
			userTicket,
			corListInfo,
			uuid,
		],
	);

	const download = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			if (item.name !== '..' && item.type !== 'directory') {
				// 현재는 디렉토리 다운로드 막아두었음.
				dispatch({
					type: PUSH_READ_LIST,
					payload: {uuid, array: [{path, file: item, todo: 'read'}]},
				});
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
		},
		[sftp, server, identity, tab, userTicket, corListInfo],
	);

	const contextMenuOpen = useCallback(
		({item, clickedPath}) => (e) => {
			e.preventDefault();
			e.stopPropagation();

			if (path !== clickedPath) {
				dispatch(
					commandCdAction({
						socket: corSftpInfo.socket,
						path: path,
						uuid: uuid,
						cd_path: clickedPath,
					}),
				);
			}

			console.log(highlight.length);
			console.log(item);
			console.log(clickedPath);

			highlight.length < 2 &&
				item !== undefined &&
				clickedPath !== undefined &&
				dispatch({
					type: ADD_ONE_HIGHLIGHT,
					payload: {uuid, item: {...item, path}},
				});
			show(e);
		},
		[corSftpInfo, corListInfo],
	);

	useEffect(() => {
		if (
			fileList.length === pathList.length &&
			pathList.length !== 0 &&
			fileList.length !== 0
		) {
			let nextList = [];
			fileList.forEach((v) => {
				nextList.push(
					sortFunction({
						fileList: v,
						keyword: sortKeyword,
						toggle: currentKey === sortKeyword ? toggle : true,
					}),
				);
			});
			setCurrentKey(sortKeyword);
			setCurrentFileList(nextList);
		}
	}, [fileList, sortKeyword, toggle, path]);
	return (
		<_Container>
			{currentFileList.map((listItem, listindex) => {
				return (
					<_Ul
						width={
							pathList.length - 1 === listindex
								? '500px'
								: '220px'
						}
						flex={pathList.length - 1 === listindex && 1}
						back={tabColor[theme]}
						color={fontColor[theme]}
						bcolor={
							pathList.length - 1 === listindex
								? 'transparent'
								: borderColor[theme]
						}
						id='fileList_ul'
						key={listindex}
						onContextMenu={contextMenuOpen({
							clickedPath: pathList[listindex],
						})}
					>
						{listItem.map((item, index) => {
							if (listindex === 0 && item.name === '..') return;
							return (
								item.name !== '.' && (
									<_Li
										className={'filelist_contents'}
										back={
											(highlight.findIndex(
												(it) =>
													it?.name === item.name &&
													path ===
														pathList[listindex],
											) > -1 &&
												fileListHighColor[theme]) ||
											(pathList[listindex + 1]
												?.split('/')
												.pop() === item.name &&
												highColor[theme]) ||
											tabColor[theme]
										}
										bcolor={borderColor[theme]}
										key={index}
										onContextMenu={contextMenuOpen({
											item,
											clickedPath: pathList[listindex],
										})}
										onClick={selectFile({
											item,
											listindex,
											itemIndex: index,
										})}
									>
										<_FirstItemContainer
											className={'filelist_contents'}
										>
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

											<div
												className={'filelist_contents'}
											>
												{item.name}
											</div>
										</_FirstItemContainer>
										{pathList.length - 1 === listindex && (
											<>
												<_ItemContainer
													className={
														'filelist_contents'
													}
												>
													{item.permission}
												</_ItemContainer>
												<_ButtonContainer>
													{item.type === 'file' &&
														item.name !== '..' && (
															<ClickableIconButton
																theme_value={
																	theme
																}
																margin_right={
																	'12px'
																}
																zIndex={1}
																onClick={edit(
																	item,
																)}
															>
																{editIcon}
															</ClickableIconButton>
														)}
													{item.name !== '..' && (
														<ClickableIconButton
															theme_value={theme}
															zIndex={1}
															margin_right={'0px'}
															onClick={download(
																item,
															)}
														>
															{fileDownloadIcon}
														</ClickableIconButton>
													)}
												</_ButtonContainer>
											</>
										)}
									</_Li>
								)
							);
						})}
					</_Ul>
				);
			})}
			<FileListContextMenu uuid={uuid} />
		</_Container>
	);
};

FileListDropDown.propTypes = {
	uuid: PropTypes.string.isRequired,
};
export default FileListDropDown;
