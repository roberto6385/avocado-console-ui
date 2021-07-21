import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HistoryNav from './History/HistoryNav';
import FileListNav from './FileList/FileListNav';
import {borderColor, tabColor} from '../../styles/color';
import {useSelector} from 'react-redux';

const _Container = styled.div`
	display: flex;
	overflow: hidden;
	height: 50px;
	min-height: 50px;
	background: ${(props) => tabColor[props.theme_value]};
	border-bottom: 1px solid;
	border-color: ${(props) => borderColor[props.theme_value]};
`;

const SFTPNav = ({uuid}) => {
	const {theme} = useSelector((state) => state.common);

	return (
		<_Container theme_value={theme}>
			<FileListNav uuid={uuid} />
			<HistoryNav uuid={uuid} />
		</_Container>
	);
};

SFTPNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPNav;
