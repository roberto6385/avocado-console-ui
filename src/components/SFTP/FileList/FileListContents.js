import React, {useCallback, useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import {MdEdit, MdFileDownload} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import FileListContextMenu from './FileListContextMenu';
import {DirectoryIcon, FileIcon} from '../../../styles/sftp';
import TableHead from './FileListTableHead';
import {
	ADD_HIGHLIGHT,
	ADD_HISTORY,
	ADD_ONE_HIGHLIGHT,
	commandCdAction,
	commandGetAction,
	INITIALIZING_HIGHLIGHT,
	REMOVE_HIGHLIGHT,
} from '../../../reducers/sftp';
import {Spinner} from 'react-bootstrap';
import {light_Background, MAIN_COLOR} from '../../../styles/global';
import {SFTPBody} from '../../../styles/cards';
import {BaseTable, FileListP, Tbody, Th} from '../../../styles/tables';
import {IconButton} from '../../../styles/buttons';
import {
	formatByteSizeString,
	sortFunction,
	dataFormater,
} from '../listConversion';

const FileListContents = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {fileList, highlight, pathList, sortKeyword, toggle} = corServer;
	const dispatch = useDispatch();

	const [currentFileList, setCurrentFileList] = useState([]);
	const [currentKey, setCurrentKey] = useState(sortKeyword);

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
		[sftp],
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
		[sftp],
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
		[sftp],
	);

	const compareNumber = (list, first, second) => {
		dispatch({type: INITIALIZING_HIGHLIGHT, payload: {uuid}});

		if (first <= second) {
			for (let i = first; i <= second; i++) {
				dispatch({
					type: ADD_HIGHLIGHT,
					payload: {uuid, item: list[i]},
				});
			}
		} else {
			for (let i = first; i >= second; i--) {
				dispatch({
					type: ADD_HIGHLIGHT,
					payload: {uuid, item: list[i]},
				});
			}
		}
	};

	const selectItem = useCallback(
		({item, index}) => (e) => {
			if (e.metaKey) {
				!highlight.includes(item)
					? dispatch({
							type: ADD_HIGHLIGHT,
							payload: {uuid, item},
					  })
					: dispatch({type: REMOVE_HIGHLIGHT, payload: {uuid, item}});
			} else if (e.shiftKey) {
				if (highlight.length === 0) {
					dispatch({
						type: ADD_HIGHLIGHT,
						payload: {uuid, item},
					});
				} else {
					const corList = fileList[fileList.length - 1];
					const firstIndex = corList.findIndex(
						(it) => it.name === highlight[0].name,
					);
					compareNumber(corList, firstIndex, index);
				}
			} else {
				!highlight.includes(item) &&
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {uuid, item},
					});
			}
		},
		[sftp],
	);

	const changePath = useCallback(
		(item) => () => {
			if (item.type === 'directory') {
				// 디렉토리 클릭시 해당 디렉토리로 이동
				dispatch(commandCdAction({...corServer, newPath: item.name}));
				dispatch({type: INITIALIZING_HIGHLIGHT, payload: {uuid}});
			}
		},
		[sftp],
	);

	useEffect(() => {
		if (
			fileList.length === pathList.length &&
			pathList.length !== 0 &&
			fileList.length !== 0
		) {
			let nextList = fileList[fileList.length - 1];
			const sortedList = sortFunction({
				fileList: nextList,
				keyword: sortKeyword,
				toggle: currentKey === sortKeyword ? toggle : true,
			});
			setCurrentKey(sortKeyword);
			setCurrentFileList(sortedList);
		}
	}, [fileList, sortKeyword, toggle]);

	return currentFileList.length !== 0 ? (
		// return fileList.length === pathList.length ? (
		<SFTPBody flex={1}>
			<BaseTable back={light_Background}>
				<TableHead uuid={uuid} />
				<Tbody onContextMenu={contextMenuOpen}>
					{currentFileList.map((item, index) => {
						// . 파일은 표시하지 않음.
						if (
							pathList[pathList.length - 1] === '/' &&
							item.name === '..'
						)
							return;
						if (item.name === '.') return;
						return (
							<tr
								onContextMenu={(e) => contextMenuOpen(e, item)}
								onClick={selectItem({item, index})}
								onDoubleClick={changePath(item)}
								key={index + uuid}
								className={
									highlight.includes(item)
										? 'highlight_tbody active'
										: 'highlight_tbody'
								}
							>
								<Th min={'150px'} flex={1}>
									<FileListP className='filelist_contents'>
										{item.type === 'directory' ? (
											<DirectoryIcon />
										) : (
											<FileIcon />
										)}
										{item.name}
									</FileListP>
								</Th>
								<Th min={'100px'} textAlign='right'>
									{item.name !== '..' &&
										formatByteSizeString(item.size)}
								</Th>
								<Th min={'260px'}>
									{item.name !== '..' &&
										dataFormater({
											modify: item.lastModified,
											keyword: 'format',
										})}
								</Th>
								<Th min={'130px'}>{item.permission}</Th>
								<Th min={'100px'} textAlign={'right'}>
									{item.type === 'file' && (
										<IconButton
											zIndex={1}
											onClick={edit(item)}
										>
											<MdEdit />
										</IconButton>
									)}
									{item.name !== '..' && (
										<IconButton
											zIndex={1}
											onClick={download(item)}
										>
											<MdFileDownload />
										</IconButton>
									)}
								</Th>
							</tr>
						);
					})}
				</Tbody>
			</BaseTable>
			<FileListContextMenu uuid={uuid} />
		</SFTPBody>
	) : (
		<Spinner style={{color: MAIN_COLOR}} animation='border' role='status' />
	);
};

FileListContents.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListContents;
