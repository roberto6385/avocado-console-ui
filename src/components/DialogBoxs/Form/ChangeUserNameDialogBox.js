import React, {useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../../hooks/useInput';
import TextBoxField_ from '../../RecycleComponents/TextBoxField_';
import {useDispatch, useSelector} from 'react-redux';
import {closeIcon} from '../../../icons/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/button';
import {IconButton} from '../../../styles/components/icon';
import {
	DialogBox,
	ModalFooter,
	ModalHeader,
} from '../../../styles/components/disalogBox';
import {Input} from '../../../styles/components/input';
import {Form} from '../../../styles/components/form';
import {
	userResourceAction,
	userResourceSelector,
} from '../../../reducers/api/userResource';
import {authSelector} from '../../../reducers/api/auth';
import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';

const _PopupModal = styled(DialogBox)`
	z-index: 5;
	width: 404px;
`;

const ChangeUserNameDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('changeNameForm');

	const {userData} = useSelector(authSelector.all);
	const {data} = useSelector(userResourceSelector.all);
	const {form} = useSelector(dialogBoxSelector.all);

	const nameRef = useRef(null);
	const [currentName, onChangeCurrentName, setCurrentName] = useInput(null);

	const closeModal = useCallback(() => {
		dispatch(dialogBoxAction.closeForm());
	}, [dispatch]);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			if (currentName !== '') {
				dispatch(
					userResourceAction.modifyRequest({
						userUid: data.userUid,
						name: currentName,
						password: localStorage.getItem('password'),
						access_token: userData.access_token,
					}),
				);
			}

			closeModal();
		},
		[currentName, closeModal, dispatch, data, userData],
	);

	useEffect(() => {
		currentName === '' && nameRef.current?.focus();
	}, [currentName]);

	useEffect(() => {
		if (open) {
			setCurrentName('');
		}
	}, [open, setCurrentName]);

	return (
		<_PopupModal
			isOpen={form.open && form.key === 'userName'}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<ModalHeader>
				<div>{t('title')}</div>
				<IconButton
					btype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={closeModal}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>
			<Form onSubmit={onSubmitForm}>
				<TextBoxField_ title={t('name')}>
					<Input
						ref={nameRef}
						type='text'
						value={currentName}
						onChange={onChangeCurrentName}
						placeholder={t('place.name')}
					/>
				</TextBoxField_>
			</Form>

			<ModalFooter>
				<TransparentButton onClick={closeModal}>
					{t('cancel')}
				</TransparentButton>
				<NormalButton onClick={onSubmitForm}>{t('save')}</NormalButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default ChangeUserNameDialogBox;
