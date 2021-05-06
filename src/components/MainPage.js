import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {OPEN_ADD_SERVER_FORM_POPUP} from '../reducers/popup';
import '../styles/resize.css';
import {AddServerButton} from '../styles/buttons';
import {Background} from '../styles/divs';
import {MAIN_COLOR} from '../styles/global';

const MainPage = () => {
	const dispatch = useDispatch();

	const onClickVisibleForm = useCallback(() => {
		dispatch({type: OPEN_ADD_SERVER_FORM_POPUP, data: {type: 'add'}});
	}, []);

	return (
		<Background>
			<AddServerButton back={MAIN_COLOR} onClick={onClickVisibleForm}>
				Add Server
			</AddServerButton>
		</Background>
	);
};

export default MainPage;
