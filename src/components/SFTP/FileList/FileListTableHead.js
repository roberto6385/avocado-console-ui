import React from 'react';
import {
	CustomRightTh,
	CustomTh,
	CustomThBtn,
	HeaderTr,
} from '../../../styles/sftp';
import {MdFileDownload} from 'react-icons/md';

const TableHead = () => {
	return (
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
	);
};

export default TableHead;
