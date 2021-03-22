import React from 'react';
import {PropTypes} from 'prop-types';
import Dropzone from './Dropzone';
import {sendCommandByPut} from './commands/sendCommandPut';
import {sendCommandByLs} from './commands/sendCommandLs';
import {useDispatch, useSelector} from 'react-redux';

const HistoryContents = ({index, ws, uuid}) => {
	const {currentPath} = useSelector((state) => state.sftp);
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const dispatch = useDispatch();

	const upload = async (files) => {
		// console.log(files);
		for await (const key of files) {
			// console.log(key);
			await sendCommandByPut(
				'put',
				key,
				ws,
				uuid,
				pathItem?.path,
				key.name,
			);
		}
		sendCommandByLs(ws, uuid, pathItem?.path, dispatch);
	};
	return (
		<Dropzone onDrop={(files) => upload(files)}>HistoryContents</Dropzone>
	);
};
HistoryContents.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default HistoryContents;
