import React from 'react';
import {Form} from 'react-bootstrap';
import {PropTypes} from 'prop-types';

const OneColForm = ({
	label,
	placeholder,
	type,
	value,
	onChangeValue,
	required,
}) => {
	return (
		<Form.Group className={'add-server-form-row'}>
			<Form.Label>{label}</Form.Label>
			<Form.Control
				onChange={onChangeValue}
				value={value}
				type={type}
				placeholder={placeholder}
				required={required}
			/>
		</Form.Group>
	);
};

OneColForm.propTypes = {
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChangeValue: PropTypes.func.isRequired,
	required: PropTypes.bool,
};

export default OneColForm;
