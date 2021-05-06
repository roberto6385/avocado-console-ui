import React from 'react';
import {FileListP, Th} from '../../../styles/tables';

const TableHead = () => {
	return (
		<thead>
			<tr>
				<Th min={'150px'} flex={1}>
					<FileListP>Name</FileListP>
				</Th>
				<Th min={'130px'} textAlign='right'>
					Size
				</Th>
				<Th min={'200px'}>Modified</Th>
				<Th min={'130px'}>Permission</Th>
				<Th min={'100px'} />
			</tr>
		</thead>
	);
};

export default TableHead;
