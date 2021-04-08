import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {useContextMenu} from 'react-contexify';
import {Collapse} from 'react-bootstrap';
import {
	MdKeyboardArrowDown,
	MdKeyboardArrowRight,
	RiFolder2Line,
} from 'react-icons/all';

import {IconButton, ServerNavItem} from '../../styles/common';
import Server from './Server';
import {
	CHANGE_SERVER_FOLDER_NAME,
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
} from '../../reducers/common';
import {useDispatch, useSelector} from 'react-redux';
import {HIGHLIGHT_COLOR} from '../../styles/global';
import {useDoubleClick} from '../../hooks/useDoubleClick';
import FolderContextMenu from '../ContextMenu/FolderContextMenu';

const RenameForm = styled.form`
	display: inline-block;
`;

const RenameInput = styled.input`
	display: inline-block;
	height: 24px;
	border: none;
	outline: none;
	border-bottom: 1px solid black;
`;

const Folder2Line = styled(RiFolder2Line)`
	margin-right: 4px;
`;

const Folder = ({open, data, indent}) => {
	const dispatch = useDispatch();
	const renameRef = useRef(null);
	const [openTab, setOpenTab] = useState(false);
	const [openTabRename, setOpenRename] = useState(false);
	const [renameValue, setRenameValue] = useState('');
	const [draggedItem, setDraggedItem] = useState({});

	const {clicked_server, server, nav} = useSelector((state) => state.common);
	const {me} = useSelector((state) => state.user);

	useEffect(() => {
		setOpenTab(open);
	}, [open]);

	const onHybridClick = useDoubleClick(
		() => {
			console.log('뭔가 하긋지?');
		},
		() => {
			if (clicked_server === data.key)
				dispatch({type: SET_CLICKED_SERVER, data: null});
			else dispatch({type: SET_CLICKED_SERVER, data: data.key});
		},
	);

	const onClickOpen = useCallback(() => {
		setOpenTab(!openTab);
	}, [openTab]);

	const {show} = useContextMenu({
		id: data.key + 'folder',
	});

	function displayMenu(e) {
		show(e);
	}

	const contextMenuOpen = (e, data) => {
		e.preventDefault();
		dispatch({type: SET_CLICKED_SERVER, data: data.key});
		displayMenu(e);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch({
			type: CHANGE_SERVER_FOLDER_NAME,
			data: renameValue,
		});
		setOpenRename(false);
	};

	const EscapeKey = (e) => {
		if (e.keyCode === 27) {
			setOpenRename(false);
		}
	};

	const prevPutItem = (data) => {
		dispatch({type: SET_CLICKED_SERVER, data: data.key});
	};

	const nextPutItem = (e, item) => {
		e.stopPropagation();
		console.log(item, indent);
		item.type === 'folder' &&
			dispatch({
				type: SORT_SERVER_AND_FOLDER,
				data: {next: item, indent: parseInt(indent)},
			});
	};

	useEffect(() => {
		setRenameValue(data.name);
		if (renameRef.current) {
			renameRef.current.focus();
		}
	}, [openTabRename]);

	return (
		<>
			<ServerNavItem
				onClick={onHybridClick}
				draggable='true'
				onDragStart={() => prevPutItem(data)}
				onDrop={(e) => nextPutItem(e, data)}
				onContextMenu={(e) => contextMenuOpen(e, data)}
				back={clicked_server === data.key ? HIGHLIGHT_COLOR : 'white'}
				left={(indent * 15).toString() + 'px'}
			>
				<Folder2Line />
				{openTabRename ? (
					<RenameForm
						onSubmit={handleSubmit}
						onBlur={() => setOpenRename(false)}
					>
						<RenameInput
							ref={renameRef}
							type='text'
							value={renameValue}
							onChange={(e) => setRenameValue(e.target.value)}
							onKeyDown={EscapeKey}
						/>
					</RenameForm>
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
			<FolderContextMenu
				data={data}
				indent={indent}
				setOpenRename={setOpenRename}
			/>
		</>
	);
};

Folder.propTypes = {
	open: PropTypes.bool,
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Folder;
