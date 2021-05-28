import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import SFTPConvertButton from '../SFTP/SFTPConvertButton';
import DropdownMenu_ from '../RecycleComponents/DropdownMenu_';
import SnippetsManeger from './SnippetsManager';

import {SSH_SEND_COMMAND_REQUEST} from '../../reducers/ssh';
import {IconButton, LIGHT_BACK_COLOR, SUB_HEIGHT} from '../../styles/global';

import styled from 'styled-components';
import SSH from './SSH';
import {fullScreenIcon, snippetIcon} from '../../icons/icons';

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
`;

const SSHContainer = ({uuid, server_id}) => {
	const dispatch = useDispatch();
	const {ssht, snippets} = useSelector((state) => state.ssht);
	const ws = useRef(ssht.find((v) => v.uuid === uuid).ws);
	const [open, setOpen] = useState(false);
	const [column, setColumn] = useState([]);

	const onCLickFullScreen = useCallback(() => {
		document.getElementById('full_ssht_' + uuid).requestFullscreen();
	}, [uuid]);

	useEffect(() => {
		const temp = [
			{
				onClick: () => {
					setOpen(true);
				},
				title: 'Edit Snippets',
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
			<_Header back={LIGHT_BACK_COLOR}>
				<DropdownMenu_ icon={snippetIcon} menu={column} />
				<SFTPConvertButton server_id={server_id} />
				<IconButton onClick={onCLickFullScreen}>
					{fullScreenIcon}
				</IconButton>
			</_Header>
			<SSH id={`full_ssht_${uuid}`} uuid={uuid} />
			<SnippetsManeger open={open} setOpen={setOpen} />
		</_Container>
	);
};

SSHContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	server_id: PropTypes.number.isRequired,
};

export default SSHContainer;
