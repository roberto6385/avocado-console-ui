import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HistoryToolbar from './History/HistoryToolbar';
import FileToolbar from './File/FileToolbar';

const _Container = styled.div`
	display: flex;
	overflow: hidden;
	height: 50px;
	min-height: 50px;
	border-bottom: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.border.color};
`;

const SFTPToolbar = ({uuid}) => {
	return (
		<_Container>
			<FileToolbar uuid={uuid} />
			<HistoryToolbar uuid={uuid} />
		</_Container>
	);
};

SFTPToolbar.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPToolbar;
