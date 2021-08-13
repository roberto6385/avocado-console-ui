import React, {useCallback, useEffect, useRef, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';
import useInput from '../../../hooks/useInput';
import {MKDIR_REQUEST, RENAME_REQUEST} from '../../../reducers/sftp';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
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
import {userResourceSelector} from '../../../reducers/api/userResource';

const _PopupModal = styled(DialogBox)`
	width: 404px;
`;

const _Form = styled(Form)`
	padding-bottom: 29px;
`;

const InputDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('inputPopup');

	const {
		socket: sftp_socketState,
		path: sftp_pathState,
		high: sftp_highState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {form} = useSelector(dialogBoxSelector.all);

	const [formValue, onChangeFormValue, setFormValue] = useInput('');
	const [prevFormValue, setPrevFormValue] = useState('');
	const inputRef = useRef(null);

	const uuid = form.uuid;
	const socket = sftp_socketState.find((it) => it.uuid === uuid)?.socket;
	const path = sftp_pathState.find((it) => it.uuid === uuid)?.path;
	const highlight = sftp_highState.find((it) => it.uuid === uuid)?.highlight;

	const keyArray = [
		'sftp_rename_file_folder',
		'sftp_chgrp',
		'sftp_chown',
		'sftp_new_folder',
	];

	const HeaderMessage = {
		sftp_rename_file_folder: t('renameHeader'),
		sftp_new_folder: t('newFolderHeader'),
		sftp_chgrp: t('chgrpHeader'),
		sftp_chown: t('chownHeader'),
	};
	const Placeholder = {
		sftp_rename_file_folder: t('renamePlace'),
		sftp_new_folder: t('newFolderPlace'),
		sftp_chgrp: t('chgrpPlace'),
		sftp_chown: t('chownPlace'),
	};

	const onClickCloseModal = useCallback(() => {
		dispatch(dialogBoxAction.closeForm());
	}, [dispatch]);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();
			if (formValue === '') return;

			switch (form.key) {
				case 'sftp_rename_file_folder': {
					dispatch({
						type: RENAME_REQUEST,
						payload: {
							socket: socket,
							uuid: uuid,
							prev_path:
								path === '/'
									? `${path}${prevFormValue}`
									: `${path}/${prevFormValue}`,
							next_path:
								path === '/'
									? `${path}${formValue}`
									: `${path}/${formValue}`,
							path: path,
						},
					});
					break;
				}

				case 'sftp_new_folder': {
					dispatch({
						type: MKDIR_REQUEST,
						payload: {
							socket: socket,
							path: path,
							uuid: uuid,
							mkdir_path:
								path === '/'
									? `${path}${formValue}`
									: `${path}/${formValue}`,
						},
					});
					break;
				}

				case 'sftp_chgrp': {
					console.log(formValue);
					break;
				}
				case 'sftp_chown': {
					console.log(formValue);
					break;
				}

				default:
					break;
			}
			onClickCloseModal();
		},
		[
			form,
			onClickCloseModal,
			dispatch,
			socket,
			uuid,
			path,
			prevFormValue,
			formValue,
		],
	);

	//when form is open, fill in pre-value and focus and select it
	useEffect(() => {
		const fillInForm = async () => {
			if (form.open) {
				if (
					form.key === 'sftp_rename_file_folder' ||
					form.key === 'sftp_chgrp' ||
					form.key === 'sftp_chown'
					// form.key === 'userName'
				) {
					setFormValue(prevFormValue);
				} else {
					await setFormValue('');
				}
				await inputRef.current?.select();
				await inputRef.current?.focus();
			}
		};
		fillInForm();
	}, [inputRef, form, prevFormValue, setFormValue]);

	useEffect(() => {
		if (highlight !== undefined && highlight.length === 1) {
			if (form.key === 'sftp_rename_file_folder') {
				setPrevFormValue(highlight[0].name);
			}
			if (form.key === 'sftp_chgrp') {
				setPrevFormValue(highlight[0].group);
			}
			if (form.key === 'sftp_chown') {
				setPrevFormValue(highlight[0].owner);
			}
		}
	}, [highlight, form]);

	return (
		<_PopupModal
			isOpen={form.open && keyArray.includes(form.key)}
			onRequestClose={onClickCloseModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<ModalHeader>
				<div>{HeaderMessage[form.key]}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCloseModal}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<_Form onSubmit={submitFunction}>
				<Input
					ref={inputRef}
					value={formValue}
					onChange={onChangeFormValue}
					placeholder={Placeholder[form.key]}
				/>
			</_Form>

			<ModalFooter>
				<TransparentButton onClick={onClickCloseModal}>
					{t('cancel')}
				</TransparentButton>
				<NormalButton onClick={submitFunction}>
					{t('save')}
				</NormalButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default InputDialogBox;
