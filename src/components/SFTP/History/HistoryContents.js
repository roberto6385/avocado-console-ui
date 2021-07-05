import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import Dropzone from '../Dropzone';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {formatByteSizeString} from '../listConversion';
import styled from 'styled-components';
import {
	arrowCircleDownIcon,
	arrowCircleUpIcon,
	buildCircleIcon,
	deleteIcon,
	fileUploadIcon,
	pauseCircleIcon,
	removeCircleIcon,
} from '../../../icons/icons';
import {HEIGHT_48, HEIGHT_132} from '../../../styles/length';
import {
	activeColor,
	borderColor,
	historyDeleteColor,
	historyDownloadColor,
	fontColor,
	highColor,
	historyEditColor,
	iconColor,
	historyPauseColor,
	tabColor,
	historyUploadColor,
} from '../../../styles/color';

import {
	ADD_HISTORY_HI,
	INITIAL_HISTORY_HI,
	REMOVE_HISTORY,
} from '../../../reducers/sftp/history';
import {createNewWebsocket, PUSH_WRITE_LIST} from '../../../reducers/sftp/crud';

import {PreventDragCopy} from '../../../styles/function';
import {
	ClickableIconButton,
	IconBox,
	PrimaryGreenButton,
} from '../../../styles/button';

const DropSpaceDiv = styled.div`
	height: ${HEIGHT_132};
	margin: 8px;
	border: 1px dashed;
	border-color: ${(props) => props.bcolor};
	background: ${(props) => props.back};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const _Ul = styled.ul`
	${PreventDragCopy}
	width:${(props) => props.width};
	list-style: none;
	margin: 0px;
	padding: 0px;
	outline: none;
	position: relative;
`;

const _Li = styled.li`
	line-height: 0;
	position: relative;
	height: ${HEIGHT_48};
	// padding: 16px;
	display: flex;
	align-items: center;
	background: ${(props) =>
		props.clicked
			? highColor[props.theme_value]
			: tabColor[props.theme_value]};
	white-space: nowrap;
	border-bottom: 1px solid;
	border-color: ${(props) => borderColor[props.theme_value]};
`;

const DropSpace_Button = styled(PrimaryGreenButton)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 160px;
	margin: 16px 40px 30px 40px;
`;

const HistoryText = styled.div`
	flex: 1;
	line-height: 1.43;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-right: 6px;
	color: ${(props) =>
		props.progress ? historyPauseColor : fontColor[props.theme_value]};
`;

const Progress = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
`;

const Bar = styled.div`
	width: ${(props) => props?.width || '0%'};
	height: 2px;
	background: ${(props) => props.back};
`;

const _AnnounceText = styled.div`
	color: ${(props) => iconColor[props.theme_value]};
	padding: 32px 30px 12px 30px;
	line-height: 1.43;
	letter-spacing: 0.25px;
`;

const _BrowseButtonText = styled.div`
	font-size: 13px;
	letter-spacing: 0.13px;
`;

const _HistorySizeText = styled.span`
	color: ${(props) => fontColor[props.theme_value]};
	font-size: 12px;
	letter-spacing: 0.25px;
	line-height: 1.67;
`;

const HistoryContents = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('historyContents');
	const {userTicket} = useSelector((state) => state.userTicket);
	const {sftp} = useSelector((state) => state.sftp);

	const historyState = useSelector((state) => state.history.historyState);
	const {theme, server, tab, identity} = useSelector((state) => state.common);
	const corTab = useMemo(() => tab.find((it) => it.uuid === uuid), [
		tab,
		uuid,
	]);
	const corSftpInfo = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
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
	const {history, history_highlight} = corHistoryInfo;

	const openUpload = useCallback(async () => {
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
	}, [userTicket, corServer, correspondedIdentity]);

	const upload = useCallback(
		async (files) => {
			const array = [];
			for await (let value of files) {
				array.push({path, file: value, todo: 'write'});
				console.log(value);
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
		},
		[userTicket, corServer, correspondedIdentity],
	);

	const selectItem = useCallback(
		(selectValue, index) => (e) => {
			e.stopPropagation();
			console.log(selectValue, index);
			const prev_history = history.slice();
			const prev_history_hi = history_highlight.slice();
			if (e.metaKey) {
				if (prev_history_hi.find((item) => item === selectValue)) {
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {
							uuid,
							history: prev_history_hi.filter(
								(item) => item !== selectValue,
							),
						},
					});
				} else {
					prev_history_hi.push(selectValue);
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {uuid, history: prev_history_hi},
					});
				}
			} else if (e.shiftKey) {
				if (prev_history_hi.length === 0) {
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {
							uuid,
							history: [selectValue],
						},
					});
				} else {
					compareNumber(
						prev_history.findIndex(
							(item) => item === prev_history_hi[0],
						),
						index,
					);
				}
			} else {
				dispatch({
					type: ADD_HISTORY_HI,
					payload: {
						uuid,
						history: [selectValue],
					},
				});
			}
		},
		[dispatch, history, history_highlight],
	);

	const compareNumber = (first, second) => {
		console.log(first, second);
		dispatch({type: INITIAL_HISTORY_HI, payload: {uuid}});

		let list = [];
		if (first <= second) {
			for (let i = first; i <= second; i++) {
				list.push(history[i]);
			}
		} else {
			for (let i = first; i >= second; i--) {
				list.push(history[i]);
			}
		}
		dispatch({
			type: ADD_HISTORY_HI,
			payload: {
				uuid,
				history: list,
			},
		});
	};

	const removeHistory = useCallback(
		(history) => () => {
			dispatch({type: REMOVE_HISTORY, payload: {uuid, history}});
		},
		[dispatch],
	);

	// const {show} = useContextMenu({
	// 	id: uuid + 'history',
	// });

	// const contextMenuOpen = useCallback((e, history) => {
	// 	show(e);
	// }, []);

	return (
		<Dropzone onDrop={(files) => upload(files)}>
			{history.length === 0 ? (
				<DropSpaceDiv back={tabColor[theme]} bcolor={iconColor[theme]}>
					<_AnnounceText theme_value={theme}>
						{t('paragraph')}
					</_AnnounceText>
					<DropSpace_Button theme_value={theme} onClick={openUpload}>
						<IconBox
							size='sm'
							margin_right={'8px'}
							color={theme === 0 ? 'white' : 'black'}
						>
							{fileUploadIcon}
						</IconBox>
						<_BrowseButtonText>{t('browse')}</_BrowseButtonText>
					</DropSpace_Button>
				</DropSpaceDiv>
			) : (
				<_Ul>
					{history.map((history, index) => {
						return (
							<_Li
								className={'history_contents'}
								key={history.HISTORY_ID}
								onClick={selectItem(history, index)}
								theme_value={theme}
								borderWidth={`${history.progress}%`}
								clicked={
									history_highlight.find(
										(item) => item === history,
									)
										? 1
										: 0
								}
							>
								<ClickableIconButton
									size='20px'
									margin={'10px'}
									color={
										history.progress !== 100
											? historyPauseColor
											: history.todo === 'write'
											? historyUploadColor
											: history.todo === 'read'
											? historyDownloadColor
											: history.todo === 'edit'
											? historyEditColor
											: history.todo === 'rm' &&
											  historyDeleteColor
									}
								>
									{history.progress !== 100
										? pauseCircleIcon
										: history.todo === 'write'
										? arrowCircleUpIcon
										: history.todo === 'read'
										? arrowCircleDownIcon
										: history.todo === 'edit'
										? buildCircleIcon
										: history.todo === 'rm' &&
										  removeCircleIcon}
								</ClickableIconButton>
								<HistoryText
									className={'history_contents'}
									flex={1}
									progress={history.progress !== 100 ? 1 : 0}
									theme_value={theme}
								>
									{history.name}
								</HistoryText>
								<_HistorySizeText
									theme_value={theme}
									className={'history_contents'}
								>
									{formatByteSizeString(history.size)}
								</_HistorySizeText>
								<ClickableIconButton
									size={'20px'}
									onClick={removeHistory(history)}
									className={'history_contents'}
									margin={'10px'}
									theme_value={theme}
								>
									{deleteIcon}
								</ClickableIconButton>

								{history.progress !== 100 && (
									<Progress>
										<Bar
											back={activeColor[theme]}
											width={`${history.progress}%`}
										/>
									</Progress>
								)}
							</_Li>
						);
					})}
				</_Ul>
			)}
			{/*<HistoryContextMenu*/}
			{/*	uuid={uuid}*/}
			{/*	// highlight={highlight}*/}
			{/*	// setHighlight={setHighlight}*/}
			{/*/>*/}
		</Dropzone>
	);
};
HistoryContents.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default HistoryContents;
