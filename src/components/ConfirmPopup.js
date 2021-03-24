import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Button, Card, Form, Modal} from 'react-bootstrap';
import {sendCommandByLs} from './SFTP/commands/sendCommandLs';
import {PropTypes} from 'prop-types';
import {
	SFTP_SAVE_CURRENT_HIGHLIGHT,
	SFTP_SAVE_CURRENT_MODE,
} from '../reducers/sftp';
import {sendCommandByRename} from './SFTP/commands/sendCommandRename';
import {sendCommandByMkdir} from './SFTP/commands/sendCommandMkdir';
import {useDispatch, useSelector} from 'react-redux';
import {sendCommandByRm} from './SFTP/commands/sendCommandRm';
import {sendCommandByPut} from './SFTP/commands/sendCommandPut';
import {sendCommandByGet} from './SFTP/commands/sendCommandGet';
import {FaTimes} from 'react-icons/all';

const ModalFooter = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 4px 12px;
	margin: 10px;
`;

const CustomModal = styled(Modal)`
    .modal-dialog{
        height:100%;
        margin:auto;
        display:flex;
        align-items:center;
        justify-contents:center;
        
        .modal-content{
            margin:auto;
            width:450px;
            height:200px;
            flex-direction:column;
            }
        }
    }
`;

const ConfirmPopup = ({keyword, open, setOpen, ws, uuid}) => {
	const {currentPath, currentText, currentHighlight} = useSelector(
		(state) => state.sftp,
	);

	const curText = currentText.find((item) => item.uuid === uuid);
	const curPath = currentPath.find((item) => item.uuid === uuid);
	const highlightItem = currentHighlight.find((item) => item.uuid === uuid);
	const dispatch = useDispatch();
	const [formValue, setFormValue] = useState('');
	const inputRef = useRef(null);
	const formKeywords = ['Rename', 'New Folder'];

	const contextDelete = async () => {
		for await (const key of highlightItem?.list) {
			await sendCommandByRm(
				ws,
				uuid,

				curPath?.path + '/' + key.fileName,
				key.fileType,
			);
			await sendCommandByLs(ws, uuid, curPath?.path, dispatch);

			dispatch({
				type: SFTP_SAVE_CURRENT_HIGHLIGHT,
				data: {uuid, list: []},
			});
		}
	};

	const contextRename = async () => {
		const path = curPath?.path === '/' ? '/' : curPath?.path + '/';
		await sendCommandByRename(
			ws,
			uuid,
			path + highlightItem?.list[0].fileName,
			path + formValue,
		);

		await sendCommandByLs(ws, uuid, curPath?.path, dispatch);

		dispatch({
			type: SFTP_SAVE_CURRENT_HIGHLIGHT,
			data: {uuid, list: []},
		});
	};

	const contextNewFolder = async () => {
		const path = curPath?.path === '/' ? '/' : curPath?.path + '/';
		await sendCommandByMkdir(ws, uuid, path + formValue);
		await sendCommandByLs(ws, uuid, curPath?.path, dispatch);

		dispatch({
			type: SFTP_SAVE_CURRENT_HIGHLIGHT,
			data: {uuid, list: []},
		});
	};

	const existChanges = async () => {
		const editedFile = new File([curText?.text], curText?.name, {
			type: 'text/plain',
		});
		console.log(editedFile);
		sendCommandByPut(
			'put',
			editedFile,
			ws,
			uuid,
			curPath?.path,
			editedFile.name,
		)
			.then(() =>
				sendCommandByGet(
					'edit',
					ws,
					uuid,
					curPath?.path,
					editedFile.name,
					dispatch,
				),
			)
			.then(() => sendCommandByLs(ws, uuid, curPath?.path, dispatch))
			.then(() =>
				dispatch({
					type: SFTP_SAVE_CURRENT_MODE,
					data: {uuid, mode: 'normal'},
				}),
			);
	};

	const justExit = () => {
		dispatch({
			type: SFTP_SAVE_CURRENT_MODE,
			data: {uuid, mode: 'normal'},
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const okFunction = () => {
		keyword === 'Delete' && contextDelete();
		keyword === 'Rename' && contextRename();
		keyword === 'New Folder' && contextNewFolder();

		keyword === 'Changes' && existChanges();
		handleClose();
	};
	const cancelFunction = () => {
		keyword === 'Changes' && justExit();
	};

	useEffect(() => {
		setFormValue(
			keyword === 'Rename' ? highlightItem?.list[0].fileName : '',
		);
		inputRef.current?.focus();
	}, [open]);

	return (
		<CustomModal size='lg' show={open} onHide={handleClose}>
			<Card.Header as='h5'>
				{keyword}
				<span style={{float: 'right'}} onClick={handleClose}>
					<FaTimes />
				</span>
			</Card.Header>
			<Card.Body>
				{keyword === 'Delete' && (
					<p>선택하신 파일을 삭제하시겠습니까?</p>
				)}

				{keyword === 'Changes' && (
					<p>변경사항이 있습니다. 저장하시겠습니까?</p>
				)}

				{formKeywords.includes(keyword) && (
					<Form action=''>
						<Form.Control
							ref={inputRef}
							value={formValue}
							type='text'
							placeholder={
								(keyword === 'Rename' &&
									'Please enter a name to change') ||
								(keyword === 'New Folder' && 'Untitled folder')
							}
							onChange={(e) => setFormValue(e.target.value)}
						/>
					</Form>
				)}
			</Card.Body>
			<ModalFooter>
				<Button
					className='add-server-button'
					variant='primary'
					style={{
						width: '100px',
						marginRight: '20px',
						backgroundColor: '#d9b08c',
						border: 'none',
					}}
					onClick={cancelFunction}
				>
					Cancel
				</Button>
				<Button
					className='add-server-button'
					variant='primary'
					style={{
						width: '100px',
						backgroundColor: '#116466',
						border: 'none',
					}}
					onClick={okFunction}
				>
					OK
				</Button>
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
