import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {SAVE_EDITTEXT} from '../../../reducers/sftp';
import styled from 'styled-components';

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
		font-size: 14px;
		resize: none;
	}
`;
const EditContent = ({uuid}) => {
	const dispatch = useDispatch();
	const {edit: sftpEdit} = useSelector((state) => state.sftp, shallowEqual);

	const searchedFileContent = useMemo(
		() => sftpEdit.find((it) => it.uuid === uuid).editText,
		[sftpEdit, uuid],
	);

	const onChangeFileContent = useCallback(
		(e) => {
			dispatch({
				type: SAVE_EDITTEXT,
				payload: {uuid, editText: e.target.value},
			});
		},
		[dispatch, uuid],
	);

	return (
		<_Container>
			<textarea
				rows='50'
				cols='40'
				value={searchedFileContent}
				onChange={onChangeFileContent}
			/>
		</_Container>
	);
};

EditContent.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default EditContent;
