import React, {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {useSelector} from 'react-redux';
import {AutoSizer, Column, Table} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

const FileListContents = ({index, ws, uuid}) => {
	// const [progress, setProgress] = useState(initState);
	const {currentList} = useSelector((state) => state.sftp);
	const [data, setData] = useState([]);
	// console.log(index); //tab id

	useEffect(() => {
		setData(currentList.find((item) => item.uuid === uuid)?.list);
		console.log(currentList);
	}, [currentList]);

	return (
		data?.length !== 0 &&
		data !== undefined && (
			<AutoSizer>
				{({height, width}) => (
					<Table
						width={500}
						height={300}
						headerHeight={20}
						rowHeight={30}
						rowCount={data?.length}
						rowGetter={({index}) => data[index]}
					>
						<Column label='Name' dataKey='fileName' width={300} />
						<Column label='Size' dataKey='fileSize' width={100} />
						<Column
							label='Modified'
							dataKey='lastModified'
							width={200}
						/>
						<Column
							label='Permission'
							dataKey='permission'
							width={200}
						/>
					</Table>
				)}
			</AutoSizer>
		)
	);
};

FileListContents.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default FileListContents;
