import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {
	deleteIcon,
	fileUploadIcon,
	pauseIcon,
	playIcon,
} from '../../../icons/icons';
import {HoverButton} from '../../../styles/components/icon';
import {tabBarSelector} from '../../../reducers/tabBar';
import {sftpAction, sftpSelector, types} from '../../../reducers/renewal';

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
			const terminalTab = terminalTabs.find((it) => it.uuid === uuid);
			for await (let v of files) {
				dispatch(
					sftpAction.addList({
						uuid: uuid,
						type: types.upload,
						value: {path: sftp.path, file: v},
					}),
				);
				dispatch(
					sftpAction.addHistory({
						uuid: uuid,
						history: {
							name: v.name,
							size: v.size,
							type: types.upload,
						},
					}),
				);
			}
			if (!sftp.upload.on) {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						key: terminalTab.server.key,
						type: types.upload,
					}),
				);
			}
		};
		document.body.removeChild(uploadInput);
	}, [dispatch, sftp.path, sftp.upload.on, terminalTabs, uuid]);

	const handlePauseStateControl = useCallback(() => {
		const typeSlice = [types.upload, types.download, types.delete];
		const terminalTab = terminalTabs.find((it) => it.uuid === uuid);

		dispatch(sftpAction.setPause({uuid: uuid}));
		// memo 잔여 데이터 저장시간동안 block
		if (sftp.pause.state) {
			//memo : 정지상태
			typeSlice.forEach((v) => {
				if (!sftp[v].socket && sftp[v].list.length !== 0) {
					dispatch(
						sftpAction.createSocketAll({
							uuid: uuid,
							type: types[v],
							key: terminalTab.server.key,
						}),
					);
				}
			});
		} else {
			//memo : 가동상태
			typeSlice.forEach((v) => {
				if (sftp[v].socket) {
					dispatch(
						sftpAction.deleteSocket({
							socket: sftp[v].socket,
							uuid: uuid,
							type: types[v],
						}),
					);
				}
			});
		}
	}, [dispatch, sftp, terminalTabs, uuid]);

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
				<HoverButton margin={'0px'} onClick={handlePauseStateControl}>
					{sftp.pause.state ? playIcon : pauseIcon}
				</HoverButton>
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
