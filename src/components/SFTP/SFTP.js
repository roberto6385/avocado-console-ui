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
import FileStatusDialogBox from '../DialogBoxs/Form/FileStatusDialogBox';
import {settingSelector} from '../../reducers/setting';
import {tabBarSelector} from '../../reducers/tabBar';
import {remoteResourceSelector} from '../../reducers/remoteResource';

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

const _ToolBarContainer = styled.div`
	display: flex;
	flex-direction: column;
	transition: transform 0.5s;
	height: 50px;
	max-height: 50px;
	z-index: 5;
`;

const _ToolbarFoldUnfoldButton = styled.img`
	width: 54px;
	height: 18px;
	margin-left: auto;
	margin-right: auto;
	transition: transform 0.5s;
	z-index: 5;
`;

const SFTP = ({uuid, mode}) => {
	const {resourceTree} = useSelector(remoteResourceSelector.all);
	const {cols} = useSelector(tabBarSelector.all);
	const {theme} = useSelector(settingSelector.all);

	const [setIsToolbarUnfold, setSetIsToolbarUnfold] = useState(true);

	const onClickFoldToolbar = useCallback(() => {
		setSetIsToolbarUnfold(false);
	}, []);

	const onClickUnfoldToolbar = useCallback(() => {
		setSetIsToolbarUnfold(true);
	}, []);

	return mode === 'edit' ? (
		<_Container>
			<Edit uuid={uuid} />
		</_Container>
	) : (
		<_Container>
			<_ToolBarContainer
				className={!setIsToolbarUnfold && 'close-nav-header'}
			>
				<SFTPToolbar uuid={uuid} />
				{(resourceTree.length === 1 || cols === 1) &&
					(setIsToolbarUnfold ? (
						<_ToolbarFoldUnfoldButton
							src={toolbarFold[theme]}
							alt='toolbar fold button'
							onClick={onClickFoldToolbar}
						/>
					) : (
						<_ToolbarFoldUnfoldButton
							src={toolbarUnfold[theme]}
							alt='toolbar fold button'
							onClick={onClickUnfoldToolbar}
						/>
					))}
			</_ToolBarContainer>
			<_SFTP className={!setIsToolbarUnfold && 'close-nav-sftp'}>
				{mode === 'list' ? (
					<FileList_ uuid={uuid} />
				) : (
					<DropList_ uuid={uuid} />
				)}
				<History_ uuid={uuid} />
			</_SFTP>
			<FileStatusDialogBox />
		</_Container>
	);
};

SFTP.propTypes = {
	uuid: PropTypes.string.isRequired,
	mode: PropTypes.string.isRequired,
};

export default SFTP;
