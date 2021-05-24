import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as PropTypes from 'prop-types';
import {
	ADD_HISTORY,
	CHANGE_MODE,
	CLOSE_EDITOR,
	commandPutAction,
	SAVE_TEXT,
} from '../../../reducers/sftp';
import {OPEN_CONFIRM_POPUP} from '../../../reducers/popup';
import styled from 'styled-components';
import {
	AVOCADO_FONTSIZE,
	BORDER_COLOR,
	IconButton,
	ICON_LIGHT_COLOR,
	SUB_HEIGHT,
} from '../../../styles/global_design';

const _Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 20px;
	border-bottom: 1px solid ${BORDER_COLOR};
	height: ${SUB_HEIGHT};
`;

const _Button = styled(IconButton)`
	color: ${ICON_LIGHT_COLOR};
`;

const EditNav = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
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
		const uploadFile = new File([editText], editFile.name, {
			type: 'text/plain',
		});
		dispatch({type: SAVE_TEXT, payload: {uuid, text: editText}});
		dispatch(
			commandPutAction({
				...corServer,
				file: uploadFile,
				keyword: 'edit',
			}),
		);
	}, [corServer]);

	const closeEditMode = useCallback(() => {
		if (text !== editText) {
			dispatch({
				type: OPEN_CONFIRM_POPUP,
				data: {key: 'sftp_edit_file', uuid},
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
		<_Container justify={'space-between'}>
			<span
				style={{fontSize: AVOCADO_FONTSIZE}}
			>{`${path}/${editFile.name}`}</span>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<_Button onClick={editedFileSave}>
					<span className='material-icons button_large'>save</span>
				</_Button>
				<_Button onClick={editedFileDownload}>
					<span className='material-icons button_large'>
						file_download
					</span>
				</_Button>
				<_Button onClick={closeEditMode}>
					<span className='material-icons button_large'>
						disabled_by_default
					</span>
				</_Button>
			</div>
		</_Container>
	);
};

EditNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default EditNav;
