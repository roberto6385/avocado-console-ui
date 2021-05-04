import React, {useCallback} from 'react';
import {Button, Form} from 'react-bootstrap';
import {OutlineCol} from '../../styles/common';

import {useDispatch, useSelector} from 'react-redux';
import {SSHT_SET_FONT} from '../../reducers/ssht';

const PreferencesContainer = () => {
	const dispatch = useDispatch();
	const {font} = useSelector((state) => state.ssht);

	const onChangeTerminalFont = useCallback((e) => {
		dispatch({type: SSHT_SET_FONT, data: e.target.value});
	}, []);

	return (
		<OutlineCol flex={1} className={'fix-height'}>
			<h4>General</h4>

			<div>UI Theme</div>
			<div>
				<Button>Light Mode</Button>
				<Button>Dark Mode</Button>
			</div>

			<h4>Terminal</h4>
			<Form.Group>
				<Form.Label>Theme</Form.Label>
				<Form.Control as='select'>
					<option>theme1</option>
					<option>theme2</option>
				</Form.Control>
			</Form.Group>
			<Form.Group>
				<Form.Label>Font</Form.Label>
				<Form.Control
					as='select'
					value={font}
					onChange={onChangeTerminalFont}
				>
					<option>Arial, sans-serif</option>
					<option>Garamond, serif</option>
					<option>Courier New, monospace</option>
					<option>Helvetica, sans-serif</option>
				</Form.Control>
			</Form.Group>
			<Form.Group>
				<Form.Check type='checkbox' label='copy text on selection' />
			</Form.Group>
			<Form.Group>
				<Form.Check type='checkbox' label='text completion' />
			</Form.Group>
			<h4>SFTP</h4>
			<Form.Group>
				<Form.Label>Editor Theme</Form.Label>
				<Form.Control as='select'>
					<option>theme1</option>
					<option>theme2</option>
				</Form.Control>
			</Form.Group>
		</OutlineCol>
	);
};

export default PreferencesContainer;
