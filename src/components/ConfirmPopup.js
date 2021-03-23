import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Button, Card, Form, Modal} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';
import * as PropTypes from 'prop-types';
import {sendCommandByRm} from './SFTP/commands/sendCommandRm';
import {sendCommandByLs} from './SFTP/commands/sendCommandLs';
import {SFTP_SAVE_CURRENT_HIGHLIGHT} from '../reducers/sftp';
import {useDispatch, useSelector} from 'react-redux';
import {sendCommandByRename} from './SFTP/commands/sendCommandRename';
import {sendCommandByMkdir} from './SFTP/commands/sendCommandMkdir';

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

const ConfirmPopup = ({keyword = 'test', open, setOpen, ws, uuid}) => {
	const {currentPath, currentHighlight} = useSelector((state) => state.sftp);
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const highlightItem = currentHighlight.find((item) => item.uuid === uuid);
	const dispatch = useDispatch();
	const [formValue, setFormValue] = useState('');
	const inputRef = useRef(null);
	const formKeywords = ['Rename', 'New Folder'];

	console.log(highlightItem?.list);
	const contextDelete = async () => {
		for await (const key of highlightItem?.list) {
			await sendCommandByRm(
				ws,
				uuid,
				pathItem?.path + '/' + key.fileName,
				key.fileType,
			);
			dispatch({
				type: SFTP_SAVE_CURRENT_HIGHLIGHT,
				data: {uuid, list: []},
			});
		}
		sendCommandByLs(ws, uuid, pathItem?.path, dispatch);
	};

	const contextRename = async () => {
		const path = pathItem?.path === '/' ? '/' : pathItem?.path + '/';
		await sendCommandByRename(
			ws,
			uuid,
			path + highlightItem?.list[0].fileName,
			path + formValue,
		);
		dispatch({
			type: SFTP_SAVE_CURRENT_HIGHLIGHT,
			data: {uuid, list: []},
		});
	};

	const contextNewFolder = async () => {
		const path = pathItem?.path === '/' ? '/' : pathItem?.path + '/';
		await sendCommandByMkdir(ws, uuid, path + formValue);
		dispatch({
			type: SFTP_SAVE_CURRENT_HIGHLIGHT,
			data: {uuid, list: []},
		});
		sendCommandByLs(ws, uuid, pathItem?.path, dispatch);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const okFunction = () => {
		keyword === 'Delete' && contextDelete();
		keyword === 'Rename' && contextRename();
		keyword === 'New Folder' && contextNewFolder();
		handleClose();
	};
	const cancelFunction = () => {};

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
