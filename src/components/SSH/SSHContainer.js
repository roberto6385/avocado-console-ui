import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import SSHT from './SSHT';
import ConvertSFTP from '../SFTP/ConvertSFTP';
import DropdownMenu from '../DropdownMenu';
import SnippetsManeger from '../SnippetsManager';
import {SSHT_SEND_COMMAND_REQUEST} from '../../reducers/ssht';
import {light_Background} from '../../styles/global';
import {IconButton, SUB_HEIGHT} from '../../styles/global_design';
import styled from 'styled-components';
import {useDebouncedResizeObserver} from '../../hooks/useDebouncedResizeObserver';

const SSHT_Container = styled.div`
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
	overflow: hidden;
`;

const SSHContainer = ({uuid, server_id}) => {
	const dispatch = useDispatch();
	const {ssht, snippets} = useSelector((state) => state.ssht);
	const ws = useRef(ssht.find((v) => v.uuid === uuid).ws);
	const [open, setOpen] = useState(false);
	const [column, setColumn] = useState([]);
	const {ref: ref, width: width, height: height} = useDebouncedResizeObserver(
		1000,
	);

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
		<div>
			<SSHT_Container back={light_Background}>
				<DropdownMenu
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
			</SSHT_Container>
			<SSHT
				ref={ref}
				id={`full_ssht_${uuid}`}
				uuid={uuid}
				height={height}
				width={width}
			/>
			{/*<div>Hiii</div>*/}
			<SnippetsManeger setOpen={setOpen} open={open} />
		</div>
	);
};

SSHContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	server_id: PropTypes.number.isRequired,
};

export default SSHContainer;
