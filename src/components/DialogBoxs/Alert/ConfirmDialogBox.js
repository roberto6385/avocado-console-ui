import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {alertFillIcon, closeIcon} from '../../../icons/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/button';
import {Icon, IconButton} from '../../../styles/components/icon';
import {
	AlertDialogBox,
	AlertDialogBoxText,
	DialogBoxFooter,
	DialogBoxHeader,
	DialogBoxMessage,
} from '../../../styles/components/disalogBox';
import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';

const ConfirmDialogBox = () => {
	const {t} = useTranslation('confirmDialogBox');
	const dispatch = useDispatch();
	const {alert} = useSelector(dialogBoxSelector.all);

	const alertMessages = {
		'duplicate-snippet-name': t('duplicateSnippetName'),
		'blank-snippets': t('blankSnippets'),
		'sftp-no-changes': t('sftpNoChanges'),
	};

	const onClickCloseDialogBox = useCallback(() => {
		dispatch(dialogBoxAction.closeAlert());
	}, [dispatch]);

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
				<Icon margin_right='6px' itype={'confirm'}>
					{alertFillIcon}
				</Icon>

				<AlertDialogBoxText>
					{alertMessages[confirm.key]}
				</AlertDialogBoxText>
			</DialogBoxMessage>

			<DialogBoxFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					{t('cancel')}
				</TransparentButton>

				<NormalButton onClick={onClickCloseDialogBox}>
					{t('ok')}
				</NormalButton>
			</DialogBoxFooter>
		</AlertDialogBox>
	);
};

export default ConfirmDialogBox;
