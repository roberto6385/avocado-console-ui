import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {OPEN_WARNING_ALERT_POPUP} from '../../../reducers/popup';
import styled from 'styled-components';

import {deleteIcon, fileUploadIcon} from '../../../icons/icons';
import {ADD_HISTORY, createNewWebsocket} from '../../../reducers/sftp';
import {HoverButton} from '../../../styles/components/icon';

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

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
`;

const HistoryToolbar = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('historyNav');
	const {
		history: sftp_historyState,
		path: sftp_pathState,
		upload: sftp_uploadState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const {tab, server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const corTab = useMemo(
		() => tab.find((it) => it.uuid === uuid),
		[tab, uuid],
	);

	const corServer = useMemo(
		() => server.find((it) => it.key === corTab.server.key),
		[corTab.server.key, server],
	);
	const {history_highlight} = useMemo(
		() => sftp_historyState.find((it) => it.uuid === uuid),
		[sftp_historyState, uuid],
	);
	const correspondedIdentity = useMemo(
		() =>
			identity.find(
				(it) => it.key === corTab.server.key && it.checked === true,
			),
		[identity, corTab],
	);

	const {path} = useMemo(
		() => sftp_pathState.find((it) => it.uuid === uuid),
		[sftp_pathState, uuid],
	);
	const {writeSocket, writeList} = useMemo(
		() => sftp_uploadState.find((it) => it.uuid === uuid),
		[sftp_uploadState, uuid],
	);

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
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: value.name,
						size: value.size,
						todo: 'write',
						progress: 0,
						path: path,
						file: value,
					},
				});
			}
			if (!writeSocket && writeList.length === 0) {
				dispatch(
					createNewWebsocket({
						token: userTicket.access_token, // connection info
						host: corServer.host,
						port: corServer.port,
						user: correspondedIdentity.user,
						password: correspondedIdentity.password,
						todo: 'write',
						uuid: uuid,
					}),
				);
			}
		};
		document.body.removeChild(uploadInput);
	}, [
		writeList,
		writeSocket,
		dispatch,
		uuid,
		path,
		userTicket,
		corServer,
		correspondedIdentity,
	]);

	const historyDelete = useCallback(() => {
		if (history_highlight.length === 0) {
			// TODO 전체삭제 처리가 필요하다면 이곳에서 구현
		} else {
			dispatch({
				type: OPEN_WARNING_ALERT_POPUP,
				data: {key: 'sftp_delete_history', uuid: uuid},
			});
		}
	}, [history_highlight, uuid, dispatch]);

	return (
		<_Container>
			<div>{t('title')}</div>
			<ButtonContainer>
				<HoverButton margin={'10px'} onClick={upload}>
					{fileUploadIcon}
				</HoverButton>
				<HoverButton
					margin={'0px'}
					className={'history_contents'}
					onClick={historyDelete}
				>
					{deleteIcon}
				</HoverButton>
			</ButtonContainer>
		</_Container>
	);
};

HistoryToolbar.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default HistoryToolbar;
