import React, {useCallback} from 'react';
import styled from 'styled-components';
import {
	GREEN_COLOR,
	AVOCADO_FONTSIZE,
	IconButton,
	SIDE_WIDTH,
	LOGO_FONTSIZE,
	MAIN_HEIGHT,
	SEARCH_INPUT_HEIGHT,
	SEARCH_INPUT_WIDTH,
	SUB_HEIGHT,
	THIRD_HEIGHT,
	IconContainer,
	sideColor,
	fontColor,
	iconColor,
	borderColor,
	GRAY_COLOR,
} from '../styles/global';
import {useTranslation} from 'react-i18next';
import ServerFolderList from './ServerFolderList/ServerFolderList';
import useInput from '../hooks/useInput';
import {OPEN_ADD_SERVER_FORM_POPUP} from '../reducers/popup';
import {useDispatch, useSelector} from 'react-redux';
import {
	arrowRightIconMidium,
	burgerMenuIcon,
	navNextIcon,
	newFolderIcon,
	plusIcon,
	searchIcon,
} from '../icons/icons';
import {ADD_FOLDER} from '../reducers/common';
import PropTypes from 'prop-types';

const _Aside = styled.aside`
	display: flex;
	flex-direction: column;
	width: ${SIDE_WIDTH};
	min-width: ${SIDE_WIDTH};
	border-right: 1px solid;
	border-color: ${(props) => props.b_Color};
	height: 100%;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	height: ${MAIN_HEIGHT};
	padding: 16px 10px;
	background: ${(props) => props.back};
`;
const _AddFolerServerContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: ${SUB_HEIGHT};
	padding: 16px 10px;
	border-bottom: 1px solid;
	border-color: ${(props) => props.b_Color};
	background: ${(props) => props.back};
`;
const _Form = styled.form`
	display: flex;
	align-items: center;
	padding: 16px 10px;
	height: ${THIRD_HEIGHT};
	border-bottom: 1px solid;
	border-color: ${(props) => props.b_Color};
	background: ${(props) => props.back};
`;

const _HeaderSpan = styled.span`
	font-family: 'Roboto Slab', serif;
	font-size: ${LOGO_FONTSIZE};
	color: ${GREEN_COLOR};
`;
const _NewServerSpan = styled.span`
	font-size: ${AVOCADO_FONTSIZE};
	color: ${(props) => props.color};
	flex: 1;
`;

const _Input = styled.input`
	width: ${SEARCH_INPUT_WIDTH};
	height: ${SEARCH_INPUT_HEIGHT};
	border: none;
	font-size: 14px;
	padding: 0px;
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _OpenButton = styled.div`
	outline: none;
	line-height: 0px;
	color: ${GRAY_COLOR};
	cursor: pointer;
	border: 1px solid ${GRAY_COLOR};
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
			console.log(folderName);
			i++;
		}
		dispatch({type: ADD_FOLDER, data: folderName});
	}, [nav, dispatch]);

	const newServer = useCallback(() => {
		dispatch({
			type: OPEN_ADD_SERVER_FORM_POPUP,
			data: {type: 'add'},
		});
	}, [dispatch]);

	return (
		<_Aside
			className={toggle ? 'nav' : 'nav close'}
			b_Color={borderColor[theme]}
		>
			<_OpenButton
				onClick={() => setToggle(!toggle)}
				back={sideColor[theme]}
				display={toggle ? 'none' : 'inline-block'}
			>
				<_Right className='material-icons button_super'>
					navigate_next
				</_Right>
			</_OpenButton>
			<_Header back={sideColor[theme]}>
				<IconButton
					color={iconColor[theme]}
					onClick={() => setToggle(!toggle)}
				>
					{burgerMenuIcon}
				</IconButton>
				<_HeaderSpan>Avocado</_HeaderSpan>
			</_Header>
			<_AddFolerServerContainer
				back={sideColor[theme]}
				b_Color={borderColor[theme]}
			>
				<IconButton color={fontColor[theme]} onClick={newServer}>
					{plusIcon}
				</IconButton>
				<_NewServerSpan color={fontColor[theme]}>
					{t('newServer')}
				</_NewServerSpan>
				<IconButton onClick={newFolder}>{newFolderIcon}</IconButton>
			</_AddFolerServerContainer>
			<_Form back={sideColor[theme]} b_Color={borderColor[theme]}>
				<IconContainer color={iconColor[theme]} margin={'6px'}>
					{searchIcon}
				</IconContainer>
				<_Input
					onChange={onChangeSearch}
					value={search}
					type='text'
					placeholder={t('search')}
					color={fontColor[theme]}
					back={sideColor[theme]}
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
