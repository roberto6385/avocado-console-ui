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

const _PopupModal = styled(DialogBox)`
	width: 404px;
`;

const _Form = styled(Form)`
	padding-bottom: 29px;
`;

const TextBoxDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('textBoxDialogBox');

	const {data} = useSelector(sftpSelector.all);

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
			const sftp = data.find((v) => v.uuid === uuid);

			if (textBoxVal === '') return;

			switch (form.key) {
				case 'sftp-rename-file-folder': {
					dispatch(
						sftpAction.commandRename({
							socket: sftp.socket,
							uuid: uuid,
							oldPath:
								sftp.path === '/'
									? `${sftp.path}${prevFormValue}`
									: `${sftp.path}/${prevFormValue}`,
							newPath:
								sftp.path === '/'
									? `${sftp.path}${textBoxVal}`
									: `${sftp.path}/${textBoxVal}`,
						}),
					);
					break;
				}

				case 'sftp-new-folder': {
					dispatch(
						sftpAction.commandMkdir({
							socket: sftp.socket,
							uuid: uuid,
							path:
								sftp.path === '/'
									? `${sftp.path}${textBoxVal}`
									: `${sftp.path}/${textBoxVal}`,
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
			form.uuid,
			form.key,
			data,
			textBoxVal,
			onClickCloseDialogBox,
			dispatch,
			prevFormValue,
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
		const sftp = data.find((v) => v.uuid === uuid);
		if (uuid) {
			if (
				sftp.selected.files !== [] &&
				sftp.selected.files.length === 1
			) {
				if (form.key === 'sftp-rename-file-folder') {
					setPrevFormValue(sftp.selected.files[0].name);
				}
				if (form.key === 'sftp-change-group') {
					setPrevFormValue(sftp.selected.files[0].group);
				}
				if (form.key === 'sftp-chnage-owner') {
					setPrevFormValue(sftp.selected.files[0].owner);
				}
			}
		}
	}, [data, form.key, form.uuid]);

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
