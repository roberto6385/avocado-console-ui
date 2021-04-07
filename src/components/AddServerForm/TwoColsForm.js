import React from 'react';
import {Form, Col} from 'react-bootstrap';
import {PropTypes} from 'prop-types';

const TwoColsForm = ({keyword, value1, onChange1, value2, onChange2}) => {
	const valueObject = {
		address_port: {
			label1: 'Address',
			placeholder1: 'Host Name or IP',
			type1: 'text',
			required1: true,
			label2: 'Port',
			placeholder2: 'Port',
			type2: 'number',
			required2: true,
		},
	};

	return (
		<Form.Row className={'add-server-form-row'}>
			<Form.Label column sm={2}>
				{valueObject[keyword]?.label1}
			</Form.Label>
			<Col sm={4}>
				<Form.Control
					onChange={onChange1}
					value={value1}
					type={valueObject[keyword]?.type1}
					placeholder={valueObject[keyword]?.placeholder1}
					required={valueObject[keyword]?.required1}
				/>
			</Col>
			<Col xs={1} />
			<Form.Label column sm={2}>
				{valueObject[keyword]?.label2}
			</Form.Label>
			<Col sm={3}>
				<Form.Control
					onChange={onChange2}
					value={value2}
					type={valueObject[keyword]?.type2}
					placeholder={valueObject[keyword]?.placeholder2}
					required={valueObject[keyword]?.required2}
				/>
			</Col>
		</Form.Row>
	);
};

TwoColsForm.propTypes = {
	keyword: PropTypes.string.isRequired,
	value1: PropTypes.string.isRequired,
	onChange1: PropTypes.func.isRequired,
	value2: PropTypes.number.isRequired,
	onChange2: PropTypes.func.isRequired,
};

export default TwoColsForm;
