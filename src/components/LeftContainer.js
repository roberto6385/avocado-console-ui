import React, {useCallback, useState} from 'react';
import {Col, Collapse, Form, FormControl, Nav} from 'react-bootstrap';
import styled from 'styled-components';
import {
	HIGHLIGHT_COLOR,
	MAIN_COLOR,
	NAV_HEIGHT,
	NAV_HEIGHT_SUM,
	SECOND_NAV_HEIGHT,
	WHITE_COLOR,
} from '../styles/global';
import ServerNavBar from './ServerNavBar';
import {FaPlus, FaRegTrashAlt, FaSearch} from 'react-icons/all';
import {useDispatch, useSelector} from 'react-redux';
import {DELETE_SERVER} from '../reducers/common';

const Header = styled(Nav)`
	height: ${NAV_HEIGHT_SUM};
	display: block;
	.left_header {
		display: flex;
		align-items: center;
		justify-content: center;
		height: ${NAV_HEIGHT};
		background: ${MAIN_COLOR};
		color: ${WHITE_COLOR};
	}
	.left_header_icons {
		height: ${SECOND_NAV_HEIGHT};
		background: ${WHITE_COLOR};
		display: flex;
		align-items: center;
		justify-content: flex-end;
		border: none;
		border-bottom: solid;
		border-width: 1px;
		border-color: ${HIGHLIGHT_COLOR};
	}
`;

const Body = styled(ServerNavBar)`
	flex: 1;
`;

const RC_Col = styled(Col)`
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
`;

const Icon_Button = styled.button`
	background: transparent;
	outline: none;
	border: none;
	&:hover {
		color: ${MAIN_COLOR};
	}
`;

const SearchForm = styled(FormControl)`
	font-size: 12px;
	border: none;
	border-bottom: 1px solid ${HIGHLIGHT_COLOR};
	outline: none;
	border: 'none';
`;

const LeftContainer = () => {
	const dispatch = useDispatch();
	const {clicked_server} = useSelector((state) => state.common);
	const [search, setSearch] = useState('');
	const [activeSearch, setActiveSearch] = useState(false);

	const onClickVisibleForm = useCallback(() => {
		document.getElementById('add-server-form').style.display = 'block';
	}, []);

	const onClickDeleteServer = useCallback(() => {
		if (clicked_server !== null) {
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
					<Icon_Button onClick={onClickVisibleForm}>
						<FaPlus />
					</Icon_Button>
					<Icon_Button onClick={onClickDeleteServer}>
						<FaRegTrashAlt />
					</Icon_Button>
					<Icon_Button onClick={onClickOpenSearch}>
						<FaSearch />
					</Icon_Button>
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
			<Body search={search} />
		</RC_Col>
	);
};

export default LeftContainer;
