import React, {useCallback, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';

import SFTPConvertButton from '../SFTP/SFTPConvertButton';
import SnippetsManeger from './SnippetsManager';
import SSH from './SSH';
import {fullScreenIcon, snippetIcon} from '../../icons/icons';
import {borderColor, tabColor} from '../../styles/color';
import SnippetContextMenu from '../ContextMenu/SnippetContextMenu';
import {ClickableIconButton} from '../../styles/button';

const _Container = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
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

const SSHContainer = ({uuid, server}) => {
	const {theme} = useSelector((state) => state.common);
	const [open, setOpen] = useState(false);
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

	const openSnippet = (e) => {
		show(e, {
			position: getSettingMenuPosition(),
		});
	};

	const onCLickFullScreen = useCallback(() => {
		document
			.getElementById('terminal_container_' + uuid)
			.requestFullscreen();
	}, [uuid]);

	return (
		<_Container>
			<_Header theme_value={theme}>
				<ClickableIconButton
					theme_value={theme}
					ref={snippetRef}
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
			<SSH uuid={uuid} />
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
