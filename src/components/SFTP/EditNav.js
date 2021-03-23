import React, {useState} from 'react';

import styled from 'styled-components';
import {MAIN_COLOR} from '../../styles/global';
import {MdCancel, MdFileDownload, MdSave} from 'react-icons/md';
import {SFTP_SAVE_CURRENT_MODE} from '../../reducers/sftp';
import {useDispatch, useSelector} from 'react-redux';
import {PropTypes} from 'prop-types';

import {sendCommandByPut} from './commands/sendCommandPut';
import {sendCommandByLs} from './commands/sendCommandLs';
import ConfirmPopup from '../ConfirmPopup';
import {sendCommandByGet} from './commands/sendCommandGet';

const Navbar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;
const NavItem = styled.button`
	background: transparent;
	border: none;
	font-size: 18px;
	margin: 4px;
	padding: 2px;
	&:hover {
		color: ${MAIN_COLOR};
	}
`;

const EditNav = ({index, ws, uuid}) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const {currentText, currentCompareText, currentPath} = useSelector(
		(state) => state.sftp,
	);
	const curText = currentText.find((item) => item.uuid === uuid);
	const compareText = currentCompareText.find((item) => item.uuid === uuid);
	const curPath = currentPath.find((item) => item.uuid === uuid);
	const path = curPath?.path;

	const editedFileDownload = () => {
		const editFile = new File([curText?.text], curText?.name, {
			type: 'text/plain',
		});
		const a = document.createElement('a');
		document.body.appendChild(a);
		a.setAttribute('style', 'display:none');
		const url = window.URL.createObjectURL(editFile);
		a.href = url;
		a.download = curText?.name;
		a.click();
		window.URL.revokeObjectURL(url);
	};

	const editedFileSave = () => {
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
			.then(() => sendCommandByLs(ws, uuid, curPath?.path, dispatch));
	};

	const toNormalMode = () => {
		if (curText?.text !== compareText?.text) {
			setOpen(true);
		} else {
			dispatch({
				type: SFTP_SAVE_CURRENT_MODE,
				data: {uuid, mode: 'normal'},
			});
		}
	};

	return (
		<Navbar>
			<span style={{fontSize: '14px'}}>
				{`${path === '/' ? path : `${path}/`}${curText?.name}`}
			</span>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<NavItem onClick={editedFileDownload}>
					<MdFileDownload />
				</NavItem>
				<NavItem onClick={editedFileSave}>
					<MdSave />
				</NavItem>
				<NavItem onClick={toNormalMode}>
					<MdCancel />
				</NavItem>
			</div>
			<ConfirmPopup
				keyword={'Changes'}
				open={open}
				setOpen={setOpen}
				ws={ws}
				uuid={uuid}
			/>
		</Navbar>
	);
};

EditNav.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default EditNav;
