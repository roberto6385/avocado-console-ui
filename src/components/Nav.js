import React, {useCallback} from 'react';
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
} from '../styles/global_design';
import ServerFolderList from './ServerFolderList/ServerFolderList';
import useInput from '../hooks/useInput';
import {
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_CONFIRM_POPUP,
} from '../reducers/popup';
import {useDispatch} from 'react-redux';

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
	padding: 16px;
`;
const _AddFolerServerContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: ${SUB_HEIGHT};
	padding: 16px;
`;
const _Form = styled.form`
	display: flex;
	align-items: center;
	padding: 16px;
	height: ${THIRD_HEIGHT};
`;
const _FolderServerContainer = styled.div`
	min-height: 0;
	flex: 1 1 0;
	overflow-y: scroll;
	// overflow : scroll 속성 주기
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
	padding: 0px;
	color: ${ICON_DARK_COLOR};
`;

const Nav = () => {
	const dispatch = useDispatch();
	const [search, onChangeSearch] = useInput('');

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

	return (
		<_Aside>
			<_Header>
				<IconButton>
					<span className='material-icons button_large'>menu</span>
				</IconButton>
				<_HeaderSpan>Avocado</_HeaderSpan>
			</_Header>
			<_AddFolerServerContainer>
				<IconButton color={FONT_COLOR} onClick={newServer}>
					<span className='material-icons button_large'>add</span>
				</IconButton>
				<_NewServerSpan>New Server</_NewServerSpan>
				<IconButton onClick={newFolder}>
					<span className='material-icons button_large'>
						create_new_folder
					</span>
				</IconButton>
			</_AddFolerServerContainer>
			<_Form>
				<span className='material-icons button_large'>search</span>
				<_Input
					onChange={onChangeSearch}
					value={search}
					type='text'
					placeholder={'Search'}
				/>
			</_Form>
			<_FolderServerContainer>
				<ServerFolderList search={search} />
			</_FolderServerContainer>
		</_Aside>
	);
};

export default Nav;
