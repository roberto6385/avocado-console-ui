import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {deleteIcon, fileUploadIcon} from '../../../icons/icons';
import {
	ADD_HISTORY,
	CREATE_NEW_WEBSOCKET_REQUEST,
} from '../../../reducers/sftp';
import {HoverButton} from '../../../styles/components/icon';
import {authSelector} from '../../../reducers/api/auth';
import {dialogBoxAction} from '../../../reducers/dialogBoxs';
import {tabBarSelector} from '../../../reducers/tabBar';
import {remoteResourceSelector} from '../../../reducers/remoteResource';
import {sftpAction, sftpSelector} from '../../../reducers/renewal';
import {put, take} from 'redux-saga/effects';

const _Container = styled.div`
	min-width: 256px;
	width: 256px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 16px;
	height: 50px;
	border-left: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.border.color};
`;

const _ButtonContainer = styled.div`
	display: flex;
	align-items: center;
`;

const HistoryToolbar = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('historyToolbar');
	const {data} = useSelector(sftpSelector.all);
	const sftp = useMemo(() => data.find((v) => v.uuid === uuid), [data, uuid]);
	const {terminalTabs} = useSelector(tabBarSelector.all);

	const onClickUploadFile = useCallback(async () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const files = e.target.files;
			console.log(files);
			const terminalTab = terminalTabs.find((it) => it.uuid === uuid);
			if (sftp.upload.socket) {
				for (let v of files) {
					dispatch(
						sftpAction.commandWrite({
							socket: sftp.upload.socket,
							uuid: uuid,
							path: sftp.path,
							file: v,
						}),
					);
				}
			} else {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						key: terminalTab.server.key,
						selected: files,
						path: sftp.path,
						type: 'upload',
					}),
				);
			}

			// for await (let value of files) {
			// 	dispatch({
			// 		type: ADD_HISTORY,
			// 		payload: {
			// 			uuid: uuid,
			// 			name: value.name,
			// 			size: value.size,
			// 			todo: 'write',
			// 			progress: 0,
			// 			path: sftpPath.find((it) => it.uuid === uuid),
			// 			file: value,
			// 		},
			// 	});
			// }

			// const {writeSocket, writeList} = sftpUpload.find(
			// 	(it) => it.uuid === uuid,
			// );
			// if (!writeSocket && writeList.length === 0) {
			//
			// 	const resource = resources.find(
			// 		(it) => it.key === terminalTab.server.key,
			// 	);
			// 	const account = accounts.find(
			// 		(it) =>
			// 			it.key === terminalTab.server.key &&
			// 			it.checked === true,
			// 	);
			//
			// 	dispatch({
			// 		type: CREATE_NEW_WEBSOCKET_REQUEST,
			// 		payload: {
			// 			token: userData.access_token, // connection info
			// 			host: resource.host,
			// 			port: resource.port,
			// 			user: account.user,
			// 			password: account.password,
			// 			todo: 'write',
			// 			uuid: uuid,
			// 		},
			// 	});
			// }
		};
		document.body.removeChild(uploadInput);
	}, [dispatch, sftp.path, sftp.upload.socket, terminalTabs, uuid]);

	const onClickDeleteHistory = useCallback(() => {
		// if (sftpHistory.find((it) => it.uuid === uuid).length === 0) {
		// 	TODO: 전체삭제 처리가 필요하다면 이곳에서 구현
		// } else {
		// 	dispatch(
		// 		dialogBoxAction.openAlert({
		// 			key: 'sftp-delete-history',
		// 			uuid: uuid,
		// 		}),
		// 	);
		// }
	}, []);

	return (
		<_Container>
			<div>{t('title')}</div>
			<_ButtonContainer>
				<HoverButton margin={'10px'} onClick={onClickUploadFile}>
					{fileUploadIcon}
				</HoverButton>
				<HoverButton
					margin={'0px'}
					className={'history-content'}
					onClick={onClickDeleteHistory}
				>
					{deleteIcon}
				</HoverButton>
			</_ButtonContainer>
		</_Container>
	);
};

HistoryToolbar.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default HistoryToolbar;
