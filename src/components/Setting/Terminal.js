import React, {useCallback, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import {SSHT_SET_FONT} from '../../reducers/ssht';
import useInput from '../../hooks/useInput';
import {useDispatch, useSelector} from 'react-redux';

const Terminal = () => {
	const dispatch = useDispatch();
	const {font} = useSelector((state) => state.ssht);

	const onChangeTerminalFont = useCallback((e) => {
		dispatch({type: SSHT_SET_FONT, data: e.target.value});
	}, []);

	return (
		<div>
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
		</div>
	);
};

export default Terminal;
