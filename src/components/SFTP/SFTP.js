import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import Edit from './Edit/Edit';
import styled from 'styled-components';
import SFTPToolbar from './SFTPToolbar';
import lghtFToolbarFoldButton from '../../images/toolbarButton/lght-toolbar-fold@2x.png';
import drkToolbarFoldButton from '../../images/toolbarButton/drk-toolbar-fold@2x.png';
import lghtToolbarUnfoldButton from '../../images/toolbarButton/lght-toolbar-unfold@2x.png';
import drkToolbarUnfoldButton from '../../images/toolbarButton/drk-toolbar-unfold@2x.png';
import {useSelector} from 'react-redux';
import {settingSelector} from '../../reducers/setting';
import {tabBarSelector} from '../../reducers/tabBar';
import FileListContianer from './Containers/FileListContianer';
import HistoryContianer from './Containers/HistoryContianer';
import {sftpSelector} from '../../reducers/renewal';
import DropListBlockContainer from './Containers/DropListBlockContainer';
import SFTPFileListContextMenu from '../ContextMenus/SFTPFileListContextMenu';

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

const ContentsContainer = styled.div`
	// 최상위
	display: flex;
	flex: 1 1 0;
	overflow-x: scroll;
`;

const DropListContainer = styled.div`
	// 중간
	display: flex;
	width: 100%;
	overflow-x: scroll;
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

const SFTP = ({uuid}) => {
	const {cols, terminalTabs} = useSelector(tabBarSelector.all);
	const {theme} = useSelector(settingSelector.all);
	const {data} = useSelector(sftpSelector.all);
	const sftp = useMemo(() => data.find((v) => v.uuid === uuid), [data, uuid]);

	const [isToolbarUnfolded, setIsToolbarUnfolded] = useState(true);

	const onClickFoldToolbar = useCallback(() => {
		setIsToolbarUnfolded(false);
	}, []);

	const onClickUnfoldToolbar = useCallback(() => {
		setIsToolbarUnfolded(true);
	}, []);

	return sftp.edit.state ? (
		<_Container>
			<Edit uuid={uuid} />
		</_Container>
	) : (
		<_Container>
			<_ToolBarContainer
				className={!isToolbarUnfolded && 'close-nav-header'}
			>
				<SFTPToolbar uuid={uuid} />

				{(terminalTabs.length === 1 || cols === 1) &&
					(isToolbarUnfolded ? (
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
			<ContentsContainer
				className={!isToolbarUnfolded && 'close-nav-sftp'}
			>
				{sftp.mode === 'list' ? (
					<FileListContianer uuid={uuid} />
				) : (
					<DropListContainer>
						{Object.keys(sftp.files).map((key) => {
							return (
								<DropListBlockContainer
									key={key}
									uuid={uuid}
									blockPath={key}
								/>
							);
						})}
					</DropListContainer>
				)}

				<SFTPFileListContextMenu uuid={uuid} />
				<HistoryContianer uuid={uuid} />
			</ContentsContainer>
			{/*<FileStatusDialogBox />*/}
		</_Container>
	);
};

SFTP.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTP;
