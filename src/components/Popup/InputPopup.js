import React, {useCallback, useEffect, useRef} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {CLOSE_INPUT_POPUP} from '../../reducers/popup';
import useInput from '../../hooks/useInput';
import {commandMkdirAction, commandRenameAction} from '../../reducers/sftp';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {closeIcon} from '../../icons/icons';
import {
	Form,
	Input,
	ModalFooter,
	ModalHeader,
	PopupModal,
} from '../../styles/default';
import {
	ClickableIconButton,
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/button';
import {fontColor} from '../../styles/color';

const _PopupModal = styled(PopupModal)`
	width: 404px;
`;

const _Form = styled(Form)`
	padding-bottom: 29px;
`;

const InputPopup = () => {
	const {t} = useTranslation('inputPopup');
	const dispatch = useDispatch();
	const {
		socket: sftp_socketState,
		path: sftp_pathState,
		high: sftp_highState,
	} = useSelector((state) => state.sftp, shallowEqual);

	const theme = useSelector((state) => state.common.theme);
	const input_popup = useSelector((state) => state.popup.input_popup);
	const [formValue, onChangeFormValue, setFormValue] = useInput('');
	const inputRef = useRef(null);
	const HeaderMessage = {
		sftp_rename_file_folder: t('renameHeader'),
		sftp_new_folder: t('newFolderHeader'),
	};
	const Placeholder = {
		sftp_rename_file_folder: t('renamePlace'),
		sftp_new_folder: t('newFolderPlace'),
	};

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_INPUT_POPUP});
	}, [dispatch]);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();

			const uuid = input_popup.uuid;
			const {socket} = sftp_socketState.find((it) => it.uuid === uuid);
			const {path} = sftp_pathState.find((it) => it.uuid === uuid);
			const {highlight} = sftp_highState.find((it) => it.uuid === uuid);

			switch (input_popup.key) {
				case 'sftp_rename_file_folder': {
					for (let value of highlight) {
						dispatch(
							commandRenameAction({
								socket: socket,
								uuid: uuid,
								prev_path:
									path === '/'
										? `${path}${value.name}`
										: `${path}/${value.name}`,
								next_path:
									path === '/'
										? `${path}${formValue}`
										: `${path}/${formValue}`,
								path: path,
								dispatch: dispatch,
							}),
						);
					}
					break;
				}

				case 'sftp_new_folder': {
					if (formValue === '') return;
					dispatch(
						commandMkdirAction({
							socket: socket,
							path: path,
							uuid: uuid,
							mkdir_path:
								path === '/'
									? `${path}${formValue}`
									: `${path}/${formValue}`,
							dispatch: dispatch,
						}),
					);
					break;
				}

				default:
					break;
			}
			closeModal();
		},
		[
			input_popup,
			sftp_socketState,
			sftp_pathState,
			sftp_highState,
			closeModal,
			dispatch,
			formValue,
		],
	);

	//when form is open, fill in pre-value and focus and select it
	useEffect(() => {
		const fillInForm = async () => {
			if (input_popup.open) {
				if (input_popup.key === 'sftp_rename_file_folder') {
					const {highlight} = sftp_highState.find(
						(it) => it.uuid === input_popup.uuid,
					);
					await setFormValue(highlight[0].name);
				} else {
					// await setFormValue('');
				}
				await inputRef.current?.select();
				await inputRef.current?.focus();
			}
		};
		fillInForm();
	}, [inputRef, input_popup, setFormValue, sftp_highState]);

	return (
		<_PopupModal
			isOpen={input_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			theme_value={theme}
		>
			<ModalHeader theme_value={theme}>
				<div>{HeaderMessage[input_popup.key]}</div>
				<ClickableIconButton
					color={fontColor[theme]}
					size={'sm'}
					margin={'0px'}
					onClick={closeModal}
				>
					{closeIcon}
				</ClickableIconButton>
			</ModalHeader>

			<_Form onSubmit={submitFunction}>
				<Input
					ref={inputRef}
					value={formValue}
					onChange={onChangeFormValue}
					placeholder={Placeholder[input_popup.key]}
					theme_value={theme}
				/>
			</_Form>

			<ModalFooter theme_value={theme}>
				<PrimaryGreyButton theme_value={theme} onClick={closeModal}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryGreenButton
					theme_value={theme}
					onClick={submitFunction}
				>
					{t('save')}
				</PrimaryGreenButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default InputPopup;
