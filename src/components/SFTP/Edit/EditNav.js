import React, {useCallback} from 'react';
import {MdCancel, MdFileDownload, MdSave} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {PropTypes} from 'prop-types';
import {
	ADD_HISTORY,
	CHANGE_MODE,
	CLOSE_EDITOR,
	commandPutAction,
	SAVE_TEXT,
} from '../../../reducers/sftp';
import {OPEN_CONFIRM_POPUP} from '../../../reducers/popup';
import {MainHeader} from '../../../styles/cards';
import {IconButton} from '../../../styles/buttons';

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
		<MainHeader justify={'space-between'}>
			<span style={{fontSize: '14px'}}>{`${path}/${editFile.name}`}</span>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<IconButton onClick={editedFileDownload}>
					<MdFileDownload />
				</IconButton>
				<IconButton onClick={editedFileSave}>
					<MdSave />
				</IconButton>
				<IconButton onClick={closeEditMode}>
					<MdCancel />
				</IconButton>
			</div>
		</MainHeader>
	);
};

EditNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default EditNav;
