import React, {useCallback, useState} from 'react';
import {Collapse, Form, Nav} from 'react-bootstrap';
import {FaPlus, FaRegTrashAlt, FaSearch} from 'react-icons/all';
import {useDispatch, useSelector} from 'react-redux';
import ConfirmPopup from './ConfirmPopup';
import {
	Header,
	IconButton,
	RC_Col,
	SearchForm,
	ServerNavBarWrapper,
} from '../styles/common';

const LeftContainer = () => {
	const dispatch = useDispatch();
	const {clicked_server} = useSelector((state) => state.common);
	const [search, setSearch] = useState('');
	const [activeSearch, setActiveSearch] = useState(false);
	const [open, setOpen] = useState(false);

	const onClickVisibleForm = useCallback(() => {
		document.getElementById('add-server-form').style.display = 'block';
	}, []);

	const onClickDeleteServer = useCallback(() => {
		if (clicked_server !== null) {
			setOpen(true);
			// dispatch({type: DELETE_SERVER});
		}
	}, [clicked_server]);

	const onClickOpenSearch = useCallback(() => {
		setActiveSearch(!activeSearch);
	}, [activeSearch]);

	const onChangeSearch = useCallback((e) => {
		setSearch(e.target.value);
	}, []);

	return (
		<RC_Col xs={2}>
			<Header>
				<Nav.Item className='left_header'>Terminal / SFTP</Nav.Item>
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
				</Nav.Item>
			</Header>
			<Collapse in={activeSearch}>
				<Nav.Item key='search' id='server-search-bar'>
					<Form>
						<SearchForm
							type='text'
							onChange={onChangeSearch}
							value={search}
							placeholder='Search...'
						/>
					</Form>
				</Nav.Item>
			</Collapse>
			<ServerNavBarWrapper search={search} />
			<ConfirmPopup
				keyword={'Delete Server'}
				open={open}
				setOpen={setOpen}
			/>
		</RC_Col>
	);
};

export default LeftContainer;
