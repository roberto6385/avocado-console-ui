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
} from '../../styles/global_design';
import NavList from '../NavList/NavList';
import useInput from '../../hooks/useInput';
import {
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_CONFIRM_POPUP,
} from '../../reducers/popup';
import {useDispatch} from 'react-redux';

const Aside_Container = styled.aside`
	display: flex;
	flex-direction: column;
	width: ${SIDE_WIDTH};
	min-width: ${SIDE_WIDTH};
	border-right: 1px solid ${BORDER_COLOR};
`;

const Aside_Header = styled.div`
	display: flex;
	align-items: center;
	height: ${MAIN_HEIGHT};
	padding: 16px;
`;
const Add_Server_Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: ${SUB_HEIGHT};
	padding: 16px;
`;
const Aside_Form = styled.form`
	display: flex;
	align-items: center;
	padding: 16px;
	height: ${THIRD_HEIGHT};
`;
const Folder_Server_Container = styled.div`
	min-height: 0;
	flex: 1 1 0;
	overflow-y: scroll;
	// overflow : scroll 속성 주기
`;

const Header_Span = styled.span`
	font-family: 'Roboto Slab', serif;
	font-size: ${LOGO_FONTSIZE};
	color: ${GREEN_COLOR};
`;
const Server_Container_Span = styled.span`
	font-size: ${AVOCADO_FONTSIZE};
	color: ${FONT_COLOR};
	flex: 1;
`;

const Aside_Form_Input = styled.input`
	width: ${SEARCH_INPUT_WIDTH};
	height: ${SEARCH_INPUT_HEIGHT};
	border: none;
	padding: 0px;
	color: ${ICON_DARK_COLOR};
`;

const Aside = () => {
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
		<Aside_Container>
			<Aside_Header>
				<IconButton>
					<span className='material-icons button_large'>menu</span>
				</IconButton>
				<Header_Span>Avocado</Header_Span>
			</Aside_Header>
			<Add_Server_Container>
				<IconButton color={FONT_COLOR} onClick={newServer}>
					<span className='material-icons button_large'>add</span>
				</IconButton>
				<Server_Container_Span>New Server</Server_Container_Span>
				<IconButton onClick={newFolder}>
					<span className='material-icons button_large'>
						create_new_folder
					</span>
				</IconButton>
			</Add_Server_Container>
			<Aside_Form>
				<span className='material-icons button_large'>search</span>
				<Aside_Form_Input
					onChange={onChangeSearch}
					value={search}
					type='text'
					placeholder={'Search'}
				/>
			</Aside_Form>
			<Folder_Server_Container>
				<NavList search={search} />
			</Folder_Server_Container>
		</Aside_Container>
	);
};

export default Aside;
