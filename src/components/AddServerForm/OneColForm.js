import React from 'react';
import {Form} from 'react-bootstrap';
import {PropTypes} from 'prop-types';

const OneColForm = ({keyword, value, onChangeValue}) => {
	const valueObject = {
		password: {
			label: 'Password',
			placeholder: 'Login Password',
			type: 'password',
			required: true,
		},
		key_password: {
			label: 'Key File Password',
			type: 'text',
			required: false,
		},
		note: {
			label: 'Note',
			placeholder: 'Note',
			type: 'text',
			required: false,
		},
	};

	return (
		<Form.Group className={'add-server-form-row'}>
			<Form.Label>{valueObject[keyword]?.label}</Form.Label>
			<Form.Control
				value={value}
				onChange={onChangeValue}
				type={valueObject[keyword]?.type}
				placeholder={valueObject[keyword]?.placeholder}
				required={valueObject[keyword]?.required}
			/>
		</Form.Group>
	);
};

OneColForm.propTypes = {
	keyword: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChangeValue: PropTypes.func.isRequired,
};

export default OneColForm;
