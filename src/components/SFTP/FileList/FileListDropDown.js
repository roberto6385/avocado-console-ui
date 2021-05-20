import React, {useCallback} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {DirectoryIcon, FileIcon} from '../../../styles/sftp';
import {useContextMenu} from 'react-contexify';
import FileListContextMenu from './FileListContextMenu';
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
import {Spinner} from 'react-bootstrap';
import {
	CLOUDY_BLUE,
	HIGHLIGHT_COLOR,
	light_Background,
	MAIN_COLOR,
} from '../../../styles/global';
import {BaseSpan, EllipsisSpan} from '../../../styles/texts';
import {BaseLi, DropListUl} from '../../../styles/lists';
import {RowBox} from '../../../styles/divs';
import {MdEdit, MdFileDownload} from 'react-icons/md';
import {PrevIconButton} from '../../../styles/buttons';
import styled from 'styled-components';

const DropList_Container = styled.div`
	display: flex;
`;

const DropList_li = styled.li``;

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
		<DropList_Container>
			{fileList.map((listItem, listindex) => {
				return (
					<DropListUl
						flex={pathList.length - 1 === listindex && 1}
						width={
							pathList.length - 1 === listindex ? '100%' : '250px'
						}
						back={light_Background}
						id='fileList_ul'
						key={listindex}
						onContextMenu={contextMenuOpen({
							clickedPath: pathList[listindex],
						})}
					>
						<BaseSpan padding={'4px'}>
							{/*{listindex === 0 && 'Name'}*/}
						</BaseSpan>
						{listItem.map((item, index) => {
							if (listindex === 0 && item.name === '..') return;
							return (
								item.name !== '.' && (
									<DropList_li
										back={
											(highlight.findIndex(
												(it) =>
													it?.name === item.name &&
													path ===
														pathList[listindex],
											) > -1 &&
												HIGHLIGHT_COLOR) ||
											(pathList[listindex + 1]
												?.split('/')
												.pop() === item.name &&
												CLOUDY_BLUE) ||
											light_Background
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
										<RowBox justify={'space-between'}>
											<EllipsisSpan
												className={'filelist_contents'}
											>
												{item.type === 'directory' ? (
													<DirectoryIcon />
												) : (
													<FileIcon />
												)}
												{item.name}
											</EllipsisSpan>
											{pathList.length - 1 ===
												listindex && (
												<RowBox>
													<BaseSpan>
														{item.permission}
													</BaseSpan>
													<RowBox
														width={'76px'}
														padding={'4px'}
														justify={'flex-end'}
													>
														{item.type === 'file' &&
															item.name !==
																'..' && (
																<PrevIconButton
																	zIndex={1}
																	onClick={edit(
																		item,
																	)}
																>
																	<MdEdit />
																</PrevIconButton>
															)}
														{item.name !== '..' && (
															<PrevIconButton
																zIndex={1}
																onClick={download(
																	item,
																)}
															>
																<MdFileDownload />
															</PrevIconButton>
														)}
													</RowBox>
												</RowBox>
											)}
										</RowBox>
									</DropList_li>
								)
							);
						})}
					</DropListUl>
				);
			})}
			<FileListContextMenu uuid={uuid} />
		</DropList_Container>
	) : (
		<Spinner style={{color: MAIN_COLOR}} animation='border' role='status' />
	);
};

FileListDropDown.propTypes = {
	uuid: PropTypes.string.isRequired,
};
export default FileListDropDown;
