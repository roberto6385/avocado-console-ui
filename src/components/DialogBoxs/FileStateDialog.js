import React, {useCallback, useEffect, useRef, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {CLOSE_STAT_FORM_POPUP} from '../../reducers/popup';

import {commandStatAction} from '../../reducers/sftp';
import styled from 'styled-components';

import {closeIcon} from '../../icons/icons';
import {IconButton} from '../../styles/components/icon';
import TextBox_ from '../RecycleComponents/TextBox_';
import CheckBox_ from '../RecycleComponents/CheckBox_';
import {ModalFooter, PopupModal} from '../../styles/components/disalogBox';
import {Form} from '../../styles/components/form';
import ModalHeader from 'react-bootstrap/ModalHeader';
import {
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/components/button';
import {UserInput} from '../../styles/components/siginIn';

const _PopupModal = styled(PopupModal)`
	width: 404px;
`;

const _Form = styled(Form)`
	padding-bottom: 29px;
`;

const FileStateDialog = () => {
	const dispatch = useDispatch();

	const valueArray = [
		{
			key: 'Read',
			value: 4,
		},
		{
			key: 'Write',
			value: 2,
		},
		{
			key: 'Execute',
			value: 1,
		},
	];

	const [permission, setPermission] = useState(0);
	const [type, setType] = useState(null);
	const {
		socket: sftp_socketState,
		path: sftp_pathState,
		high: sftp_highState,
		stat,
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

	const calculator = useCallback(() => {}, []);

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

	useEffect(() => {
		console.log(stat);
		if (stat) {
			setType(stat.fileType);
			setPermission(stat.permission);
		}
	}, [stat]);

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
				<IconButton
					theme_value={theme}
					size={'sm'}
					margin={'0px'}
					onClick={closeModal}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<_Form onSubmit={submitFunction}>
				<div>
					<span>Owner</span>
					{valueArray.map((v) => {
						return (
							<CheckBox_
								key={v.key}
								title={v.key}
								id={'Owner_' + v.key}
								value={v.value}
								handleCheck={calculator}
								theme_value={0}
							/>
						);
					})}
				</div>

				<div>
					<span>Group</span>
					{valueArray.map((v) => {
						return (
							<CheckBox_
								key={v.key}
								title={v.key}
								id={'Group' + v.key}
								value={v.value}
								handleCheck={calculator}
								theme_value={0}
							/>
						);
					})}
				</div>

				<div>
					<span>Public</span>
					{valueArray.map((v) => {
						return (
							<CheckBox_
								key={v.key}
								title={v.key}
								id={'Public' + v.key}
								value={v.value}
								handleCheck={calculator}
								theme_value={0}
							/>
						);
					})}
				</div>
				<TextBox_>
					<UserInput
						type='number'
						max={777}
						value={permission}
						onChange={(e) => setPermission(e.target.value)}
					/>
				</TextBox_>
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

export default FileStateDialog;
