import React, {useCallback, useEffect, useState} from 'react';
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
	HiddenScroll,
	LIGHT_MODE_MINT_COLOR,
	IconButton,
	IconContainer,
	PreventDragCopy,
	THIRD_HEIGHT,
	serverFolderBackColor,
	sideColor,
	backColor,
	borderColor,
} from '../../../styles/global';
import {
	editIcon,
	fileDownloadIcon,
	fileIcon,
	folderOpenIcon,
} from '../../../icons/icons';
import {sortFunction} from '../listConversion';

const _Container = styled.div`
	display: flex;
	flex: 1;
	overflow-x: scroll;
	font-size: 14px;
`;

const _ItemContainer = styled.div`
	display: flex;
	align-items: center;
	flex: ${(props) => props?.flex};
	min-width: 200px;
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 0px;
	margin: 0px;
`;

const _ButtonContainer = styled.div`
	display: flex;
	width: 72px;
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
	border-color: ${(props) => props.b_color};
`;

const _Span = styled.span`
	padding: 4px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	min-width: 106px;
`;

const _Li = styled.li`
	background: ${(props) => props?.back};
	min-width: 220px;
	height: ${THIRD_HEIGHT};
	white-space: nowrap;
	padding: 16px 12px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid;
	border-color: ${(props) => props.b_color};
`;

const FileListDropDown = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const {theme} = useSelector((state) => state.common);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {
		fileList,
		pathList,
		highlight,
		path,
		tempItem,
		sortKeyword,
		toggle,
	} = corServer;
	const [currentFileList, setCurrentFileList] = useState([]);
	const [currentKey, setCurrentKey] = useState(sortKeyword);

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

	console.log(currentFileList);

	return (
		<_Container
		// className={
		// fileList.length === pathList.length && fileList.length !== 0
		// 	? ''
		// 	: 'blurEffect'
		// }
		>
			{currentFileList.map((listItem, listindex) => {
				return (
					<_Ul
						width={
							pathList.length - 1 === listindex
								? '500px'
								: '220px'
						}
						flex={pathList.length - 1 === listindex && 1}
						back={sideColor[theme]}
						b_color={
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
												serverFolderBackColor[theme]) ||
											(pathList[listindex + 1]
												?.split('/')
												.pop() === item.name &&
												backColor[theme]) ||
											sideColor[theme]
										}
										b_color={borderColor[theme]}
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
											flex={1}
											className={'filelist_contents'}
										>
											{item.type === 'directory' ? (
												<IconContainer
													color={LIGHT_MODE_MINT_COLOR}
													margin={`0px 4px 0px 0px`}
												>
													{folderOpenIcon}
												</IconContainer>
											) : (
												<IconContainer
													margin={`0px 4px 0px 0px`}
												>
													{fileIcon}
												</IconContainer>
											)}
											<_Span>{item.name}</_Span>
										</_ItemContainer>
										{pathList.length - 1 === listindex && (
											<>
												<_Span>{item.permission}</_Span>
												<_ButtonContainer>
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
