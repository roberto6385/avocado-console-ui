import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Button, Card, Form, Modal} from 'react-bootstrap';
import {sendCommandByLs} from './SFTP/commands/sendCommandLs';
import {PropTypes} from 'prop-types';
import {
	SFTP_DELETE_HISTORY,
	SFTP_SAVE_CURRENT_HIGHLIGHT,
	SFTP_SAVE_CURRENT_MODE,
	SFTP_SAVE_HISTORY,
} from '../reducers/sftp';
import {sendCommandByRename} from './SFTP/commands/sendCommandRename';
import {sendCommandByMkdir} from './SFTP/commands/sendCommandMkdir';
import {useDispatch, useSelector} from 'react-redux';
import {sendCommandByRm} from './SFTP/commands/sendCommandRm';
import {sendCommandByPut} from './SFTP/commands/sendCommandPut';
import {sendCommandByGet} from './SFTP/commands/sendCommandGet';
import {FaTimes} from 'react-icons/all';
import {MAIN_COLOR, SUB_COLOR} from '../styles/global';
import {DELETE_SERVER} from '../reducers/common';

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

const PopupButton = styled(Button)`
	width: 100px;
	margin: 10px;
	background-color: ${(props) => props.back};
	border: none;
	color: white;
	&:hover {
		filter: brightness(85%);
		color: white;
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
	const SAVE_KEYWORDS = ['Rename', 'New Folder', 'Changes'];
	const FORM_KEYWORDS = ['Rename', 'New Folder'];

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
				type: SFTP_SAVE_HISTORY,
				data: {
					uuid,
					name: key.fileName,
					path: curPath?.path,
					size: key.fileSize,
					todo: 'rm',
					progress: 100,
					// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
					// 삭제, dispatch, 삭제 해서 progress 100 만들기
				},
			});
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
			'edit',
			editedFile,
			ws,
			uuid,
			curPath?.path,
			editedFile.name,
			dispatch,
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

	const deleteHistory = () => {
		dispatch({
			type: SFTP_DELETE_HISTORY,
			data: {id: -1, uuid},
		});
	};

	const deleteServer = () => {
		dispatch({type: DELETE_SERVER});
	};

	const okFunction = () => {
		keyword === 'Delete' && contextDelete();
		keyword === 'Rename' && contextRename();
		keyword === 'New Folder' && contextNewFolder();
		keyword === 'Changes' && existChanges();
		keyword === 'Delete History' && deleteHistory();
		keyword === 'Delete Server' && deleteServer();
		handleClose();
	};

	const cancelFunction = () => {
		keyword === 'Changes' && justExit();
		handleClose();
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
			</Card.Body>
			<ModalFooter>
				<PopupButton
					variant='default'
					onClick={okFunction}
					back={`${MAIN_COLOR}`}
				>
					OK
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
