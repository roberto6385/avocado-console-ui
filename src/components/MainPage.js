import React, {useCallback} from 'react';
import * as PropTypes from 'prop-types';

import {AddServerButton, Background} from '../styles/common';

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
