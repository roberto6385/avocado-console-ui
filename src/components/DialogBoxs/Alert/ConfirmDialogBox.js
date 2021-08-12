import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

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
import {dialogBoxAction} from '../../../reducers/dialogBoxs';

const ConfirmDialogBox = () => {
	const {t} = useTranslation('confirmDialogBox');
	const dispatch = useDispatch();

	const AlertMessage = {
		invalid_server: t('invalidServer'),
		lost_server: t('lostServer'),
		snippets_name_duplicate: t('snippetsNameDuplicate'),
		snippets_blank: t('snippetsBlank'),
		server_duplicate: t('serverDuplicate'),
		folder_name_duplicate: t('folderNameDuplicate'),
		no_changes: t('noChange'),
		developing: t('developing'),
		wrong_path: t('wrongPath'),
	};

	const onClickCloseModal = useCallback(() => {
		dispatch(dialogBoxAction.closeAlert());
	}, [dispatch]);

	return (
		<AlertDialogBox
			isOpen={confirm.open}
			onRequestClose={onClickCloseModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<ModalHeader>
				<div>{t('alert')}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCloseModal}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<ModalMessage>
				<Icon margin_right='6px' itype={'confirm'}>
					{alertFillIcon}
				</Icon>

				<AlertText>{AlertMessage[confirm.key]}</AlertText>
			</ModalMessage>

			<ModalFooter>
				<TransparentButton onClick={onClickCloseModal}>
					{t('cancel')}
				</TransparentButton>

				<NormalButton onClick={onClickCloseModal}>
					{t('ok')}
				</NormalButton>
			</ModalFooter>
		</AlertDialogBox>
	);
};

export default ConfirmDialogBox;
