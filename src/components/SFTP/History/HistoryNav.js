import React, {useCallback, useState} from 'react';
import {
	BsArrowClockwise,
	BsCheck,
	MdFileUpload,
	MdPause,
	MdDelete,
} from 'react-icons/all';
import {PropTypes} from 'prop-types';
import {NavItem} from '../../../styles/sftp';
import {useDispatch} from 'react-redux';
import {commandPutAction, REMOVE_HISTORY} from '../../../reducers/sftp';
import ConfirmPopup from '../../Popup/ConfirmPopup';

const HistoryNav = ({server}) => {
	const dispatch = useDispatch();
	const {uuid, history} = server;
	const [open, setOpen] = useState(false);

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
				dispatch(commandPutAction({...server, uploadFile: value}));
			}
			console.log('end');
		};
		document.body.removeChild(uploadInput);
	};

	const historyDelete = useCallback(() => {
		// if exist highlighting history
		history.length > 0 && setOpen(true);
	}, [server]);

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
				keyword={'delete_history'}
				server={server}
				setOpen={setOpen}
				open={open}
			/>
		</>
	);
};

HistoryNav.propTypes = {
	server: PropTypes.object.isRequired,
};

export default HistoryNav;
