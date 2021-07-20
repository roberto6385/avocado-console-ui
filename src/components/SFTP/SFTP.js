import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import Edit from './Edit/Edit';
import {shallowEqual, useSelector} from 'react-redux';
import styled from 'styled-components';
import {tabColor} from '../../styles/color';
import SFTPNav from './SFTPNav';
import History from './History/History';
import FileList from './FileList/FileList';
import FileListDropDown from './FileList/FileListDropDown';
import lghtFToolbarFoldButton from '../../images/toolbarButton/lght-toolbar-fold@2x.png';
import drkToolbarFoldButton from '../../images/toolbarButton/drk-toolbar-fold@2x.png';
import lghtToolbarUnfoldButton from '../../images/toolbarButton/lght-toolbar-unfold@2x.png';
import drkToolbarUnfoldButton from '../../images/toolbarButton/drk-toolbar-unfold@2x.png';

const toolbarFold = [lghtFToolbarFoldButton, drkToolbarFoldButton];
const toolbarUnfold = [lghtToolbarUnfoldButton, drkToolbarUnfoldButton];

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

const SFTPNavContainer = styled.div`
	display: flex;
	flex-direction: column;
	transition: transform 0.5s;
	background: ${(props) => tabColor[props.theme_value]};
`;

const _ToggleButton = styled.img`
	width: 54px;
	height: 18px;
	margin-left: auto;
	margin-right: auto;
	transition: transform 0.5s;
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

	const onClickFold = useCallback(() => {
		setToggle(false);
	}, []);

	const onClickUnfold = useCallback(() => {
		setToggle(true);
	}, []);

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
				{(nav.length === 1 || cols === 1) &&
					(toggle ? (
						<_ToggleButton
							src={toolbarFold[theme]}
							alt='toolbar fold button'
							onClick={onClickFold}
						/>
					) : (
						<_ToggleButton
							src={toolbarUnfold[theme]}
							alt='toolbar fold button'
							onClick={onClickUnfold}
						/>
					))}
			</SFTPNavContainer>
			<_SFTP theme_value={theme} className={!toggle && 'close-nav-sftp'}>
				{mode === 'list' ? (
					<FileList uuid={uuid} />
				) : (
					<FileListDropDown uuid={uuid} />
				)}
				<History uuid={uuid} />
			</_SFTP>
		</_Container>
	);
};

SFTP.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTP;
