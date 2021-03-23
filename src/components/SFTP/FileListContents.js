import React, {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {
	animation,
	Item,
	Menu,
	Separator,
	useContextMenu,
} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import BTable from 'react-bootstrap/Table';
import {GoFile, GoFileDirectory} from 'react-icons/go';
import {MdEdit, MdFileDownload} from 'react-icons/md';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {sendCommandByCd} from './commands/sendCommandCd';
import {sendCommandByGet} from './commands/sendCommandGet';
import {
	SFTP_SAVE_CURRENT_HIGHLIGHT,
	SFTP_SAVE_CURRENT_MODE,
} from '../../reducers/sftp';
import {sendCommandByRm} from './commands/sendCommandRm';
import {sendCommandByLs} from './commands/sendCommandLs';
import ConfirmPopup from '../ConfirmPopup';

const CustomTable = styled(BTable)`
	white-space: nowrap;
	height: 100%;
	margin: 0;
`;

const CustomTh = styled.th`
	flex: ${(props) => props.flex};
	text-align: left;
	width: 140px;
	min-width: 120px;
`;
const CustomNameTh = styled.th`
	flex: ${(props) => props.flex};
	text-align: left;
`;

const CustomSizeTh = styled.th`
	flex: ${(props) => props.flex};
	text-align: right;
`;

const CustomButtonTh = styled.th`
	flex: ${(props) => props.flex};
	text-align: right;
	z-index: 1;
`;

const CustomThBtn = styled.button`
	background: transparent;
	border: none;
	font-size: 18px;
	line-height: 0px;
	padding: 0px;
	z-index: 1;
`;

const CustomTbody = styled.tbody`
	// flex: 1;
	// height: 100%;
	tr.highlight_tbody {
		color: black;
		&:hover {
			background: #edeae5;
		}
	}

	tr.highlight_tbody.active {
		background: #edeae5;
	}
`;

const FileListContents = ({index, ws, uuid}) => {
	// const [progress, setProgress] = useState(initState);
	const {currentList, currentPath, currentHighlight} = useSelector(
		(state) => state.sftp,
	);
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const highlightItem = currentHighlight.find((item) => item.uuid === uuid);
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [open, setOpen] = useState(false);
	const [keyword, setKeyword] = useState('');

	const MENU_ID = uuid;
	const {show} = useContextMenu({
		id: MENU_ID,
	});
	function displayMenu(e) {
		// pass the item id so the `onClick` on the `Item` has access to it
		show(e);
	}

	const contextDownload = async () => {
		for await (const key of highlightItem?.list) {
			await sendCommandByGet(
				'get',
				ws,
				uuid,
				pathItem?.path,
				key.fileName,
				dispatch,
			);
		}
		// 마지막 percent 100 , ok 사이에서 디스패치 이벤트 실행
		dispatch({
			type: SFTP_SAVE_CURRENT_HIGHLIGHT,
			data: {uuid, list: []},
		});
	};

	const contextEdit = (e) => {
		const item = highlightItem?.list[0];
		console.log(item);
		toEditMode(e, item);
	};

	function handleItemClick({event}) {
		setKeyword(event.currentTarget.id);
		switch (event.currentTarget.id) {
			case 'Download':
				contextDownload().then();
				break;
			case 'Edit':
				contextEdit(event);
				break;
			case 'New Folder':
				setOpen(true);
				break;
			case 'Rename':
				setOpen(true);
				break;
			case 'Delete':
				setOpen(true);
				break;
			default:
				return;
		}
	}

	const selectItem = (e, item) => {
		if (e.shiftKey) {
			const temp = highlightItem?.list || [];
			const tempB = highlightItem?.list.includes(item)
				? temp
				: temp.concat(item);
			dispatch({
				type: SFTP_SAVE_CURRENT_HIGHLIGHT,
				data: {uuid, list: tempB},
			});
		} else {
			if (item.fileType === 'directory') {
				// 디렉토리 클릭시 해당 디렉토리로 이동
				sendCommandByCd(ws, uuid, item.fileName, dispatch);
				dispatch({
					type: SFTP_SAVE_CURRENT_HIGHLIGHT,
					data: {uuid, list: []},
				});
			} else {
				//파일 클릭시 하이라이팅!
				if (highlightItem?.list.includes(item)) {
					dispatch({
						type: SFTP_SAVE_CURRENT_HIGHLIGHT,
						data: {uuid, list: []},
					});
				} else {
					dispatch({
						type: SFTP_SAVE_CURRENT_HIGHLIGHT,
						data: {uuid, list: [item]},
					});
				}
			}
		}
	};

	const download = (e, item) => {
		e.stopPropagation();
		if (item.fileName !== '..' && item.fileType !== 'directory') {
			// 현재는 디렉토리 다운로드 막아두었음.
			sendCommandByGet(
				'get',
				ws,
				uuid,
				pathItem?.path,
				item.fileName,
				dispatch,
			).then();
		}
	};

	const toEditMode = (e, item) => {
		e.stopPropagation();
		if (item.fileName !== '..' && item.fileType !== 'directory') {
			sendCommandByGet(
				'edit',
				ws,
				uuid,
				pathItem?.path,
				item.fileName,
				dispatch,
			).then();
			dispatch({
				type: SFTP_SAVE_CURRENT_MODE,
				data: {uuid, mode: 'edit'},
			});
		}
	};

	const contextMenuOpen = (e, item = '') => {
		e.preventDefault();
		// e.stopPropagation();
		displayMenu(e);
		if (
			highlightItem?.list.length < 2 ||
			!highlightItem?.list.includes(item)
		) {
			dispatch({
				type: SFTP_SAVE_CURRENT_HIGHLIGHT,
				data: {uuid, list: [item]},
			});
		}
	};

	useEffect(() => {
		setData(currentList.find((item) => item.uuid === uuid)?.list);
	}, [currentList]);

	return (
		<>
			<CustomTable>
				<thead>
					<tr
						style={{
							display: 'flex',
							position: 'sticky',
							top: '0px',
							background: 'white',
							zIndex: 999,
						}}
					>
						<CustomNameTh flex={10}>Name</CustomNameTh>
						<CustomSizeTh flex={2}>Size</CustomSizeTh>
						<CustomTh flex={3}>Modified</CustomTh>
						<CustomTh flex={3}>Permission</CustomTh>
						<CustomButtonTh flex={0.3}>
							<CustomThBtn disabled style={{color: 'white'}}>
								<MdFileDownload />
							</CustomThBtn>
						</CustomButtonTh>
						<CustomButtonTh flex={0.3}>
							<CustomThBtn disabled style={{color: 'white'}}>
								<MdFileDownload />
							</CustomThBtn>
						</CustomButtonTh>
					</tr>
				</thead>
				<CustomTbody>
					{data?.map((item, index) => {
						return (
							<tr
								onContextMenu={(e) => contextMenuOpen(e, item)}
								onClick={(e) => selectItem(e, item)}
								style={{display: 'flex', cursor: 'pointer'}}
								key={index + uuid}
								className={
									highlightItem?.list.includes(item)
										? 'highlight_tbody active'
										: 'highlight_tbody'
								}
							>
								<CustomNameTh flex={10}>
									{item.fileType === 'directory' ? (
										<GoFileDirectory />
									) : (
										<GoFile />
									)}
									{'\t'}
									{item.fileName}
								</CustomNameTh>
								<CustomSizeTh flex={2}>
									{item.fileSize}
								</CustomSizeTh>
								<CustomTh flex={3}>
									{item.lastModified}
								</CustomTh>
								<CustomTh flex={3}>{item.permission}</CustomTh>
								<CustomButtonTh
									disabled={
										item.fileType === 'directory' ||
										(item.fileName === '..' && true)
									}
									onClick={(e) => toEditMode(e, item)}
									flex={0.3}
								>
									<CustomThBtn
										style={{
											color:
												item.fileType === 'directory' &&
												'transparent',
										}}
									>
										<MdEdit />
									</CustomThBtn>
								</CustomButtonTh>
								<CustomButtonTh
									disabled={item.fileName === '..' && true}
									onClick={(e) => download(e, item)}
									flex={0.3}
								>
									<CustomThBtn
										style={{
											color:
												item.fileName === '..' &&
												'transparent',
										}}
									>
										<MdFileDownload />
									</CustomThBtn>
								</CustomButtonTh>
							</tr>
						);
					})}
				</CustomTbody>
			</CustomTable>
			<Menu
				id={MENU_ID}
				animation={animation.slide}
				style={{fontSize: '14px'}}
			>
				<Item
					disabled={highlightItem?.list.length === 0}
					id='Download'
					onClick={handleItemClick}
				>
					Download
				</Item>
				<Item
					disabled={
						highlightItem?.list.length !== 1 ||
						highlightItem?.list[0].fileType === 'directory'
					}
					id='Edit'
					onClick={handleItemClick}
				>
					Edit
				</Item>
				<Separator />
				<Item id='New Folder' onClick={handleItemClick}>
					New Folder
				</Item>
				<Item
					disabled={highlightItem?.list.length !== 1}
					id='Rename'
					onClick={handleItemClick}
				>
					Rename
				</Item>
				<Separator />
				<Item
					disabled={highlightItem?.list.length === 0}
					id='Delete'
					onClick={handleItemClick}
				>
					Delete
				</Item>
			</Menu>
			<ConfirmPopup
				keyword={keyword}
				open={open}
				setOpen={setOpen}
				ws={ws}
				uuid={uuid}
			/>
		</>
	);
};

FileListContents.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default FileListContents;
