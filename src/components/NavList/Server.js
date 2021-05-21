import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../hooks/useDoubleClick';
import ServerContextMenu from '../ContextMenu/ServerContextMenu';
import useInput from '../../hooks/useInput';
import {
	CHANGE_SERVER_FOLDER_NAME,
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
} from '../../reducers/common';
import {SSHT_SEND_CONNECTION_REQUEST} from '../../reducers/ssht';
import {Folder_Server_Nav_Item} from '../../styles/navs';
import {BaseForm, BaseInput} from '../../styles/forms';
import {
	GREEN_COLOR,
	AVOCADO_FONTSIZE,
	SERVER_HOVER_COLOR,
	Avocado_span,
	LIGHT_MODE_BACK_COLOR,
} from '../../styles/global_design';

const Server = ({data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server, server} = useSelector((state) => state.common);
	const {userTicket} = useSelector((state) => state.userTicket);
	const [openRename, setOpenRename] = useState(false);
	const renameRef = useRef(null);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	const onHybridClick = useDoubleClick(
		() => {
			const correspondedServer = server.find((i) => i.id === data.id);
			dispatch({
				type: SSHT_SEND_CONNECTION_REQUEST,
				data: {
					token: userTicket,
					...correspondedServer,
				},
			});
		},
		() => {
			if (clicked_server === data.key) {
				console.log('여기실행');
				dispatch({type: SET_CLICKED_SERVER, data: null});
			} else {
				console.log('여기실행');

				dispatch({type: SET_CLICKED_SERVER, data: data.key});
			}
		},
		[clicked_server, data, userTicket, server, dispatch],
	);

	const {show} = useContextMenu({
		id: data.key + 'server',
	});

	const contextMenuOpen = useCallback(
		(e) => {
			e.preventDefault();
			console.log('contextMenuOpen item');
			dispatch({type: SET_CLICKED_SERVER, data: data.key});
			show(e);
		},
		[data, dispatch],
	);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();

			if (renameValue !== data.name)
				dispatch({
					type: CHANGE_SERVER_FOLDER_NAME,
					data: {key: data.key, name: renameValue},
				});
			setOpenRename(false);
		},
		[data, renameValue],
	);

	const EscapeKey = useCallback((e) => {
		if (e.keyCode === 27) setOpenRename(false);
	}, []);

	const prevPutItem = useCallback(() => {
		console.log('prev put item');
		dispatch({type: SET_CLICKED_SERVER, data: data.key});
	}, [data, dispatch]);

	const nextPutItem = useCallback(
		(e) => {
			e.stopPropagation();

			data.type === 'folder' &&
				dispatch({type: SORT_SERVER_AND_FOLDER, data: {next: data}});
		},
		[data],
	);
	//when re-name form is open, fill in pre-value and focus and select it
	useEffect(() => {
		const fillInForm = async () => {
			if (openRename) {
				await setRenameValue(data.name);
				await renameRef.current.focus();
				await renameRef.current.select();
			}
		};
		fillInForm();
	}, [openRename, renameRef, data]);

	return (
		<React.Fragment>
			<Folder_Server_Nav_Item
				onClick={onHybridClick}
				draggable='true'
				onDragStart={prevPutItem}
				onDrop={nextPutItem}
				onContextMenu={contextMenuOpen}
				back={
					clicked_server === data.key
						? SERVER_HOVER_COLOR
						: LIGHT_MODE_BACK_COLOR
				}
				border={
					clicked_server === data.key
						? `2px solid ${GREEN_COLOR}`
						: `2px solid white`
				}
				left={(indent * 6 + 6).toString() + 'px'}
			>
				{/*<Avocado_span*/}
				{/*	size={MIDDLE_FONTSIZE}*/}
				{/*	color={*/}
				{/*		clicked_server === data.key*/}
				{/*			? GREEN_COLOR*/}
				{/*			: ICON_LIGHT_COLOR*/}
				{/*	}*/}
				{/*>*/}
				{/*	<FaServerIcon />*/}
				{/*</Avocado_span>*/}
				<span className='material-icons button_midium'>dns</span>
				<Avocado_span flex={1} size={AVOCADO_FONTSIZE}>
					{openRename ? (
						<BaseForm onSubmit={handleSubmit} onBlur={handleSubmit}>
							<BaseInput
								ref={renameRef}
								type='text'
								value={renameValue}
								onChange={onChangeRenameValue}
								onKeyDown={EscapeKey}
							/>
						</BaseForm>
					) : (
						data.name
					)}
				</Avocado_span>
			</Folder_Server_Nav_Item>
			<ServerContextMenu data={data} setOpenRename={setOpenRename} />
		</React.Fragment>
	);
};

Server.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Server;
