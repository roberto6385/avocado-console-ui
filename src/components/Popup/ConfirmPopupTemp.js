import React, {useCallback, useEffect, useRef} from 'react';
import {Card, Form} from 'react-bootstrap';
import {SFTP_SAVE_CURRENT_MODE} from '../../reducers/sftp';

import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import {CustomModal, ModalFooter, PopupButton} from '../../styles/common';
import useConfirmActions from '../../hooks/useConfirmActions';
import {MAIN_COLOR, SUB_COLOR} from '../../styles/global';
import {CLOSE_CONFIRM_POPUP} from '../../reducers/popup';
import useInput from '../../hooks/useInput';
import {ADD_FOLDER, DELETE_SERVER_FOLDER} from '../../reducers/common';

const ConfirmMessage = {
	delete_work: '선택하신 파일을 삭제하시겠습니까?',
	edit_file: '변경사항이 있습니다. 저장하시겠습니까?',
	sftp_delete_history: '모든 다운로드/업로드 이력을 삭제하시겠습니까?',
	delete_server_folder: '선택하신 서버/폴더 삭제하시겠습니까?',
};

const ConfirmTopMessage = {
	delete_work: 'Delete File',
	rename_work: 'Rename',
	sftp_new_folder: 'New Folder',
	edit_file: 'Edit File',
	sftp_delete_history: 'Delete History',
	delete_server_folder: 'Delete Server or Folder',
	add_folder: 'New Folder',
};

const ConfirmPlaceholder = {
	rename_work: 'Please enter a name to change',
	sftp_new_folder: 'Untitled folder',
};

const SAVE_KEYWORDS = [
	'rename_work',
	'sftp_new_folder',
	'edit_file',
	'add_folder',
];
const FORM_KEYWORDS = ['rename_work', 'sftp_new_folder', 'add_folder'];

const ConfirmPopupTemp = () => {
	const dispatch = useDispatch();

	const {confirm_popup} = useSelector((state) => state.popup);
	const {clicked_server} = useSelector((state) => state.common);
	const {sftpNewFolder} = useConfirmActions(
		clicked_server?.ws,
		clicked_server?.uuid,
	);
	const {sftpDeleteHistory} = useConfirmActions();
	const [formValue, onChangeFormValue, setFormValue] = useInput('');
	const inputRef = useRef(null);
	const buttonRef = useRef(null);

	const justExit = useCallback(() => {
		dispatch({
			type: SFTP_SAVE_CURRENT_MODE,
			// data: {uuid, mode: 'normal'},
		});
	}, []);

	const handleClose = useCallback(() => {
		dispatch({type: CLOSE_CONFIRM_POPUP});
	}, []);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();

			switch (confirm_popup.key) {
				case 'sftp_delete_history':
					sftpDeleteHistory();
					break;
				case 'delete_server_folder':
					clicked_server && dispatch({type: DELETE_SERVER_FOLDER});
					break;
				case 'add_folder':
					formValue !== '' &&
						dispatch({type: ADD_FOLDER, data: formValue});
					break;
				default:
					break;
			}
			handleClose();
		},
		[confirm_popup, formValue],
	);

	const cancelFunction = useCallback(() => {
		confirm_popup.key === 'edit_file' && justExit();
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

export default ConfirmPopupTemp;
