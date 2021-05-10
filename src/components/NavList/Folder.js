import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {useContextMenu} from 'react-contexify';
import {Collapse} from 'react-bootstrap';
import {
	MdKeyboardArrowDown,
	MdKeyboardArrowRight,
	RiFolder2Fill,
} from 'react-icons/all';
import {useDispatch, useSelector} from 'react-redux';

import Server from './Server';
import {
	CHANGE_SERVER_FOLDER_NAME,
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
} from '../../reducers/common';
import {HIGHLIGHT_COLOR} from '../../styles/global';
import FolderContextMenu from '../ContextMenu/FolderContextMenu';
import useInput from '../../hooks/useInput';
import {IconButton} from '../../styles/buttons';
import {ServerNavItem} from '../../styles/navs';
import {BaseForm, BaseInput} from '../../styles/forms';

const Folder2Line = styled(RiFolder2Fill)`
	margin-right: 4px;
`;

const Folder = ({open, data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server} = useSelector((state) => state.common);

	const renameRef = useRef(null);
	const [openTab, setOpenTab] = useState(false);
	const [openRename, setOpenRename] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	const onCLickFolder = useCallback(() => {
		if (clicked_server === data.key)
			dispatch({type: SET_CLICKED_SERVER, data: null});
		else dispatch({type: SET_CLICKED_SERVER, data: data.key});
	}, [clicked_server, data]);

	const onClickOpen = useCallback(() => {
		setOpenTab(!openTab);
	}, [openTab]);

	const {show} = useContextMenu({
		id: data.key + 'folder',
	});

	const contextMenuOpen = useCallback(
		(e) => {
			e.preventDefault();

			dispatch({type: SET_CLICKED_SERVER, data: data.key});
			show(e);
		},
		[data],
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
		dispatch({type: SET_CLICKED_SERVER, data: data.key});
	}, [data]);

	const nextPutItem = useCallback(
		(e) => {
			e.stopPropagation();

			data.type === 'folder' &&
				dispatch({
					type: SORT_SERVER_AND_FOLDER,
					data: {next: data, indent: parseInt(indent)},
				});
		},
		[data, indent],
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

	useEffect(() => {
		setOpenTab(open);
	}, [open]);

	return (
		<>
			<ServerNavItem
				onClick={onCLickFolder}
				draggable='true'
				onDragStart={prevPutItem}
				onDrop={nextPutItem}
				onContextMenu={contextMenuOpen}
				back={clicked_server === data.key ? HIGHLIGHT_COLOR : 'white'}
				left={(indent * 15).toString() + 'px'}
			>
				<Folder2Line />
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
				<IconButton onClick={onClickOpen}>
					{openTab ? (
						<MdKeyboardArrowDown />
					) : (
						<MdKeyboardArrowRight />
					)}
				</IconButton>
			</ServerNavItem>
			{data.contain.length !== 0 && (
				<Collapse in={openTab}>
					<div>
						{data.contain.map((i) =>
							i.type === 'folder' ? (
								<Folder
									key={i.key}
									open={open}
									data={i}
									indent={indent + 1}
								/>
							) : (
								<Server
									key={i.key}
									data={i}
									indent={indent + 1}
								/>
							),
						)}
					</div>
				</Collapse>
			)}
			<FolderContextMenu data={data} setOpenRename={setOpenRename} />
		</>
	);
};

Folder.propTypes = {
	open: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Folder;
