import React, {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

// const CustomTable = styled(Table)``;

const FileListContents = ({index, ws, uuid}) => {
	// const [progress, setProgress] = useState(initState);
	const {currentList} = useSelector((state) => state.sftp);
	const [data, setData] = useState([]);
	// console.log(index); //tab id

	useEffect(() => {
		setData(currentList.find((item) => item.uuid === uuid)?.list);
		console.log(currentList);
	}, [currentList]);

	return <div></div>;
};

FileListContents.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default FileListContents;
