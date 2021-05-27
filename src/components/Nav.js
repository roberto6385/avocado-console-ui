import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {
	GREEN_COLOR,
	AVOCADO_FONTSIZE,
	IconButton,
	FONT_COLOR,
	ICON_DARK_COLOR,
	SIDE_WIDTH,
	LOGO_FONTSIZE,
	MAIN_HEIGHT,
	SEARCH_INPUT_HEIGHT,
	SEARCH_INPUT_WIDTH,
	SUB_HEIGHT,
	THIRD_HEIGHT,
	BORDER_COLOR,
	DefaultButton,
	IconContainer,
	DARK_MODE_COLOR,
	LIGHT_MODE_BACK_COLOR,
} from '../styles/global';
import ServerFolderList from './ServerFolderList/ServerFolderList';
import useInput from '../hooks/useInput';
import {
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_CONFIRM_POPUP,
} from '../reducers/popup';
import {useDispatch, useSelector} from 'react-redux';
import {
	burgerMenuIcon,
	newFolderIcon,
	plusIcon,
	searchIcon,
} from '../icons/icons';

const _Aside = styled.aside`
	display: flex;
	flex-direction: column;
	width: ${SIDE_WIDTH};
	min-width: ${SIDE_WIDTH};
	border-right: 1px solid ${BORDER_COLOR};
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
	border-bottom: 1px solid ${BORDER_COLOR};
`;
const _Form = styled.form`
	display: flex;
	align-items: center;
	padding: 16px 10px;
	height: ${THIRD_HEIGHT};
	border-bottom: 1px solid ${BORDER_COLOR};
`;

const _HeaderSpan = styled.span`
	font-family: 'Roboto Slab', serif;
	font-size: ${LOGO_FONTSIZE};
	color: ${GREEN_COLOR};
`;
const _NewServerSpan = styled.span`
	font-size: ${AVOCADO_FONTSIZE};
	color: ${FONT_COLOR};
	flex: 1;
`;

const _Input = styled.input`
	width: ${SEARCH_INPUT_WIDTH};
	height: ${SEARCH_INPUT_HEIGHT};
	border: none;
	font-size: 14px;
	padding: 0px;
	color: ${ICON_DARK_COLOR};
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
	align-items: center;
	position: relative;
	width: 47px;
`;

const Nav = () => {
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);
	const [search, onChangeSearch] = useInput('');
	const [toggle, setToggle] = useState(true);

	const newFolder = useCallback(() => {
		dispatch({
			type: OPEN_CONFIRM_POPUP,
			data: {key: 'new_folder'},
		});
	}, [dispatch]);

	const newServer = useCallback(() => {
		dispatch({
			type: OPEN_ADD_SERVER_FORM_POPUP,
			data: {type: 'add'},
		});
	}, [dispatch]);

	return toggle ? (
		<_Aside>
			<_Header
				back={
					theme === 'lignt' ? LIGHT_MODE_BACK_COLOR : DARK_MODE_COLOR
				}
			>
				<IconButton onClick={() => setToggle(!toggle)}>
					{burgerMenuIcon}
				</IconButton>
				<_HeaderSpan>Avocado</_HeaderSpan>
			</_Header>
			<_AddFolerServerContainer>
				<IconButton color={FONT_COLOR} onClick={newServer}>
					{plusIcon}
				</IconButton>
				<_NewServerSpan>New Server</_NewServerSpan>
				<IconButton onClick={newFolder}>{newFolderIcon}</IconButton>
			</_AddFolerServerContainer>
			<_Form>
				<IconContainer margin={'6px'}>{searchIcon}</IconContainer>
				<_Input
					onChange={onChangeSearch}
					value={search}
					type='text'
					placeholder={'Search'}
				/>
			</_Form>
			<ServerFolderList search={search} />
		</_Aside>
	) : (
		<_HideSpace>
			<_OpenButton onClick={() => setToggle(!toggle)}>open</_OpenButton>
		</_HideSpace>
	);
};

export default Nav;
