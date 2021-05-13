import React, {useCallback, useState} from 'react';
import {BsCheck, MdFileUpload, MdPause, MdDelete} from 'react-icons/all';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_HISTORY, commandPutAction} from '../../../reducers/sftp';
import {OPEN_CONFIRM_POPUP} from '../../../reducers/popup';
import {MainHeader} from '../../../styles/cards';
import {IconButton} from '../../../styles/buttons';
import {light_Background} from '../../../styles/global';

const HistoryNav = ({uuid}) => {
	const dispatch = useDispatch();

	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {history_highlight} = corServer;

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
						...corServer,
						file: value,
						keyword: 'put',
					}),
				);
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: value.name,
						size: value.size,
						todo: 'put',
						progress: 0,
					},
				});
			}
			dispatch(commandPutAction({...corServer, keyword: 'pwd'}));
		};
		document.body.removeChild(uploadInput);
	}, [corServer]);

	const historyDelete = useCallback(() => {
		// if exist highlighting history
		history_highlight.length > 0 &&
			dispatch({
				type: OPEN_CONFIRM_POPUP,
				data: {key: 'sftp_delete_history', uuid: uuid},
			});
	}, [corServer, history_highlight]);

	return (
		<MainHeader justify={'flex-end'} back={light_Background}>
			{/*<IconButton>*/}
			{/*	<BsCheck />*/}
			{/*</IconButton>*/}
			<IconButton id='btn-upload' onClick={upload}>
				<MdFileUpload />
			</IconButton>
			{/*<IconButton>*/}
			{/*	<MdPause />*/}
			{/*</IconButton>*/}
			<IconButton className={'history_contents'} onClick={historyDelete}>
				<MdDelete className={'history_contents'} />
			</IconButton>
		</MainHeader>
	);
};

HistoryNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default HistoryNav;
