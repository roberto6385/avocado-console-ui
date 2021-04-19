import React, {useCallback, useRef} from 'react';
import {PropTypes} from 'prop-types';
import {useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import {MdEdit, MdFileDownload} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import FileListContextMenu from './FileListContextMenu';
import {
	CustomRightTh,
	CustomTable,
	CustomTbody,
	CustomTh,
	CustomThBtn,
	DirectoryIcon,
	FileIcon,
} from '../../../styles/sftp';
import TableHead from './FileListTableHead';
import {
	ADD_HIGHLIGHT,
	ADD_ONE_HIGHLIGHT,
	commandCdAction,
	REMOVE_HIGHLIGHT,
} from '../../../reducers/sftp';

const FileListContents = ({server}) => {
	const {uuid, fileList, highlight} = server;
	const dispatch = useDispatch();
	console.log(highlight);

	const {show} = useContextMenu({
		id: uuid + 'fileList',
	});

	const download = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			if (item.fileName !== '..' && item.fileType !== 'directory') {
				// 현재는 디렉토리 다운로드 막아두었음.
				// downloadWork('list', [item]);
			}
		},
		[],
	);

	const contextMenuOpen = useCallback(
		(e, item = '') => {
			e.preventDefault();
			show(e);
			e.stopPropagation();
			if (item === '') {
				dispatch({
					type: ADD_ONE_HIGHLIGHT,
					payload: {uuid, item: null},
				});
			} else {
				highlight.length < 2 &&
					!highlight.includes(item) &&
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {uuid, item},
					});
			}
		},
		[server],
	);

	const selectItem = useCallback(
		(item) => (e) => {
			if (e.shiftKey) {
				!highlight.includes(item)
					? dispatch({
							type: ADD_HIGHLIGHT,
							payload: {uuid, item},
					  })
					: dispatch({type: REMOVE_HIGHLIGHT, payload: {uuid, item}});
			} else {
				if (item.fileType === 'directory') {
					// 디렉토리 클릭시 해당 디렉토리로 이동
					dispatch(
						commandCdAction({...server, newPath: item.fileName}),
					);
				} else {
					//파일 클릭시 하이라이팅!
					!highlight.includes(item) &&
						dispatch({
							type: ADD_ONE_HIGHLIGHT,
							payload: {uuid, item},
						});
				}
			}
		},
		[server],
	);

	return (
		<>
			<CustomTable>
				<TableHead />
				<CustomTbody
					id='filelist_tbody'
					onContextMenu={contextMenuOpen}
				>
					{fileList[fileList.length - 1]?.map((item, index) => {
						return (
							<tr
								onContextMenu={(e) => contextMenuOpen(e, item)}
								onClick={selectItem(item)}
								style={{display: 'flex', cursor: 'pointer'}}
								key={index + uuid}
								className={
									highlight.includes(item)
										? 'highlight_tbody active'
										: 'highlight_tbody'
								}
							>
								<CustomTh flex={10}>
									{item.fileType === 'directory' ? (
										<DirectoryIcon />
									) : (
										<FileIcon />
									)}
									{item.fileName}
								</CustomTh>
								<CustomRightTh flex={2}>
									{item.fileName !== '..' && item.fileSize}
								</CustomRightTh>
								<CustomTh flex={3}>
									{item.fileName !== '..' &&
										item.lastModified}
								</CustomTh>
								<CustomTh flex={3}>{item.permission}</CustomTh>
								<CustomRightTh
									disabled={
										item.fileType === 'directory' ||
										(item.fileName === '..' && true)
									}
									// 편집모드
									// onClick={(e) =>
									// toEditMode(
									// 	e,
									// 	socket,
									// 	uuid,
									// 	'',
									// 	item,
									// 	dispatch,
									// 	'list',
									// )
									// }
									flex={0.3}
								>
									<CustomThBtn
										color={
											item.fileType === 'directory'
												? 'transparent'
												: 'black'
										}
									>
										<MdEdit />
									</CustomThBtn>
								</CustomRightTh>
								<CustomRightTh
									disabled={item.fileName === '..' && true}
									onClick={download(item)}
									flex={0.3}
								>
									<CustomThBtn
										color={
											item.fileName === '..'
												? 'transparent'
												: 'black'
										}
									>
										<MdFileDownload />
									</CustomThBtn>
								</CustomRightTh>
							</tr>
						);
					})}
				</CustomTbody>
			</CustomTable>
			<FileListContextMenu server={server} />
		</>
	);
};

FileListContents.propTypes = {
	server: PropTypes.object.isRequired,
};

export default FileListContents;
