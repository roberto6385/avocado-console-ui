import React, {useEffect} from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {listConversion, sendCommandByLs, sendCommandByPwd} from './commands';

const FileListContents = ({index, ws, uuid}) => {
	// const [progress, setProgress] = useState(initState);
	const dispatch = useDispatch();
	// console.log(index); //tab id
	const {currentPath} = useSelector((state) => state.sftp);

	useEffect(() => {
		sendCommandByPwd(ws, uuid, dispatch)
			.then((result) => sendCommandByLs(ws, uuid, result))
			.then((result) => listConversion(result))
			.then((result) => console.log(result));
	}, [ws, uuid, dispatch]);

	return <div>FileListContents</div>;
};

FileListContents.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default FileListContents;
