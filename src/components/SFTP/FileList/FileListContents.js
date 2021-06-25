import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import {useDispatch, useSelector} from 'react-redux';
import FileListContextMenu from '../../ContextMenu/FileListContextMenu';
import TableHead from './FileListTableHead';
import {
	ADD_HIGHLIGHT,
	ADD_ONE_HIGHLIGHT,
	commandCdAction,
	INITIALIZING_HIGHLIGHT,
	PUSH_READ_LIST,
	REMOVE_HIGHLIGHT,
} from '../../../reducers/sftp';
import {
	formatByteSizeString,
	sortFunction,
	dataFormater,
} from '../listConversion';
import styled from 'styled-components';
import {
	HiddenScroll,
	IconButton,
	IconContainer,
	PreventDragCopy,
} from '../../../styles/global';
import {
	editIcon,
	fileDownloadIcon,
	fileIcon,
	folderOpenIcon,
} from '../../../icons/icons';
import {FONT_14, HEIGHT_48} from '../../../styles/length';
import {
	activeColor,
	borderColor,
	fileListHighColor,
	fontColor,
	iconColor,
	tabColor,
} from '../../../styles/color';

const _Table = styled.table`
	display: flex;
	background: ${(props) => props?.back};
	position: relative;
	flex: 1;
	flex-direction: column;
	font-size: ${FONT_14};
	overflow: scroll;
	margin: 0;
	padding: 0;
	border: none;
	${PreventDragCopy};
	${HiddenScroll};
`;

const _Tbody = styled.tbody`
	background: ${(props) => props?.back};
	flex: 1;
	width: 100%;
	min-width: 718px;
	position: absolute;
	top: ${HEIGHT_48};
	.active {
		background: ${(props) => props.active};
	}
`;

const Th = styled.th`
	display: flex;
	align-items: center;
	min-width: ${(props) => props?.min};
	flex: ${(props) => props.flex};
	justify-content: ${(props) => props.justify || 'flex-start'};
	white-space: nowrap;
	border: none !important;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const _Tr = styled.tr`
	display: flex;
	height: ${HEIGHT_48};
	color: ${(props) => props.color};
	padding: 8px;
	background: ${(props) => props.back};
	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
	cursor: pointer;
	th {
		padding: 8px !important;
	}
`;

const FileListContents = ({uuid}) => {
	const dispatch = useDispatch();
	const {sftp} = useSelector((state) => state.sftp);
	const {theme, lang} = useSelector((state) => state.common);
	const corServer = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const {
		path,
		fileList,
		highlight,
		pathList,
		sortKeyword,
		toggle,
	} = corServer;
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
				dispatch({
					type: PUSH_READ_LIST,
					payload: {uuid, array: [{path, file: item, todo: 'read'}]},
				});
			}
		},
		[sftp],
	);
	const edit = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			console.log(item);
			if (item.name !== '..' && item.type !== 'directory') {
				dispatch({
					type: PUSH_READ_LIST,
					payload: {uuid, array: [{path, file: item, todo: 'edit'}]},
				});
			}
		},
		[sftp],
	);

	const contextMenuOpen = useCallback(
		(item = '') => (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (item.name === '..' || item.name === '') return;
			show(e);
			!highlight.slice().includes(item) &&
				item !== '' &&
				dispatch({
					type: ADD_ONE_HIGHLIGHT,
					payload: {uuid, item},
				});
		},
		[dispatch, highlight],
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
			if (item.name === '..') return;
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
				dispatch(
					commandCdAction({
						socket: corServer.socket,
						uuid: uuid,
						path: corServer.path,
						cd_path: item.name,
					}),
				);
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
	}, [fileList, pathList, sortKeyword, toggle]);

	return (
		<React.Fragment>
			<_Table onContextMenu={contextMenuOpen()} back={tabColor[theme]}>
				<TableHead uuid={uuid} />
				<_Tbody
					active={fileListHighColor[theme]}
					// className={
					// 	fileList.length === pathList.length &&
					// 	currentFileList.length !== 0
					// 		? ''
					// 		: 'blurEffect'
					// }
				>
					{currentFileList.map((item, index) => {
						// . 파일은 표시하지 않음.
						// item.name !== '..'
						if (item.name === '.') {
							return;
						} else {
							return (
								<_Tr
									back={tabColor[theme]}
									color={fontColor[theme]}
									bcolor={borderColor[theme]}
									onContextMenu={contextMenuOpen(item)}
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
										{item.type === 'directory' ? (
											<IconContainer
												color={activeColor[theme]}
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

										<span className='filelist_contents'>
											{item.name}
										</span>
									</Th>
									<Th min={'135px'} justify='flex-end'>
										{item.name !== '..' &&
											formatByteSizeString(item.size)}
									</Th>
									<Th min={'212px'}>
										{item.name !== '..' &&
											dataFormater({
												modify: item.lastModified,
												keyword: 'format',
												language: lang,
											})}
									</Th>
									<Th min={'105px'}>{item.permission}</Th>
									<Th min={'100px'} justify={'flex-end'}>
										{item.type === 'file' && (
											<IconButton
												color={iconColor[theme]}
												onClick={edit(item)}
											>
												{editIcon}
											</IconButton>
										)}
										{item.name !== '..' && (
											<IconButton
												color={iconColor[theme]}
												onClick={download(item)}
											>
												{fileDownloadIcon}
											</IconButton>
										)}
									</Th>
								</_Tr>
							);
						}
					})}
				</_Tbody>
			</_Table>
			<FileListContextMenu uuid={uuid} />
		</React.Fragment>
	);
};

FileListContents.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListContents;
