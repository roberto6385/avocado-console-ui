import React, {useCallback, useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch} from 'react-redux';
import {TextAreaWrapper} from '../../../styles/sftp';
import {SAVE_EDITTEXT} from '../../../reducers/sftp';

const EditContents = ({server}) => {
	const {uuid, editText} = server;
	const dispatch = useDispatch();
	const checked = window.localStorage.getItem('editorCheck');

	const writeText = useCallback((e) => {
		const {value} = e.target;
		dispatch({type: SAVE_EDITTEXT, payload: {uuid, editText: value}});
	}, []);

	return (
		<TextAreaWrapper>
			<textarea
				wrap={JSON.parse(checked) ? 'soft' : 'off'}
				rows='50'
				cols='40'
				value={editText}
				onChange={writeText}
			/>
		</TextAreaWrapper>
	);
};

EditContents.propTypes = {
	server: PropTypes.object.isRequired,
};

export default EditContents;
