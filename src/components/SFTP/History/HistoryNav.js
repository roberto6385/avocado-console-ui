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
import {ADD_HISTORY, commandPutAction} from '../../../reducers/sftp';
import ConfirmPopup from '../../Popup/ConfirmPopup';
import {OPEN_CONFIRM_POPUP} from '../../../reducers/popup';

const HistoryNav = ({server}) => {
	const dispatch = useDispatch();
	const {history} = server;

	const upload = useCallback(async () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const files = e.target.files;
			for await (let value of files) {
				dispatch(
					commandPutAction({
						...server,
						file: value,
						keyword: 'put',
					}),
				);
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: server.uuid,
						name: value.name,
						size: value.size,
						todo: 'put',
						progress: 0,
					},
				});
			}
			dispatch(commandPutAction({...server, keyword: 'pwd'}));
		};
		document.body.removeChild(uploadInput);
	}, [server]);

	const historyDelete = useCallback(() => {
		// if exist highlighting history
		history.length > 0 &&
			dispatch({
				type: OPEN_CONFIRM_POPUP,
				data: {key: 'sftp_delete_history', uuid: server.uuid},
			});
	}, [server, history]);

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
