import React, {useCallback, useMemo} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {ADD_HISTORY, CHANGE_MODE, CLOSE_EDITOR} from '../../../reducers/sftp';
import {OPEN_ALERT_POPUP, OPEN_SAVE_POPUP} from '../../../reducers/dialogbox';
import styled from 'styled-components';
import {
	fileDownloadIcon,
	saveIcon,
	squareDeleteIcon,
} from '../../../icons/icons';

import {HoverButton} from '../../../styles/components/icon';

const _Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 10px 0px 16px;
	border-bottom: 1px solid;
	height: 50px;
`;

const _Span = styled.span`
	font-size: 14px;
`;
const _ButtonContainer = styled.div`
	display: flex;
	align-items: center;
`;

const EditNav = ({uuid}) => {
	const dispatch = useDispatch();

	const {
		path: sftp_pathState,
		edit: sftp_editState,
		etc: sftp_etcState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {path} = useMemo(
		() => sftp_pathState.find((it) => it.uuid === uuid),
		[sftp_pathState, uuid],
	);
	const {text, editText, editFile} = useMemo(
		() => sftp_editState.find((it) => it.uuid === uuid),
		[sftp_editState, uuid],
	);
	const {prevMode, mode} = useMemo(
		() => sftp_etcState.find((it) => it.uuid === uuid),
		[sftp_etcState, uuid],
	);

	const editedFileDownload = useCallback(() => {
		// 이 부분도 read List에 저장해서 다운 받는 방식으로
		let link = document.createElement('a');
		link.download = editFile.name;
		let blob = new Blob([editText], {type: 'text/plain'});
		link.href = URL.createObjectURL(blob);
		link.click();
		URL.revokeObjectURL(link.href);
		dispatch({
			type: ADD_HISTORY,
			payload: {
				uuid,
				name: editFile.name,
				path: path,
				size: blob.size,
				todo: 'read',
				progress: 100,
				file: editFile,
			},
		});
	}, [editFile, editText, path, dispatch, uuid]);

	const editedFileSave = useCallback(() => {
		if (text === editText) {
			// 변경 내용이 없습니다.
			dispatch({
				type: OPEN_ALERT_POPUP,
				data: 'no_changes',
			});
		} else {
			// 저장하시겠습니까?
			dispatch({
				type: OPEN_SAVE_POPUP,
				data: {key: 'sftp_edit_save', uuid},
			});
		}
	}, [text, editText, dispatch, uuid]);

	const closeEditMode = useCallback(() => {
		if (text !== editText) {
			dispatch({
				type: OPEN_SAVE_POPUP,
				data: {key: 'sftp_edit_close', uuid},
			});
		} else {
			dispatch({type: CLOSE_EDITOR, payload: {uuid}});
			dispatch({
				type: CHANGE_MODE,
				payload: {uuid, mode: prevMode, currentMode: mode},
			});
		}
	}, [dispatch, editText, mode, prevMode, text, uuid]);

	return (
		<_Container justify={'space-between'}>
			<_Span>{`${path}/${editFile.name}`}</_Span>
			<_ButtonContainer>
				<HoverButton size={'sm'} onClick={editedFileSave}>
					{saveIcon}
				</HoverButton>
				<HoverButton size={'sm'} onClick={editedFileDownload}>
					{fileDownloadIcon}
				</HoverButton>
				<HoverButton size={'sm'} onClick={closeEditMode}>
					{squareDeleteIcon}
				</HoverButton>
			</_ButtonContainer>
		</_Container>
	);
};

EditNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default EditNav;
