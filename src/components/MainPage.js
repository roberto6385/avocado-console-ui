import React, {useCallback} from 'react';

import {AddServerButton, Background} from '../styles/common';
import {CHANGE_OPEN_ADD_SERVER_FORM} from '../reducers/common';
import {useDispatch} from 'react-redux';

const MainPage = () => {
	const dispatch = useDispatch();

	const onClickVisibleForm = useCallback(() => {
		dispatch({type: CHANGE_OPEN_ADD_SERVER_FORM, data: true});
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
