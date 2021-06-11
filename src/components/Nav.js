import React, {useCallback} from 'react';
import styled from 'styled-components';
import {IconButton, IconContainer} from '../styles/global';
import {useTranslation} from 'react-i18next';
import ServerFolderList from './ServerFolderList/ServerFolderList';
import useInput from '../hooks/useInput';
import {OPEN_ADD_SERVER_FORM_POPUP} from '../reducers/popup';
import {useDispatch, useSelector} from 'react-redux';
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
	HEIGHT_50,
	HEIGHT_54,
	FONT_24,
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
	logoColor,
} from '../styles/color';

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
	height: ${HEIGHT_54};
	padding: 16px 10px;
	background: ${(props) => props.back};
`;
const _AddFolerServerContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: ${HEIGHT_50};
	padding: 16px 10px;
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

const _HeaderSpan = styled.span`
	font-family: 'Roboto Slab', serif;
	font-size: ${FONT_24};
	color: ${(props) => props.color};
`;
const _NewServerSpan = styled.span`
	font-size: ${FONT_14};
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
	color: ${'black'};
	cursor: pointer;
	border: 1px solid ${'black'};
	position: absolute;
	padding: 8px;
	border-radius: 50%;
	background: ${(props) => props?.back};
	right: -36px;
	bottom: 10px;
	display: ${(props) => props?.display};
`;

const _Right = styled.span`
	position: relative;
	right: -13px;
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
	const {nav, theme} = useSelector((state) => state.common);
	const [search, onChangeSearch] = useInput('');

	const newFolder = useCallback(() => {
		let folderName = t('newFolder');
		let i = 0;
		while (!isValidFolderName(nav, folderName)) {
			folderName = `${t('newFolder')} ${i}`;
			i++;
		}
		dispatch({type: ADD_FOLDER, data: folderName});
	}, [nav]);

	const newServer = useCallback(() => {
		dispatch({
			type: OPEN_ADD_SERVER_FORM_POPUP,
			data: {type: 'add'},
		});
	}, []);

	return (
		<_Aside
			className={toggle ? 'nav' : 'nav close'}
			bcolor={borderColor[theme]}
			back={navColor[theme]}
		>
			<_OpenButton
				onClick={() => setToggle(!toggle)}
				display={toggle ? 'none' : 'inline-block'}
			>
				<_Right className='material-icons button_super'>
					navigate_next
				</_Right>
			</_OpenButton>
			<_Header back={navColor[theme]}>
				<IconButton
					color={iconColor[theme]}
					onClick={() => setToggle(!toggle)}
				>
					{burgerMenuIcon}
				</IconButton>
				<_HeaderSpan color={logoColor[theme]}>Avocado</_HeaderSpan>
			</_Header>
			<_AddFolerServerContainer
				back={navColor[theme]}
				bcolor={borderColor[theme]}
			>
				<IconButton color={fontColor[theme]} onClick={newServer}>
					{plusIcon}
				</IconButton>
				<_NewServerSpan color={fontColor[theme]}>
					{t('newServer')}
				</_NewServerSpan>
				<IconButton color={iconColor[theme]} onClick={newFolder}>
					{newFolderIcon}
				</IconButton>
			</_AddFolerServerContainer>
			<_Form back={navColor[theme]} bcolor={borderColor[theme]}>
				<IconContainer color={iconColor[theme]} margin={'6px'}>
					{searchIcon}
				</IconContainer>
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
		</_Aside>
	);
};

Nav.propTypes = {
	toggle: PropTypes.bool.isRequired,
	setToggle: PropTypes.func.isRequired,
};

export default Nav;
