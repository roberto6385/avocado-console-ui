import React, {useCallback, useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {SFTP_SAVE_CURRENT_TEXT} from '../../../reducers/sftp';
import {TextAreaWrapper} from '../../../styles/sftp';

const EditContents = ({uuid}) => {
	const {currentText, editorWrapLines} = useSelector((state) => state.sftp);

	const dispatch = useDispatch();
	const curText = currentText.find((item) => item.uuid === uuid);
	const [editText, setEditText] = useState(curText?.text);

	const writeText = useCallback(
		(e) => {
			const {value} = e.target;
			setEditText(value);
			dispatch({
				type: SFTP_SAVE_CURRENT_TEXT,
				data: {uuid, text: value, name: curText?.name},
			});
		},
		[curText, uuid],
	);

	useEffect(() => {
		setEditText(curText?.text);
	}, [curText]);

	return (
		<TextAreaWrapper>
			<textarea
				wrap={editorWrapLines}
				rows='50'
				cols='40'
				value={editText}
				onChange={writeText}
			/>
		</TextAreaWrapper>
	);
};

EditContents.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default EditContents;
