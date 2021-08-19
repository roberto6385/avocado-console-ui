import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {cancelFillIcon, closeIcon} from '../../../icons/icons';
import {
	TransparentButton,
	WarningButton,
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

const WarningDialogBox = () => {
	const {t} = useTranslation('warningDialogBox');
	const dispatch = useDispatch();

	const {alert} = useSelector(dialogBoxSelector.all);

	const alertMessages = {
		'lost-server': t('lostServer'),
		'invalid-server': t('invalidServer'),
		developing: t('developing'),
		'sftp-wrong-path': t('sftpWrongPath'),
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
				<WarningButton onClick={onClickCloseDialogBox}>
					{t('ok')}
				</WarningButton>
			</DialogBoxFooter>
		</AlertDialogBox>
	);
};

export default WarningDialogBox;
