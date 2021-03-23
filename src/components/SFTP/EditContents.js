import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {SFTP_SAVE_CURRENT_TEXT} from '../../reducers/sftp';

const TextAreaWrapper = styled.div`
	display: inline-block;
	background: black;
	background-size: 100% 32px;
	background-position: left 10px;
	textarea {
		color: white;
		background: url(http://i.imgur.com/2cOaJ.png);
		background-attachment: local;
		background-repeat: no-repeat;
		padding-left: 35px;
		padding-top: 10px;
		outline: none;
		border: none;
		width: 100%;
		height: 100%;
		font-size: 13px;
		line-height: 16px;
		resize: none;
	}
`;

const EditContents = ({index, ws, uuid}) => {
	const {currentText, currentCompareText} = useSelector(
		(state) => state.sftp,
	);
	const dispatch = useDispatch();
	const curText = currentText.find((item) => item.uuid === uuid);
	const [editText, setEditText] = useState(curText?.text);

	console.log(curText);

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
