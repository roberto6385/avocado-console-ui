import React, {useState} from 'react';
import {
	BsArrowClockwise,
	BsCheck,
	MdFileUpload,
	MdPause,
	MdDelete,
} from 'react-icons/all';
import {PropTypes} from 'prop-types';
import {useSelector} from 'react-redux';
import ConfirmPopup from '../ConfirmPopup';
import {NavItem} from '../../styles/sftp';
import useSftpCommands from '../../hooks/useSftpCommands';

const HistoryNav = ({index, ws, uuid, serverId}) => {
	console.log(index);
	const {server} = useSelector((state) => state.common);
	const [open, setOpen] = useState(false);
	const {uploadWork} = useSftpCommands({ws, uuid});

	const upload = async () => {
		const data = server.find((item) => item.id === serverId);
		console.log(data);
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = (e) => {
			const files = e.target.files;
			uploadWork(files);
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
				keyword={'delete_history'}
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
	serverId: PropTypes.number.isRequired,
};

export default HistoryNav;
