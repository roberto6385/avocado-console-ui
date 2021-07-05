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
	REMOVE_HIGHLIGHT,
} from '../../../reducers/sftp/sftp';
import {
	formatByteSizeString,
	sortFunction,
	dataFormater,
} from '../listConversion';
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
	tabColor,
} from '../../../styles/color';
import LoadingSpinner from '../../loadingSpinner';
import styled from 'styled-components';

import {createNewWebsocket, PUSH_READ_LIST} from '../../../reducers/sftp/crud';

import {HiddenScroll, PreventDragCopy} from '../../../styles/function';
import {ClickableIconButton, IconBox} from '../../../styles/button';

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
	min-width: 778px;
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
	width: ${(props) => props?.min};
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
	padding: 12px 8px;
	background: ${(props) => props.back};
	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
	cursor: pointer;
	th {
		margin: 0px 8px !important;
	}
`;

const FileListContents = ({uuid}) => {
	const dispatch = useDispatch();
	const {sftp} = useSelector((state) => state.sftp);
	const {theme, lang, server, tab, identity} = useSelector(
		(state) => state.common,
	);
	const corSftpInfo = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const corTab = useMemo(() => tab.find((it) => it.uuid === uuid), [
		tab,
		uuid,
	]);
	const {userTicket} = useSelector((state) => state.userTicket);
	const corServer = useMemo(
		() => server.find((it) => it.key === corTab.server.key),
		[corTab],
	);

	const correspondedIdentity = useMemo(
		() =>
			identity.find(
				(it) => it.key === corTab.server.key && it.checked === true,
			),
		[identity, corTab],
	);
	const {
		path,
		fileList,
		highlight,
		pathList,
		sortKeyword,
		toggle,
	} = corSftpInfo;

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
				dispatch(
					createNewWebsocket({
						token: userTicket.access_token, // connection info
						host: corServer.host,
						port: corServer.port,
						user: correspondedIdentity.user,
						password: correspondedIdentity.password,
						todo: 'read',
						uuid: uuid,
					}),
				);
			}
		},
		[sftp, server, identity, tab, userTicket],
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
			!highlight
				.slice()
				.find(
					(v) =>
						JSON.stringify(v) === JSON.stringify({...item, path}),
				) &&
				item !== '' &&
				dispatch({
					type: ADD_ONE_HIGHLIGHT,
					payload: {uuid, item: {...item, path}},
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
					payload: {uuid, item: {...list[i], path}},
				});
			}
		} else {
			for (let i = first; i >= second; i--) {
				dispatch({
					type: ADD_HIGHLIGHT,
					payload: {uuid, item: {...list[i], path}},
				});
			}
		}
	};

	const selectItem = useCallback(
		({item, index}) => (e) => {
			if (item.name === '..') return;
			if (e.metaKey) {
				!highlight
					.slice()
					.find(
						(v) =>
							JSON.stringify(v) ===
							JSON.stringify({...item, path}),
					)
					? dispatch({
							type: ADD_HIGHLIGHT,
							payload: {uuid, item: {...item, path}},
					  })
					: dispatch({
							type: REMOVE_HIGHLIGHT,
							payload: {uuid, item: {...item, path}},
					  });
			} else if (e.shiftKey) {
				if (highlight.length === 0) {
					dispatch({
						type: ADD_HIGHLIGHT,
						payload: {uuid, item: {...item, path}},
					});
				} else {
					// const corList = fileList[fileList.length - 1];
					const firstIndex = currentFileList.findIndex(
						(it) => it.name === highlight[0].name,
					);
					compareNumber(currentFileList, firstIndex, index);
					// !highlight
					// 	.slice()
					// 	.find(
					// 		(v) =>
					// 			JSON.stringify(v) ===
					// 			JSON.stringify({...item, path}),
					// 	) &&
					// 	dispatch({
					// 		type: ADD_ONE_HIGHLIGHT,
					// 		payload: {uuid, item: {...item, path}},
					// 	});
				}
			} else {
				!highlight
					.slice()
					.find(
						(v) =>
							JSON.stringify(v) ===
							JSON.stringify({...item, path}),
					) &&
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {uuid, item: {...item, path}},
					});
			}
		},
		[highlight, uuid, path, currentFileList],
	);

	const changePath = useCallback(
		(item) => () => {
			if (item.type === 'directory') {
				// 디렉토리 클릭시 해당 디렉토리로 이동
				dispatch(
					commandCdAction({
						socket: corSftpInfo.socket,
						uuid: uuid,
						path: corSftpInfo.path,
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
			{currentFileList.length === 0 && <LoadingSpinner />}
			<_Table onContextMenu={contextMenuOpen()} back={tabColor[theme]}>
				<TableHead uuid={uuid} />
				<_Tbody active={fileListHighColor[theme]}>
					{currentFileList.map((item, index) => {
						// . 파일은 표시하지 않음.
						// item.name !== '..'
						if (item.name !== '.') {
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
										highlight.find(
											(v) =>
												JSON.stringify(v) ===
												JSON.stringify({...item, path}),
										)
											? 'filelist_contents active'
											: 'filelist_contents'
									}
								>
									<Th min={'150px'} flex={1}>
										{item.type === 'directory' ? (
											<IconBox
												margin_right={'8px'}
												color={activeColor[theme]}
											>
												{folderOpenIcon}
											</IconBox>
										) : (
											<IconBox
												margin_right={'8px'}
												theme_value={theme}
											>
												{fileIcon}
											</IconBox>
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
									<Th min={'80px'} justify={'flex-end'}>
										{item.type === 'file' && (
											<ClickableIconButton
												theme_value={theme}
												onClick={edit(item)}
											>
												{editIcon}
											</ClickableIconButton>
										)}
										{item.name !== '..' && (
											<ClickableIconButton
												theme_value={theme}
												onClick={download(item)}
											>
												{fileDownloadIcon}
											</ClickableIconButton>
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
