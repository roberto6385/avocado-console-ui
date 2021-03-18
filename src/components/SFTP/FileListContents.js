import React, {useEffect} from 'react';
import {PropTypes} from 'prop-types';
import SFTP from '../../dist/sftp_pb';
import {useSelector} from 'react-redux';
import {sendCommandByPwd} from './commands';

const FileListContents = ({index, ws, uuid}) => {
	// const [progress, setProgress] = useState(initState);

	console.log(index); //tab id
	const {currentPath} = useSelector((state) => state.sftp);
	console.log(currentPath);

	useEffect(() => {
		sendCommandByPwd(ws, uuid);
	}, [ws, uuid]);

	return <div>FileListContents</div>;
};

FileListContents.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default FileListContents;
