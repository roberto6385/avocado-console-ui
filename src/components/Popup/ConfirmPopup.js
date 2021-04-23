import React, {useCallback, useEffect, useRef} from 'react';
import {Card, Form} from 'react-bootstrap';
import * as PropTypes from 'prop-types';

import {useDispatch} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import {CustomModal, ModalFooter, PopupButton} from '../../styles/common';
import {MAIN_COLOR, SUB_COLOR} from '../../styles/global';
import useInput from '../../hooks/useInput';
import {
	CHANGE_MODE,
	commandRenameAction,
	commandMkdirAction,
	commandRmAction,
	REMOVE_HISTORY,
	commandPutAction,
	CLOSE_EDITOR,
} from '../../reducers/sftp';

const ConfirmMessage = {
	delete_work: '선택하신 파일을 삭제하시겠습니까?',
	edit_file: '변경사항이 있습니다. 저장하시겠습니까?',
	delete_history: '모든 다운로드/업로드 이력을 삭제하시겠습니까?',
	delete_server: '선택하신 서버를 삭제하시겠습니까?',
};

const ConfirmTopMessage = {
	delete_work: 'Delete File',
	rename_work: 'Rename',
	sftp_new_folder: 'New Folder',
	edit_file: 'Edit File',
	delete_history: 'Delete History',
	delete_server: 'Delete Server',
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

const ConfirmPopup = ({keyword, open, setOpen, server}) => {
	const {uuid, path, highlight, mode, editFile, editText, tempPath} = server;

	const dispatch = useDispatch();
	const [formValue, onChangeFormValue, setFormValue] = useInput('');
	const inputRef = useRef(null);
	const buttonRef = useRef(null);

	const justExit = useCallback(() => {
		dispatch({
			type: CHANGE_MODE,
			payload: {uuid, mode: mode},
		});
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const submitFunction = (e) => {
		e.preventDefault();
		switch (keyword) {
			case 'delete_work':
				for (let value of highlight) {
					dispatch(
						commandRmAction({
							...server,
							file: mode === 'list' ? value : value.item,
							path: mode === 'list' ? server.path : value.path,
							keyword:
								mode === 'list'
									? value.type === 'file'
										? 'rm'
										: 'rmdir'
									: value.item.type === 'file'
									? 'rm'
									: 'rmdir',
						}),
					);
				}
				dispatch(commandRmAction({...server, keyword: 'pwd'}));
				break;
			case 'rename_work':
				for (let value of highlight) {
					if (mode === 'list') {
						dispatch(
							commandRenameAction({
								...server,
								prevName: value.name,
								nextName: formValue,
							}),
						);
					} else if (mode === 'drop') {
						dispatch(
							commandRenameAction({
								...server,
								prevName: value.item.name,
								nextName: formValue,
								path: value.path,
							}),
						);
					}
				}
				break;
			case 'sftp_new_folder':
				if (formValue === '') return;
				if (mode === 'drop' && tempPath !== '') {
					console.log(mode, tempPath);
					dispatch(
						commandMkdirAction({
							...server,
							newPath: `${tempPath}/${formValue}`,
						}),
					);
				} else {
					dispatch(
						commandMkdirAction({
							...server,
							newPath: `${path}/${formValue}`,
						}),
					);
				}

				break;
			case 'edit_file':
				// eslint-disable-next-line no-case-declarations
				const uploadFile = new File([editText], editFile.name, {
					type: 'text/plain',
				});
				dispatch(
					commandPutAction({
						...server,
						file: uploadFile,
						keyword: 'edit',
					}),
				);
				dispatch({type: CLOSE_EDITOR, payload: {uuid}});
				dispatch({
					type: CHANGE_MODE,
					payload: {uuid, mode: 'list'},
				});
				break;

			case 'delete_history':
				dispatch({
					type: REMOVE_HISTORY,
					payload: {uuid},
				});
				break;

			default:
				break;
		}
		handleClose();
	};

	const cancelFunction = useCallback(() => {
		keyword === 'edit_file' && justExit();
		handleClose();
	}, [keyword]);

	useEffect(() => {
		setFormValue(
			keyword === 'rename_work'
				? mode === 'list'
					? highlight[0].name
					: highlight[0].item.name
				: '',
		);
		inputRef.current?.focus();
	}, [open]);

	useEffect(() => {
		buttonRef.current?.focus();
	}, []);

	return (
		<CustomModal size='lg' show={open} onHide={handleClose}>
			<Card.Header as='h5'>
				{Object.prototype.hasOwnProperty.call(
					ConfirmTopMessage,
					keyword,
				) && ConfirmTopMessage[keyword]}
				<span className={'right'} onClick={handleClose}>
					<FaTimes />
				</span>
			</Card.Header>
			<Card.Body>
				{Object.prototype.hasOwnProperty.call(
					ConfirmMessage,
					keyword,
				) && <p>{ConfirmMessage[keyword]}</p>}

				{FORM_KEYWORDS.includes(keyword) && (
					<Form onSubmit={submitFunction}>
						<Form.Control
							ref={inputRef}
							value={formValue}
							type='text'
							placeholder={
								Object.prototype.hasOwnProperty.call(
									ConfirmPlaceholder,
									keyword,
								) && ConfirmPlaceholder[keyword]
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
					{SAVE_KEYWORDS.includes(keyword) ? 'SAVE' : 'OK'}
				</PopupButton>
			</ModalFooter>
		</CustomModal>
	);
};

ConfirmPopup.propTypes = {
	keyword: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	server: PropTypes.object.isRequired,
};

export default ConfirmPopup;
