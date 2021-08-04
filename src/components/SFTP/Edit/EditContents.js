import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {SAVE_EDITTEXT} from '../../../reducers/sftp';
import styled from 'styled-components';
import {FONT_14} from '../../../styles/length';

const _Container = styled.div`
	flex: 1;
	display: inline-block;
	background: black;
	background-size: 100% 32px;
	background-position: left 10px;
	overflow: hidden;
	textarea {
		background: ${(props) =>
			props.theme.pages.webTerminal.main.panels.sftp.edit.textAreas
				.backgroundColor};
		height: 100%;
		padding: 20px;
		outline: none;
		border: none;
		width: 100%;
		font-size: ${FONT_14};
		resize: none;
	}
`;
const EditContents = ({uuid}) => {
	const dispatch = useDispatch();
	const {edit: sftp_editState} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);
	const {editText} = useMemo(
		() => sftp_editState.find((it) => it.uuid === uuid),
		[sftp_editState, uuid],
	);

	const writeText = useCallback(
		(e) => {
			const {value} = e.target;
			dispatch({type: SAVE_EDITTEXT, payload: {uuid, editText: value}});
		},
		[dispatch, uuid],
	);

	return (
		<_Container>
			<textarea
				// wrap={JSON.parse(checked) ? 'soft' : 'off'}
				rows='50'
				cols='40'
				value={editText}
				onChange={writeText}
			/>
		</_Container>
	);
};

EditContents.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default EditContents;
