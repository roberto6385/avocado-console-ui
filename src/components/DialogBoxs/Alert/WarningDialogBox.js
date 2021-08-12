import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {cancelFillIcon, closeIcon} from '../../../icons/icons';
import {
	TransparentButton,
	WarningButton,
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

const WarningDialogBox = () => {
	const {t} = useTranslation('warningDialogBox');
	const dispatch = useDispatch();

	const {warning_dialog_box} = useSelector(
		(state) => state.dialogBoxs,
		shallowEqual,
	);

	const AlertMessage = {
		invalid_server: t('invalidServer'),
		developing: t('developing'),
		wrong_path: t('wrongPath'),
		folder_names_on_favorites_duplicated: '폴더 이름 중복(TESt)',
	};

	const onClickCloseModal = useCallback(() => {
		dispatch(dialogBoxAction.closeWarning());
	}, [dispatch]);

	return (
		<AlertDialogBox
			isOpen={warning_dialog_box.open}
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
				<Icon margin_right='6px' itype={'warning'}>
					{cancelFillIcon}
				</Icon>
				<AlertText>{AlertMessage[warning_dialog_box.key]}</AlertText>
			</ModalMessage>

			<ModalFooter>
				<TransparentButton onClick={onClickCloseModal}>
					{t('cancel')}
				</TransparentButton>
				<WarningButton onClick={onClickCloseModal}>
					{t('ok')}
				</WarningButton>
			</ModalFooter>
		</AlertDialogBox>
	);
};

export default WarningDialogBox;
