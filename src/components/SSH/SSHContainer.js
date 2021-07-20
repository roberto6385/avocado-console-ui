import React, {useCallback, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';

import SFTPConvertButton from '../SFTP/SFTPConvertButton';
import SnippetsManeger from './SnippetsManager';
import SSH from './SSH';
import {fullScreenIcon, snippetIcon} from '../../icons/icons';
import {borderColor, tabColor, terminalColor} from '../../styles/color';
import SnippetContextMenu from '../ContextMenu/SnippetContextMenu';
import {ClickableIconButton} from '../../styles/button';
import lghtFToolbarFoldButton from '../../images/toolbarButton/lght-toolbar-fold@2x.png';
import drkToolbarFoldButton from '../../images/toolbarButton/drk-toolbar-fold@2x.png';
import lghtToolbarUnfoldButton from '../../images/toolbarButton/lght-toolbar-unfold@2x.png';
import drkToolbarUnfoldButton from '../../images/toolbarButton/drk-toolbar-unfold@2x.png';

const toolbarFold = [lghtFToolbarFoldButton, drkToolbarFoldButton];
const toolbarUnfold = [lghtToolbarUnfoldButton, drkToolbarUnfoldButton];

const _Container = styled.div`
	position: relative;
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
	background-color: ${(props) => terminalColor[props.theme_value]};
`;
const _Header = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
	min-height: 50px;
	background: ${(props) => tabColor[props.theme_value]};
	border-bottom: 1px solid;
	border-color: ${(props) => borderColor[props.theme_value]};
`;

const _ToggleButton = styled.img`
	width: 54px;
	height: 18px;
	margin-left: auto;
	margin-right: auto;
	transition: transform 0.5s;
`;

const SSHContainer = ({uuid, server}) => {
	const theme = useSelector((state) => state.common.theme);
	const cols = useSelector((state) => state.common.cols);
	const nav = useSelector((state) => state.common.nav);

	const [open, setOpen] = useState(false);
	const [toggle, setToggle] = useState(true);
	const snippetRef = useRef();
	const MenuPosition = useRef();
	const {show} = useContextMenu({
		id: uuid + 'snippet',
	});

	function getSettingMenuPosition() {
		const {left, bottom} = snippetRef.current?.getBoundingClientRect();
		MenuPosition.current = {x: left + 10, y: bottom + 10};
		return MenuPosition.current;
	}

	const openSnippet = useCallback((e) => {
		show(e, {
			position: getSettingMenuPosition(),
		});
	}, []);

	const onCLickFullScreen = useCallback(() => {
		document
			.getElementById('terminal_container_' + uuid)
			.requestFullscreen();
	}, [uuid]);

	const onClickFold = useCallback(() => {
		setToggle(false);
	}, []);

	const onClickUnfold = useCallback(() => {
		setToggle(true);
	}, []);

	return (
		<_Container>
			<_HeaderContainer
				theme_value={theme}
				className={!toggle && 'close-nav-header'}
			>
				<_Header theme_value={theme}>
					<ClickableIconButton
						theme_value={theme}
						ref={snippetRef}
						margin={'16px'}
						onClick={openSnippet}
					>
						{snippetIcon}
					</ClickableIconButton>
					<SFTPConvertButton data={server} />
					<ClickableIconButton
						theme_value={theme}
						onClick={onCLickFullScreen}
					>
						{fullScreenIcon}
					</ClickableIconButton>
				</_Header>
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
			</_HeaderContainer>
			<SSH uuid={uuid} toggle={toggle} />
			<SnippetsManeger open={open} setOpen={setOpen} />
			<SnippetContextMenu uuid={uuid} setOpen={setOpen} />
		</_Container>
	);
};

SSHContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	server: PropTypes.object.isRequired,
};

export default SSHContainer;
