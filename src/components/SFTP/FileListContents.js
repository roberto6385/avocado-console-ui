import React, {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import {GoFile, GoFileDirectory} from 'react-icons/go';
import {MdEdit, MdFileDownload} from 'react-icons/md';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {sendCommandByCd} from './commands/sendCommandCd';
import {sendCommandByGet} from './commands/sendCommandGet';
import {SFTP_SAVE_CURRENT_HIGHLIGHT} from '../../reducers/sftp';
import BTable from 'react-bootstrap/Table';
import {toEditMode} from './commands';
import ContextMenu from './ContextMenu';
import {HIGHLIGHT_COLOR} from '../../styles/global';

const CustomTable = styled(BTable)`
	white-space: nowrap;
	height: 100%;
	margin: 0;
	// 드래그 방지
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

const CustomTh = styled.th`
	flex: ${(props) => props.flex};
	text-align: left;
`;

const CustomRightTh = styled.th`
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
	tr.highlight_tbody {
		color: black;
		&:hover {
			background: ${HIGHLIGHT_COLOR};
		}
	}
	tr.highlight_tbody.active {
		background: ${HIGHLIGHT_COLOR};
	}
`;

const HeaderTr = styled.tr`
	display: flex;
	position: sticky;
	top: 0px;
	background: white;
	z-index: 999;
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
					<HeaderTr>
						<CustomTh flex={10}>Name</CustomTh>
						<CustomRightTh flex={2}>Size</CustomRightTh>
						<CustomTh flex={3}>Modified</CustomTh>
						<CustomTh flex={3}>Permission</CustomTh>
						<CustomRightTh flex={0.3}>
							<CustomThBtn disabled style={{color: 'white'}}>
								<MdFileDownload />
							</CustomThBtn>
						</CustomRightTh>
						<CustomRightTh flex={0.3}>
							<CustomThBtn disabled style={{color: 'white'}}>
								<MdFileDownload />
							</CustomThBtn>
						</CustomRightTh>
					</HeaderTr>
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
								<CustomTh flex={10}>
									{item.fileType === 'directory' ? (
										<GoFileDirectory />
									) : (
										<GoFile />
									)}
									{'\t'}
									{item.fileName}
								</CustomTh>
								<CustomRightTh flex={2}>
									{item.fileSize}
								</CustomRightTh>
								<CustomTh flex={3}>
									{item.lastModified}
								</CustomTh>
								<CustomTh flex={3}>{item.permission}</CustomTh>
								<CustomRightTh
									disabled={
										item.fileType === 'directory' ||
										(item.fileName === '..' && true)
									}
									onClick={(e) =>
										toEditMode(
											e,
											ws,
											uuid,
											pathItem?.path,
											item,
											dispatch,
										)
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
								</CustomRightTh>
								<CustomRightTh
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
								</CustomRightTh>
							</tr>
						);
					})}
				</CustomTbody>
			</CustomTable>
			<ContextMenu ws={ws} uuid={uuid} />
		</>
	);
};

FileListContents.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default FileListContents;
