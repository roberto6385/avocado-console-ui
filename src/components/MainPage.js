import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {OPEN_ADD_SERVER_FORM_POPUP} from '../reducers/popup';
import '../styles/resize.css';
import {
	IconButton,
	LIGHT_BACK_COLOR,
	MAIN_HEIGHT,
	POPUP_SIDE_COLOR,
	Primary_Button,
} from '../styles/global_design';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: ${MAIN_HEIGHT};
	width: 100%;
	background: ${LIGHT_BACK_COLOR};
`;

const Body = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	background: ${POPUP_SIDE_COLOR};
`;

const Contents = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	height: 130px;
`;

const MainPage = () => {
	const dispatch = useDispatch();

	const onClickVisibleForm = useCallback(() => {
		dispatch({type: OPEN_ADD_SERVER_FORM_POPUP, data: {type: 'add'}});
	}, []);

	return (
		<Container>
			<Header>
				<IconButton>
					<span className='material-icons'>person</span>
				</IconButton>
				<IconButton>
					<span className='material-icons'>settings</span>
				</IconButton>
				<IconButton>
					<span className='material-icons'>notifications</span>
				</IconButton>
			</Header>
			<Body>
				<Contents>
					<span>Hello! Start Avocado</span>
					<span>
						Select a server to start a session via SSH, SFTP, RDP,
						VNC or Telnet. Or
					</span>
					<Primary_Button onClick={onClickVisibleForm}>
						Add Server
					</Primary_Button>
				</Contents>
			</Body>
		</Container>
	);
};

export default MainPage;
