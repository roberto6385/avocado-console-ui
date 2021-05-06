import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {SAVE_EDITTEXT} from '../../../reducers/sftp';
import {SFTPBody} from '../../../styles/cards';
import {TextAreaWrapper} from "../../../styles/divs";

const EditContents = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {editText} = corServer;
	const dispatch = useDispatch();
	const checked = window.localStorage.getItem('editorCheck');

	const writeText = useCallback((e) => {
		const {value} = e.target;
		dispatch({type: SAVE_EDITTEXT, payload: {uuid, editText: value}});
	}, []);

	return (
		<SFTPBody>
			<TextAreaWrapper>
				<textarea
					wrap={JSON.parse(checked) ? 'soft' : 'off'}
					rows='50'
					cols='40'
					value={editText}
					onChange={writeText}
				/>
			</TextAreaWrapper>
		</SFTPBody>
	);
};

EditContents.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default EditContents;
