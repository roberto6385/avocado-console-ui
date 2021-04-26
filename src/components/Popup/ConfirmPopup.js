import React, {useCallback, useEffect, useRef} from 'react';
import {Card, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import {CustomModal, ModalFooter, PopupButton} from '../../styles/common';
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
	const {server} = useSelector((state) => state.sftp);
	const [formValue, onChangeFormValue] = useInput('');
	const inputRef = useRef(null);
	const buttonRef = useRef(null);

	const justExit = useCallback(() => {
		const corServer = server.find((x) => x.uuid === confirm_popup.uuid);
		dispatch({
			type: CHANGE_MODE,
			payload: {
				uuid: confirm_popup.uuid,
				mode: corServer.prevMode,
				currentMode: corServer.mode,
			},
		});
	}, [confirm_popup, server]);

	const handleClose = useCallback(() => {
		dispatch({type: CLOSE_CONFIRM_POPUP});
	}, []);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();

			switch (confirm_popup.key) {
				case 'sftp_delete_file_folder': {
					const corServer = server.find(
						(x) => x.uuid === confirm_popup.uuid,
					);
					for (let value of corServer.highlight) {
						dispatch(
							commandRmAction({
								...corServer,
								file:
									corServer.mode === 'list'
										? value
										: value.item,
								path:
									corServer.mode === 'list'
										? corServer.path
										: value.path,
								keyword:
									corServer.mode === 'list'
										? value.type === 'file'
											? 'rm'
											: 'rmdir'
										: value.item.type === 'file'
										? 'rm'
										: 'rmdir',
							}),
						);
					}
					dispatch(commandRmAction({...corServer, keyword: 'pwd'}));
					break;
				}

				case 'sftp_rename_file_folder': {
					const corServer = server.find(
						(x) => x.uuid === confirm_popup.uuid,
					);
					for (let value of corServer.highlight) {
						if (corServer.mode === 'list') {
							dispatch(
								commandRenameAction({
									...corServer,
									prevName: value.name,
									nextName: formValue,
								}),
							);
						} else if (corServer.mode === 'drop') {
							dispatch(
								commandRenameAction({
									...corServer,
									prevName: value.item.name,
									nextName: formValue,
									path: value.path,
								}),
							);
						}
					}
					break;
				}

				case 'sftp_new_folder': {
					const corServer = server.find(
						(x) => x.uuid === confirm_popup.uuid,
					);
					console.log(corServer, formValue);
					if (formValue === '') return;
					if (
						corServer.mode === 'drop' &&
						corServer.tempPath !== ''
					) {
						dispatch(
							commandMkdirAction({
								...corServer,
								newPath: `${corServer.tempPath}/${formValue}`,
							}),
						);
					} else {
						dispatch(
							commandMkdirAction({
								...corServer,
								newPath: `${corServer.path}/${formValue}`,
							}),
						);
					}
					break;
				}

				case 'sftp_edit_file': {
					const corServer = server.find(
						(x) => x.uuid === confirm_popup.uid,
					);
					const uploadFile = new File(
						[corServer.editText],
						corServer.editFile.name,
						{
							type: 'text/plain',
						},
					);
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
		[clicked_server, confirm_popup, formValue, server],
	);

	const cancelFunction = useCallback(() => {
		confirm_popup.key === 'sftp_edit_file' && justExit();
		handleClose();
	}, [confirm_popup]);

	useEffect(() => {
		buttonRef.current?.focus();
	}, [buttonRef]);

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
							value={formValue}
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
				<PopupButton
					variant='default'
					onClick={cancelFunction}
					back={`${SUB_COLOR}`}
				>
					Cancel
				</PopupButton>
				<PopupButton
					ref={buttonRef}
					variant='default'
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
