import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FaSearch, FaSearchMinus, FaSearchPlus} from 'react-icons/all';

import {
	SSHT_INCREASE_FONT_SIZE,
	SSHT_DECREASE_FONT_SIZE,
	SET_SEARCH_MODE,
} from '../reducers/ssht';
import {BottomBar, ButtonsContainer, IconButton} from '../styles/common';

const Footer = () => {
	const dispatch = useDispatch();
	const {server, tab, current_tab} = useSelector((state) => state.common);

	const onClickIncreaseFont = useCallback(() => {
		dispatch({type: SSHT_INCREASE_FONT_SIZE});
	}, []);

	const onClickDeceaseFont = useCallback(() => {
		dispatch({type: SSHT_DECREASE_FONT_SIZE});
	}, []);

	const onClickOpenSearchBar = useCallback(() => {
		if (current_tab !== null) dispatch({type: SET_SEARCH_MODE});
	}, [current_tab]);

	return (
		<BottomBar>
			<ButtonsContainer>
				<IconButton onClick={onClickDeceaseFont}>
					<FaSearchMinus />
				</IconButton>
				<IconButton onClick={onClickIncreaseFont}>
					<FaSearchPlus />
				</IconButton>
				<IconButton onClick={onClickOpenSearchBar}>
					<FaSearch />
				</IconButton>

				{/*{server &&*/}
				{/*	tab &&*/}
				{/*	server?.find(*/}
				{/*		(i) =>*/}
				{/*			i.id ===*/}
				{/*			tab.find((v) => v.id === current_tab).server?.id,*/}
				{/*	).host}*/}
			</ButtonsContainer>
		</BottomBar>
	);
};

export default Footer;
