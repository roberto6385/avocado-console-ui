import React from 'react';
import {Form} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import {PopupButton} from '../../styles/common';
import {MAIN_COLOR, SUB_COLOR} from '../../styles/global';

const Button = ({onClickCloseForm}) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
			}}
		>
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
		</div>
	);
};

Button.propTypes = {
	onClickCloseForm: PropTypes.func.isRequired,
};

export default Button;
