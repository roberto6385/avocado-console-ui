import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';

import {Collapse} from 'react-bootstrap';
import {IconButton, ServerNavItem} from '../../styles/common';
import {
	MdKeyboardArrowDown,
	MdKeyboardArrowRight,
	RiFolder2Line,
} from 'react-icons/all';
import Server from './Server';
import {SET_CLICKED_SERVER} from '../../reducers/common';
import {useDispatch, useSelector} from 'react-redux';
import {HIGHLIGHT_COLOR} from '../../styles/global';
import {useDoubleClick} from '../../hooks/useDoubleClick';
import {useContextMenu} from 'react-contexify';
import {CustomTable} from '../../styles/sftp';
import FileListContextMenu from '../SFTP/FileListContextMenu';
import FolderContextMenu from '../FolderContextMenu';
import ServerContextMenu from '../ServerContextMenu';
import styled from 'styled-components';

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
		iteratorAllObject(nav, data).then((response) => console.log(response));

		setOpenRename(false);
	};

	const EscapeKey = (e) => {
		if (e.keyCode === 27) {
			setOpenRename(false);
		}
	};

	useEffect(() => {
		setRenameValue(data.name);
		if (renameRef.current) {
			renameRef.current.focus();
		}
	}, [openRename]);

	// nav 배열 순회하면서 특정 객체 검색하는 funciton
	// 순회할 nav , 검색할 selectedItem 을 인수로 넣고 then으로 위치값 받으면 됩니다.
	const iteratorAllObject = useCallback((iterableItem, selectedItem) => {
		return new Promise((resolve) => {
			const initArray = [];
			const locationArray = [];
			const iteratorFunc = (item) =>
				item.forEach((pNode) => {
					const currentLocation = item.findIndex(
						(it) => it === pNode,
					);
					initArray.push(
						currentLocation === 0 ? '/0' : currentLocation,
					);
					if (
						JSON.stringify(pNode) === JSON.stringify(selectedItem)
					) {
						console.log(pNode);
						// console.log(initArray);
						const initString = initArray.join('');
						initString
							.split('/')
							.splice(1)
							.forEach((str) => {
								locationArray.push(
									parseInt(str.slice(str.length - 1)),
								);
							});
						resolve(locationArray);
					} else {
						// eslint-disable-next-line no-prototype-builtins
						if (pNode.hasOwnProperty('contain')) {
							// eslint-disable-next-line no-unused-vars
							iteratorFunc(pNode.contain);
						} else {
							initArray.pop();
						}
					}
				});
			iteratorFunc(iterableItem);
		});
	}, []);

	return (
		<>
			<ServerNavItem
				onClick={onHybridClick}
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
