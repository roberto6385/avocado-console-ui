import React from 'react';
import {PropTypes} from 'prop-types';
import FileList from './FileList/FileList';
import History from './History/History';

import Edit from './Edit/Edit';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
const SFTP_Container = styled.div`
	display: flex;
	flex: 1 1 0;
	overflow: hidden;
`;

const SFTP = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {mode} = corServer;

	return mode === 'edit' ? (
		<Edit uuid={uuid} />
	) : (
		<SFTP_Container className={'hello_hello_hello_hello_hello'}>
			<FileList uuid={uuid} />
			<History uuid={uuid} />
		</SFTP_Container>
	);
};

SFTP.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTP;
