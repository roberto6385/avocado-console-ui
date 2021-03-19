import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, FormControl, Collapse} from 'react-bootstrap';
import {
	BsSquareFill,
	FaSearch,
	FaSearchMinus,
	FaSearchPlus,
} from 'react-icons/all';
import styled from 'styled-components';

import {
	SSHT_INCREASE_FONT_SIZE,
	SSHT_DECREASE_FONT_SIZE,
	// SET_SEARCH_ITEM,
	// SET_SEARCH_NEXT,
} from '../reducers/ssht';
import {NAV_HEIGHT} from '../styles/global';

const BottomBar = styled.div`
	height: ${NAV_HEIGHT};
`;

const ButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 100%;
`;

const FooterFormControl = styled(FormControl)`
	position: absolute;
	bottom: 42px;
	width: 200px;
	font-size: 12px;
	right: 1px;
`;

const Footer = () => {
	const dispatch = useDispatch();
	// const {search_item} = useSelector((state) => state.socket);
	const [openSearchBar, setOpenSearchBar] = useState(false);

	const onSubmitEnter = useCallback(
		(e) => {
			e.preventDefault();
			// dispatch({
			// 	type: SET_SEARCH_NEXT,
			// 	data: true,
			// });
		},
		[dispatch],
	);

	const onChangeSearch = useCallback(
		(e) => {
			// dispatch({
			// 	type: SET_SEARCH_ITEM,
			// 	data: e.target.value,
			// });
		},
		[dispatch],
	);

	const onClickIncreaseFont = useCallback(() => {
		dispatch({type: SSHT_INCREASE_FONT_SIZE});
	}, [dispatch]);

	const onClickDesceaseFont = useCallback(() => {
		dispatch({type: SSHT_DECREASE_FONT_SIZE});
	}, [dispatch]);

	const onClickOpenSearchBar = useCallback(() => {
		setOpenSearchBar(!openSearchBar);
	}, [openSearchBar]);

	return (
		<BottomBar id='bottom-bar'>
			{/*<Collapse in={openSearchBar}>*/}
			{/*	<Form*/}
			{/*		onSubmit={onSubmitEnter}*/}
			{/*		style={{*/}
			{/*			marginRight: '10px',*/}
			{/*			float: 'right',*/}
			{/*			width: '200px',*/}
			{/*		}}*/}
			{/*	>*/}
			{/*		<FooterFormControl*/}
			{/*			type='text'*/}
			{/*			id='searchVal'*/}
			{/*			// value={search_item.data}*/}
			{/*			placeholder='Search'*/}
			{/*			onChange={onChangeSearch}*/}
			{/*		/>*/}
			{/*	</Form>*/}
			{/*</Collapse>*/}
			<ButtonsContainer>
				<FaSearchMinus
					className={'header-footer-button'}
					onClick={onClickDesceaseFont}
				/>
				<FaSearchPlus
					className={'header-footer-button'}
					onClick={onClickIncreaseFont}
				/>
				<FaSearch
					className={'header-footer-button'}
					aria-expanded={openSearchBar}
					onClick={onClickOpenSearchBar}
				/>
			</ButtonsContainer>
		</BottomBar>
	);
};

export default Footer;
