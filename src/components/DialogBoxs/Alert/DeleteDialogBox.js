import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';
import {cancelFillIcon, closeIcon} from '../../../icons/icons';
import {
	TransparentButton,
	WarningButton,
} from '../../../styles/components/button';
import {INIT_DELETE_WORK_LIST} from '../../../reducers/sftp';
import {Icon, IconButton} from '../../../styles/components/icon';
import {
	AlertDialogBox,
	AlertDialogBoxText,
	DialogBoxFooter,
	DialogBoxHeader,
	DialogBoxMessage,
} from '../../../styles/components/disalogBox';
import {favoritesAction} from '../../../reducers/favorites';
import {sftpAction, sftpSelector, types} from '../../../reducers/renewal';

const DeleteDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('deleteDialogBox');

	const {alert} = useSelector(dialogBoxSelector.all);
	const {sftp} = useSelector(sftpSelector.all);

	const alertMessages = {
		'sftp-delete-file': t('sftpDeleteFile'),
		'sftp-delete-history': t('sftpDeleteHistory'),
		'delete-favorite-group': t('deleteFavoriteGroup'),
	};

	const onClickCloseDialogBox = useCallback(() => {
		switch (alert.key) {
			case 'sftp-delete-file': {
				dispatch({
					type: INIT_DELETE_WORK_LIST,
					payload: {uuid: alert.uuid},
				});
				break;
			}
			default:
				break;
		}

		dispatch(dialogBoxAction.closeAlert());
	}, [dispatch, alert]);

	const handleOnClickDeleteEvents = useCallback(
		async (e) => {
			e.preventDefault();

			switch (alert.key) {
				case 'sftp-delete-file': {
					const uuid = alert.uuid;
					const {selected, path, search} = sftp.find(
						(v) => v.uuid === uuid,
					);

					for await (let v of selected.files) {
						dispatch(
							sftpAction.addList({
								uuid: uuid,
								type: types.search,
								value: {path: path, file: v},
							}),
						);
						dispatch(
							sftpAction.addHistory({
								uuid: uuid,
								history: {
									name: v.name,
									size: v.size,
									type: types.delete,
								},
							}),
						);
					}
					if (!search.on) {
						dispatch(
							sftpAction.createSocket({
								uuid: uuid,
								type: types.search,
							}),
						);
					}
					break;
				}

				case 'sftp-delete-history': {
					// const {history_highlight} = sftpHistory.find(
					// 	(it) => it.uuid === alert.uuid,
					// );
					// history_highlight.forEach((item) => {
					// 	if (
					// 		item.progress === 0 ||
					// 		item.progress === 100 ||
					// 		isNaN(item.progress)
					// 	) {
					// 		dispatch({
					// 			type: REMOVE_HISTORY,
					// 			payload: {
					// 				uuid: alert.uuid,
					// 				history: item,
					// 			},
					// 		});
					// 	}
					// });
					// dispatch({
					// 	type: INITIAL_HISTORY_HI,
					// 	payload: {uuid: alert.uuid},
					// });
					break;
				}
				case 'delete-favorite-group': {
					// todo : alert.id????????? ????????? ???????????? forder??? key????????????
					// todo : FolderOnFavoritesContextMenu?????? prop??????
					dispatch(favoritesAction.deleteFavoriteGroup(alert.id));

					break;
				}

				default:
					break;
			}
			dispatch(dialogBoxAction.closeAlert());
		},
		[alert.id, alert.key, alert.uuid, dispatch],
	);

	return (
		<AlertDialogBox
			isOpen={
				alert.open &&
				Object.prototype.hasOwnProperty.call(alertMessages, alert.key)
			}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				<div>{t('alert')}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCloseDialogBox}
				>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<DialogBoxMessage>
				<Icon margin_right='6px' itype={'warning'}>
					{cancelFillIcon}
				</Icon>
				<AlertDialogBoxText>
					{alertMessages[alert.key]}
				</AlertDialogBoxText>
			</DialogBoxMessage>

			<DialogBoxFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					{t('cancel')}
				</TransparentButton>
				<WarningButton onClick={handleOnClickDeleteEvents}>
					{t('delete')}
				</WarningButton>
			</DialogBoxFooter>
		</AlertDialogBox>
	);
};

export default DeleteDialogBox;
