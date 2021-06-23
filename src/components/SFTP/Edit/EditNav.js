import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {ADD_HISTORY, CHANGE_MODE, CLOSE_EDITOR} from '../../../reducers/sftp';
import {OPEN_ALERT_POPUP, OPEN_SAVE_POPUP} from '../../../reducers/popup';
import styled from 'styled-components';
import {IconButton} from '../../../styles/global';
import {
	fileDownloadIcon,
	saveIcon,
	squareDeleteIcon,
} from '../../../icons/icons';
import {FONT_14, HEIGHT_50} from '../../../styles/length';
import {
	borderColor,
	fontColor,
	iconColor,
	tabColor,
} from '../../../styles/color';

const _Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 10px 0px 16px;
	border-bottom: 1px solid;
	background: ${(props) => props?.back};
	border-color: ${(props) => props?.bcolor};
	height: ${HEIGHT_50};
`;

const _Button = styled(IconButton)`
	color: ${(props) => props?.color};
`;

const _Span = styled.span`
	font-size: ${FONT_14};
	color: ${(props) => props.color};
`;
const _ButtonContainer = styled.div`
	display: flex;
	align-items: center;
`;

const EditNav = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const {theme} = useSelector((state) => state.common);
	const corServer = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const {text, editText, editFile, path, prevMode, mode} = corServer;
	const dispatch = useDispatch();

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
			back={tabColor[theme]}
			bcolor={borderColor[theme]}
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
