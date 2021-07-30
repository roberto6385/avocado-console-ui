import React, {useCallback, useEffect, useRef, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {CLOSE_STAT_FORM_POPUP} from '../../reducers/popup';

import {commandStatAction} from '../../reducers/sftp';
import styled from 'styled-components';

import {closeIcon} from '../../icons/icons';
import {DefaultIconButton} from '../../styles/icon';
import InputField_ from '../RecycleComponents/inputField_';
import Checkbox_ from '../RecycleComponents/Checkbox_';
import {ModalFooter, PopupModal} from '../../styles/components/modal';
import {Form} from '../../styles/components/form';
import ModalHeader from 'react-bootstrap/ModalHeader';
import {
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/components/button';
import {UserInput} from '../../styles/components/siginIn';
import {octToSymbol} from '../SFTP/functions';

const _PopupModal = styled(PopupModal)`
	width: 404px;
`;

const _Form = styled(Form)`
	padding-bottom: 29px;
`;

const FileStatForm = () => {
	const dispatch = useDispatch();

	const [permission, setPermission] = useState(0);
	const [checked, setChecked] = useState([
		{key: 'own', type: 'Execute', value: '1', checked: false},
		{key: 'own', type: 'Write', value: '2', checked: false},
		{key: 'own', type: 'Read', value: '4', checked: false},
		{key: 'grp', type: 'Execute', value: '1', checked: false},
		{key: 'grp', type: 'Write', value: '2', checked: false},
		{key: 'grp', type: 'Read', value: '4', checked: false},
		{key: 'pub', type: 'Execute', value: '1', checked: false},
		{key: 'pub', type: 'Write', value: '2', checked: false},
		{key: 'pub', type: 'Read', value: '4', checked: false},
	]);
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

			console.log(permission);

			const arr = parseInt(permission).toString().split('');
			const t = type === 40 ? 'd' : '-';
			console.log(arr);
			console.log(
				t + octToSymbol({own: arr[0], grp: arr[1], pub: arr[2]}),
			);
			closeModal();
		},
		[closeModal, permission, type],
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
				<InputField_>
					{checked.map((x) => {
						return (
							<Checkbox_
								key={x.key + x.type}
								title={x.type}
								value={false}
								handleCheck={() => console.log('')}
								theme_value={0}
							/>
						);
					})}
				</InputField_>
				<InputField_>
					<UserInput
						type='number'
						max={777}
						value={permission}
						onChange={(e) => setPermission(e.target.value)}
					/>
				</InputField_>
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
