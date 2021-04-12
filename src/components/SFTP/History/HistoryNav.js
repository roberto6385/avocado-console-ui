import React, {useCallback} from 'react';
import {
	BsArrowClockwise,
	BsCheck,
	MdFileUpload,
	MdPause,
	MdDelete,
} from 'react-icons/all';
import {PropTypes} from 'prop-types';
import {NavItem} from '../../../styles/sftp';
import useSftpCommands from '../../../hooks/useSftpCommands';
import {OPEN_CONFIRM_POPUP} from '../../../reducers/popup';
import {useDispatch} from 'react-redux';

const HistoryNav = ({ws, uuid}) => {
	const {uploadWork, initialWork} = useSftpCommands({ws, uuid});
	const dispatch = useDispatch();

	const upload = async () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = (e) => {
			const files = e.target.files;
			uploadWork(files).then(() => initialWork());
		};
		document.body.removeChild(uploadInput);
	};

	const historyDelete = useCallback(() => {
		// if exist highlighting history
		dispatch({
			type: OPEN_CONFIRM_POPUP,
			data: {key: 'sftp_delete_history'},
		});
	}, []);

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
		</>
	);
};

HistoryNav.propTypes = {
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default HistoryNav;
