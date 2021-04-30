import React, {useCallback} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
	DirectoryIcon,
	DropdownLi,
	DropdownUl,
	FileIcon,
} from '../../../styles/sftp';
import {useContextMenu} from 'react-contexify';
import FileListContextMenu from './FileListContextMenu';
import {
	ADD_HIGHLIGHT,
	ADD_ONE_HIGHLIGHT,
	commandCdAction,
	REMOVE_HIGHLIGHT,
	SAVE_TEMP_PATH,
} from '../../../reducers/sftp';

const FileListDropDown = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {fileList, pathList, highlight, path} = corServer;

	const dispatch = useDispatch();
	const {show} = useContextMenu({
		id: uuid + 'fileList',
	});
	function displayMenu(e) {
		show(e);
	}

	// 여러 아이템 하이라이팅!
	// highlight.find(
	// 	(it) =>
	// 		it.item === item && it.path === pathList[listindex],
	// ) === undefined
	// 	? dispatch({
	// 		type: ADD_HIGHLIGHT,
	// 		payload: {
	// 			uuid,
	// 			item,
	// 			path: pathList[listindex],
	// 		},
	// 	})
	// 	: dispatch({
	// 		type: REMOVE_HIGHLIGHT,
	// 		payload: {uuid, item},
	// 	});

	// 단일 아이템 하이라이팅
	// dispatch({
	// 	type: ADD_ONE_HIGHLIGHT,
	// 	payload: {
	// 		uuid,
	// 		item,
	// 		path: pathList[listindex],
	// 	},
	// });

	const selectFile = useCallback(
		({item, listindex}) => (e) => {
			const finalPath =
				// 타입이 디렉토리면 해당 디렉토리로 내부 경로
				// 파일이면 해당 파일의 경로
				item.type === 'directory'
					? pathList[listindex] === '/'
						? `${pathList[listindex]}${item.name}`
						: `${pathList[listindex]}/${item.name}`
					: pathList[listindex];

			/// 여기서 부터 case 나누기
			if (path !== finalPath) {
				if (highlight.length === 0) {
					console.log('하이라이팅 아이템 없음.');
					console.log(
						'선택한 아이템의 경로가 현재 경로와 다르므로 경로 이동합니다!',
					);
					console.log(finalPath);
					dispatch(
						commandCdAction({
							...corServer,
							newPath: finalPath,
						}),
					);
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {
							uuid,
							item,
							path: pathList[listindex],
						},
					});
				} else {
					console.log(
						'하이라이팅 아이템 존재. 외부 경로에서 아이템 추가.',
					);
					highlight.find(
						(it) =>
							it.item === item && it.path === pathList[listindex],
					) === undefined
						? dispatch({
								type: ADD_HIGHLIGHT,
								payload: {
									uuid,
									item,
									path: pathList[listindex],
								},
						  })
						: dispatch({
								type: REMOVE_HIGHLIGHT,
								payload: {uuid, item},
						  });
				}
			} else {
				console.log('현재 경로의 아이템 입니다!!');
				if (e.metaKey) {
					// press key with command key
					// 여러 아이템 하이라이팅!
					highlight.find(
						(it) =>
							it.item === item && it.path === pathList[listindex],
					) === undefined
						? dispatch({
								type: ADD_HIGHLIGHT,
								payload: {
									uuid,
									item,
									path: pathList[listindex],
								},
						  })
						: dispatch({
								type: REMOVE_HIGHLIGHT,
								payload: {uuid, item},
						  });
				} else {
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {
							uuid,
							item,
							path: pathList[listindex],
						},
					});
				}
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
			dispatch({type: SAVE_TEMP_PATH, payload: {uuid, path}});

			console.log(item, path);
			highlight.length < 2 &&
				item !== undefined &&
				path !== undefined &&
				dispatch({
					type: ADD_ONE_HIGHLIGHT,
					payload: {uuid, item, path},
				});
		},
		[corServer],
	);

	return fileList !== undefined ? (
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
									// className={
									// 	highlight.findIndex(
									// 		(it) => it.item === item,
									// 	) === -1
									// 		? 'highlight_list'
									// 		: 'highlight_list active'
									// }
									key={index}
									onContextMenu={contextMenuOpen({
										item,
										path: pathList[listindex],
									})}
									onClick={selectFile({
										item,
										listindex,
									})}
								>
									<p
										className={'highlight_list_p'}
										style={{
											margin: 0,
											padding: 0,
											color:
												pathList[listindex + 1]
													?.split('/')
													.pop() === item.name
													? 'red'
													: 'black',
										}}
									>
										{item.type === 'directory' ? (
											<DirectoryIcon />
										) : (
											<FileIcon />
										)}
										{item.name}
									</p>
								</DropdownLi>
							);
						})}
					</DropdownUl>
				);
			})}
			<FileListContextMenu uuid={uuid} />
		</>
	) : (
		<div>loading...</div>
	);
};

FileListDropDown.propTypes = {
	uuid: PropTypes.string.isRequired,
};
export default FileListDropDown;
