import React from 'react';
import PropTypes from 'prop-types';
import FileList from './FileList/FileList';
import History from './History/History';

import Edit from './Edit/Edit';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {backColor} from '../../styles/global';

const _SFTP = styled.div`
	display: flex;
	flex: 1 1 0;
	overflow: hidden;
	background: ${(props) => props?.back};
`;

const SFTP = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const {theme} = useSelector((state) => state.common);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {mode} = corServer;

	return mode === 'edit' ? (
		<_SFTP>
			<Edit uuid={uuid} />
		</_SFTP>
	) : (
		<_SFTP back={backColor[theme]}>
			<FileList uuid={uuid} />
			<History uuid={uuid} />
		</_SFTP>
	);
};

SFTP.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTP;
