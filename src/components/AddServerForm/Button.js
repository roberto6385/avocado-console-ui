import React from 'react';
import * as PropTypes from 'prop-types';

import {AddServerButtonContainer, PopupButton} from '../../styles/common';
import {MAIN_COLOR, SUB_COLOR} from '../../styles/global';

const Button = ({onClickCloseForm}) => {
	return (
		<AddServerButtonContainer>
			<PopupButton
				variant='default'
				onClick={onClickCloseForm}
				back={`${SUB_COLOR}`}
			>
				Cancel
			</PopupButton>
			<PopupButton variant='default' type='submit' back={`${MAIN_COLOR}`}>
				Save
			</PopupButton>
		</AddServerButtonContainer>
	);
};

Button.propTypes = {
	onClickCloseForm: PropTypes.func.isRequired,
};

export default Button;
