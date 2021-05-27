import React, {useCallback} from 'react';
import styled from 'styled-components';
import {
	Span,
	FOOTER_BACK_COLOR,
	FOOTER_HEIGHT,
	HISTORY_FONTSIZE,
} from '../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {
	SET_SEARCH_MODE,
	SSH_DECREASE_FONT_SIZE,
	SSH_INCREASE_FONT_SIZE,
} from '../reducers/ssht';
import {
	searchIconMicro,
	zoomInIconMicro,
	zoomOutIconMicro,
} from '../icons/icons';

const _Footer = styled.footer`
	height: ${FOOTER_HEIGHT};
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: ${HISTORY_FONTSIZE};
	background: ${FOOTER_BACK_COLOR};
	padding: 0 16px;
`;

const _Button = styled.button`
	font-size: ${HISTORY_FONTSIZE};
	background: transparent;
	border: none;
	padding: 4px;
`;

const Footer = () => {
	const dispatch = useDispatch();
	const {server, tab, current_tab} = useSelector((state) => state.common);

	const onClickIncreaseFont = useCallback(() => {
		dispatch({type: SSH_INCREASE_FONT_SIZE});
	}, [dispatch]);

	const onClickDeceaseFont = useCallback(() => {
		dispatch({type: SSH_DECREASE_FONT_SIZE});
	}, [dispatch]);

	const onClickOpenSearchBar = useCallback(() => {
		if (current_tab !== null) dispatch({type: SET_SEARCH_MODE});
	}, [current_tab, dispatch]);
	return (
		<_Footer>
			<Span size={HISTORY_FONTSIZE}>Avocado v1.0</Span>
			<div>
				{tab.filter((v) => v.display && v.type === 'SSHT').length !==
					0 && (
					<>
						<_Button onClick={onClickDeceaseFont}>
							{zoomOutIconMicro}
						</_Button>
						<_Button onClick={onClickIncreaseFont}>
							{zoomInIconMicro}
						</_Button>
						<_Button onClick={onClickOpenSearchBar}>
							{searchIconMicro}
						</_Button>
					</>
				)}
				{current_tab &&
					server.find(
						(v) =>
							v.id ===
							tab.find((i) => i.uuid === current_tab)?.server.id,
					)?.host}
			</div>
		</_Footer>
	);
};

export default Footer;
