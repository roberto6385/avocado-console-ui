import React, {useState} from 'react';
import styled from 'styled-components';
import {
	BsArrowClockwise,
	BsCheck,
	MdFileUpload,
	MdPause,
	MdDelete,
} from 'react-icons/all';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {sendCommandByPut} from './commands/sendCommandPut';
import {sendCommandByLs} from './commands/sendCommandLs';
import {SFTP_DELETE_HISTORY} from '../../reducers/sftp';
import ConfirmPopup from '../ConfirmPopup';
import {NavItem} from '../../styles/sftp';

const HistoryNav = ({index, ws, uuid}) => {
	const {currentPath} = useSelector((state) => state.sftp);
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const upload = () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const File = e.target.files;
			for await (const key of Object.keys(File)) {
				await sendCommandByPut(
					'put',
					File[key],
					ws,
					uuid,
					pathItem?.path,
					File[key].name,
					dispatch,
				);
			}
			sendCommandByLs(ws, uuid, pathItem?.path, dispatch);
		};
		document.body.removeChild(uploadInput);
	};

	const historyDelete = () => {
		// if exist highlighting history
		setOpen(true);
	};

	return (
		<>
			<NavItem>
				<BsArrowClockwise />
			</NavItem>
			<NavItem>
				<BsCheck />
			</NavItem>
			<NavItem id='btn-upload' onClick={upload}>
				<MdFileUpload />
			</NavItem>
			<NavItem>
				<MdPause />
			</NavItem>
			<NavItem onClick={historyDelete}>
				<MdDelete />
			</NavItem>
			<ConfirmPopup
				keyword={'Delete History'}
				open={open}
				setOpen={setOpen}
				ws={ws}
				uuid={uuid}
			/>
		</>
	);
};

HistoryNav.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default HistoryNav;
