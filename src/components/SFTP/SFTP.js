import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import Edit from './Edit/Edit';
import {shallowEqual, useSelector} from 'react-redux';
import styled from 'styled-components';
import {fontColor, tabColor} from '../../styles/color';
import SFTPNav from './SFTPNav';
import HistoryContents from './History/HistoryContents';
import FileListContents from './FileList/FileListContents';
import FileListDropDown from './FileList/FileListDropDown';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	flex: 1 1 0;
	background: ${(props) => tabColor[props.theme_value]};

	.close-nav-sftp {
		margin-top: -50px;
	}
	.close-nav-header {
		transform: translateY(-50px);
	}
`;

const _SFTP = styled.div`
	display: flex;
	flex: 1 1 0;
	overflow: hidden;
	background: ${(props) => tabColor[props.theme_value]};
`;

const _ToggleButton = styled.button`
	width: 150px;
	border: none;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 2px;
	transition: transform 0.5s;
	box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
	background-color: ${(props) => tabColor[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
`;

const SFTPNavContainer = styled.div`
	display: flex;
	flex-direction: column;
	transition: transform 0.5s;
	background: ${(props) => tabColor[props.theme_value]};
`;

const SFTP = ({uuid}) => {
	const theme = useSelector((state) => state.common.theme);
	const nav = useSelector((state) => state.common.nav);
	const cols = useSelector((state) => state.common.cols);
	const {etc: sftp_etcState} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);
	const {mode} = useMemo(
		() => sftp_etcState.find((it) => it.uuid === uuid),
		[sftp_etcState, uuid],
	);

	const [toggle, setToggle] = useState(true);

	const onClickCloseNav = useCallback(() => {
		setToggle(!toggle);
	}, [toggle]);

	return mode === 'edit' ? (
		<_Container theme_value={theme}>
			<Edit uuid={uuid} />
		</_Container>
	) : (
		<_Container>
			<SFTPNavContainer
				theme_value={theme}
				className={!toggle && 'close-nav-header'}
			>
				<SFTPNav uuid={uuid} />
				{(nav.length === 1 || cols === 1) && (
					<_ToggleButton
						theme_value={theme}
						onClick={onClickCloseNav}
					>
						...
					</_ToggleButton>
				)}
			</SFTPNavContainer>
			<_SFTP theme_value={theme} className={!toggle && 'close-nav-sftp'}>
				{mode === 'list' ? (
					<FileListContents uuid={uuid} />
				) : (
					<FileListDropDown uuid={uuid} />
				)}
				<HistoryContents uuid={uuid} />
			</_SFTP>
		</_Container>
	);
};

SFTP.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTP;
