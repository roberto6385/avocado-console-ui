import React, {useCallback, useRef} from 'react';
import {PropTypes} from 'prop-types';
import {useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import {MdEdit, MdFileDownload} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import FileListContextMenu from './FileListContextMenu';
import {
	CustomNameTh,
	CustomRightTh,
	CustomTable,
	CustomTbody,
	CustomTh,
	CustomThBtn,
	DirectoryIcon,
	FileIcon,
	FileListP,
} from '../../../styles/sftp';
import TableHead from './FileListTableHead';
import {
	ADD_HIGHLIGHT,
	ADD_ONE_HIGHLIGHT,
	commandCdAction,
	commandGetAction,
	REMOVE_HIGHLIGHT,
} from '../../../reducers/sftp';

const FileListContents = ({server}) => {
	const {uuid, fileList, highlight} = server;
	const dispatch = useDispatch();

	const {show} = useContextMenu({
		id: uuid + 'fileList',
	});

	const download = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			console.log(server);
			if (item.fileName !== '..' && item.fileType !== 'directory') {
				// 현재는 디렉토리 다운로드 막아두었음.
				dispatch(
					commandGetAction({...server, fileName: item.fileName}),
				);
			}
		},
		[server],
	);

	const contextMenuOpen = useCallback(
		(e, item = '') => {
			e.preventDefault();
			show(e);
			e.stopPropagation();
			item !== '' &&
				// highlight.length < 2 &&
				!highlight.includes(item) &&
				dispatch({
					type: ADD_ONE_HIGHLIGHT,
					payload: {uuid, item},
				});
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
								<CustomNameTh flex={10}>
									<FileListP className='filelist_p'>
										{item.fileType === 'directory' ? (
											<DirectoryIcon />
										) : (
											<FileIcon />
										)}
										{item.fileName}
									</FileListP>
								</CustomNameTh>
								<CustomRightTh flex={2}>
									{item.fileName !== '..' && item.fileSize}
								</CustomRightTh>
								<CustomTh flex={3}>
									{item.fileName !== '..' &&
										item.lastModified}
								</CustomTh>
								<CustomTh flex={3}>{item.permission}</CustomTh>
								<CustomRightTh
									onClick={download(item)}
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
