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
import {TextBox} from '../../../styles/components/textBox';
import {Form} from '../../../styles/components/form';

const _PopupModal = styled(DialogBox)`
	width: 404px;
`;

const _Form = styled(Form)`
	padding-bottom: 29px;
`;

const TextBoxDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('inputPopup');

	const {
		socket: sftp_socketState,
		path: sftp_pathState,
		high: sftp_highState,
	} = useSelector((state) => state.sftp, shallowEqual);

	const {form} = useSelector(dialogBoxSelector.all);
	//TODO: 꼭 prevFormValue 값이 필요한가?
	const [textBoxVal, onChangeTextBoxVal, setTextBoxVal] = useInput('');
	const [prevFormValue, setPrevFormValue] = useState('');
	const textBoxRef = useRef(null);

	const uuid = form.uuid;
	const socket = sftp_socketState?.find((it) => it.uuid === uuid)?.socket;
	const path = sftp_pathState?.find((it) => it.uuid === uuid)?.path;
	const highlight = sftp_highState?.find((it) => it.uuid === uuid)?.highlight;

	const headerMessages = {
		sftp_rename_file_folder: t('renameHeader'),
		sftp_new_folder: t('newFolderHeader'),
		sftp_chgrp: t('chgrpHeader'),
		sftp_chown: t('chownHeader'),
	};
	const placeholders = {
		sftp_rename_file_folder: t('renamePlace'),
		sftp_new_folder: t('newFolderPlace'),
		sftp_chgrp: t('chgrpPlace'),
		sftp_chown: t('chownPlace'),
	};

	const onClickCloseDialogBox = useCallback(() => {
		dispatch(dialogBoxAction.closeForm());
	}, [dispatch]);

	const handleOnSubmitTextBoxEvents = useCallback(
		(e) => {
			e.preventDefault();
			if (textBoxVal === '') return;

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
									? `${path}${textBoxVal}`
									: `${path}/${textBoxVal}`,
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
									? `${path}${textBoxVal}`
									: `${path}/${textBoxVal}`,
						},
					});
					break;
				}

				case 'sftp_chgrp': {
					//TODO: create sftp chgtp event
					break;
				}
				case 'sftp_chown': {
					//TODO: create sftp chown event
					break;
				}

				default:
					break;
			}
			onClickCloseDialogBox();
		},
		[
			form,
			onClickCloseDialogBox,
			dispatch,
			socket,
			uuid,
			path,
			prevFormValue,
			textBoxVal,
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
					setTextBoxVal(prevFormValue);
				} else {
					await setTextBoxVal('');
				}
				await textBoxRef.current?.select();
				await textBoxRef.current?.focus();
			}
		};
		fillInForm();
	}, [textBoxRef, form, prevFormValue, setTextBoxVal]);

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
			isOpen={
				form.open &&
				Object.prototype.hasOwnProperty.call(headerMessages, form.key)
			}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<ModalHeader>
				<div>{headerMessages[form.key]}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCloseDialogBox}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<_Form onSubmit={handleOnSubmitTextBoxEvents}>
				<TextBox
					ref={textBoxRef}
					value={textBoxVal}
					onChange={onChangeTextBoxVal}
					placeholder={placeholders[form.key]}
					required
				/>
			</_Form>

			<ModalFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					{t('cancel')}
				</TransparentButton>
				<NormalButton onClick={handleOnSubmitTextBoxEvents}>
					{t('save')}
				</NormalButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default TextBoxDialogBox;
