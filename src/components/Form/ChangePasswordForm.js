import React, {useCallback, useEffect} from 'react';
import useInput from '../../hooks/useInput';
import Modal from 'react-modal';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import Input_ from '../RecycleComponents/Input_';
import {
	PrimaryGreyButton,
	FOLDER_HEIGHT,
	IconButton,
	MAIN_HEIGHT,
	PATH_SEARCH_INPUT_HEIGHT,
	PrimaryGreenButton,
	formColor,
	borderColor,
	fontColor,
	iconColor,
	inputColor,
} from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {closeIconSmall} from '../../icons/icons';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {FONT_14} from "../../styles/length";

const _Modal = styled(Modal)`
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
	position: absolute;
	z-index: 5;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.22);
	border-radius: 4px;
	width: 404px;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	height: ${FOLDER_HEIGHT};
	font-size: ${FONT_14};
	justify-content: space-between;
	padding: 0px 10px 0px 16px;

	border-bottom: 1px solid;
	border-color: ${(props) => props.b_color};
`;

const _Span = styled.span`
	line-height: ${FOLDER_HEIGHT};
`;

const _Input = styled.input`
	width: 100%;
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _Footer = styled.div`
	display: flex;
	ailgn-items: center;
	height: ${MAIN_HEIGHT};
	font-size: ${FONT_14};
	justify-content: flex-end;
	padding: 13px 8px;

	border-top: 1px solid;
	border-color: ${(props) => props.b_color};
`;

const _Form = styled.form`
	display: flex;
	width: 100%;
	flex-direction: column;
	font-size: ${FONT_14};
	padding: 18px 16px 29px 16px;
`;

const ChangePasswordForm = ({open, setOpen}) => {
	const {t} = useTranslation('changePasswordForm');
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);

	const [
		currentPassword,
		onChangeCurrentPassword,
		setCurrentPassword,
	] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [
		confrimPassword,
		onChangeConfirmPassword,
		setConfrimPassword,
	] = useInput('');

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({
				type: OPEN_ALERT_POPUP,
				data: 'developing',
			});

			//TODO: Add submit action

			closeModal();
		},
		[currentPassword, password, confrimPassword],
	);

	const closeModal = useCallback(() => {
		setOpen(false);
	}, []);

	useEffect(() => {
		if (open) {
			setCurrentPassword('');
			setPassword('');
			setConfrimPassword('');
		}
	}, [open]);

	return (
		<_Modal
			isOpen={open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			back={formColor[theme]}
			b_color={borderColor[theme]}
			color={fontColor[theme]}
		>
			<_Header b_color={borderColor[theme]}>
				<_Span>{t('title')}</_Span>
				<IconButton color={iconColor[theme]} onClick={closeModal}>
					{closeIconSmall}
				</IconButton>
			</_Header>
			<_Form onSubmit={onSubmitForm}>
				<Input_ title={t('current')}>
					<_Input
						type='password'
						value={currentPassword}
						onChange={onChangeCurrentPassword}
						placeholder={t('place.current')}
						back={inputColor[theme]}
						color={fontColor[theme]}
						b_color={borderColor[theme]}
					/>
				</Input_>

				<Input_ title={t('new')}>
					<_Input
						type='password'
						value={password}
						onChange={onChangePassword}
						placeholder={t('place.new')}
						back={inputColor[theme]}
						color={fontColor[theme]}
						b_color={borderColor[theme]}
					/>
				</Input_>

				<Input_>
					<_Input
						type='password'
						value={confrimPassword}
						onChange={onChangeConfirmPassword}
						placeholder={t('place.confirm')}
						back={inputColor[theme]}
						color={fontColor[theme]}
						b_color={borderColor[theme]}
					/>
				</Input_>
			</_Form>

			<_Footer b_color={borderColor[theme]}>
				<PrimaryGreyButton onClick={closeModal} color={fontColor[theme]}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryGreenButton onClick={onSubmitForm}>
					{t('save')}
				</PrimaryGreenButton>
			</_Footer>
		</_Modal>
	);
};

ChangePasswordForm.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
