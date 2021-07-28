import React, {useCallback, useEffect, useRef, useState} from 'react';
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
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/button';
import {fontColor} from '../../styles/color';
import {ClickableIconButton} from "../../styles/icon";

const _PopupModal = styled(PopupModal)`
	width: 404px;
`;

const _Form = styled(Form)`
	padding-bottom: 29px;
`;

const InputPopup = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('inputPopup');

	const {
		socket: sftp_socketState,
		path: sftp_pathState,
		high: sftp_highState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {theme} = useSelector((state) => state.common, shallowEqual);
	const {input_popup} = useSelector((state) => state.popup, shallowEqual);

	const [formValue, onChangeFormValue, setFormValue] = useInput('');
	const [prevFormValue, setPrevFormValue] = useState('');
	const inputRef = useRef(null);

	const uuid = input_popup.uuid;
	const socket = sftp_socketState.find((it) => it.uuid === uuid)?.socket;
	const path = sftp_pathState.find((it) => it.uuid === uuid)?.path;
	const highlight = sftp_highState.find((it) => it.uuid === uuid)?.highlight;

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
			if (formValue === '') return;

			switch (input_popup.key) {
				case 'sftp_rename_file_folder': {
					dispatch(
						commandRenameAction({
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
						}),
					);
					break;
				}

				case 'sftp_new_folder': {
					dispatch(
						commandMkdirAction({
							socket: socket,
							path: path,
							uuid: uuid,
							mkdir_path:
								path === '/'
									? `${path}${formValue}`
									: `${path}/${formValue}`,
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
			closeModal,
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
			if (input_popup.open) {
				if (input_popup.key === 'sftp_rename_file_folder') {
					setFormValue(prevFormValue);
				} else {
					await setFormValue('');
				}
				await inputRef.current?.select();
				await inputRef.current?.focus();
			}
		};
		fillInForm();
	}, [inputRef, input_popup, prevFormValue, setFormValue]);

	useEffect(() => {
		if (highlight !== undefined && highlight.length === 1) {
			setPrevFormValue(highlight[0].name);
		}
	}, [highlight]);

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
