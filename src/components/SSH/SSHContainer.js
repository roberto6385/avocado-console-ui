import React, {useCallback, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SFTPConvertButton from '../SFTP/SFTPConvertButton';
import SnippetsManeger from './SnippetsManager';
import {IconButton} from '../../styles/global';
import SSH from './SSH';
import {fullScreenIcon, snippetIcon} from '../../icons/icons';
import {HEIGHT_50} from '../../styles/length';
import {borderColor, tabColor} from '../../styles/color';
import SnippetContextMenu from '../ContextMenu/SnippetContextMenu';
import {useContextMenu} from 'react-contexify';

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
	height: ${HEIGHT_50};
	min-height: ${HEIGHT_50};
	background: ${(props) => props.back};
	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
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
		document.getElementById('terminal_' + uuid).requestFullscreen();
	}, [uuid]);

	return (
		<_Container>
			<_Header back={tabColor[theme]} bcolor={borderColor[theme]}>
				<IconButton ref={snippetRef} onClick={openSnippet}>
					{snippetIcon}
				</IconButton>
				<SFTPConvertButton data={server} />
				<IconButton onClick={onCLickFullScreen}>
					{fullScreenIcon}
				</IconButton>
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
