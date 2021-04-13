import React from 'react';
import {PropTypes} from 'prop-types';
import FileList from './FileList/FileList';
import History from './History/History';

import {useSelector} from 'react-redux';
import Edit from './Edit/Edit';
import {SftpContainer} from '../../styles/sftp';

const SFTP_Component = ({index, socket}) => {
	const {currentMode} = useSelector((state) => state.sftp);
	const {uuid} = socket;

	const modeItem = currentMode.find((item) => item.uuid === uuid);

	return (
		<SftpContainer>
			{modeItem?.mode === 'edit' ? (
				<Edit socket={socket} />
			) : (
				<>
					<FileList index={index} socket={socket} />
					<History index={index} socket={socket} />
				</>
			)}
		</SftpContainer>
	);
};

SFTP_Component.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default SFTP_Component;
