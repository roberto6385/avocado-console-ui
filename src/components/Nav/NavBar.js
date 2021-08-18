import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {avocadoLogo, burgerMenuIcon} from '../../icons/icons';

import {HoverButton} from '../../styles/components/icon';
import drkFoldingButton from '../../images/navFoldingButton/drk_floating_btn.png';
import lghtFoldingButton from '../../images/navFoldingButton/lght_floating_btn.png';
import Resources from './Resources/Resources';
import Favorites from './Favorites/Favorites';
import {settingAction, settingSelector} from '../../reducers/setting';

const foldingButtons = {light: lghtFoldingButton, dark: drkFoldingButton};

const _Aside = styled.aside`
	display: flex;
	flex-direction: column;
	width: 256px;
	min-width: 256px;
	border-right: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.navigation.border.color};
	height: 100%;
	background: ${(props) =>
		props.theme.pages.webTerminal.main.navigation.backgroundColor};
	z-index;
`;

const _Logo = styled.div`
	svg {
		fill: ${(props) => props.theme.pages.webTerminal.main.font.color};
	}
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	height: 54px;
	padding: 18px 16px 19px;
`;

const _NavTabContianer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	border-bottom: 1px solid
		${(props) => props.theme.pages.webTerminal.main.navigation.border.color};
`;

const _OpenNavButton = styled.div`
	outline: none;
	line-height: 0px;
	cursor: pointer;
	position: absolute;
	padding: 4px;
	right: -30px;
	bottom: 10px;
	display: ${(props) => props?.display};
`;

const _NavTabs = styled.div`
	display: flex;
	flex-warp: nowrap;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	width: 127px;
`;

const _NavTabItem = styled.div`
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	height: 100%;
	font-weight: bold;
	color: ${(props) =>
		props.selected
			? props.theme.pages.webTerminal.main.navigation.tab.selectedStyle
					.font.color
			: props.theme.pages.webTerminal.main.navigation.tab.normalStyle.font
					.color};
	margin: 0px 16px;
	border-bottom: 2px solid;
	border-color: ${(props) =>
		props.selected
			? props.theme.pages.webTerminal.main.navigation.tab.selectedStyle
					.border.color
			: props.theme.pages.webTerminal.main.navigation.tab.normalStyle
					.border.color};
	width: 100%;
`;

const NavBar = ({toggle, setToggle}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('nav');

	const {theme, navigation} = useSelector(settingSelector.all);

	//TODO: !!important: change key value to resource, bookmark
	const navTabs = [
		{title: t('resource'), key: 'resources'},
		{title: t('bookmark'), key: 'favorites'},
	];

	const onClickOpenOrCloseNav = useCallback(() => {
		setToggle(!toggle);
	}, [setToggle, toggle]);

	const onClickChangeNavTab = useCallback(
		(key) => () => {
			dispatch(settingAction.setNav(key));
		},
		[dispatch],
	);

	return (
		<_Aside className={toggle ? 'nav' : 'nav close'}>
			<_Header>
				<HoverButton
					margin_right={'6px'}
					onClick={onClickOpenOrCloseNav}
				>
					{burgerMenuIcon}
				</HoverButton>
				<_Logo>{avocadoLogo}</_Logo>
			</_Header>
			<_NavTabContianer>
				{navTabs.map((v) => {
					return (
						<_NavTabs
							key={v.key}
							onClick={onClickChangeNavTab(v.key)}
						>
							<_NavTabItem
								selected={navigation === v.key ? 1 : 0}
							>
								{v.title}
							</_NavTabItem>
						</_NavTabs>
					);
				})}
			</_NavTabContianer>
			{navigation === 'resources' ? <Resources /> : <Favorites />}

			<_OpenNavButton
				onClick={onClickOpenOrCloseNav}
				display={toggle ? 'none' : 'inline-block'}
			>
				<img src={foldingButtons[theme]} alt='nav folding button' />
			</_OpenNavButton>
		</_Aside>
	);
};

NavBar.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default NavBar;
