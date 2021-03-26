import React from 'react';
import {PropTypes} from 'prop-types';

import {ModalFooter, PopupButton} from '../../styles/common';
import {MAIN_COLOR, SUB_COLOR} from '../../styles/global';
import {SAVE_KEYWORDS} from '../ConfirmPopup';

const Button = ({keyword, cancelFunction, submitFunction}) => {
	return (
		<ModalFooter>
			<PopupButton
				variant='default'
				onClick={cancelFunction}
				back={`${SUB_COLOR}`}
			>
				Cancel
			</PopupButton>
			<PopupButton
				variant='default'
				onClick={submitFunction}
				back={`${MAIN_COLOR}`}
			>
				{SAVE_KEYWORDS.includes(keyword) ? 'SAVE' : 'OK'}
			</PopupButton>
		</ModalFooter>
	);
};

Button.propTypes = {
	keyword: PropTypes.string.isRequired,
	cancelFunction: PropTypes.func.isRequired,
	submitFunction: PropTypes.func.isRequired,
};

export default Button;
