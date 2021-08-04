import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HistoryNav from './History/HistoryNav';
import FileListNav from './FileList/FileListNav';

const _Container = styled.div`
	display: flex;
	overflow: hidden;
	height: 50px;
	min-height: 50px;
	border-bottom: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.border.color};
`;

const SFTPNav = ({uuid}) => {
	return (
		<_Container>
			<FileListNav uuid={uuid} />
			<HistoryNav uuid={uuid} />
		</_Container>
	);
};

SFTPNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPNav;
