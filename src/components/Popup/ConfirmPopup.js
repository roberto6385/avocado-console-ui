import React, {useCallback, useEffect, useRef} from 'react';
import {Card, Form} from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import {SFTP_SAVE_CURRENT_MODE} from '../../reducers/subSftp';

import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import {CustomModal, ModalFooter, PopupButton} from '../../styles/common';
import useConfirmActions from '../../hooks/useConfirmActions';
import {MAIN_COLOR, SUB_COLOR} from '../../styles/global';
import useInput from '../../hooks/useInput';

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

const ConfirmPopup = ({keyword, open, setOpen, ws, uuid}) => {
	const {
		currentText,
		currentHighlight,
		droplistHighlight,
		listMode,
	} = useSelector((state) => state.subSftp);
	const {deleteWork, renameWork, editFile, sftpNewFolder} = useConfirmActions(
		ws,
		uuid,
	);

	const curText = currentText.find((item) => item.uuid === uuid);
	const highlightItem = currentHighlight.find((item) => item.uuid === uuid);
	const dropdownHLList = droplistHighlight.find((item) => item.uuid === uuid);
	const currentlistMode = listMode.find((item) => item.uuid === uuid);

	const dispatch = useDispatch();
	const [formValue, onChangeFormValue, setFormValue] = useInput('');
	const inputRef = useRef(null);
	const buttonRef = useRef(null);

	const justExit = useCallback(() => {
		dispatch({
			type: SFTP_SAVE_CURRENT_MODE,
			data: {uuid, mode: 'normal'},
		});
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();

			switch (keyword) {
				case 'delete_work':
					currentlistMode?.mode === 'list'
						? deleteWork(currentlistMode?.mode, highlightItem)
						: deleteWork(currentlistMode?.mode, dropdownHLList);
					break;
				case 'rename_work':
					currentlistMode?.mode === 'list'
						? renameWork('list', highlightItem?.list, formValue)
						: renameWork('drop', dropdownHLList?.list, formValue);
					break;
				case 'sftp_new_folder':
					formValue !== '' && sftpNewFolder(formValue);
					break;
				case 'edit_file':
					editFile(curText).then(() =>
						dispatch({
							type: SFTP_SAVE_CURRENT_MODE,
							data: {uuid, mode: 'normal'},
						}),
					);
					break;

				default:
					break;
			}
			handleClose();
		},
		[uuid, formValue, currentlistMode, highlightItem, dropdownHLList],
	);

	const cancelFunction = useCallback(() => {
		keyword === 'edit_file' && justExit();
		handleClose();
	}, [keyword]);

	useEffect(() => {
		setFormValue(
			keyword === 'rename_work'
				? currentlistMode?.mode === 'list'
					? highlightItem.list[0]?.fileName
					: dropdownHLList?.list[0]?.item.fileName
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
	ws: PropTypes.object, // optional
	uuid: PropTypes.string, // optional
};

export default ConfirmPopup;
