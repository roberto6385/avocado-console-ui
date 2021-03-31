import React, {useEffect, useRef, useState} from 'react';
import {Card, Form} from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import {SFTP_SAVE_CURRENT_MODE} from '../reducers/sftp';

import {useDispatch, useSelector} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import {CustomModal} from '../styles/common';
import Button from './ConfirmPopup/Button';
import useConfirmActions from '../hooks/useConfirmActions';
import useSftpCommands from '../hooks/useSftpCommands';

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
};

const ConfirmPlaceholder = {
	rename_work: 'Please enter a name to change',
	new_folder: 'Untitled folder',
};

export const SAVE_KEYWORDS = ['rename_work', 'new_folder', 'edit_file'];
export const FORM_KEYWORDS = ['rename_work', 'new_folder'];

const ConfirmPopup = ({keyword, open, setOpen, ws, uuid}) => {
	const {currentText, currentHighlight} = useSelector((state) => state.sftp);
	const {
		deleteWork,
		renameWork,
		editFile,
		newFolder,
		deleteHistory,
		deleteServer,
	} = useConfirmActions(ws, uuid);

	const {initialWork} = useSftpCommands({ws, uuid});
	const curText = currentText.find((item) => item.uuid === uuid);
	const highlightItem = currentHighlight.find((item) => item.uuid === uuid);
	const dispatch = useDispatch();
	const [formValue, setFormValue] = useState('');
	const inputRef = useRef(null);

	const justExit = () => {
		dispatch({
			type: SFTP_SAVE_CURRENT_MODE,
			data: {uuid, mode: 'normal'},
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const submitFunction = () => {
		switch (keyword) {
			case 'delete_work':
				deleteWork(highlightItem);
				break;
			case 'rename_work':
				renameWork(highlightItem, formValue);
				break;
			case 'new_folder':
				newFolder(formValue);
				break;
			case 'edit_file':
				editFile(curText);
				break;
			case 'delete_history':
				deleteHistory();
				break;
			case 'delete_server':
				deleteServer();
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
			keyword === 'rename_work' ? highlightItem?.list[0].fileName : '',
		);
		inputRef.current?.focus();
	}, [open]);

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
					<Form action=''>
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
			<Button
				keyword={keyword}
				cancelFunction={cancelFunction}
				submitFunction={submitFunction}
			/>
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
