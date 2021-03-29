import React, {useCallback} from 'react';
import {AddServerButton, Background} from '../styles/common';

const MainPage = () => {
	const onClickVisibleForm = useCallback(() => {
		document.getElementById('add-server-form').style.display = 'block';
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
