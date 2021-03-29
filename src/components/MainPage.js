import React, {useCallback} from 'react';
import {AddServerButton, Background} from '../styles/common';
import {PropTypes} from 'prop-types';

const MainPage = ({setShowAddServerForm}) => {
	const onClickVisibleForm = useCallback(() => {
		setShowAddServerForm(true);
	}, []);

	return (
		<Background>
			<AddServerButton onClick={onClickVisibleForm}>
				Add Server
			</AddServerButton>
		</Background>
	);
};

MainPage.propTypes = {
	setShowAddServerForm: PropTypes.func.isRequired,
};

export default MainPage;
