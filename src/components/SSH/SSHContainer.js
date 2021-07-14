import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';

import SFTPConvertButton from '../SFTP/SFTPConvertButton';
import SnippetsManeger from './SnippetsManager';
import SSH from './SSH';
import {fullScreenIcon, snippetIcon} from '../../icons/icons';
import {
	borderColor,
	fontColor,
	navCloseTerminalButtonColor,
	tabColor,
	terminalColor,
} from '../../styles/color';
import SnippetContextMenu from '../ContextMenu/SnippetContextMenu';
import {ClickableIconButton} from '../../styles/button';

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

const _ToggleButton = styled.button`
	width: 150px;
	border: none;
	margin-left: auto;
	margin-right: auto;
	transition: transform 0.5s;
	box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
	background-color: ${(props) =>
		navCloseTerminalButtonColor[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
	z-index: 4;
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

	const onClickCloseNav = useCallback(() => {
		setToggle(!toggle);
	}, [toggle]);

	useEffect(() => {
		console.log(toggle);
	}, [toggle]);

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
				{(nav.length === 1 || cols === 1) && (
					<_ToggleButton
						theme_value={theme}
						onClick={onClickCloseNav}
					>
						...
					</_ToggleButton>
				)}
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
