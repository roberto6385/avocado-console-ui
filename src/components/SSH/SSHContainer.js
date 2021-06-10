import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SFTPConvertButton from '../SFTP/SFTPConvertButton';
import DropdownMenu_ from '../RecycleComponents/DropdownMenu_';
import SnippetsManeger from './SnippetsManager';
import {useTranslation} from 'react-i18next';
import {SSH_SEND_COMMAND_REQUEST} from '../../reducers/ssh';
import {backColor, IconButton, SUB_HEIGHT} from '../../styles/global';
import SSH from './SSH';
import {fullScreenIcon, snippetIcon} from '../../icons/icons';
import {HEIGHT_50} from '../../styles/length';

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
`;

const SSHContainer = ({uuid, server}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('snippets');
	const {ssh, snippets} = useSelector((state) => state.ssh);
	const {theme} = useSelector((state) => state.common);
	const ws = useRef(ssh.find((v) => v.uuid === uuid).ws);
	const [open, setOpen] = useState(false);

	const setColumn = () => {
		const temp = [
			{
				onClick: () => {
					setOpen(true);
				},
				title: t('editSnippets'),
			},
			{title: 'divider'},
		];

		snippets.map((v) =>
			temp.push({
				onClick: () => {
					dispatch({
						type: SSH_SEND_COMMAND_REQUEST,
						data: {
							uuid: uuid,
							ws: ws.current,
							input: v.content,
						},
					});
				},
				title: v.name,
			}),
		);
		return temp;
	};

	const column = useMemo(() => setColumn(), [snippets, uuid, ws]);

	const onCLickFullScreen = useCallback(() => {
		document.getElementById('terminal_' + uuid).requestFullscreen();
	}, [uuid]);

	return (
		<_Container>
			<_Header back={backColor[theme]}>
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
