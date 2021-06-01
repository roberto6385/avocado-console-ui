import React, {useCallback, useEffect, useState} from 'react';
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
	DefaultButton,
	IconContainer,
	sideColor,
	fontColor,
	iconColor,
	borderColor,
} from '../styles/global';
import ServerFolderList from './ServerFolderList/ServerFolderList';
import useInput from '../hooks/useInput';
import {
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_ALERT_POPUP,
	OPEN_INPUT_POPUP,
} from '../reducers/popup';
import {useDispatch, useSelector} from 'react-redux';
import {
	burgerMenuIcon,
	newFolderIcon,
	plusIcon,
	searchIcon,
} from '../icons/icons';
import {ADD_FOLDER} from '../reducers/common';

const _Aside = styled.aside`
	display: flex;
	flex-direction: column;
	width: ${SIDE_WIDTH};
	min-width: ${SIDE_WIDTH};
	border-right: 1px solid;
	border-color: ${(props) => props.b_Color};
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

const _OpenButton = styled(DefaultButton)`
	-webkit-transform: rotate(
		-90deg
	); /* to support Safari and Android browser */
	-ms-transform: rotate(-90deg); /* to support IE 9 */
	transform: rotate(-90deg);

	position: absolute;
	right: -44px;
`;

const _HideSpace = styled.div`
	display: flex;
	width: 57px;
	background: ${(props) => props?.back};
`;

const _ToggleButton = styled(IconButton)`
	height: 60px;
	padding: 16px 16px 17px 16px;
`;

const Nav = () => {
	const dispatch = useDispatch();
	const {nav, theme, createdFolderInfo} = useSelector(
		(state) => state.common,
	);
	const [search, onChangeSearch] = useInput('');
	const [toggle, setToggle] = useState(true);

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

	const newFolder = useCallback(() => {
		let folderName = 'New Folder';
		let i = 0;
		while (!isValidFolderName(nav, folderName)) {
			folderName = `New Folder ${i}`;
			console.log(folderName);
			i++;
		}
		dispatch({type: ADD_FOLDER, data: folderName});

		// dispatch({
		// 	type: OPEN_INPUT_POPUP,
		// 	data: {key: 'new_folder'},
		// });
	}, [nav, dispatch]);

	const newServer = useCallback(() => {
		dispatch({
			type: OPEN_ADD_SERVER_FORM_POPUP,
			data: {type: 'add'},
		});
	}, [dispatch]);

	useEffect(() => {
		console.log(createdFolderInfo);
	}, [createdFolderInfo]);

	return toggle ? (
		<_Aside b_Color={borderColor[theme]}>
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
					New Server
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
					placeholder={'Search'}
					color={fontColor[theme]}
					back={sideColor[theme]}
				/>
			</_Form>
			<ServerFolderList search={search} />
		</_Aside>
	) : (
		<_HideSpace back={sideColor[theme]}>
			<_ToggleButton
				color={iconColor[theme]}
				onClick={() => setToggle(!toggle)}
			>
				{burgerMenuIcon}
			</_ToggleButton>
		</_HideSpace>
	);
};

export default Nav;
