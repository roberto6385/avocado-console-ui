import React from 'react';
import {PropTypes} from 'prop-types';
import FileList from './FileList/FileList';
import History from './History/History';

import {useSelector} from 'react-redux';
import Edit from './Edit/Edit';
import {SftpContainer} from '../../styles/sftp';

const SFTP_COMPONENT = ({index, socket, serverId}) => {
	const {ws, uuid} = socket;

	const {currentMode} = useSelector((state) => state.sftp);
	const modeItem = currentMode.find((item) => item.uuid === uuid);

	return (
		<SftpContainer>
			{modeItem?.mode === 'edit' ? (
				<Edit index={index} socket={socket} />
			) : (
				<>
					<FileList index={index} socket={socket} />
					<History
						index={index}
						socket={socket}
						serverId={serverId}
					/>
				</>
			)}
		</SftpContainer>
	);
};

SFTP_COMPONENT.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
	serverId: PropTypes.number.isRequired,
};

export default SFTP_COMPONENT;
