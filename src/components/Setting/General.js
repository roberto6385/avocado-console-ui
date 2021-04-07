import React, {useState} from 'react';
import {Form} from 'react-bootstrap';

const General = () => {
	return (
		<div>
			<h4>General</h4>
			<Form.Group>
				<Form.Label>UI Theme</Form.Label>
				<Form.Control as='select'>
					<option>Light</option>
					<option>Dark</option>
				</Form.Control>
			</Form.Group>
		</div>
	);
};

export default General;
