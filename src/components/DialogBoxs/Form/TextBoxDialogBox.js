import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';
import useInput from '../../../hooks/useInput';
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
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../../styles/components/disalogBox';
import {TextBox} from '../../../styles/components/textBox';
import {Form} from '../../../styles/components/form';
import {sftpAction, sftpSelector} from '../../../reducers/renewal';
import {pathFormatter} from '../../../utils/sftp';

const _PopupModal = styled(DialogBox)`
	width: 404px;
`;

const _Form = styled(Form)`
	padding-bottom: 29px;
`;

const TextBoxDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('textBoxDialogBox');

	const {sftp} = useSelector(sftpSelector.all);

	const {form} = useSelector(dialogBoxSelector.all);
	//TODO: 꼭 prevFormValue 값이 필요한가?
	const [textBoxVal, onChangeTextBoxVal, setTextBoxVal] = useInput('');
	const [prevFormValue, setPrevFormValue] = useState('');
	const textBoxRef = useRef(null);

	const headerMessages = {
		'sftp-rename-file-folder': t('rename'),
		'sftp-new-folder': t('newFolder'),
		'sftp-change-group': t('changeGroup'),
		'sftp-chnage-owner': t('changeOwner'),
	};
	const placeholders = {
		'sftp-rename-file-folder': t('placeholder.rename'),
		'sftp-new-folder': t('placeholder.newFolder'),
		'sftp-change-group': t('placeholder.changeGroup'),
		'sftp-chnage-owner': t('placeholder.changeOwner'),
	};

	const onClickCloseDialogBox = useCallback(() => {
		dispatch(dialogBoxAction.closeForm());
	}, [dispatch]);

	const handleOnSubmitTextBoxEvents = useCallback(
		(e) => {
			e.preventDefault();
			const uuid = form.uuid;

			if (textBoxVal === '') return;

			switch (form.key) {
				case 'sftp-rename-file-folder': {
					const {socket, path} = sftp.find((v) => v.uuid === uuid);
					dispatch(
						sftpAction.commandRename({
							socket: socket,
							uuid: uuid,
							oldPath: pathFormatter(path, prevFormValue),
							newPath: pathFormatter(path, textBoxVal),
						}),
					);
					break;
				}

				case 'sftp-new-folder': {
					const {socket, path} = sftp.find((v) => v.uuid === uuid);

					dispatch(
						sftpAction.commandMkdir({
							socket: socket,
							uuid: uuid,
							path: pathFormatter(path, textBoxVal),
						}),
					);
					break;
				}

				case 'sftp-change-group': {
					//TODO: create sftp chgtp event
					break;
				}
				case 'sftp-chnage-owner': {
					//TODO: create sftp chown event
					break;
				}

				default:
					break;
			}
			onClickCloseDialogBox();
		},
		[
			dispatch,
			form,
			onClickCloseDialogBox,
			prevFormValue,
			sftp,
			textBoxVal,
		],
	);

	//when form is isOpened, fill in pre-value and focus and select it
	useEffect(() => {
		const fillInForm = async () => {
			if (form.open) {
				if (
					form.key === 'sftp-rename-file-folder' ||
					form.key === 'sftp-change-group' ||
					form.key === 'sftp-chnage-owner'
					// form.resourceGroupId === 'userName'
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
		const uuid = form.uuid;
		if (uuid) {
			if (
				sftp.find((v) => v.uuid === uuid).selected.files !== [] &&
				sftp.find((v) => v.uuid === uuid).selected.files.length === 1
			) {
				if (form.key === 'sftp-rename-file-folder') {
					setPrevFormValue(
						sftp.find((v) => v.uuid === uuid).selected.files[0]
							.name,
					);
				}
				if (form.key === 'sftp-change-group') {
					setPrevFormValue(
						sftp.find((v) => v.uuid === uuid).selected.files[0]
							.group,
					);
				}
				if (form.key === 'sftp-chnage-owner') {
					setPrevFormValue(
						sftp.find((v) => v.uuid === uuid).selected.files[0]
							.owner,
					);
				}
			}
		}
	}, [form.key, form.uuid, sftp]);

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
			<DialogBoxHeader>
				<div>{headerMessages[form.key]}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCloseDialogBox}
				>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<_Form onSubmit={handleOnSubmitTextBoxEvents}>
				<TextBox
					ref={textBoxRef}
					value={textBoxVal}
					onChange={onChangeTextBoxVal}
					placeholder={placeholders[form.key]}
					required
				/>
			</_Form>

			<DialogBoxFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					{t('cancel')}
				</TransparentButton>
				<NormalButton onClick={handleOnSubmitTextBoxEvents}>
					{t('save')}
				</NormalButton>
			</DialogBoxFooter>
		</_PopupModal>
	);
};

export default TextBoxDialogBox;
