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
import {DIALOG_BOX, dialogBoxAction} from '../../../reducers/dialogBoxs';

const WarningDialogBox = () => {
	const {t} = useTranslation('warningDialogBox');
	const dispatch = useDispatch();

	const {alert} = useSelector((state) => state[DIALOG_BOX], shallowEqual);

	const alertMessages = {
		invalid_server: t('invalidServer'),
		developing: t('developing'),
		wrong_path: t('wrongPath'),
		folder_names_on_favorites_duplicated: '폴더 이름 중복(TESt)',
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
				<Icon margin_right='6px' itype={'warning'}>
					{cancelFillIcon}
				</Icon>
				<AlertText>{alertMessages[alert.key]}</AlertText>
			</ModalMessage>

			<ModalFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					{t('cancel')}
				</TransparentButton>
				<WarningButton onClick={onClickCloseDialogBox}>
					{t('ok')}
				</WarningButton>
			</ModalFooter>
		</AlertDialogBox>
	);
};

export default WarningDialogBox;
