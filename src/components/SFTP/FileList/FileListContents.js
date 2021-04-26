import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import {useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import {MdEdit, MdFileDownload} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
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
	ADD_HISTORY,
	ADD_ONE_HIGHLIGHT,
	commandCdAction,
	commandGetAction,
	REMOVE_HIGHLIGHT,
} from '../../../reducers/sftp';

const FileListContents = ({uuid}) => {
	const {server} = useSelector((state) => state.sftp);
	const corServer = server.find((it) => it.uuid === uuid);
	const {fileList, highlight} = corServer;
	const dispatch = useDispatch();

	const {show} = useContextMenu({
		id: uuid + 'fileList',
	});

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
		[corServer],
	);
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
		[corServer],
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
				!highlight.includes(item) &&
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {uuid, item},
					});
			}
		},
		[corServer],
	);

	const changePath = useCallback(
		(item) => () => {
			if (item.type === 'directory') {
				// 디렉토리 클릭시 해당 디렉토리로 이동
				dispatch(commandCdAction({...corServer, newPath: item.name}));
			}
		},
		[corServer],
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
								onDoubleClick={changePath(item)}
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
										{item.type === 'directory' ? (
											<DirectoryIcon />
										) : (
											<FileIcon />
										)}
										{item.name}
									</FileListP>
								</CustomNameTh>
								<CustomRightTh flex={2}>
									{item.name !== '..' && item.size}
								</CustomRightTh>
								<CustomTh flex={3}>
									{item.name !== '..' && item.lastModified}
								</CustomTh>
								<CustomTh flex={3}>{item.permission}</CustomTh>
								<CustomRightTh flex={0.3}>
									<CustomThBtn
										onClick={edit(item)}
										color={
											item.type === 'directory'
												? 'transparent'
												: 'black'
										}
									>
										<MdEdit />
									</CustomThBtn>
									<CustomThBtn
										onClick={download(item)}
										color={
											item.name === '..'
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
			<FileListContextMenu uuid={uuid} />
		</>
	);
};

FileListContents.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListContents;
