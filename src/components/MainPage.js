import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {AddServerButton, Background} from '../styles/common';
import {OPEN_ADD_SERVER_FORM_POPUP} from '../reducers/popup';

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
