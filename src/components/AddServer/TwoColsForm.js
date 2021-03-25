import React from 'react';

import {Form, Col} from 'react-bootstrap';
import useInput from '../../hooks/useInput';

const TwoColsForm = (label1, placeholder1, label2) => {
	const [first, onChangeFirst, setFirst] = useInput('');
	const [second, onChangeSecond, setSecond] = useInput('');

	return (
		<Form.Row className={'add-server-form-row'}>
			<Form.Label column sm={2}>
				{label1}
			</Form.Label>
			<Col sm={4}>
				<Form.Control
					onChange={onChangeFirst}
					value={first}
					type='text'
					placeholder={placeholder1}
					required
				/>
			</Col>
			<Col xs={1} />
			<Form.Label column sm={2}>
				{label2}
			</Form.Label>
			<Col sm={3}>
				<Form.Control
					as='select'
					// value={authentication}
					// onChange={onChangeAuthentication}
					defaultValue='Password'
				>
					<option>Password</option>
					<option>Key file</option>
				</Form.Control>
			</Col>
		</Form.Row>
	);
};

export default TwoColsForm;
