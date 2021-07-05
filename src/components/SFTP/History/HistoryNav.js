import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {OPEN_WARNING_ALERT_POPUP} from '../../../reducers/popup';
import styled from 'styled-components';

import {deleteIcon, fileUploadIcon} from '../../../icons/icons';
import {HEIGHT_50} from '../../../styles/length';
import {createNewWebsocket, PUSH_WRITE_LIST} from '../../../reducers/sftp/crud';
import {borderColor, fontColor, tabColor} from '../../../styles/color';
import {ClickableIconButton} from '../../../styles/button';

const _Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 16px;
	height: ${HEIGHT_50};
	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
	background: ${(props) => props.back};
`;

const _Title = styled.div`
	color: ${(props) => fontColor[props.theme_value]};
`;

const HistoryNav = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('historyNav');
	const {sftp} = useSelector((state) => state.sftp);
	const historyState = useSelector((state) => state.history.historyState);
	const {userTicket} = useSelector((state) => state.userTicket);
	const {theme, tab, server, identity} = useSelector((state) => state.common);
	const corTab = useMemo(
		() => tab.find((it) => it.uuid === uuid),
		[tab, uuid],
	);
	const corSftpInfo = useMemo(
		() => sftp.find((it) => it.uuid === uuid),
		[sftp, uuid],
	);

	const corHistoryInfo = useMemo(
		() => historyState.find((it) => it.uuid === uuid),
		[historyState, uuid],
	);
	const corServer = useMemo(
		() => server.find((it) => it.key === corTab.server.key),
		[corTab],
	);
	const correspondedIdentity = useMemo(
		() =>
			identity.find(
				(it) => it.key === corTab.server.key && it.checked === true,
			),
		[identity, corTab],
	);

	const {path} = corSftpInfo;
	const {history_highlight} = corHistoryInfo;

	const upload = useCallback(async () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const files = e.target.files;

			const array = [];
			for await (let value of files) {
				array.push({path, file: value, todo: 'write'});
				console.log({
					token: userTicket.access_token, // connection info
					host: corServer.host,
					port: corServer.port,
					user: correspondedIdentity.user,
					password: correspondedIdentity.password,
				});
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
			dispatch({
				type: PUSH_WRITE_LIST,
				payload: {uuid, array},
			});
		};
		document.body.removeChild(uploadInput);
	}, [corSftpInfo]);

	const historyDelete = useCallback(() => {
		if (history_highlight.length === 0) {
			//
		} else {
			dispatch({
				type: OPEN_WARNING_ALERT_POPUP,
				data: {key: 'sftp_delete_history', uuid: uuid},
			});
		}
	}, [history_highlight, uuid, dispatch]);

	return (
		<_Container back={tabColor[theme]} bcolor={borderColor[theme]}>
			<_Title theme_value={theme}>{t('title')}</_Title>
			<div>
				<ClickableIconButton
					theme_value={theme}
					margin={'10px'}
					onClick={upload}
				>
					{fileUploadIcon}
				</ClickableIconButton>
				<ClickableIconButton
					theme_value={theme}
					margin={'0px'}
					className={'history_contents'}
					onClick={historyDelete}
				>
					{deleteIcon}
				</ClickableIconButton>
			</div>
		</_Container>
	);
};

HistoryNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default HistoryNav;
