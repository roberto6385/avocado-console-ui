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
import {commandPutAction} from '../../../reducers/sftp';

const HistoryNav = ({server}) => {
	const dispatch = useDispatch();

	const upload = async () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const files = e.target.files;
			for await (let value of files) {
				dispatch(commandPutAction({...server, item: value}));
			}
			console.log('end');
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
	server: PropTypes.object.isRequired,
};

export default HistoryNav;
