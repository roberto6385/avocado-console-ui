import React, {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';

import BTable from 'react-bootstrap/Table';
import {GoFile, GoFileDirectory} from 'react-icons/go';
import {MdEdit, MdFileDownload} from 'react-icons/md';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

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
	// width: 50px;
`;

const CustomThBtn = styled.button`
	background: transparent;
	border: none;
	font-size: 18px;
	line-height: 0px;
	padding: 0px;
`;

const CustomTbody = styled.tbody`
	// flex: 1;
	// height: 100%;
	// tr.table_tr {
	// 	color: black;
	// }
	//
	// tr.table_tr.active {
	// 	background: #edeae5;
	// 	color: black;
	// }
`;

const columns = ['Name', 'Size', 'Modified', 'Permission'];

const FileListContents = ({index, ws, uuid}) => {
	// const [progress, setProgress] = useState(initState);
	const {currentList} = useSelector((state) => state.sftp);
	const [data, setData] = useState([]);
	// console.log(index); //tab id

	useEffect(() => {
		setData(currentList.find((item) => item.uuid === uuid)?.list);
		console.log(data);
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
						>
							<CustomNameTh
								flex={10}
								// onClick={(e) => addSelectedFile(e, item)}
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
							<CustomButtonTh flex={0.3}>
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
