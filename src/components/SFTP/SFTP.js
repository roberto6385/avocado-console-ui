import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';

import Edit from './Edit/Edit';
import styled from 'styled-components';
import SFTPToolbar from './SFTPToolbar';
import lghtFToolbarFoldButton from '../../images/toolbarButton/lght-toolbar-fold@2x.png';
import drkToolbarFoldButton from '../../images/toolbarButton/drk-toolbar-fold@2x.png';
import lghtToolbarUnfoldButton from '../../images/toolbarButton/lght-toolbar-unfold@2x.png';
import drkToolbarUnfoldButton from '../../images/toolbarButton/drk-toolbar-unfold@2x.png';
import FileList_ from './containers/FileList_';
import DropList_ from './containers/DropList_';
import History_ from './containers/History_';
import {shallowEqual, useSelector} from 'react-redux';

const toolbarFold = {light: lghtFToolbarFoldButton, dark: drkToolbarFoldButton};
const toolbarUnfold = {
	light: lghtToolbarUnfoldButton,
	dark: drkToolbarUnfoldButton,
};

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	flex: 1 1 0;
	background: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.backgroundColor};

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
`;

const SFTPNavContainer = styled.div`
	display: flex;
	flex-direction: column;
	transition: transform 0.5s;
	height: 50px;
	max-height: 50px;
	z-index: 5;
`;

const _ToggleButton = styled.img`
	width: 54px;
	height: 18px;
	margin-left: auto;
	margin-right: auto;
	transition: transform 0.5s;
	z-index: 5;
`;

const SFTP = ({uuid, mode}) => {
	const [toggle, setToggle] = useState(true);
	const {theme, cols, nav} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const onClickFold = useCallback(() => {
		setToggle(false);
	}, []);

	const onClickUnfold = useCallback(() => {
		setToggle(true);
	}, []);

	return mode === 'edit' ? (
		<_Container>
			<Edit uuid={uuid} />
		</_Container>
	) : (
		<_Container>
			<SFTPNavContainer className={!toggle && 'close-nav-header'}>
				<SFTPToolbar uuid={uuid} />
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
			<_SFTP className={!toggle && 'close-nav-sftp'}>
				{mode === 'list' ? (
					<FileList_ uuid={uuid} />
				) : (
					<DropList_ uuid={uuid} />
				)}
				<History_ uuid={uuid} />
			</_SFTP>
		</_Container>
	);
};

SFTP.propTypes = {
	uuid: PropTypes.string.isRequired,
	mode: PropTypes.string.isRequired,
};

export default SFTP;
