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
	const {server} = useSelector((state) => state.sftp);
	const corServer = server.find((it) => it.uuid === uuid);
	const {fileList, pathList, highlight, path} = corServer;

	const dispatch = useDispatch();
	const {show} = useContextMenu({
		id: uuid + 'fileList',
	});
	function displayMenu(e) {
		show(e);
	}

	// item.type === 'directory'
	// 	? dispatch(
	// 	commandCdAction({
	// 		...corServer,
	// 		newPath: `${pathList[listindex]}/${item.name}`,
	// 	}),
	// 	)
	// 	: dispatch(
	// 	commandCdAction({
	// 		...corServer,
	// 		newPath: `${pathList[listindex]}`,
	// 	}),
	// 	);

	const selectFile = useCallback(
		({item, listindex}) => (e) => {
			// 파일이 디렉토리 인데
			const finalPath =
				pathList[listindex] === '/'
					? `${pathList[listindex]}${item.name}`
					: `${pathList[listindex]}/${item.name}`;
			console.log(`path : ${path}`);
			console.log(`finalPath : ${finalPath}`);

			if (e.metaKey) {
				// command를 누르고 파일을 선택했는데
				if (item.type === 'directory') {
					if (path !== finalPath) {
						// 현재 경로가 해당 디렉토리가 아니라면
						dispatch(
							commandCdAction({
								// 경로를 이동시키고
								...corServer,
								newPath: pathList[listindex],
							}),
						);
					} else {
						// 해당 디렉토리면 하이라이팅을 한다.
						highlight.find(
							(it) =>
								it.item === item &&
								it.path === pathList[listindex],
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
					// command를 누르고 파일을 선택했는데 파일 형태가 file 이라면
					if (path === pathList[listindex]) {
						// 그 경로가 해당 디렉토리 라면
						// 하이리이팅 처리를 해준다
						highlight.find(
							(it) =>
								it.item === item &&
								it.path === pathList[listindex],
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
						// 선택한 파일의 경로가 현재 경로와 다르다면
						// 해당 파일의 경로로 경로를 이동시킨다
						dispatch(
							commandCdAction({
								...corServer,
								newPath: pathList[listindex],
							}),
						);
					}
				}
			} else {
				// 일반 클릭했을경우
				if (path === finalPath) return; // 이건 디렉토리 일 경우만 가능해서 자동 필터링 됨

				if (`${pathList[listindex]}` === path) {
					// 클릭한 아이템의 경로가 현재 경로인데
					if (item.type === 'directory') {
						// 타입이 디렉토리라면 해당 디렉토리로 이동
						dispatch(
							commandCdAction({
								...corServer,
								newPath: finalPath,
							}),
						);
						// 여기서 선택한 디렉토리 하이라이팅 해줘야 함.
					} else {
						// 타입이 파일이라면
						// 그냥 하이라이팅 해준다
						dispatch({
							type: ADD_ONE_HIGHLIGHT,
							payload: {
								uuid,
								item,
								path: pathList[listindex],
							},
						});
					}
				} else {
					// 클릭한 아이템의 경로가 현재 경로가 아니라면
					if (item.type === 'directory') {
						// 아이템의 타입이 디렉토리면
						// 해당 디렉토리로 이동시키고
						dispatch(
							commandCdAction({
								...corServer,
								newPath: `${pathList[listindex]}/${item.name}`,
							}),
						);
						// if (path !== finalPath) {
						// 	dispatch(
						// 		commandCdAction({
						// 			...corServer,
						// 			newPath: `${pathList[listindex]}/${item.name}`,
						// 		}),
						// 	);
					} else {
						// 타입이 파일이면
						// 해당 파일이 위치한 디렉토리로 이동시키고
						dispatch(
							commandCdAction({
								...corServer,
								newPath: `${pathList[listindex]}`,
							}),
						);
					}
				}
			}
		},
		[corServer],
	);

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

	console.log(highlight);

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
									className={
										highlight.find(
											(it) => it.item === item,
										) !== undefined
											? 'highlight_list active'
											: 'highlight_list'
									}
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
