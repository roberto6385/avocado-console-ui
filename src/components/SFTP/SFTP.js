import React from 'react';
import {PropTypes} from 'prop-types';
import FileList from './FileList/FileList';
import History from './History/History';

import {useSelector} from 'react-redux';
import Edit from './Edit/Edit';
import {SftpContainer} from '../../styles/sftp';

const SFTP_Component = ({server}) => {
	const {mode} = server;
	return (
		<SftpContainer>
			{mode === 'edit' ? (
				<Edit server={server} />
			) : (
				<>
					<FileList server={server} />
					<History server={server} />
				</>
			)}
		</SftpContainer>
	);
};

SFTP_Component.propTypes = {
	server: PropTypes.object.isRequired,
};

export default SFTP_Component;
