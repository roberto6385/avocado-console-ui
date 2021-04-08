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

import {IconButton, ServerNavItem, TabNavItem} from '../../styles/common';
import Server from './Server';
import {
	CHANGE_SERVER_FOLDER_NAME,
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
	SORT_TAB,
} from '../../reducers/common';
import {useDispatch, useSelector} from 'react-redux';
import {HIGHLIGHT_COLOR} from '../../styles/global';
import {useDoubleClick} from '../../hooks/useDoubleClick';
import FolderContextMenu from '../FolderContextMenu';
import {iteratorAllObject} from '../iteratorAllObject';

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

const Folder = ({data, indent}) => {
	const dispatch = useDispatch();
	const renameRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [openRename, setOpenRename] = useState(false);
	const [renameValue, setRenameValue] = useState('');
	const [draggedItem, setDraggedItem] = useState({});

	const {clicked_server, server, me, nav} = useSelector(
		(state) => state.common,
	);

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
		setOpen(!open);
	}, [open]);

	const {show} = useContextMenu({
		id: data.key + 'folder',
	});

	function displayMenu(e) {
		show(e);
	}

	const contextMenuOpen = (e, data, indent) => {
		e.preventDefault();
		dispatch({type: SET_CLICKED_SERVER, data: data.key});
		displayMenu(e);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(data, indent);

		const newData = Object.assign({}, data, {name: renameValue});
		dispatch({
			type: CHANGE_SERVER_FOLDER_NAME,
			data: {next: newData},
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

	const nextPutItem = (item) => {
		console.log(item);
		dispatch({type: SORT_SERVER_AND_FOLDER, data: {next: item}});

		// console.log(oldOlder);
		// const newOlder = tab.findIndex((it) => it === item);
		// console.log(tab.findIndex((it) => it === item)); //바뀐위치
		// console.log(draggedItem);
		// dispatch({
		// 	type: SORT_TAB,
		// 	data: {
		// 		oldOrder: oldOlder,
		// 		newOrder: newOlder,
		// 		newTab: draggedItem,
		// 	},
		// });
	};

	useEffect(() => {
		setRenameValue(data.name);
		if (renameRef.current) {
			renameRef.current.focus();
		}
	}, [openRename]);

	return (
		<>
			<ServerNavItem
				onClick={onHybridClick}
				draggable='true'
				onDragStart={() => prevPutItem(data)}
				onDrop={() => nextPutItem(data)}
				onContextMenu={(e) => contextMenuOpen(e, data, indent)}
				back={clicked_server === data.key ? HIGHLIGHT_COLOR : 'white'}
				left={(indent * 15).toString() + 'px'}
			>
				<Folder2Line />
				{openRename ? (
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
					{open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
				</IconButton>
			</ServerNavItem>
			{data.contain.length !== 0 && (
				<Collapse in={open}>
					<div>
						{data.contain.map((i) =>
							i.type === 'folder' ? (
								<Folder
									key={i.key}
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
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Folder;
