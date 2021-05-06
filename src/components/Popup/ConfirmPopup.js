import React, {useCallback, useEffect, useRef} from 'react';
import {Card, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import {CustomModal, ModalFooter} from '../../styles/common';
import {MAIN_COLOR, SUB_COLOR} from '../../styles/global';
import {CLOSE_CONFIRM_POPUP} from '../../reducers/popup';
import useInput from '../../hooks/useInput';
import {ADD_FOLDER, DELETE_SERVER_FOLDER} from '../../reducers/common';
import {
	CHANGE_MODE,
	CLOSE_EDITOR,
	commandMkdirAction,
	commandPutAction,
	commandRenameAction,
	commandRmAction,
	REMOVE_HISTORY,
} from '../../reducers/sftp';
import {PopupButton} from '../../styles/buttons';

const ConfirmMessage = {
	sftp_delete_file_folder: '선택하신 파일/폴더를 삭제하시겠습니까?',
	sftp_edit_file: '변경사항이 있습니다. 저장하시겠습니까?',
	sftp_delete_server: '선택하신 서버를 삭제하시겠습니까?',
	sftp_delete_history: '모든 다운로드/업로드 이력을 삭제하시겠습니까?',
	delete_server_folder: '선택하신 서버/폴더를 삭제하시겠습니까?',
};

const ConfirmTopMessage = {
	sftp_delete_file_folder: 'Delete File of Folder',
	sftp_rename_file_folder: 'Rename',
	sftp_new_folder: 'New Folder',
	sftp_edit_file: 'Edit File',
	sftp_delete_server: 'Delete Server',
	sftp_delete_history: 'Delete History',
	delete_server_folder: 'Delete Server or Folder',
	new_folder: 'New Folder',
};

const ConfirmPlaceholder = {
	sftp_rename_file_folder: 'Please enter a name to change',
	sftp_new_folder: 'Untitled folder',
};

const SAVE_KEYWORDS = [
	'sftp_rename_file_folder',
	'sftp_new_folder',
	'sftp_edit_file',
	'new_folder',
];

const FORM_KEYWORDS = [
	'sftp_rename_file_folder',
	'sftp_new_folder',
	'new_folder',
];

const ConfirmPopup = () => {
	const dispatch = useDispatch();
	const {confirm_popup} = useSelector((state) => state.popup);
	const {clicked_server} = useSelector((state) => state.common);
	const {sftp} = useSelector((state) => state.sftp);
	const [formValue, onChangeFormValue, setFormValue] = useInput('');
	const inputRef = useRef(null);
	const buttonRef = useRef(null);

	const justExit = useCallback(() => {
		const corServer = sftp.find((it) => it.uuid === confirm_popup.uuid);
		const {prevMode, mode} = corServer;
		dispatch({
			type: CHANGE_MODE,
			payload: {
				uuid: confirm_popup.uuid,
				mode: prevMode,
				currentMode: mode,
			},
		});
	}, [confirm_popup, sftp]);

	const handleClose = useCallback(() => {
		dispatch({type: CLOSE_CONFIRM_POPUP});
	}, []);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();

			const uuid = confirm_popup.uuid;
			const corServer = sftp.find((it) => it.uuid === uuid);
			console.log(corServer);

			switch (confirm_popup.key) {
				case 'sftp_delete_file_folder': {
					for (let value of corServer.deleteWorks) {
						for (let item of value.list) {
							dispatch(
								commandRmAction({
									...corServer,
									file: item,
									path: value.path,
									keyword:
										item.type === 'file' ? 'rm' : 'rmdir',
								}),
							);
							// console.log(`${item.name}/${value.path}`);
						}
					}
					dispatch(commandRmAction({...corServer, keyword: 'pwd'}));
					break;
				}

				case 'sftp_rename_file_folder': {
					const {highlight, mode, path} = corServer;
					for (let value of highlight) {
						if (mode === 'list') {
							dispatch(
								commandRenameAction({
									...corServer,
									prevName: value.name,
									nextName: formValue,
									newPath: path,
								}),
							);
						} else if (mode === 'drop') {
							dispatch(
								commandRenameAction({
									...corServer,
									prevName: value.item.name,
									nextName: formValue,
									newPath: value.path,
								}),
							);
						}
					}
					break;
				}

				case 'sftp_new_folder': {
					const {mode, path, tempPath} = corServer;

					if (formValue === '') return;
					if (mode === 'drop' && tempPath !== '') {
						dispatch(
							commandMkdirAction({
								...corServer,
								newPath: `${tempPath}/${formValue}`,
							}),
						);
					} else {
						dispatch(
							commandMkdirAction({
								...corServer,
								newPath: `${path}/${formValue}`,
							}),
						);
					}
					break;
				}

				case 'sftp_edit_file': {
					const {editText, editFile} = corServer;
					const uploadFile = new File([editText], editFile.name, {
						type: 'text/plain',
					});

					dispatch(
						commandPutAction({
							...corServer,
							file: uploadFile,
							keyword: 'edit',
						}),
					);
					dispatch({
						type: CLOSE_EDITOR,
						payload: {uuid: confirm_popup.uuid},
					});
					dispatch({
						type: CHANGE_MODE,
						payload: {uuid: confirm_popup.uuid, mode: 'list'},
					});
					break;
				}

				case 'sftp_delete_history': {
					dispatch({
						type: REMOVE_HISTORY,
						payload: {uuid: confirm_popup.uuid},
					});
					break;
				}
				case 'delete_server_folder':
					clicked_server && dispatch({type: DELETE_SERVER_FOLDER});
					break;

				case 'new_folder':
					formValue !== '' &&
						dispatch({type: ADD_FOLDER, data: formValue});
					break;

				default:
					break;
			}
			handleClose();
		},
		[clicked_server, confirm_popup, formValue, sftp],
	);

	const cancelFunction = useCallback(() => {
		confirm_popup.key === 'sftp_edit_file' && justExit();
		handleClose();
	}, [confirm_popup]);

	const inputFunction = useCallback(() => {
		if (confirm_popup.key === 'sftp_rename_file_folder') {
			const corServer = sftp.find((it) => it.uuid === confirm_popup.uuid);
			const {highlight, mode} = corServer;
			console.log(highlight, mode);
			mode === 'list'
				? setFormValue(highlight[0].name)
				: setFormValue(highlight[0].item.name);
			inputRef.current?.focus();
			// buttonRef.current?.focus();
		} else if (confirm_popup.key === 'sftp_new_folder') {
			setFormValue('');
			inputRef.current?.focus();
		}
	}, [confirm_popup, sftp]);

	useEffect(() => {
		inputFunction();
	}, [confirm_popup]);

	// useEffect(() => {
	// 	buttonRef.current?.focus();
	// }, [buttonRef]);

	return (
		<CustomModal size='lg' show={confirm_popup.open} onHide={handleClose}>
			<Card.Header as='h5'>
				{Object.prototype.hasOwnProperty.call(
					ConfirmTopMessage,
					confirm_popup.key,
				) && ConfirmTopMessage[confirm_popup.key]}
				<span className={'right'} onClick={handleClose}>
					<FaTimes />
				</span>
			</Card.Header>
			<Card.Body>
				{Object.prototype.hasOwnProperty.call(
					ConfirmMessage,
					confirm_popup.key,
				) && <p>{ConfirmMessage[confirm_popup.key]}</p>}

				{FORM_KEYWORDS.includes(confirm_popup.key) && (
					<Form onSubmit={submitFunction}>
						<Form.Control
							ref={inputRef}
							value={formValue || ''}
							type='text'
							placeholder={
								Object.prototype.hasOwnProperty.call(
									ConfirmPlaceholder,
									confirm_popup.key,
								) && ConfirmPlaceholder[confirm_popup.key]
							}
							onChange={onChangeFormValue}
						/>
					</Form>
				)}
			</Card.Body>

			<ModalFooter>
				<PopupButton onClick={cancelFunction} back={`${SUB_COLOR}`}>
					Cancel
				</PopupButton>
				<PopupButton
					ref={buttonRef}
					onClick={submitFunction}
					back={`${MAIN_COLOR}`}
				>
					{SAVE_KEYWORDS.includes(confirm_popup.key) ? 'SAVE' : 'OK'}
				</PopupButton>
			</ModalFooter>
		</CustomModal>
	);
};

export default ConfirmPopup;
