import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CLOSE_INPUT_POPUP} from '../../reducers/popup';
import useInput from '../../hooks/useInput';
import {commandMkdirAction, commandRenameAction} from '../../reducers/sftp';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {
	LIGHT_MODE_BORDER_COLOR,
	IconButton,
	PATH_SEARCH_INPUT_HEIGHT,
} from '../../styles/global';
import {closeIconMedium} from '../../icons/icons';
import {FONT_14} from '../../styles/length';
import {
	ModalHeader,
	ModalHeaderText,
	PopupModal,
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/default';
import {borderColor, fontColor, modalColor} from '../../styles/color';

const _Modal = styled(PopupModal)`
	border-color: ${(props) => modalColor[props.themeValue]};
	background: ${(props) => borderColor[props.themeValue]};
	color: ${(props) => fontColor[props.themeValue]};
	width: 404px;
	z-index: 10;
`;

const _Header = styled(ModalHeader)`
	border-color: ${(props) => props.bcolor};
`;

const _Form = styled.form`
	display: flex;
	width: 100%;
	flex-direction: column;
	font-size: ${FONT_14};
	padding: 18px 16px 30px 16px;
`;

const _Input = styled.input`
	width: 100%;
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${LIGHT_MODE_BORDER_COLOR};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _Footer = styled.div`
	border-color: ${(props) => props.bcolor};
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
		<_Modal
			isOpen={input_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			themeValue={theme}
		>
			<_Header bcolor={borderColor[theme]}>
				<ModalHeaderText>
					{HeaderMessage[input_popup.key]}
				</ModalHeaderText>
				<IconButton onClick={closeModal}>{closeIconMedium}</IconButton>
			</_Header>

			<_Form onSubmit={submitFunction}>
				<_Input
					ref={inputRef}
					value={formValue}
					onChange={onChangeFormValue}
					placeholder={Placeholder[input_popup.key]}
				/>
			</_Form>

			<_Footer bcolor={borderColor[theme]}>
				<PrimaryGreyButton themeValue={theme} onClick={closeModal}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryGreenButton themeValue={theme} onClick={submitFunction}>
					{t('save')}
				</PrimaryGreenButton>
			</_Footer>
		</_Modal>
	);
};

export default InputPopup;
