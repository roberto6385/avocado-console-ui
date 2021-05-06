import React from 'react';
import {MdFileDownload} from 'react-icons/md';
import {CustomThBtn, CustomTimeTh, FileListP, Th} from '../../../styles/tables';

const TableHead = () => {
	return (
		<thead>
			<tr>
				<Th flex={10}>
					<FileListP>Name</FileListP>
				</Th>
				<Th flex={2}>Size</Th>
				<CustomTimeTh flex={3}>Modified</CustomTimeTh>
				<Th flex={3}>Permission</Th>
				<Th flex={0.3}>
					<CustomThBtn disabled style={{color: 'white'}}>
						<MdFileDownload />
					</CustomThBtn>
					<CustomThBtn disabled style={{color: 'white'}}>
						<MdFileDownload />
					</CustomThBtn>
				</Th>
			</tr>
		</thead>
	);
};

export default TableHead;
