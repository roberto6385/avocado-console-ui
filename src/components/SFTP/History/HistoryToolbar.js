import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {deleteIcon, fileUploadIcon} from '../../../icons/icons';
import {HoverButton} from '../../../styles/components/icon';
import {tabBarSelector} from '../../../reducers/tabBar';
import {sftpAction, sftpSelector} from '../../../reducers/renewal';

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
			for (let v of files) {
				dispatch(
					sftpAction.addList({
						uuid: uuid,
						type: 'upload',
						value: {path: sftp.path, file: v},
					}),
				);
			}
			if (!sftp.upload.on) {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						key: terminalTab.server.key,
						type: 'upload',
					}),
				);
			}
		};
		document.body.removeChild(uploadInput);
	}, [dispatch, sftp.path, sftp.upload.on, terminalTabs, uuid]);

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
