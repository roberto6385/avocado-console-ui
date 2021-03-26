import React, {useCallback} from 'react';
import {Form, Col} from 'react-bootstrap';
import {PropTypes} from 'prop-types';

const TwoColsOptionForm = ({keyword, value1, onChange1, value2, setValue2}) => {
	const valueObject = {
		name_protocol: {
			label1: 'Name',
			placeholder1: 'Server Name',
			type1: 'text',
			required1: true,
			label2: 'Protocol',
			options: ['SSH2', 'protocol2'],
			required2: true,
		},
		user_auth: {
			label1: 'Username',
			placeholder1: 'Login Username',
			type1: 'text',
			required1: true,
			label2: 'Authentication',
			options: ['Password', 'Key file'],
			required2: true,
		},
	};
	const onChangeValue = useCallback((e) => {
		setValue2(e.target.value);
	}, []);

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
				{valueObject[keyword].label2}
			</Form.Label>
			<Col sm={3}>
				<Form.Control
					as='select'
					value={value2}
					onChange={onChangeValue}
					defaultValue={valueObject[keyword].options?.[0]}
					required={valueObject[keyword]?.required2}
				>
					{valueObject[keyword].options?.map((v) => (
						<option key={v} value={v}>
							{v}
						</option>
					))}
				</Form.Control>
			</Col>
		</Form.Row>
	);
};

TwoColsOptionForm.propTypes = {
	keyword: PropTypes.string.isRequired,
	value1: PropTypes.string.isRequired,
	onChange1: PropTypes.func.isRequired,
	value2: PropTypes.string.isRequired,
	setValue2: PropTypes.func.isRequired,
};

export default TwoColsOptionForm;
