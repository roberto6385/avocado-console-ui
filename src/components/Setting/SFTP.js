import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import * as PropTypes from 'prop-types';

const ToggleSwitch = ({checked, label, id, onChange}) => {
	return (
		<>
			<label htmlFor={id}>
				<input
					style={{marginRight: '8px'}}
					type='checkbox'
					checked={checked}
					id={id}
					onChange={onChange}
				/>
				{label}
			</label>
		</>
	);
};

const SFTP = () => {
	const [selected, setSelected] = useState(
		localStorage.getItem('editorCheck') === 'true',
	);

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
			<ToggleSwitch
				checked={selected}
				id='toggle-switch-1'
				label='Editor Wrap Lines'
				onChange={(e) => {
					localStorage.setItem('editorCheck', `${e.target.checked}`);
					setSelected(e.target.checked);
					console.log(e.target.checked);
				}}
			/>
		</div>
	);
};

ToggleSwitch.propTypes = {
	checked: PropTypes.bool,
	label: PropTypes.string,
	id: PropTypes.string,
	onChange: PropTypes.func,
};

export default SFTP;
