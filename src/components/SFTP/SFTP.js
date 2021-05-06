import React from 'react';
import {PropTypes} from 'prop-types';
import FileList from './FileList/FileList';
import History from './History/History';

import Edit from './Edit/Edit';
import {useSelector} from 'react-redux';
import {RowBox} from '../../styles/divs';

const SFTP = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {mode} = corServer;

	return mode === 'edit' ? (
		<Edit uuid={uuid} />
	) : (
		<RowBox flex={1} height={'100%'}>
			<FileList uuid={uuid} />
			<History uuid={uuid} />
		</RowBox>
	);
};

SFTP.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTP;
