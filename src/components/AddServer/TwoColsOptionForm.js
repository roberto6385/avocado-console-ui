import React from 'react';
import {Form, Col} from 'react-bootstrap';
import {PropTypes} from 'prop-types';

const TwoColsOptionForm = ({
	label1,
	placeholder1,
	type1,
	value1,
	onChange1,
	required1,
	label2,
	value2,
	onChange2,
	options,
	required2,
}) => {
	return (
		<Form.Row className={'add-server-form-row'}>
			<Form.Label column sm={2}>
				{label1}
			</Form.Label>
			<Col sm={4}>
				<Form.Control
					onChange={onChange1}
					value={value1}
					type={type1}
					placeholder={placeholder1}
					required={required1}
				/>
			</Col>
			<Col xs={1} />
			<Form.Label column sm={2}>
				{label2}
			</Form.Label>
			<Col sm={3}>
				<Form.Control
					as='select'
					value={value2}
					onChange={onChange2}
					defaultValue={options?.[0]}
					required={required2}
				>
					{options?.map((v) => (
						<option key={v}>{v}</option>
					))}
				</Form.Control>
			</Col>
		</Form.Row>
	);
};

TwoColsOptionForm.propTypes = {
	label1: PropTypes.string.isRequired,
	placeholder1: PropTypes.string.isRequired,
	type1: PropTypes.string.isRequired,
	value1: PropTypes.string.isRequired,
	onChange1: PropTypes.func.isRequired,
	required1: PropTypes.bool,
	label2: PropTypes.string.isRequired,
	value2: PropTypes.string.isRequired,
	onChange2: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
	required2: PropTypes.bool,
};

export default TwoColsOptionForm;
