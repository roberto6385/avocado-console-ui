import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FaSearch, FaSearchMinus, FaSearchPlus} from 'react-icons/all';

import {
	SSHT_INCREASE_FONT_SIZE,
	SSHT_DECREASE_FONT_SIZE,
	SET_SEARCH_MODE,
} from '../reducers/ssht';
import {BottomBar, ButtonsContainer} from '../styles/common';

const Footer = () => {
	const dispatch = useDispatch();
	const {search_mode} = useSelector((state) => state.ssht);
	const {server, tab, current_tab} = useSelector((state) => state.common);

	const onClickIncreaseFont = useCallback(() => {
		dispatch({type: SSHT_INCREASE_FONT_SIZE});
	}, []);

	const onClickDesceaseFont = useCallback(() => {
		dispatch({type: SSHT_DECREASE_FONT_SIZE});
	}, []);

	const onClickOpenSearchBar = useCallback(() => {
		if (current_tab !== null) dispatch({type: SET_SEARCH_MODE});
	}, [current_tab]);

	return (
		<BottomBar id='bottom-bar'>
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
					aria-expanded={search_mode}
					onClick={onClickOpenSearchBar}
				/>
				{/*{server &&*/}
				{/*	tab &&*/}
				{/*	server.find(*/}
				{/*		(i) =>*/}
				{/*			i.id ===*/}
				{/*			tab.find((v) => v.id === current_tab).server.id,*/}
				{/*	).host}*/}
			</ButtonsContainer>
		</BottomBar>
	);
};

export default Footer;
