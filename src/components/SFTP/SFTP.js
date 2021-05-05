import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import FileList from './FileList/FileList';
import History from './History/History';

import Edit from './Edit/Edit';
import {SftpContainer} from '../../styles/sftp';
import SplitPane, {Pane} from 'react-split-pane';
import {useSelector} from 'react-redux';
import {RowBox} from '../../styles/divs';

const SFTP_Component = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {mode} = corServer;

	const onChangeSize = useCallback((size) => {
		console.log(size);
	}, []);

	return (
		<SftpContainer>
			{mode === 'edit' ? (
				<Edit uuid={uuid} />
			) : (
				<RowBox>
					<FileList uuid={uuid} />
					<History uuid={uuid} />
				</RowBox>
			)}
		</SftpContainer>
	);
};

SFTP_Component.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTP_Component;
