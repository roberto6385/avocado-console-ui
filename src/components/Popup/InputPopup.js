import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CLOSE_INPUT_POPUP} from '../../reducers/popup';
import useInput from '../../hooks/useInput';
import {commandMkdirAction, commandRenameAction} from '../../reducers/sftp';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {closeIconMedium} from '../../icons/icons';
import {
	Form,
	ModalFooter,
	ModalHeader,
	ModalHeaderIconButton,
	ModalHeaderText,
	PopupModal,
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/default';
import {borderColor, fontColor, settingInput} from '../../styles/color';

const _PopupModal = styled(PopupModal)`
	width: 404px;
`;

const _Form = styled(Form)`
	margin: 16px 16px 29px 16px;
`;

const _Input = styled.input`
	width: 372px;
	height: 34px;
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${(props) => borderColor[props.themeValue]};
	background: ${(props) => settingInput[props.themeValue]};
	color: ${(props) => fontColor[props.themeValue]};
`;

const InputPopup = () => {
	const {t} = useTranslation('inputPopup');
	const dispatch = useDispatch();
	const {sftp} = useSelector((state) => state.sftp);
	const {theme} = useSelector((state) => state.common);
	const {input_popup} = useSelector((state) => state.popup);
	const [formValue, onChangeFormValue, setFormValue] = useInput('');
	const inputRef = useRef(null);
	const {current: HeaderMessage} = useRef({
		sftp_rename_file_folder: t('renameHeader'),
		sftp_new_folder: t('newFolderHeader'),
	});
	const {current: Placeholder} = useRef({
		sftp_rename_file_folder: t('renamePlace'),
		sftp_new_folder: t('newFolderPlace'),
	});

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_INPUT_POPUP});
	}, []);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();

			switch (input_popup.key) {
				case 'sftp_rename_file_folder': {
					const uuid = input_popup.uuid;
					const corServer = sftp.find((it) => it.uuid === uuid);
					const {highlight, path} = corServer;

					for (let value of highlight) {
						dispatch(
							commandRenameAction({
								...corServer,
								prevName: value.name,
								nextName: formValue,
								newPath: path,
							}),
						);
					}
					break;
				}

				case 'sftp_new_folder': {
					const uuid = input_popup.uuid;
					const corServer = sftp.find((it) => it.uuid === uuid);
					const {path} = corServer;

					if (formValue === '') return;
					dispatch(
						commandMkdirAction({
							...corServer,
							newPath: `${path}/${formValue}`,
						}),
					);
					break;
				}

				default:
					break;
			}
			closeModal();
		},
		[input_popup, formValue, sftp],
	);
	//when form is open, fill in pre-value and focus and select it
	useEffect(() => {
		const fillInForm = async () => {
			if (input_popup.open) {
				if (input_popup.key === 'sftp_rename_file_folder') {
					const {highlight} = sftp.find(
						(it) => it.uuid === input_popup.uuid,
					);
					await setFormValue(highlight[0].name);
				} else {
					await setFormValue('');
				}
				await inputRef.current?.select();
				await inputRef.current?.focus();
			}
		};
		fillInForm();
	}, [inputRef, input_popup, sftp]);

	return (
		<_PopupModal
			isOpen={input_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			themeValue={theme}
		>
			<ModalHeader themeValue={theme}>
				<ModalHeaderText>
					{HeaderMessage[input_popup.key]}
				</ModalHeaderText>
				<ModalHeaderIconButton themeValue={theme} onClick={closeModal}>
					{closeIconMedium}
				</ModalHeaderIconButton>
			</ModalHeader>

			<_Form onSubmit={submitFunction}>
				<_Input
					ref={inputRef}
					value={formValue}
					onChange={onChangeFormValue}
					placeholder={Placeholder[input_popup.key]}
					themeValue={theme}
				/>
			</_Form>

			<ModalFooter themeValue={theme}>
				<PrimaryGreyButton themeValue={theme} onClick={closeModal}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryGreenButton themeValue={theme} onClick={submitFunction}>
					{t('save')}
				</PrimaryGreenButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default InputPopup;
