import React, {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';

import BTable from 'react-bootstrap/Table';
import {GoFile, GoFileDirectory} from 'react-icons/go';
import {MdEdit, MdFileDownload} from 'react-icons/md';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {sendCommandByCd} from './commands/sendCommandCd';
import {sendCommandByGet} from './commands/sendCommandGet';
import {SFTP_SAVE_CURRENT_HIGHLIGHT} from '../../reducers/sftp';

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
	}

	tr.highlight_tbody.active {
		background: #edeae5;
		color: black;
	}
`;

const FileListContents = ({index, ws, uuid}) => {
	// const [progress, setProgress] = useState(initState);
	const {currentList, currentPath, currentHighlight} = useSelector(
		(state) => state.sftp,
	);
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const highlightItem = currentHighlight.find((item) => item.uuid === uuid);
	console.log(highlightItem);
	const dispatch = useDispatch();
	const [data, setData] = useState([]);

	const selectItem = (e, item) => {
		if (e.shiftKey) {
			const temp = highlightItem?.list;
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

	const download = (item) => {
		sendCommandByGet('get', ws, uuid, pathItem?.path, item.fileName);
	};

	useEffect(() => {
		setData(currentList.find((item) => item.uuid === uuid)?.list);
	}, [currentList]);

	return (
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
							style={{display: 'flex', cursor: 'pointer'}}
							key={index + uuid}
							className={
								highlightItem?.list.includes(item)
									? 'highlight_tbody active'
									: 'highlight_tbody'
							}
						>
							<CustomNameTh
								flex={10}
								// onClick={(e) => addSelectedFile(e, item)}
								onClick={(e) => selectItem(e, item)}
							>
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
							<CustomTh flex={3}>{item.lastModified}</CustomTh>
							<CustomTh flex={3}>{item.permission}</CustomTh>
							<CustomButtonTh
								disabled={item.fileType === 'directory' && true}
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
								onClick={() => download(item)}
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
	);
};

FileListContents.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default FileListContents;
