import React, {useCallback} from 'react';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
	SSH_DECREASE_FONT_SIZE,
	SSH_INCREASE_FONT_SIZE,
	SSH_SET_SEARCH_MODE,
} from '../reducers/ssh';
import {searchIcon, zoomInIcon, zoomOutIcon} from '../icons/icons';

import {HoverButton} from '../styles/components/icon';
import {tabBarSelector} from '../reducers/tabBar';

const _Footer = styled.footer`
	height: 26px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 12px;
	background: ${(props) => props.theme.pages.default.footer.backgroundColor};
	padding: 0 16px;
`;

const _RightSideContainer = styled.div`
	display: flex;
	align-items: center;
`;

const Footer = () => {
	const dispatch = useDispatch();
	const {server} = useSelector((state) => state.common, shallowEqual);

	const {terminalTabs, selectedTab} = useSelector(tabBarSelector.all);
	const {font_size} = useSelector((state) => state.ssh, shallowEqual);

	const onClickIncreaseFontSize = useCallback(() => {
		if (font_size < 20) dispatch({type: SSH_INCREASE_FONT_SIZE});
	}, [font_size]);

	const onClickDeceaseFontSize = useCallback(() => {
		if (font_size > 10) dispatch({type: SSH_DECREASE_FONT_SIZE});
	}, [font_size]);

	const onClickOpenSSHSearchBar = useCallback(() => {
		if (
			selectedTab !== null &&
			terminalTabs.slice().find((v) => v.uuid === selectedTab).type ===
				'SSH'
		)
			dispatch({type: SSH_SET_SEARCH_MODE});
	}, [selectedTab, terminalTabs]);

	return (
		<_Footer>
			<span>Avocado v1.0</span>

			{terminalTabs.filter((v) => v.display && v.type === 'SSH')
				.length !== 0 && (
				<_RightSideContainer>
					<HoverButton
						margin_right={'10px'}
						size={'micro'}
						onClick={onClickDeceaseFontSize}
					>
						{zoomOutIcon}
					</HoverButton>
					<HoverButton
						margin_right={'10px'}
						size={'micro'}
						onClick={onClickIncreaseFontSize}
					>
						{zoomInIcon}
					</HoverButton>
					<HoverButton
						margin_right={'10px'}
						size={'micro'}
						onClick={onClickOpenSSHSearchBar}
					>
						{searchIcon}
					</HoverButton>

					{selectedTab &&
						server.find(
							(v) =>
								v.id ===
								terminalTabs.find((i) => i.uuid === selectedTab)
									?.server.id,
						)?.host}
				</_RightSideContainer>
			)}
		</_Footer>
	);
};

export default Footer;
