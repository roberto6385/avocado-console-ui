import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import Dropzone from '../Dropzone';
import {useDispatch, useSelector} from 'react-redux';
import {
	ADD_HISTORY_HI,
	INITIAL_HISTORY_HI,
	REMOVE_HISTORY,
	PUSH_WRITE_LIST,
	createNewWebsocket,
} from '../../../reducers/sftp';
import {useTranslation} from 'react-i18next';
import {formatByteSizeString} from '../listConversion';
import {
	Span,
	IconButton,
	PreventDragCopy,
	IconContainer,
} from '../../../styles/global';
import styled from 'styled-components';
import {
	arrowCircleDownIconSmall,
	arrowCircleUpIconSmall,
	buildCircleIconSmall,
	deleteIconMidium,
	fileUploadIcon,
	pauseCircleIconSmall,
	removeCircleIconSmall,
} from '../../../icons/icons';
import {
	HEIGHT_48,
	FONT_12,
	HEIGHT_132,
	WIDTH_160,
	HEIGHT_34,
	WIDTH_134,
} from '../../../styles/length';
import {
	activeColor,
	borderColor,
	historyDeleteColor,
	historyDownloadColor,
	fontColor,
	GRAY_ICON_ACTIVE,
	highColor,
	historyEditColor,
	iconColor,
	historyPauseColor,
	tabColor,
	historyUploadColor,
	L_BORDER,
} from '../../../styles/color';

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
	// overflow-y: scroll;
	margin: 0px;
	padding: 0px;
	outline: none;
	position: relative;
`;

const _Li = styled.li`
	line-height: 0;
	position: relative;
	height: ${HEIGHT_48};
	padding: 4px;
	display: flex;
	align-items: center;
	background: ${(props) => props.back};
	white-space: nowrap;
	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
`;

const DropSpace_Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${WIDTH_160};
	height: ${HEIGHT_34};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
	border-radius: 4px;
	border: none;
	margin: 16px 40px 30px 40px;
`;

const ItemName_Span = styled(Span)`
	width: ${WIDTH_134};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: initial;
	padding: 6px;
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

const HistoryContents = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('historyContents');
	const {userTicket} = useSelector((state) => state.userTicket);
	const {sftp} = useSelector((state) => state.sftp);
	const {theme, server, tab, identity} = useSelector((state) => state.common);
	const corTab = useMemo(() => tab.find((it) => it.uuid === uuid), [
		tab,
		uuid,
	]);
	const corSftpServer = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
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

	const {history, history_highlight, path} = corSftpServer;

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
					}),
				);
			}

			dispatch({
				type: PUSH_WRITE_LIST,
				payload: {uuid, array},
			});
		};
		document.body.removeChild(uploadInput);
	}, [corSftpServer, userTicket, corServer, correspondedIdentity]);

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
					}),
				);
			}

			dispatch({
				type: PUSH_WRITE_LIST,
				payload: {uuid, array},
			});
		},
		[corSftpServer, userTicket, corServer, correspondedIdentity],
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
					<Span
						color={iconColor[theme]}
						padding={'32px 30px 12px 30px'}
					>
						{t('paragraph')}
					</Span>
					<DropSpace_Button
						back={activeColor[theme]}
						color={theme === 0 ? 'white' : 'black'}
						onClick={openUpload}
					>
						{fileUploadIcon(theme === 0 ? 'white' : 'black')}
						<Span>{t('browse')}</Span>
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
								back={
									history_highlight.find(
										(item) => item === history,
									)
										? highColor[theme]
										: tabColor[theme]
								}
								bcolor={borderColor[theme]}
								borderWidth={`${history.progress}%`}
							>
								<IconContainer
									// 나중에 split pane 만들면 반응형으로!
									padding={'0px 0px 0px 12px'}
									className={'history_contents'}
									// color={
									// 	history.progress !== 100
									// 		? LIGHT_MODE_ICON_COLOR
									// 		: LIGHT_MODE_MINT_COLOR
									// }
								>
									{history.progress !== 100 ? (
										<IconContainer
											color={historyPauseColor}
										>
											{pauseCircleIconSmall}
										</IconContainer>
									) : history.todo === 'write' ? (
										<IconContainer
											color={historyUploadColor}
										>
											{arrowCircleUpIconSmall}
										</IconContainer>
									) : history.todo === 'read' ? (
										<IconContainer
											color={historyDownloadColor}
										>
											{arrowCircleDownIconSmall}
										</IconContainer>
									) : history.todo === 'edit' ? (
										<IconContainer color={historyEditColor}>
											{buildCircleIconSmall}
										</IconContainer>
									) : (
										history.todo === 'rm' && (
											<IconContainer
												color={historyDeleteColor}
											>
												{removeCircleIconSmall}
											</IconContainer>
										)
									)}
								</IconContainer>
								<ItemName_Span
									className={'history_contents'}
									flex={1}
									color={
										history.progress !== 100
											? historyPauseColor
											: fontColor[theme]
									}
								>
									{history.name}
								</ItemName_Span>
								<Span
									color={fontColor[theme]}
									size={FONT_12}
									className={'history_contents'}
								>
									{formatByteSizeString(history.size)}
								</Span>
								<IconButton
									onClick={removeHistory(history)}
									className={'history_contents'}
									padding={'0px 16px 0px 6px'}
									color={
										history_highlight.find(
											(item) => item === history,
										)
											? GRAY_ICON_ACTIVE
											: iconColor[theme]
									}
								>
									{deleteIconMidium}
								</IconButton>

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
