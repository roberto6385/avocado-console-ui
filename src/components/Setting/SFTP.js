import React from 'react';
import {Form} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {SFTP_EDITOR_WRAP_LINES} from '../../reducers/sftp';

const SFTP = () => {
	const dispatch = useDispatch();

	const switchEditorWrapLines = (e) => {
		const {checked} = e.target;
		checked
			? dispatch({type: SFTP_EDITOR_WRAP_LINES, data: 'physical'})
			: dispatch({type: SFTP_EDITOR_WRAP_LINES, data: 'off'});
	};

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
				<Form.Check
					type='checkbox'
					label='Editor Wrap Lines'
					onChange={switchEditorWrapLines}
				/>
			</Form.Group>
		</div>
	);
};

export default SFTP;
