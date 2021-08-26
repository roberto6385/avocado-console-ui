import React, {useCallback} from 'react';
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
	const {sftp} = useSelector(sftpSelector.all);

	const onClickUploadFile = useCallback(async () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const {path, upload} = sftp.find((v) => v.uuid === uuid);
			const files = e.target.files;
			for await (let v of files) {
				dispatch(
					sftpAction.addList({
						uuid: uuid,
						type: types.upload,
						value: {path: path, file: v},
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
			if (!upload.on) {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						type: types.upload,
					}),
				);
			}
		};
		document.body.removeChild(uploadInput);
	}, [sftp, uuid, dispatch]);

	const handlePauseStateControl = useCallback(() => {
		const {pause} = sftp.find((v) => v.uuid === uuid);

		const typeSlice = [types.upload, types.download, types.delete];
		dispatch(sftpAction.setPause({uuid: uuid}));
		// memo 잔여 데이터 저장시간동안 block
		if (pause.state) {
			//memo : 정지상태
			for (let v of typeSlice) {
				if (![v].on && [v].list.length !== 0) {
					dispatch(
						sftpAction.createSocket({
							uuid: uuid,
							type: types[v],
						}),
					);
				}
			}
		} else {
			//memo : 가동상태
			for (let v of typeSlice) {
				if ([v].on) {
					dispatch(
						sftpAction.deleteSocket({
							socket: [v].socket,
							uuid: uuid,
							type: types[v],
						}),
					);
				}
			}
		}
	}, [dispatch, sftp, uuid]);

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
					{sftp.find((v) => v.uuid === uuid).pause.state
						? playIcon
						: pauseIcon}
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
