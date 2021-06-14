import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Span} from '../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {
	SET_SEARCH_MODE,
	SSH_DECREASE_FONT_SIZE,
	SSH_INCREASE_FONT_SIZE,
} from '../reducers/ssh';
import {
	searchIconMicro,
	zoomInIconMicro,
	zoomOutIconMicro,
} from '../icons/icons';
import {HEIGHT_26, FONT_12} from '../styles/length';
import {fontColor, footerColor} from "../styles/color";

const _Footer = styled.footer`
	height: ${HEIGHT_26};
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: ${FONT_12};
	background: ${(props) => props.back};
	padding: 0 16px;
`;

const _Button = styled.button`
	font-size: ${FONT_12};
	height: 24px;
	background: transparent;
	border: none;
	padding: 4px;
	color: ${(props) => props.color};
`;

const _HostContainer = styled.div`
	display: flex;
	align-items: center;
	color: ${(props) => props?.color};
`;

const Footer = () => {
	const dispatch = useDispatch();
	const {server, tab, current_tab, theme} = useSelector(
		(state) => state.common,
	);
	const {font_size} = useSelector((state) => state.ssh);

	const onClickIncreaseFont = useCallback(() => {
		if (font_size < 20) dispatch({type: SSH_INCREASE_FONT_SIZE});
	}, [font_size]);

	const onClickDeceaseFont = useCallback(() => {
		if (font_size > 10) dispatch({type: SSH_DECREASE_FONT_SIZE});
	}, [font_size]);

	const onClickOpenSearchBar = useCallback(() => {
		const current = tab.slice().find((v) => v.uuid === current_tab);
		if (current_tab !== null && current.type === 'SSH')
			dispatch({type: SET_SEARCH_MODE});
	}, [current_tab, tab]);

	return (
		<_Footer back={footerColor[theme]}>
			<Span color={fontColor[theme]} size={FONT_12}>
				Avocado v1.0
			</Span>
			{tab.filter((v) => v.display && v.type === 'SSH').length !== 0 && (
				<_HostContainer color={fontColor[theme]}>
					<_Button
						color={fontColor[theme]}
						onClick={onClickDeceaseFont}
					>
						{zoomOutIconMicro}
					</_Button>
					<_Button
						color={fontColor[theme]}
						onClick={onClickIncreaseFont}
					>
						{zoomInIconMicro}
					</_Button>
					<_Button
						color={fontColor[theme]}
						onClick={onClickOpenSearchBar}
					>
						{searchIconMicro}
					</_Button>

					{current_tab &&
						server.find(
							(v) =>
								v.id ===
								tab.find((i) => i.uuid === current_tab)?.server
									.id,
						)?.host}
				</_HostContainer>
			)}
		</_Footer>
	);
};

export default Footer;
