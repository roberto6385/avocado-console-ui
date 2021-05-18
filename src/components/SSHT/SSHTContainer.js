import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';
import {IoMdExpand, RiFileTextLine} from 'react-icons/all';
import {useDispatch, useSelector} from 'react-redux';

import SSHT from './SSHT';
import ConvertSFTP from '../SFTP/ConvertSFTP';
import DropdownMenu from '../DropdownMenu';
import SnippetsManeger from '../SnippetsManager';
import {SSHT_SEND_COMMAND_REQUEST} from '../../reducers/ssht';
import {light_Background} from '../../styles/global';
import {Button, SUB_HEIGHT} from '../../styles/global_design';
import styled from 'styled-components';

const SSHT_Container = styled.div`
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
`;

const SSHTContainer = ({uuid, server_id}) => {
	const dispatch = useDispatch();
	const {ssht, snippets} = useSelector((state) => state.ssht);
	const ws = useRef(ssht.find((v) => v.uuid === uuid).ws);
	const [open, setOpen] = useState(false);
	const [column, setColumn] = useState([]);

	const onCLickFullScreen = useCallback(() => {
		document.getElementById('full_ssht_' + uuid).requestFullscreen();
	}, []);

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
		<>
			<SSHT_Container back={light_Background}>
				<DropdownMenu icon={<RiFileTextLine />} menu={column} />
				<Button onClick={onCLickFullScreen}>
					<IoMdExpand />
				</Button>
				<ConvertSFTP server_id={server_id} />
			</SSHT_Container>
			<SSHT id={`full_ssht_${uuid}`} uuid={uuid} />
			<SnippetsManeger setOpen={setOpen} open={open} />
		</>
	);
};

SSHTContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	server_id: PropTypes.number.isRequired,
};

export default SSHTContainer;
