import React, {useCallback} from 'react';
import styled from 'styled-components';
import {
	Avocado_span,
	Button,
	FOOTER_BACK_COLOR,
	FOOTER_FONTSIZE,
	FOOTER_HEIGHT,
} from '../../styles/global_design';
import {IconButton} from '../../styles/buttons';
import {FaSearch, FaSearchMinus, FaSearchPlus} from 'react-icons/all';
import {useDispatch, useSelector} from 'react-redux';
import {
	SET_SEARCH_MODE,
	SSHT_DECREASE_FONT_SIZE,
	SSHT_INCREASE_FONT_SIZE,
} from '../../reducers/ssht';

const Footer_Container = styled.footer`
	height: ${FOOTER_HEIGHT};
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: ${FOOTER_FONTSIZE};
	background: ${FOOTER_BACK_COLOR};
	padding: 0 16px;
`;

const Footer_Button = styled.button`
	font-size: ${FOOTER_FONTSIZE};
	background: transparent;
	border: none;
`;

const Footer_Info = styled.div``;

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
		<Footer_Container>
			<Avocado_span size={FOOTER_FONTSIZE}>Avocado v1.0</Avocado_span>
			<Footer_Info>
				{tab.filter((v) => v.display && v.type === 'SSHT').length !==
					0 && (
					<>
						<Footer_Button onClick={onClickDeceaseFont}>
							<FaSearchMinus />
						</Footer_Button>
						<Footer_Button onClick={onClickIncreaseFont}>
							<FaSearchPlus />
						</Footer_Button>
						<Footer_Button onClick={onClickOpenSearchBar}>
							<FaSearch />
						</Footer_Button>
					</>
				)}
				{current_tab &&
					server.find(
						(v) =>
							v.id ===
							tab.find((i) => i.uuid === current_tab)?.server.id,
					)?.host}
			</Footer_Info>
		</Footer_Container>
	);
};

export default Footer;
