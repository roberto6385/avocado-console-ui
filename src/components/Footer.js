import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {sshAction, sshSelector} from '../reducers/ssh';
import {searchIcon, zoomInIcon, zoomOutIcon} from '../icons/icons';

import {HoverButton} from '../styles/components/icon';
import {tabBarSelector} from '../reducers/tabBar';
import {remoteResourceSelector} from '../reducers/remoteResource';

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
	const {resources} = useSelector(remoteResourceSelector.all);

	const {terminalTabs, selectedTab} = useSelector(tabBarSelector.all);
	const {font} = useSelector(sshSelector.all);

	const onClickIncreaseFontSize = useCallback(() => {
		if (font.size < 20) dispatch(sshAction.increaseFont());
	}, [dispatch, font.size]);

	const onClickDeceaseFontSize = useCallback(() => {
		if (font.size > 10) dispatch(sshAction.decreaseFont());
	}, [dispatch, font.size]);

	const onClickOpenSSHSearchBar = useCallback(() => {
		if (
			selectedTab !== null &&
			terminalTabs.slice().find((v) => v.uuid === selectedTab).type ===
				'SSH'
		)
			dispatch(sshAction.setSearchMode());
	}, [selectedTab, terminalTabs, dispatch]);

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
						resources.find((v) => v.key === selectedTab)?.host}
				</_RightSideContainer>
			)}
		</_Footer>
	);
};

export default Footer;
