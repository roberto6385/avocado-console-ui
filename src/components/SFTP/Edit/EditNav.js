import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {
	ADD_HISTORY,
	CHANGE_MODE,
	CLOSE_EDITOR,
} from '../../../reducers/sftp';
import {OPEN_ALERT_POPUP, OPEN_SAVE_POPUP} from '../../../reducers/popup';
import styled from 'styled-components';
import {
	AVOCADO_FONTSIZE,
	IconButton,
	SUB_HEIGHT,
	fontColor,
	iconColor,
	borderColor,
	sideColor,
} from '../../../styles/global';
import {
	fileDownloadIcon,
	saveIcon,
	squareDeleteIcon,
} from '../../../icons/icons';

const _Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 10px 0px 16px;
	border-bottom: 1px solid;
	background: ${(props) => props?.back};
	border-color: ${(props) => props?.b_color};
	height: ${SUB_HEIGHT};
`;

const _Button = styled(IconButton)`
	color: ${(props) => props?.color};
`;

const _Span = styled.span`
	font-size: ${AVOCADO_FONTSIZE};
	color: ${(props) => props.color};
`;
const _ButtonContainer = styled.div`
	display: flex;
	align-items: center;
`;

const EditNav = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const {theme} = useSelector((state) => state.common);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {text, editText, editFile, path, prevMode, mode} = corServer;
	const dispatch = useDispatch();

	const editedFileDownload = useCallback(() => {
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
				todo: 'get',
				progress: 0,
				// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
				// 삭제, dispatch, 삭제 해서 progress 100 만들기
			},
		});
	}, [corServer]);

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
	}, [text, editText, dispatch, corServer]);

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
	}, [corServer]);

	return (
		<_Container
			justify={'space-between'}
			back={sideColor[theme]}
			b_color={borderColor[theme]}
		>
			<_Span color={fontColor[theme]}>{`${path}/${editFile.name}`}</_Span>
			<_ButtonContainer>
				<_Button color={iconColor[theme]} onClick={editedFileSave}>
					{saveIcon}
				</_Button>
				<_Button color={iconColor[theme]} onClick={editedFileDownload}>
					{fileDownloadIcon}
				</_Button>
				<_Button color={iconColor[theme]} onClick={closeEditMode}>
					{squareDeleteIcon}
				</_Button>
			</_ButtonContainer>
		</_Container>
	);
};

EditNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default EditNav;
