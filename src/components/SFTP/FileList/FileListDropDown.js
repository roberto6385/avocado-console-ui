import React, {useCallback} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
	DirectoryIcon,
	DropdownLi,
	DropdownP,
	DropdownUl,
	FileIcon,
} from '../../../styles/sftp';
import {useContextMenu} from 'react-contexify';
import FileListContextMenu from './FileListContextMenu';
import {
	ADD_HIGHLIGHT,
	ADD_ONE_HIGHLIGHT,
	commandCdAction,
	INITIALIZING_HIGHLIGHT,
	REMOVE_HIGHLIGHT,
	REMOVE_TEMP_HIGHLIGHT,
	SAVE_TEMP_PATH,
	TEMP_HIGHLIGHT,
} from '../../../reducers/sftp';
import {Spinner} from 'react-bootstrap';
import {MAIN_COLOR} from '../../../styles/global';

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

	const contextMenuOpen = useCallback(
		({item, path}) => (e) => {
			e.preventDefault();
			displayMenu(e);
			e.stopPropagation();
			if (corServer.path !== path) {
				dispatch(
					commandCdAction({
						...corServer,
						newPath: path,
					}),
				);
			}

			dispatch({type: SAVE_TEMP_PATH, payload: {uuid, path}});

			console.log(item, path);
			highlight.length < 2 &&
				item !== undefined &&
				path !== undefined &&
				dispatch({
					type: ADD_ONE_HIGHLIGHT,
					payload: {uuid, item},
				});
		},
		[corServer],
	);

	return fileList.length === pathList.length ? (
		<>
			{fileList.map((listItem, listindex) => {
				return (
					<DropdownUl
						id='fileList_ul'
						key={listindex}
						onContextMenu={contextMenuOpen({
							path: pathList[listindex],
						})}
					>
						{listItem.map((item, index) => {
							return (
								<DropdownLi
									className={
										highlight.findIndex(
											(it) =>
												it?.name === item.name &&
												path === pathList[listindex],
										) === -1
											? 'highlight_list'
											: 'highlight_list active'
									}
									key={index}
									onContextMenu={contextMenuOpen({
										item,
										path: pathList[listindex],
									})}
									onClick={selectFile({
										item,
										listindex,
										itemIndex: index,
									})}
								>
									<DropdownP
										className={'highlight_list_p'}
										style={{
											color:
												pathList[listindex + 1]
													?.split('/')
													.pop() === item.name
													? MAIN_COLOR
													: 'black',
										}}
									>
										{item.type === 'directory' ? (
											<DirectoryIcon />
										) : (
											<FileIcon />
										)}
										{item.name}
									</DropdownP>
								</DropdownLi>
							);
						})}
					</DropdownUl>
				);
			})}
			<FileListContextMenu uuid={uuid} />
		</>
	) : (
		<Spinner style={{color: MAIN_COLOR}} animation='border' role='status' />
	);
};

FileListDropDown.propTypes = {
	uuid: PropTypes.string.isRequired,
};
export default FileListDropDown;
