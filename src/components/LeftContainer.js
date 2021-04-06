import React, {useCallback, useState} from 'react';
import {Collapse, Nav} from 'react-bootstrap';
import {
	AiFillEyeInvisible,
	FaPlus,
	FaRegTrashAlt,
	FaSearch,
	GrLogout,
	RiFolderAddLine,
} from 'react-icons/all';
import {useDispatch, useSelector} from 'react-redux';
import ConfirmPopup from './ConfirmPopup/ConfirmPopup';
import {
	Header,
	IconButton,
	OutlineCol,
	RotateButton,
	ServerSearchForm,
	SidebarShow,
} from '../styles/common';

import {
	CHANGE_OPEN_ADD_SERVER_FORM,
	CHANGE_SIDEBAR_DISPLAY,
	LOGOUT,
} from '../reducers/common';

import NavList from './NavList/NavList';

const LeftContainer = () => {
	const dispatch = useDispatch();
	const {minimize, clicked_server} = useSelector((state) => state.common);
	const [search, setSearch] = useState('');
	const [activeSearch, setActiveSearch] = useState(false);
	const [open, setOpen] = useState(false);
	const [addFolderOpen, setAddFolderOpen] = useState(false);

	const onClickAddFolder = useCallback(() => {
		setAddFolderOpen(!addFolderOpen);
	}, [clicked_server, addFolderOpen]);

	const onClickVisibleForm = useCallback(() => {
		dispatch({type: CHANGE_OPEN_ADD_SERVER_FORM, data: true});
	}, []);

	const onClickDeleteServer = useCallback(() => {
		if (clicked_server !== null) {
			setOpen(true);
		}
	}, [clicked_server]);

	const onClickOpenSearch = useCallback(() => {
		if (activeSearch) setSearch('');
		setActiveSearch(!activeSearch);
	}, [activeSearch]);

	const onChangeSearch = useCallback((e) => {
		setSearch(e.target.value);
	}, []);

	const onClickLogout = useCallback(() => {
		dispatch({
			type: LOGOUT,
		});
	}, []);

	const sideBarhandleSize = (name) => {
		if (name === 'minimize') {
			dispatch({
				type: CHANGE_SIDEBAR_DISPLAY,
				data: true,
			});
		} else {
			dispatch({
				type: CHANGE_SIDEBAR_DISPLAY,
				data: false,
			});
		}
	};

	return !minimize ? (
		<OutlineCol>
			<Header>
				<Nav.Item className='left_header'>SSHTerminal / SFTP</Nav.Item>
				<Nav.Item className='left_header_icons'>
					<IconButton onClick={onClickAddFolder}>
						<RiFolderAddLine />
					</IconButton>
					<IconButton onClick={onClickVisibleForm}>
						<FaPlus />
					</IconButton>
					<IconButton onClick={onClickDeleteServer}>
						<FaRegTrashAlt />
					</IconButton>
					<IconButton onClick={onClickOpenSearch}>
						<FaSearch />
					</IconButton>
					<IconButton onClick={onClickLogout}>
						<GrLogout />
					</IconButton>
					<IconButton onClick={() => sideBarhandleSize('minimize')}>
						<AiFillEyeInvisible />
					</IconButton>
				</Nav.Item>
			</Header>
			<Collapse in={activeSearch}>
				<Nav.Item key='search'>
					<ServerSearchForm
						type='text'
						onChange={onChangeSearch}
						value={search}
						placeholder='Search...'
					/>
				</Nav.Item>
			</Collapse>
			<NavList />
			<ConfirmPopup
				keyword={'delete_server'}
				open={open}
				setOpen={setOpen}
			/>
			<ConfirmPopup
				keyword={'add_folder'}
				open={addFolderOpen}
				setOpen={setAddFolderOpen}
			/>
		</OutlineCol>
	) : (
		<SidebarShow>
			<RotateButton onClick={() => sideBarhandleSize('maximize')}>
				servers
			</RotateButton>
		</SidebarShow>
	);
};

export default LeftContainer;
