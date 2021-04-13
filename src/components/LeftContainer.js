import React, {useCallback, useState} from 'react';
import {Collapse, Nav} from 'react-bootstrap';
import {
	AiFillEyeInvisible,
	FaPlus,
	FaRegTrashAlt,
	FaSearch,
	FiSettings,
	GrLogout,
	MdRefresh,
	RiFolderAddLine,
} from 'react-icons/all';
import {useDispatch, useSelector} from 'react-redux';

import {
	Header,
	IconButton,
	OutlineCol,
	RotateButton,
	ServerSearchForm,
	SidebarShow,
} from '../styles/common';
import {CHANGE_SIDEBAR_DISPLAY} from '../reducers/common';
import {LOGOUT} from '../reducers/user';

import NavList from './NavList/NavList';
import {Link} from 'react-router-dom';
import useInput from '../hooks/useInput';
import {getRefreshTicket} from '../reducers/refreshTicket';
import {
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_CONFIRM_POPUP,
} from '../reducers/popup';

const LeftContainer = () => {
	const dispatch = useDispatch();
	const {minimize, clicked_server, encodeData} = useSelector(
		(state) => state.common,
	);
	const {userTicket} = useSelector((state) => state.userTicket);
	const [search, onChangeSearch, setSearch] = useInput('');
	const [activeSearch, setActiveSearch] = useState(false);

	const onClickAddFolder = useCallback(() => {
		dispatch({
			type: OPEN_CONFIRM_POPUP,
			data: {key: 'add_folder'},
		});
	}, []);

	const onClickVisibleForm = useCallback(() => {
		dispatch({
			type: OPEN_ADD_SERVER_FORM_POPUP,
			data: {type: 'add'},
		});
	}, []);

	const onClickDeleteServer = useCallback(() => {
		if (clicked_server !== null) {
			dispatch({
				type: OPEN_CONFIRM_POPUP,
				data: {key: 'delete_server_folder'},
			});
		}
	}, [clicked_server]);

	const onClickOpenSearch = useCallback(() => {
		if (activeSearch) setSearch('');
		setActiveSearch(!activeSearch);
	}, [activeSearch]);

	const onClickLogout = useCallback(() => {
		dispatch({
			type: LOGOUT,
		});
	}, []);

	const sideBarhandleSize = useCallback(
		(v) => () => {
			dispatch({
				type: CHANGE_SIDEBAR_DISPLAY,
				data: v,
			});
		},
		[],
	);

	const refresh = useCallback(() => {
		dispatch(
			getRefreshTicket({
				Authorization: 'Basic ' + encodeData,
				refresh_token: userTicket?.refresh_token,
			}),
		);
	}, [encodeData, userTicket]);

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
					<IconButton onClick={refresh}>
						<MdRefresh />
					</IconButton>
					<IconButton onClick={onClickLogout}>
						<GrLogout />
					</IconButton>
					<IconButton onClick={sideBarhandleSize(true)}>
						<AiFillEyeInvisible />
					</IconButton>
					<IconButton as={Link} to='/setting'>
						<FiSettings />
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
			<NavList search={search} />
		</OutlineCol>
	) : (
		<SidebarShow>
			<RotateButton onClick={sideBarhandleSize(false)}>
				servers
			</RotateButton>
		</SidebarShow>
	);
};

export default LeftContainer;
