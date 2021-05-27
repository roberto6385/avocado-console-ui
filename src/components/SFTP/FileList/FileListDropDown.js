import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useContextMenu} from 'react-contexify';
import FileListContextMenu from '../../ContextMenu/FileListContextMenu';
import {
	ADD_HIGHLIGHT,
	ADD_HISTORY,
	ADD_ONE_HIGHLIGHT,
	commandCdAction,
	commandGetAction,
	INITIALIZING_HIGHLIGHT,
	REMOVE_HIGHLIGHT,
	REMOVE_TEMP_HIGHLIGHT,
	SAVE_TEMP_PATH,
	TEMP_HIGHLIGHT,
} from '../../../reducers/sftp';
import styled from 'styled-components';
import {
	CLOUDY_BLUE,
	HiddenScroll,
	ICON_MINT_COLOR,
	IconButton,
	IconContainer,
	LIGHT_BACK_COLOR,
	LIGHT_BACKGROUND_COLOR,
	PreventDragCopy,
} from '../../../styles/global';
import {
	editIcon,
	fileDownloadIcon,
	fileIcon,
	folderOpenIcon,
} from '../../../icons/icons';

const _Container = styled.div`
	display: flex;
	overflow: scroll;
	font-size: 14px;
`;

export const _ItemContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 0px;
	margin: 0px;
	justify-content: ${(props) => props?.justify};
`;

const _Ul = styled.ul`
	${PreventDragCopy}
	${HiddenScroll}

	width:${(props) => props.width};
	min-width: 250px;
	list-style: none;
	overflow-y: scroll;
	margin: 0px;
	padding: 0px;
	outline: none;
	position: relative;
	flex: ${(props) => props.flex};
	background: ${(props) => props.back};
`;

const _Span = styled.span`
	padding: 4px;
`;

const _EllipsisSpan = styled.span`
	margin: 0px;
	padding: 0px;
	width: 150px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const FileListDropDown = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {fileList, pathList, highlight, path, tempItem} = corServer;

	const dispatch = useDispatch();
	const {show} = useContextMenu({
		id: uuid + 'fileList',
	});
	function displayMenu(e) {
		show(e);
	}

	const compareNumber = (list, first, second) => {
		console.log(list);
		console.log(first);
		console.log(second);

		if (first === -1) {
			dispatch({
				type: ADD_HIGHLIGHT,
				payload: {uuid, item: list[second]},
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
					payload: {uuid, item: list[i]},
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
					payload: {uuid, item: list[i]},
				});
			}
		}
	};

	const selectFile = useCallback(
		({item, listindex, itemIndex}) => (e) => {
			if (e.shiftKey) {
				if (corServer.path !== pathList[listindex]) {
					dispatch(
						commandCdAction({
							...corServer,
							newPath: pathList[listindex],
						}),
					);
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {uuid, item},
					});
				} else {
					if (highlight.length === 0) {
						dispatch({
							type: ADD_ONE_HIGHLIGHT,
							payload: {uuid, item},
						});
					} else {
						if (highlight[0].name === path.split('/').pop()) {
							dispatch({
								type: INITIALIZING_HIGHLIGHT,
								payload: {uuid},
							});
						}
						const corList = fileList[listindex];
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
								...corServer,
								newPath: pathList[listindex],
							}),
						);
						dispatch({
							type: ADD_HIGHLIGHT,
							payload: {uuid, item},
						});
						dispatch({
							type: ADD_HIGHLIGHT,
							payload: {uuid, item: tempItem.item},
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
								...corServer,
								newPath: pathList[listindex],
							}),
						);
						dispatch({
							type: ADD_ONE_HIGHLIGHT,
							payload: {uuid, item},
						});
					} else {
						dispatch(
							commandCdAction({
								...corServer,
								newPath: `${pathList[listindex]}/${item.name}`,
							}),
						);
						dispatch({
							type: TEMP_HIGHLIGHT,
							payload: {uuid, item, path: pathList[listindex]},
						});
					}
				} else {
					highlight.find((it) => it.name === item.name) === undefined
						? dispatch({
								type: ADD_HIGHLIGHT,
								payload: {uuid, item},
						  })
						: dispatch({
								type: REMOVE_HIGHLIGHT,
								payload: {uuid, item},
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
							...corServer,
							newPath: finalPath,
						}),
					);
				}
				item.type === 'file' &&
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {uuid, item},
					});
			}
		},
		[corServer],
	);

	console.log('현재 하이라이팅 아이템');
	console.log(highlight);

	const edit = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			if (item.name !== '..' && item.type !== 'directory') {
				// 현재는 디렉토리 다운로드 막아두었음.
				dispatch(
					commandGetAction({
						...corServer,
						file: item,
						keyword: 'edit',
					}),
				);
			}
		},
		[sftp],
	);

	const download = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			if (item.name !== '..' && item.type !== 'directory') {
				// 현재는 디렉토리 다운로드 막아두었음.
				dispatch(
					commandGetAction({
						...corServer,
						file: item,
						keyword: 'get',
					}),
				);
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: item.name,
						size: item.size,
						todo: 'get',
						progress: 0,
					},
				});
			}
		},
		[sftp],
	);

	const contextMenuOpen = useCallback(
		({item, clickedPath}) => (e) => {
			e.preventDefault();
			e.stopPropagation();

			if (path !== clickedPath) {
				dispatch(
					commandCdAction({
						...corServer,
						newPath: clickedPath,
					}),
				);
			}

			dispatch({type: SAVE_TEMP_PATH, payload: {uuid, clickedPath}});

			highlight.length < 2 &&
				item !== undefined &&
				clickedPath !== undefined &&
				dispatch({
					type: ADD_ONE_HIGHLIGHT,
					payload: {uuid, item},
				});
			displayMenu(e);
		},
		[corServer],
	);

	return fileList.length === pathList.length ? (
		<_Container>
			{fileList.map((listItem, listindex) => {
				return (
					<_Ul
						flex={pathList.length - 1 === listindex && 1}
						width={
							pathList.length - 1 === listindex ? '100%' : '250px'
						}
						back={LIGHT_BACK_COLOR}
						id='fileList_ul'
						key={listindex}
						onContextMenu={contextMenuOpen({
							clickedPath: pathList[listindex],
						})}
					>
						<_Span>{/*{listindex === 0 && 'Name'}*/}</_Span>
						{listItem.map((item, index) => {
							if (listindex === 0 && item.name === '..') return;
							return (
								item.name !== '.' && (
									<ls
										back={
											(highlight.findIndex(
												(it) =>
													it?.name === item.name &&
													path ===
														pathList[listindex],
											) > -1 &&
												LIGHT_BACKGROUND_COLOR) ||
											(pathList[listindex + 1]
												?.split('/')
												.pop() === item.name &&
												CLOUDY_BLUE) ||
											LIGHT_BACK_COLOR
										}
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
										<_ItemContainer
											className={'filelist_contents'}
											justify={'space-between'}
										>
											<_ItemContainer>
												{item.type === 'directory' ? (
													<IconContainer
														color={ICON_MINT_COLOR}
														margin={`0px 8px 0px 0px`}
													>
														{folderOpenIcon}
													</IconContainer>
												) : (
													<IconContainer
														margin={`0px 8px 0px 0px`}
													>
														{fileIcon}
													</IconContainer>
												)}
												{item.name}
											</_ItemContainer>
											{pathList.length - 1 ===
												listindex && (
												<_ItemContainer>
													<_Span>
														{item.permission}
													</_Span>
													{item.type === 'file' &&
														item.name !== '..' && (
															<IconButton
																zIndex={1}
																onClick={edit(
																	item,
																)}
															>
																{editIcon}
															</IconButton>
														)}
													{item.name !== '..' && (
														<IconButton
															zIndex={1}
															onClick={download(
																item,
															)}
														>
															{fileDownloadIcon}
														</IconButton>
													)}
												</_ItemContainer>
											)}
										</_ItemContainer>
									</ls>
								)
							);
						})}
					</_Ul>
				);
			})}
			<FileListContextMenu uuid={uuid} />
		</_Container>
	) : (
		<div>loading...</div>
	);
};

FileListDropDown.propTypes = {
	uuid: PropTypes.string.isRequired,
};
export default FileListDropDown;
