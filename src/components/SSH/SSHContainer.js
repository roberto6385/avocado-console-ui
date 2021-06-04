import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import SFTPConvertButton from '../SFTP/SFTPConvertButton';
import DropdownMenu_ from '../RecycleComponents/DropdownMenu_';
import SnippetsManeger from './SnippetsManager';
import {useTranslation} from 'react-i18next';
import {SSH_SEND_COMMAND_REQUEST} from '../../reducers/ssh';
import {IconButton, sideColor, SUB_HEIGHT} from '../../styles/global';

import styled from 'styled-components';
import SSH from './SSH';
import {fullScreenIcon, snippetIcon} from '../../icons/icons';
import PropTypes from 'prop-types';

const _Container = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
	background: ${(props) => props.back};
`;

const SSHContainer = ({uuid, server}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('snippets');
	const {ssht, snippets} = useSelector((state) => state.ssht);
	const {theme} = useSelector((state) => state.common);
	const ws = useRef(ssht.find((v) => v.uuid === uuid).ws);
	const [open, setOpen] = useState(false);
	const [column, setColumn] = useState([]);

	const onCLickFullScreen = useCallback(() => {
		document.getElementById('terminal_' + uuid).requestFullscreen();
	}, [uuid]);

	useEffect(() => {
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
		setColumn(temp);
	}, [snippets, uuid, ws]);

	return (
		<_Container>
			<_Header back={sideColor[theme]}>
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
