import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FaSearch, FaSearchMinus, FaSearchPlus} from 'react-icons/all';

import {
	SSHT_INCREASE_FONT_SIZE,
	SSHT_DECREASE_FONT_SIZE,
	SET_SEARCH_MODE,
} from '../reducers/ssht';

import {IconButton} from '../styles/buttons';
import {MainHeader} from '../styles/cards';
import {BaseSpan} from '../styles/texts';
import {SMALL_FONT} from '../styles/global';

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
		<MainHeader justify={'flex-end'}>
			{tab.filter((v) => v.display && v.type === 'SSHT').length !== 0 && (
				<>
					<IconButton onClick={onClickDeceaseFont}>
						<FaSearchMinus />
					</IconButton>
					<IconButton onClick={onClickIncreaseFont}>
						<FaSearchPlus />
					</IconButton>
					<IconButton onClick={onClickOpenSearchBar}>
						<FaSearch />
					</IconButton>
				</>
			)}
			<BaseSpan padding={'0px 8px'} fontSize={'14px'}>
				{current_tab &&
					server.find(
						(v) =>
							v.id ===
							tab.find((i) => i.uuid === current_tab)?.server.id,
					)?.host}
			</BaseSpan>
		</MainHeader>
	);
};

export default Footer;
