import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SFTPConvertButton from '../SFTP/SFTPConvertButton';
import DropdownMenu_ from '../RecycleComponents/DropdownMenu_';
import SnippetsManeger from './SnippetsManager';
import {useTranslation} from 'react-i18next';
import {SSH_SEND_COMMAND_REQUEST} from '../../reducers/ssh';
import {IconButton} from '../../styles/global';
import SSH from './SSH';
import {fullScreenIcon, snippetIcon} from '../../icons/icons';
import {HEIGHT_50} from '../../styles/length';
import {borderColor, tabColor} from '../../styles/color';

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
	const dispatch = useDispatch();
	const {t} = useTranslation('snippets');
	const {ssh, snippets} = useSelector((state) => state.ssh);
	const {theme} = useSelector((state) => state.common);
	const ws = useRef(ssh.find((v) => v.uuid === uuid).ws);
	const [open, setOpen] = useState(false);
	const menuEvent = useCallback(
		(v) => () => {
			dispatch({
				type: SSH_SEND_COMMAND_REQUEST,
				data: {
					uuid: uuid,
					ws: ws.current,
					input: v.content,
				},
			});
		},
		[uuid, ws],
	);

	const column = useMemo(
		() => [
			{
				onClick: () => {
					setOpen(true);
				},
				title: t('editSnippets'),
			},
			{title: 'divider'},
			...snippets.map((v) => {
				const temp = {
					onClick: menuEvent(v),
					title: v.name,
				};
				return temp;
			}),
		],
		[snippets, menuEvent],
	);

	const onCLickFullScreen = useCallback(() => {
		document.getElementById('terminal_' + uuid).requestFullscreen();
	}, [uuid]);

	return (
		<_Container>
			<_Header back={tabColor[theme]} bcolor={borderColor[theme]}>
				<DropdownMenu_ icon={snippetIcon} menu={column} />
				<SFTPConvertButton data={server} />
				<IconButton onClick={onCLickFullScreen}>
					{fullScreenIcon}
				</IconButton>
			</_Header>
			<SSH uuid={uuid} />
			<SnippetsManeger open={open} setOpen={setOpen} />
		</_Container>
	);
};

SSHContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	server: PropTypes.object.isRequired,
};

export default SSHContainer;
