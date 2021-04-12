import React, {useEffect, useRef, useState} from 'react';
import {Card, Form} from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import {SFTP_SAVE_CURRENT_MODE} from '../../reducers/sftp';

import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import {CustomModal, ModalFooter, PopupButton} from '../../styles/common';
import useConfirmActions from '../../hooks/useConfirmActions';
import {MAIN_COLOR, SUB_COLOR} from '../../styles/global';

const ConfirmMessage = {
	delete_work: '선택하신 파일을 삭제하시겠습니까?',
	edit_file: '변경사항이 있습니다. 저장하시겠습니까?',
	delete_history: '모든 다운로드/업로드 이력을 삭제하시겠습니까?',
	delete_server: '선택하신 서버를 삭제하시겠습니까?',
};

const ConfirmTopMessage = {
	delete_work: 'Delete File',
	rename_work: 'Rename',
	new_folder: 'New Folder',
	edit_file: 'Edit File',
	delete_history: 'Delete History',
	delete_server: 'Delete Server',
	add_folder: 'New Folder',
};

const ConfirmPlaceholder = {
	rename_work: 'Please enter a name to change',
	new_folder: 'Untitled folder',
};

export const SAVE_KEYWORDS = [
	'rename_work',
	'new_folder',
	'edit_file',
	'add_folder',
];
export const FORM_KEYWORDS = ['rename_work', 'new_folder', 'add_folder'];

const ConfirmPopup = ({keyword, open, setOpen, ws, uuid}) => {
	const {
		currentText,
		currentHighlight,
		droplistHighlight,
		listMode,
	} = useSelector((state) => state.sftp);
	const {
		deleteWork,
		renameWork,
		editFile,
		newFolder,
		deleteHistory,
		deleteServer,
		addFolder,
	} = useConfirmActions(ws, uuid);

	const curText = currentText.find((item) => item.uuid === uuid);
	const highlightItem = currentHighlight.find((item) => item.uuid === uuid);
	const dropdownHLList = droplistHighlight.find((item) => item.uuid === uuid);
	const currentlistMode = listMode.find((item) => item.uuid === uuid);

	const dispatch = useDispatch();
	const [formValue, setFormValue] = useState('');
	const inputRef = useRef(null);
	const buttonRef = useRef(null);

	const justExit = () => {
		dispatch({
			type: SFTP_SAVE_CURRENT_MODE,
			data: {uuid, mode: 'normal'},
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const submitFunction = (e) => {
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
			case 'new_folder':
				formValue !== '' && newFolder(formValue);
				break;
			case 'edit_file':
				editFile(curText).then(() =>
					dispatch({
						type: SFTP_SAVE_CURRENT_MODE,
						data: {uuid, mode: 'normal'},
					}),
				);
				break;
			case 'delete_history':
				deleteHistory();
				break;
			case 'delete_server':
				deleteServer();
				break;
			case 'add_folder':
				formValue !== '' && addFolder(formValue);
				break;
			default:
				break;
		}
		handleClose();
	};

	const cancelFunction = () => {
		keyword === 'edit_file' && justExit();
		handleClose();
	};

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
							onChange={(e) => setFormValue(e.target.value)}
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