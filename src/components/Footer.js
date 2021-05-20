import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FaSearch, FaSearchMinus, FaSearchPlus} from 'react-icons/all';

import {
	SSHT_INCREASE_FONT_SIZE,
	SSHT_DECREASE_FONT_SIZE,
	SET_SEARCH_MODE,
} from '../reducers/ssht';

import {PrevIconButton} from '../styles/buttons';
import {BaseSpan} from '../styles/texts';
import {light_Background, SMALL_FONT} from '../styles/global';

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
		<div>
			{tab.filter((v) => v.display && v.type === 'SSHT').length !== 0 && (
				<>
					<PrevIconButton onClick={onClickDeceaseFont}>
						<FaSearchMinus />
					</PrevIconButton>
					<PrevIconButton onClick={onClickIncreaseFont}>
						<FaSearchPlus />
					</PrevIconButton>
					<PrevIconButton onClick={onClickOpenSearchBar}>
						<FaSearch />
					</PrevIconButton>
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
		</div>
	);
};

export default Footer;
