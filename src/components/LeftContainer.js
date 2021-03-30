import React, {useCallback, useState} from 'react';
import {Collapse, Nav} from 'react-bootstrap';
import {FaPlus, FaRegTrashAlt, FaSearch, GrLogout} from 'react-icons/all';
import {useDispatch, useSelector} from 'react-redux';
import ConfirmPopup from './ConfirmPopup';
import {
	Header,
	IconButton,
	OutlineCol,
	ServerSearchForm,
} from '../styles/common';
import ServerNavBar from './ServerNavBar';
import * as PropTypes from 'prop-types';
import auth_ws from '../ws/auth_ws';
import {LOGOUT} from '../reducers/common';

const LeftContainer = ({setShowAddServerForm}) => {
	const dispatch = useDispatch();
	const {me, clicked_server} = useSelector((state) => state.common);
	const [search, setSearch] = useState('');
	const [activeSearch, setActiveSearch] = useState(false);
	const [open, setOpen] = useState(false);

	const onClickVisibleForm = useCallback(() => {
		setShowAddServerForm(true);
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
		auth_ws({keyword: 'LogoutRequest', ws_auth: me.socket}).then((r) => {
			dispatch({
				type: LOGOUT,
			});
		});
	});
	return (
		<OutlineCol xs={2}>
			<Header>
				<Nav.Item className='left_header'>SSHTerminal / SFTP</Nav.Item>
				<Nav.Item className='left_header_icons'>
					<IconButton onClick={onClickVisibleForm}>
						<FaPlus />
					</IconButton>
					<IconButton onClick={onClickDeleteServer}>
						<FaRegTrashAlt />
					</IconButton>
					<IconButton onClick={onClickOpenSearch}>
						<FaSearch />
					</IconButton>

					{me !== null && (
						<IconButton onClick={onClickLogout}>
							<GrLogout />
						</IconButton>
					)}
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
			<ServerNavBar search={search} />
			<ConfirmPopup
				keyword={'delete_server'}
				open={open}
				setOpen={setOpen}
			/>
		</OutlineCol>
	);
};

LeftContainer.propTypes = {
	setShowAddServerForm: PropTypes.func.isRequired,
};

export default LeftContainer;
