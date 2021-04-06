import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {PropTypes} from 'prop-types';

const OneColButtonForm = ({keyword, value, onChangeValue}) => {
	const valueObject = {
		key: {
			label: 'Private Key File',
			placeholder: 'Login Password',
		},
	};

	return (
		<Form.Group className={'add-server-form-row'}>
			<Form.Label>{valueObject[keyword]?.label}</Form.Label>
			<Form.File
				value={value}
				onChange={onChangeValue}
				label={valueObject[keyword]?.placeholder}
				custom
			/>
		</Form.Group>
	);
};

OneColButtonForm.propTypes = {
	keyword: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChangeValue: PropTypes.func.isRequired,
};

export default OneColButtonForm;
