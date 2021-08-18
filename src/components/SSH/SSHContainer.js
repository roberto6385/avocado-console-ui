import React, {useCallback, useRef, useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';

import SFTPConnectBtn from '../SFTP/SFTPConnectBtn';
import SnippetsManager from './SnippetsManager';
import SSH from './SSH';
import {fullScreenIcon, snippetIcon} from '../../icons/icons';
import SnippetsManagerContextMenu from '../ContextMenus/SnippetsManagerContextMenu';
import lghtFToolbarFoldButton from '../../images/toolbarButton/lght-toolbar-fold@2x.png';
import drkToolbarFoldButton from '../../images/toolbarButton/drk-toolbar-fold@2x.png';
import lghtToolbarUnfoldButton from '../../images/toolbarButton/lght-toolbar-unfold@2x.png';
import drkToolbarUnfoldButton from '../../images/toolbarButton/drk-toolbar-unfold@2x.png';
import {HoverButton} from '../../styles/components/icon';
import {settingSelector} from '../../reducers/setting';
import {tabBarSelector} from '../../reducers/tabBar';

const toolbarFold = {light: lghtFToolbarFoldButton, dark: drkToolbarFoldButton};
const toolbarUnfold = {
	light: lghtToolbarUnfoldButton,
	dark: drkToolbarUnfoldButton,
};

const _Container = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;

	.close-nav-terminal {
		margin-top: -50px;
	}
	.close-nav-header {
		transform: translateY(-50px);
	}
`;

const _HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	transition: transform 0.5s;
	height: 50px;
	max-height: 50px;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
	min-height: 50px;
	border-bottom: 1px solid;
	background: ${(props) =>
		props.theme.pages.webTerminal.main.panels.toolBar.backgroundColor};
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.toolBar.border.color};
`;

const _ToolbarFoldUnfoldButton = styled.img`
	width: 54px;
	height: 18px;
	margin-left: auto;
	margin-right: auto;
	transition: transform 0.5s;
	z-index: 5;
`;

const SSHContainer = ({uuid, server}) => {
	const {nav} = useSelector((state) => state.common, shallowEqual);
	const {cols} = useSelector(tabBarSelector.all);
	const {theme} = useSelector(settingSelector.all);
	const snippetRef = useRef();
	const [isToolbarUnfolded, setIsToolbarUnfolded] = useState(true);
	const {show} = useContextMenu({
		id: uuid + '-snippets-context-menu',
	});

	function getSettingMenuPosition() {
		const {left, bottom} = snippetRef.current?.getBoundingClientRect();
		return {x: left + 10, y: bottom + 10};
	}

	const onClickOpenSnippetManager = useCallback((e) => {
		show(e, {
			position: getSettingMenuPosition(),
		});
	}, []);

	const onCLickFullScreen = useCallback(() => {
		document
			.getElementById('terminal-container-' + uuid)
			.requestFullscreen();
	}, [uuid]);

	const onClickFoldToolbar = useCallback(() => {
		setIsToolbarUnfolded(false);
	}, []);

	const onClickUnfoldToolbar = useCallback(() => {
		setIsToolbarUnfolded(true);
	}, []);

	return (
		<_Container>
			<_HeaderContainer
				className={!isToolbarUnfolded && 'close-nav-header'}
			>
				<_Header>
					<HoverButton
						ref={snippetRef}
						margin={'16px'}
						onClick={onClickOpenSnippetManager}
					>
						{snippetIcon}
					</HoverButton>
					<SFTPConnectBtn data={server} />
					<HoverButton onClick={onCLickFullScreen}>
						{fullScreenIcon}
					</HoverButton>
				</_Header>
				{(nav.length === 1 || cols === 1) &&
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
			</_HeaderContainer>
			<SSH uuid={uuid} isToolbarUnfold={isToolbarUnfolded} />
			<SnippetsManager />
			<SnippetsManagerContextMenu uuid={uuid} />
		</_Container>
	);
};

SSHContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	server: PropTypes.object.isRequired,
};

export default SSHContainer;
