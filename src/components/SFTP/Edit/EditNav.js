import React, {useCallback} from 'react';
import {MdCancel, MdFileDownload, MdSave} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import {PropTypes} from 'prop-types';
import {Navbar, NavItem} from '../../../styles/sftp';
import {
	ADD_HISTORY,
	CHANGE_MODE,
	CLOSE_EDITOR,
	commandPutAction,
	SAVE_TEXT,
} from '../../../reducers/sftp';
import {OPEN_CONFIRM_POPUP} from '../../../reducers/popup';

const EditNav = ({server}) => {
	const {uuid, text, editText, editFile, path, prevMode, mode} = server;
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
	}, [server]);

	const editedFileSave = useCallback(() => {
		const uploadFile = new File([editText], editFile.name, {
			type: 'text/plain',
		});
		dispatch({type: SAVE_TEXT, payload: {uuid, text: editText}});
		dispatch(
			commandPutAction({
				...server,
				file: uploadFile,
				keyword: 'edit',
			}),
		);
	}, [server]);

	const closeEditMode = useCallback(() => {
		if (text !== editText) {
			dispatch({
				type: OPEN_CONFIRM_POPUP,
				data: {key: 'sftp_edit_file', uuid: server.uuid},
			});
		} else {
			dispatch({type: CLOSE_EDITOR, payload: {uuid}});
			dispatch({
				type: CHANGE_MODE,
				payload: {uuid, mode: prevMode, currentMode: mode},
			});
		}
	}, [server]);

	return (
		<Navbar>
			<span style={{fontSize: '14px'}}>{`${path}/${editFile.name}`}</span>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<NavItem onClick={editedFileDownload}>
					<MdFileDownload />
				</NavItem>
				<NavItem onClick={editedFileSave}>
					<MdSave />
				</NavItem>
				<NavItem onClick={closeEditMode}>
					<MdCancel />
				</NavItem>
			</div>
		</Navbar>
	);
};

EditNav.propTypes = {
	server: PropTypes.object.isRequired,
};

export default EditNav;
