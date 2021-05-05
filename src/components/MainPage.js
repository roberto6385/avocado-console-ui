import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {OPEN_ADD_SERVER_FORM_POPUP} from '../reducers/popup';
import SplitPane, {Pane} from 'react-split-pane';
import '../styles/resize.css';
import TabContentContainer from './TabContentContainer';
import styled from 'styled-components';
import background from '../images/bg_3.png';
import {AddServerButton} from '../styles/buttons';

const Background = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	background-image: url(${background});
	background-size: cover;
	background-position: center;
	position: relative;
`;

const MainPage = () => {
	const dispatch = useDispatch();

	const onClickVisibleForm = useCallback(() => {
		dispatch({type: OPEN_ADD_SERVER_FORM_POPUP, data: {type: 'add'}});
	}, []);

	return (
		<Background>
			<AddServerButton onClick={onClickVisibleForm}>
				Add Server
			</AddServerButton>
		</Background>
	);
};

export default MainPage;
