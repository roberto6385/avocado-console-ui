import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import ServerFolderList from './NavItems/ServerFolderList';
import FavoriteList from './NavItems/FavoriteList';
import useInput from '../../hooks/useInput';
import {OPEN_ADD_FAVORITES_FORM_POPUP} from '../../reducers/popup';
import {
	avocadoLogo,
	burgerMenuIcon,
	plusIcon,
	searchIcon,
} from '../../icons/icons';
import {CHANGE_NAVTAB} from '../../reducers/common';
import {HoverButton} from '../../styles/components/icon';
import drkFloatingButton from '../../images/navFoldingButton/drk_floating_btn.png';
import lghtFloatingButton from '../../images/navFoldingButton/lght_floating_btn.png';
import IconTextBox_ from '../RecycleComponents/IconTextBox_';

const floatings = {light: lghtFloatingButton, dark: drkFloatingButton};

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

const Logo = styled.div`
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

const _FolerServerTab = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	border-bottom: 1px solid
		${(props) => props.theme.pages.webTerminal.main.navigation.border.color};
`;

const _FormContainer = styled.div`
	padding: 10px 12px;
	display: flex;
`;
const _Form = styled.form`
	display: flex;
	flex: 1;
	align-items: center;
	border-radius: 4px;
`;

const _AddButton = styled.button`
	width: 36px;
	height: 36px;
	margin-left: 8px;
	border: 1px solid;
	border-radius: 4px;
	color: ${(props) =>
		props.theme.pages.webTerminal.main.navigation.addButton.font.color};
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.navigation.addButton.border.color};
	background: ${(props) =>
		props.theme.pages.webTerminal.main.navigation.addButton
			.backgroundColor};

	&:hover {
		color: ${(props) =>
			props.theme.pages.webTerminal.main.navigation.addButton.hover.font
				.color};
		border-color: ${(props) =>
			props.theme.pages.webTerminal.main.navigation.addButton.hover.border
				.color};
		background: ${(props) =>
			props.theme.pages.webTerminal.main.navigation.addButton.hover
				.backgroundColor};
	}
`;

const _OpenButton = styled.div`
	outline: none;
	line-height: 0px;
	cursor: pointer;
	position: absolute;
	padding: 4px;
	right: -30px;
	bottom: 10px;
	display: ${(props) => props?.display};
`;

const _Tab = styled.div`
	display: flex;
	flex-warp: nowrap;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	width: 127px;
`;

const _TabItem = styled.div`
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

const isValidFolderName = (folderArray, name) => {
	let pass = true;

	for (let i of folderArray) {
		if (i.type === 'folder') {
			if (i.name === name) return false;
			else if (i.contain.length > 0) {
				pass = pass && isValidFolderName(i.contain, name);
			}
		}
	}
	return pass;
};

const NavBar = ({toggle, setToggle}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('nav');

	const {theme, current_nav_tab} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const [search, onChangeSearch] = useInput('');

	const tabs = [
		{title: t('resource'), key: 0},
		{title: t('bookmark'), key: 1},
	];

	//TODO: ADD FOLDER
	// const onClickAddFolder = useCallback(() => {
	// 	let folderName = t('newFolder');
	// 	let i = 0;
	// 	while (!isValidFolderName(nav, folderName)) {
	// 		folderName = `${t('newFolder')} ${i}`;
	// 		i++;
	// 	}
	// 	dispatch({type: ADD_FOLDER, data: folderName});
	// }, [dispatch, nav, t]);

	//TODO: ADD SERVER
	// const onClickAddServer = useCallback(() => {
	// 	dispatch({
	// 		type: OPEN_ADD_SERVER_FORM_POPUP,
	// 		data: {type: 'add'},
	// 	});
	// }, [dispatch]);

	const newFavorites = useCallback(() => {
		dispatch({type: OPEN_ADD_FAVORITES_FORM_POPUP});
	}, [dispatch]);

	const onClickOpenTggle = useCallback(() => {
		setToggle(!toggle);
	}, [setToggle, toggle]);

	const handleCurrentKey = useCallback(
		(key) => () => {
			dispatch({type: CHANGE_NAVTAB, payload: key});
		},
		[dispatch],
	);

	return (
		<_Aside className={toggle ? 'nav' : 'nav close'}>
			<_Header>
				<HoverButton margin_right={'6px'} onClick={onClickOpenTggle}>
					{burgerMenuIcon}
				</HoverButton>
				<Logo>{avocadoLogo}</Logo>
			</_Header>
			<_FolerServerTab>
				{tabs.map((v) => {
					return (
						<_Tab key={v.key} onClick={handleCurrentKey(v.key)}>
							<_TabItem
								selected={current_nav_tab === v.key ? 1 : 0}
							>
								{v.title}
							</_TabItem>
						</_Tab>
					);
				})}
			</_FolerServerTab>
			{current_nav_tab === 0 ? ( // 0:자원 1:즐겨찾기
				<>
					<_FormContainer>
						<_Form onSubmit={(e) => e.preventDefault()}>
							<IconTextBox_
								icon={searchIcon}
								onChange={onChangeSearch}
								value={search}
								place={t('search')}
								height={'36px'}
							/>
						</_Form>
						{/*<_AddButton onClick={onClickAddServer} >*/}
						{/*	{plusIcon}*/}
						{/*</_AddButton>*/}
					</_FormContainer>
					<ServerFolderList search={search} />
				</>
			) : (
				<>
					<_FormContainer>
						<_Form onSubmit={(e) => e.preventDefault()}>
							<IconTextBox_
								icon={searchIcon}
								onChange={onChangeSearch}
								value={search}
								place={t('search')}
								height={'36px'}
							/>
						</_Form>
						<_AddButton onClick={newFavorites}>
							{plusIcon}
						</_AddButton>
					</_FormContainer>
					<FavoriteList search={search} />
				</>
			)}

			<_OpenButton
				onClick={() => setToggle(!toggle)}
				display={toggle ? 'none' : 'inline-block'}
			>
				<img src={floatings[theme]} alt='floating button' />
			</_OpenButton>
		</_Aside>
	);
};

NavBar.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default NavBar;
