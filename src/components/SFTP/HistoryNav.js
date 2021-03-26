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
import {SFTP_DELETE_HISTORY, SFTP_SAVE_CURRENT_LIST} from '../../reducers/sftp';
import ConfirmPopup from '../ConfirmPopup';
import {NavItem} from '../../styles/sftp';
import usePostMessage from './hooks/usePostMessage';
import {listConversion} from './commands';

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
		uploadInput.onchange = (e) => {
			const File = e.target.files;
			usePostMessage({
				keyword: 'CommandByPwd',
				ws,
				uuid,
			}).then(async (response) => {
				for await (const key of Object.keys(File)) {
					await usePostMessage({
						keyword: 'CommandByPut',
						ws,
						uuid,
						path: response.result,
						fileName: File[key].name,
						uploadFile: File[key],
					});
				}
				usePostMessage({
					keyword: 'CommandByLs',
					ws,
					uuid,
					path: response.result,
				})
					.then((response) => listConversion(response.result))
					.then((response) =>
						dispatch({
							type: SFTP_SAVE_CURRENT_LIST,
							data: {uuid, list: response},
						}),
					);
			});
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
