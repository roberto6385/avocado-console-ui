import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import ServerFolderList from './ServerFolderList/ServerFolderList';
import useInput from '../hooks/useInput';
import {OPEN_ADD_SERVER_FORM_POPUP} from '../reducers/popup';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
	burgerMenuIcon,
	newFolderIcon,
	plusIcon,
	searchIcon,
} from '../icons/icons';
import {ADD_FOLDER} from '../reducers/common';
import PropTypes from 'prop-types';
import {
	HEIGHT_48,
	WIDTH_256,
	FONT_14,
	HEIGHT_36,
	WIDTH_165,
} from '../styles/length';
import {
	navInputColor,
	navColor,
	borderColor,
	fontColor,
	iconColor,
	inputBack,
} from '../styles/color';
import LightModeLogo from '../images/logo@2x.png';
import DarkModeLogo from '../images/logo_white@3x.png';
import {ClickableIconButton, IconBox} from '../styles/button';

const _Aside = styled.aside`
	display: flex;
	flex-direction: column;
	width: ${WIDTH_256};
	min-width: ${WIDTH_256};
	border-right: 1px solid;
	border-color: ${(props) => props.bcolor};
	height: 100%;
	background: ${(props) => props.back};
	z-index;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	height: 54px;
	padding: 18px 16px 19px;
	background: ${(props) => props.back};
`;

const _AddFolerServerContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	padding: 10px;
	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
	background: ${(props) => props.back};
`;
const _Form = styled.form`
	display: flex;
	align-items: center;
	padding: 16px 10px;
	height: ${HEIGHT_48};
	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
	background: ${(props) => props.back};
`;

const _NewServerTitle = styled.div`
	font-size: 14px;
	color: ${(props) => props.color};
	flex: 1;
`;

const _Input = styled.input`
	width: ${WIDTH_165};
	height: ${HEIGHT_36};
	border: none;
	font-size: ${FONT_14};
	padding: 0px;
	background: transparent;
	color: ${(props) => props.color};
`;

const _OpenButton = styled.div`
	outline: none;
	line-height: 0px;
	cursor: pointer;
	// border: 1px solid;
	// border-color: ${(props) => iconColor[props?.theme_value]};
	box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
	position: absolute;
	padding: 4px;
	border-radius: 50%;
	background: ${(props) => inputBack[props?.theme_value]};
	right: -30px;
	bottom: 10px;
	display: ${(props) => props?.display};
`;

const _Right = styled.span`
	position: relative;
	right: -8px;
	color: ${(props) => iconColor[props?.theme_value]};
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

const Nav = ({toggle, setToggle}) => {
	const {t} = useTranslation('nav');
	const dispatch = useDispatch();
	const {nav, theme} = useSelector((state) => state.common, shallowEqual);
	const [search, onChangeSearch] = useInput('');

	const newFolder = useCallback(() => {
		let folderName = t('newFolder');
		let i = 0;
		while (!isValidFolderName(nav, folderName)) {
			folderName = `${t('newFolder')} ${i}`;
			i++;
		}
		dispatch({type: ADD_FOLDER, data: folderName});
	}, [dispatch, nav, t]);

	const newServer = useCallback(() => {
		dispatch({
			type: OPEN_ADD_SERVER_FORM_POPUP,
			data: {type: 'add'},
		});
	}, [dispatch]);

	const onClickOpenTggle = useCallback(() => {
		setToggle(!toggle);
	}, [setToggle, toggle]);

	return (
		<_Aside
			className={toggle ? 'nav' : 'nav close'}
			bcolor={borderColor[theme]}
			back={navColor[theme]}
		>
			<_Header back={navColor[theme]}>
				<ClickableIconButton
					margin_right={'6px'}
					theme_value={theme}
					onClick={onClickOpenTggle}
				>
					{burgerMenuIcon}
				</ClickableIconButton>
				{theme === 0 ? (
					<img src={LightModeLogo} height='17' alt='LightModeLogo' />
				) : (
					<img src={DarkModeLogo} height='17' alt='DarkModeLogo' />
				)}
			</_Header>
			<_AddFolerServerContainer
				back={navColor[theme]}
				bcolor={borderColor[theme]}
			>
				<ClickableIconButton
					margin={'6px'}
					color={fontColor[theme]}
					onClick={newServer}
				>
					{plusIcon}
				</ClickableIconButton>
				<_NewServerTitle color={fontColor[theme]}>
					{t('newServer')}
				</_NewServerTitle>
				<ClickableIconButton theme_value={theme} onClick={newFolder}>
					{newFolderIcon}
				</ClickableIconButton>
			</_AddFolerServerContainer>
			<_Form back={navColor[theme]} bcolor={borderColor[theme]}>
				<IconBox theme_value={theme} margin_right={'6px'}>
					{searchIcon}
				</IconBox>
				<_Input
					onChange={onChangeSearch}
					value={search}
					type='text'
					placeholder={t('search')}
					color={fontColor[theme]}
					back={navInputColor[theme]}
				/>
			</_Form>
			<ServerFolderList search={search} />

			<_OpenButton
				onClick={() => setToggle(!toggle)}
				display={toggle ? 'none' : 'inline-block'}
				theme_value={theme}
			>
				<_Right
					className='material-icons button_super'
					theme_value={theme}
				>
					navigate_next
				</_Right>
			</_OpenButton>
		</_Aside>
	);
};

Nav.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default Nav;
