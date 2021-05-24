import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import ConvertSFTP from '../SFTP/ConvertSFTP';
import DropdownMenu_ from '../RecycleComponents/DropdownMenu_';
import SnippetsManeger from '../SnippetsManager';
import {SSHT_SEND_COMMAND_REQUEST} from '../../reducers/ssht';
import {light_Background} from '../../styles/global';
import {IconButton, SUB_HEIGHT} from '../../styles/global_design';
import styled from 'styled-components';
import SSH from './SSH';

const SSHContainerWrapper = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

const SSHTopBar = styled.div`
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
						type: SSHT_SEND_COMMAND_REQUEST,
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
		<SSHContainerWrapper>
			<SSHTopBar back={light_Background}>
				<DropdownMenu_
					icon={
						<span className='material-icons button_large'>
							text_snippet
						</span>
					}
					menu={column}
				/>
				<ConvertSFTP server_id={server_id} />
				<IconButton onClick={onCLickFullScreen}>
					<span className='material-icons button_large'>
						fullscreen
					</span>
				</IconButton>
			</SSHTopBar>
			<SSH id={`full_ssht_${uuid}`} uuid={uuid} />
			<SnippetsManeger setOpen={setOpen} open={open} />
		</SSHContainerWrapper>
	);
};

SSHContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	server_id: PropTypes.number.isRequired,
};

export default SSHContainer;
