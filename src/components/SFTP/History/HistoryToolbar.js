import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
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
	const {t} = useTranslation('historyNav');

	const {
		history: sftpHistory,
		path: sftpPath,
		upload: sftpUpload,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {userData} = useSelector(authSelector.all);
	const {server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
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

			for await (let value of files) {
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: value.name,
						size: value.size,
						todo: 'write',
						progress: 0,
						path: sftpPath.find((it) => it.uuid === uuid),
						file: value,
					},
				});
			}

			const {writeSocket, writeList} = sftpUpload.find(
				(it) => it.uuid === uuid,
			);

			if (!writeSocket && writeList.length === 0) {
				const terminalTab = () =>
					terminalTabs.find((it) => it.uuid === uuid);

				const resource = server.find(
					(it) => it.key === terminalTab.server.key,
				);
				const account = identity.find(
					(it) =>
						it.key === terminalTab.server.key &&
						it.checked === true,
				);

				dispatch({
					type: CREATE_NEW_WEBSOCKET_REQUEST,
					payload: {
						token: userData.access_token, // connection info
						host: resource.host,
						port: resource.port,
						user: account.user,
						password: account.password,
						todo: 'write',
						uuid: uuid,
					},
				});
			}
		};
		document.body.removeChild(uploadInput);
	}, [
		sftpUpload,
		dispatch,
		uuid,
		sftpPath,
		server,
		identity,
		userData.access_token,
		terminalTabs,
	]);

	const onClickDeleteHistory = useCallback(() => {
		if (sftpHistory.find((it) => it.uuid === uuid).length === 0) {
			// TODO: 전체삭제 처리가 필요하다면 이곳에서 구현
		} else {
			dispatch(
				dialogBoxAction.openAlert({
					key: 'sftp-delete-history',
					uuid: uuid,
				}),
			);
		}
	}, [sftpHistory, uuid, dispatch]);

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
