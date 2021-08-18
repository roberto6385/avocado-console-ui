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
	AlertText,
	ModalFooter,
	ModalHeader,
	ModalMessage,
} from '../../../styles/components/disalogBox';
import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';

const ConfirmDialogBox = () => {
	const {t} = useTranslation('confirmDialogBox');
	const dispatch = useDispatch();
	const {alert} = useSelector(dialogBoxSelector.all);

	const alertMessages = {
		'duplicate-snippet-name': t('snippetsNameDuplicate'),
		'blank-snippets': t('snippetsBlank'),
		'sftp-no-changes': t('noChange'),
		'duplicate-folder-name-on-favorites': '폴더 이름 중복(TESt)',
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
			<ModalHeader>
				<div>{t('alert')}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCloseDialogBox}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<ModalMessage>
				<Icon margin_right='6px' itype={'confirm'}>
					{alertFillIcon}
				</Icon>

				<AlertText>{alertMessages[confirm.key]}</AlertText>
			</ModalMessage>

			<ModalFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					{t('cancel')}
				</TransparentButton>

				<NormalButton onClick={onClickCloseDialogBox}>
					{t('ok')}
				</NormalButton>
			</ModalFooter>
		</AlertDialogBox>
	);
};

export default ConfirmDialogBox;
