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
import {SFTP_SAVE_CURRENT_HIGHLIGHT} from '../../reducers/sftp';
import {sendCommandByRm} from './commands/sendCommandRm';
import {sendCommandByLs} from './commands/sendCommandLs';

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
	z-index: 999;
	// width: 50px;
`;

const CustomThBtn = styled.button`
	background: transparent;
	border: none;
	font-size: 18px;
	line-height: 0px;
	padding: 0px;
	z-index: 999;
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
			);
		}
		// 마지막 percent 100 , ok 사이에서 디스패치 이벤트 실행
		dispatch({
			type: SFTP_SAVE_CURRENT_HIGHLIGHT,
			data: {uuid, list: []},
		});
	};

	const contextDelete = async () => {
		for await (const key of highlightItem?.list) {
			await sendCommandByRm(
				ws,
				uuid,
				pathItem?.path + '/' + key.fileName,
			);
		}
		sendCommandByLs(ws, uuid, pathItem?.path, dispatch);
		dispatch({
			type: SFTP_SAVE_CURRENT_HIGHLIGHT,
			data: {uuid, list: []},
		});
	};

	function handleItemClick({event}) {
		// setModalName(event.currentTarget.id);
		switch (event.currentTarget.id) {
			case 'Download':
				contextDownload();
				break;
			case 'Edit':
				// editFile(ws, uuid, fileObj?.path, selFile[0].fileName, dispatch);
				break;
			case 'New Folder':
				// setPlaceHolder("Untitled folder");
				// setFileName("");
				// handleOpen();
				break;
			case 'Rename':
				// setPlaceHolder("Please enter a name to change");
				// 원래 파일타입으로 구분해서 보내줬는데, 확장명 없는 파일 때문에 임시적으로 확장명까지 전체송신
				// if (selFile[0].fileType === 'file') {
				//     const fileExt = selFile[0].fileName.split('.')
				//     fileExt.pop()
				//     // const Extension = fileExt[fileExt.length - 1].trim()
				//     setFileName(fileExt.join('.'))
				// } else {
				//     setFileName(selFile[0].fileName)
				// }
				// setFileName(selFile[0].fileName);
				// handleOpen();
				break;
			case 'Delete':
				contextDelete();
				break;
			default:
				return;
		}
	}

	const selectItem = (e, item) => {
		if (e.shiftKey) {
			const temp = highlightItem?.list || [];
			const tempB = temp.concat(item);
			dispatch({
				type: SFTP_SAVE_CURRENT_HIGHLIGHT,
				data: {uuid, list: tempB},
			});
		} else {
			if (item.fileType === 'directory') {
				// 디렉토리 클릭시 해당 디렉토리로 이동
				sendCommandByCd(ws, uuid, item.fileName, dispatch);
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
		sendCommandByGet('get', ws, uuid, pathItem?.path, item.fileName).then();
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
				<thead
					style={{
						position: 'sticky',
						top: '0px',
						background: 'white',
						zIndex: 1,
					}}
				>
					<tr style={{display: 'flex'}}>
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
										item.fileType === 'directory' && true
									}
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
									onClick={(e) => download(e, item)}
									flex={0.3}
								>
									<CustomThBtn>
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
					disabled={highlightItem?.list.length !== 1}
					// id="Edit"
					// onClick={handleItemClick}
				>
					Edit
				</Item>
				<Separator />
				<Item
					id={'New Folder'}
					// onClick={handleItemClick}
				>
					New Folder
				</Item>
				<Item
					disabled={highlightItem?.list.length !== 1}
					// id='Rename'
					// onClick={handleItemClick}
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
		</>
	);
};

FileListContents.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default FileListContents;
