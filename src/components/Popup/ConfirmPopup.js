import React, {useCallback, useEffect, useRef} from 'react';
import {Card, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

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
	INIT_DELETE_WORK_LIST,
	REMOVE_HISTORY,
} from '../../reducers/sftp';
import {IconButton, PopupButton} from '../../styles/buttons';
import {FlexBox} from '../../styles/divs';
import {BaseModal} from '../../styles/modals';
import {MainHeader} from '../../styles/cards';
import {BaseSpan} from '../../styles/texts';

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
	const inputRef = useRef(null);
	const {confirm_popup} = useSelector((state) => state.popup);
	const {clicked_server} = useSelector((state) => state.common);
	const {sftp} = useSelector((state) => state.sftp);
	const [formValue, onChangeFormValue, setFormValue] = useInput('');

	const justExit = useCallback(() => {
		const {prevMode, mode} = sftp.find(
			(it) => it.uuid === confirm_popup.uuid,
		);

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

			switch (confirm_popup.key) {
				case 'sftp_delete_file_folder': {
					const uuid = confirm_popup.uuid;
					const corServer = sftp.find((it) => it.uuid === uuid);

					for (let value of corServer.deleteWorks) {
						for (let item of value.list) {
							console.log(item);
							console.log(value.path);
							dispatch(
								commandRmAction({
									...corServer,
									file: item,
									newPath: value.path,
									keyword:
										item.type === 'file' ? 'rm' : 'rmdir',
								}),
							);
						}
					}
					dispatch(commandRmAction({...corServer, keyword: 'pwd'}));
					break;
				}

				case 'sftp_rename_file_folder': {
					const uuid = confirm_popup.uuid;
					const corServer = sftp.find((it) => it.uuid === uuid);
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
					const uuid = confirm_popup.uuid;
					const corServer = sftp.find((it) => it.uuid === uuid);
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
					const uuid = confirm_popup.uuid;
					const corServer = sftp.find((it) => it.uuid === uuid);
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
		confirm_popup.key === 'sftp_delete_file_folder' &&
			dispatch({
				type: INIT_DELETE_WORK_LIST,
				payload: {uuid: confirm_popup.uuid},
			});
		handleClose();
	}, [confirm_popup]);
	//when form is open, fill in pre-value and focus and select it
	useEffect(() => {
		const fillInForm = async () => {
			if (confirm_popup.open) {
				if (confirm_popup.key === 'sftp_rename_file_folder') {
					const {highlight, mode} = sftp.find(
						(it) => it.uuid === confirm_popup.uuid,
					);

					if (mode === 'list') await setFormValue(highlight[0].name);
					else await setFormValue(highlight[0].item.name);
				} else if (
					confirm_popup.key === 'sftp_new_folder' ||
					confirm_popup.key === 'new_folder'
				) {
					await setFormValue('');
				}
				await inputRef.current?.select();
				await inputRef.current?.focus();
			}
		};
		fillInForm();
	}, [confirm_popup, sftp]);

	return (
		<BaseModal show={confirm_popup.open} onHide={handleClose}>
			<MainHeader justify={'space-between'}>
				<BaseSpan padding={'0px 8px'}>
					{Object.prototype.hasOwnProperty.call(
						ConfirmTopMessage,
						confirm_popup.key,
					) && ConfirmTopMessage[confirm_popup.key]}
				</BaseSpan>
				<IconButton className={'right'}>
					<FaTimes onClick={handleClose} />
				</IconButton>
			</MainHeader>
			<Card.Body>
				{Object.prototype.hasOwnProperty.call(
					ConfirmMessage,
					confirm_popup.key,
				) && <Card.Text>{ConfirmMessage[confirm_popup.key]}</Card.Text>}

				{FORM_KEYWORDS.includes(confirm_popup.key) && (
					<Form onSubmit={submitFunction}>
						<Form.Control
							ref={inputRef}
							type='text'
							value={formValue}
							placeholder={
								Object.prototype.hasOwnProperty.call(
									ConfirmPlaceholder,
									confirm_popup.key,
								)
									? ConfirmPlaceholder[confirm_popup.key]
									: null
							}
							onChange={onChangeFormValue}
						/>
					</Form>
				)}
				<FlexBox padding={'4px 12px'} justify={'flex-end'}>
					<PopupButton onClick={cancelFunction} back={`${SUB_COLOR}`}>
						Cancel
					</PopupButton>
					<PopupButton
						onClick={submitFunction}
						back={`${MAIN_COLOR}`}
					>
						{SAVE_KEYWORDS.includes(confirm_popup.key)
							? 'SAVE'
							: 'OK'}
					</PopupButton>
				</FlexBox>
			</Card.Body>
		</BaseModal>
	);
};

export default ConfirmPopup;
