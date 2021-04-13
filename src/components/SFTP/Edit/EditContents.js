import React, {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {SFTP_SAVE_CURRENT_TEXT} from '../../../reducers/sftp';
import {TextAreaWrapper} from '../../../styles/sftp';

const EditContents = ({index, ws, uuid}) => {
	const {currentText, currentCompareText, editorWrapLines} = useSelector(
		(state) => state.sftp,
	);
	const dispatch = useDispatch();
	const curText = currentText.find((item) => item.uuid === uuid);
	const [editText, setEditText] = useState(curText?.text);

	const writeText = (e) => {
		const {value} = e.target;
		setEditText(value);
		dispatch({
			type: SFTP_SAVE_CURRENT_TEXT,
			data: {uuid, text: value, name: curText?.name},
		});
	};

	useEffect(() => {
		setEditText(curText?.text);
	}, [currentCompareText]);

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
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default EditContents;
