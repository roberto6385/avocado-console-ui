import React from 'react';
import {Form} from 'react-bootstrap';

const SFTP = () => {
	return (
		<div>
			<h4>SFTP</h4>
			<Form.Group>
				<Form.Label>Editor Theme</Form.Label>
				<Form.Control as='select'>
					<option>theme1</option>
					<option>theme2</option>
				</Form.Control>
			</Form.Group>

			<Form.Group>
				<Form.Check type='checkbox' label='Editor Wrap Lines' />
			</Form.Group>
		</div>
	);
};

export default SFTP;
