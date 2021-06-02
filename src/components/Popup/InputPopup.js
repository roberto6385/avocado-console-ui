import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IoCloseOutline} from 'react-icons/all';
import {CLOSE_INPUT_POPUP} from '../../reducers/popup';
import useInput from '../../hooks/useInput';
import {commandMkdirAction, commandRenameAction} from '../../reducers/sftp';
import styled from 'styled-components';
import Modal from 'react-modal';
import {useTranslation} from 'react-i18next';
import {
	AVOCADO_FONTSIZE,
	LIGHT_MODE_BORDER_COLOR,
	FOLDER_HEIGHT,
	IconButton,
	MAIN_HEIGHT,
	PATH_SEARCH_INPUT_HEIGHT,
	PrimaryButton,
	BorderButton,
} from '../../styles/global';

const _Modal = styled(Modal)`
	border: 1px solid ${LIGHT_MODE_BORDER_COLOR};
	position: absolute;
	z-index: 10;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.22);
	background: white;
	border-radius: 4px;
	width: 404px;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	height: ${FOLDER_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: space-between;
	padding: 0px 10px 0px 16px;
	border-bottom: 1px solid ${LIGHT_MODE_BORDER_COLOR};
`;

const _Text = styled.div`
	font-size: 14px;
	font-family: Roboto;
	width: 226px;
`;

const _HeaderText = styled(_Text)`
	font-weight: 500;
`;

const _Form = styled.form`
	display: flex;
	width: 100%;
	flex-direction: column;
	font-size: ${AVOCADO_FONTSIZE};
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
	display: flex;
	ailgn-items: center;
	height: ${MAIN_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: flex-end;
	padding: 13px 8px;
	border-top: 1px solid ${LIGHT_MODE_BORDER_COLOR};
`;

const InputPopup = () => {
	const {t} = useTranslation('inputPopup');
	const dispatch = useDispatch();
	const inputRef = useRef(null);
	const {sftp} = useSelector((state) => state.sftp);
	const {input_popup} = useSelector((state) => state.popup);
	const [formValue, onChangeFormValue, setFormValue] = useInput('');

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

			switch (input_popup.key) {
				case 'sftp_rename_file_folder': {
					const uuid = input_popup.uuid;
					const corServer = sftp.find((it) => it.uuid === uuid);
					const {highlight, mode, path} = corServer;

					for (let value of highlight) {
						if (mode === 'list')
							dispatch(
								commandRenameAction({
									...corServer,
									prevName: value.name,
									nextName: formValue,
									newPath: path,
								}),
							);
						else if (mode === 'drop')
							dispatch(
								commandRenameAction({
									...corServer,
									prevName: value.item.name,
									nextName: formValue,
									newPath: value.path,
								}),
							);
					}
					break;
				}

				case 'sftp_new_folder': {
					const uuid = input_popup.uuid;
					const corServer = sftp.find((it) => it.uuid === uuid);
					const {mode, path, tempPath} = corServer;

					if (formValue === '') return;
					if (mode === 'drop' && tempPath !== '') {
						dispatch(
							commandMkdirAction({
								...corServer,
								newPath: `${tempPath}/${formValue}`,
							}),
						);
					} else {
						dispatch(
							commandMkdirAction({
								...corServer,
								newPath: `${path}/${formValue}`,
							}),
						);
					}
					break;
				}

				default:
					break;
			}
			closeModal();
		},
		[input_popup, dispatch, formValue, sftp],
	);
	//when form is open, fill in pre-value and focus and select it
	useEffect(() => {
		const fillInForm = async () => {
			if (input_popup.open) {
				if (input_popup.key === 'sftp_rename_file_folder') {
					const {highlight, mode} = sftp.find(
						(it) => it.uuid === input_popup.uuid,
					);

					if (mode === 'list') await setFormValue(highlight[0].name);
					else await setFormValue(highlight[0].item.name);
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
		>
			<_Header>
				<_HeaderText>{HeaderMessage[input_popup.key]}</_HeaderText>
				<IconButton onClick={closeModal}>
					<IoCloseOutline />
				</IconButton>
			</_Header>

			<_Form onSubmit={submitFunction}>
				<_Input
					ref={inputRef}
					value={formValue}
					onChange={onChangeFormValue}
					placeholder={Placeholder[input_popup.key]}
				/>
			</_Form>

			<_Footer>
				<BorderButton onClick={closeModal}>{t('cancel')}</BorderButton>
				<PrimaryButton onClick={submitFunction}>
					{t('save')}
				</PrimaryButton>
			</_Footer>
		</_Modal>
	);
};

export default InputPopup;
