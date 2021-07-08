import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import FileList from './FileList/FileList';
import History from './History/History';

import Edit from './Edit/Edit';
import {shallowEqual, useSelector} from 'react-redux';
import styled from 'styled-components';
import {sideColor} from '../../styles/color';

const _SFTP = styled.div`
	display: flex;
	flex: 1 1 0;
	overflow: hidden;
	background: ${(props) => props?.back};
`;

const SFTP = ({uuid}) => {
	const {etc: sftp_etcState} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);
	const theme = useSelector((state) => state.common.theme);

	const {mode} = useMemo(
		() => sftp_etcState.find((it) => it.uuid === uuid),
		[sftp_etcState, uuid],
	);

	return mode === 'edit' ? (
		<_SFTP>
			<Edit uuid={uuid} />
		</_SFTP>
	) : (
		<_SFTP back={sideColor[theme]}>
			<FileList uuid={uuid} />
			<History uuid={uuid} />
		</_SFTP>
	);
};

SFTP.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTP;
