import React, {useCallback, useEffect, useRef, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {CLOSE_STAT_FORM_POPUP} from '../../reducers/popup';
import useInput from '../../hooks/useInput';
import {commandStatAction} from '../../reducers/sftp';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {closeIcon} from '../../icons/icons';
import {Form, ModalFooter, ModalHeader, PopupModal} from '../../styles/default';
import {PrimaryGreenButton, PrimaryGreyButton} from '../../styles/button';
import {DefaultIconButton} from '../../styles/icon';

const _PopupModal = styled(PopupModal)`
	width: 404px;
`;

const _Form = styled(Form)`
	padding-bottom: 29px;
`;

const FileStatForm = () => {
	const dispatch = useDispatch();

	const {
		socket: sftp_socketState,
		path: sftp_pathState,
		high: sftp_highState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {theme} = useSelector((state) => state.common, shallowEqual);
	const {stat_form_popup} = useSelector((state) => state.popup, shallowEqual);

	const uuid = stat_form_popup.uuid;
	const socket = sftp_socketState.find((it) => it.uuid === uuid)?.socket;
	const path = sftp_pathState.find((it) => it.uuid === uuid)?.path;
	const highlight = sftp_highState.find((it) => it.uuid === uuid)?.highlight;

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_STAT_FORM_POPUP});
	}, [dispatch]);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();
			console.log('submit');
			closeModal();
		},
		[closeModal],
	);

	useEffect(() => {
		if (stat_form_popup.open) {
			dispatch(
				commandStatAction({
					stat_path: path,
					file: highlight[0],
					socket: socket,
				}),
			);
		}
	}, [dispatch, highlight, path, socket, stat_form_popup.open]);

	return (
		<_PopupModal
			isOpen={stat_form_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			theme_value={theme}
		>
			<ModalHeader theme_value={theme}>
				{/*<div>{HeaderMessage[stat_form_popup.key]}</div>*/}
				<div>속성</div>
				<DefaultIconButton
					theme_value={theme}
					size={'sm'}
					margin={'0px'}
					onClick={closeModal}
				>
					{closeIcon}
				</DefaultIconButton>
			</ModalHeader>

			<_Form onSubmit={submitFunction}>
				<input type='text' />
			</_Form>

			<ModalFooter theme_value={theme}>
				<PrimaryGreyButton theme_value={theme} onClick={closeModal}>
					취소
				</PrimaryGreyButton>
				<PrimaryGreenButton
					theme_value={theme}
					onClick={submitFunction}
				>
					저장
				</PrimaryGreenButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default FileStatForm;
