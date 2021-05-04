import React from 'react';
import {
	CustomRightTh,
	CustomTh,
	CustomThBtn,
	CustomTimeTh,
	FileListP,
	HeaderTr,
} from '../../../styles/sftp';
import {MdFileDownload} from 'react-icons/md';

const TableHead = () => {
	return (
		<thead>
			<HeaderTr>
				<CustomTh flex={10}>
					<FileListP>Name</FileListP>
				</CustomTh>
				<CustomRightTh flex={2}>Size</CustomRightTh>
				<CustomTimeTh flex={3}>Modified</CustomTimeTh>
				<CustomTh flex={3}>Permission</CustomTh>
				<CustomRightTh flex={0.3}>
					<CustomThBtn disabled style={{color: 'white'}}>
						<MdFileDownload />
					</CustomThBtn>
					<CustomThBtn disabled style={{color: 'white'}}>
						<MdFileDownload />
					</CustomThBtn>
				</CustomRightTh>
			</HeaderTr>
		</thead>
	);
};

export default TableHead;
