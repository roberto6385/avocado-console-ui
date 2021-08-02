import React, {useCallback, useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {CLOSE_STAT_FORM_POPUP} from '../../reducers/popup';

import {commandChmodAction, commandStatAction} from '../../reducers/sftp';
import styled from 'styled-components';

import {closeIcon} from '../../icons/icons';
import {IconButton} from '../../styles/components/icon';
import TextBoxField_ from '../RecycleComponents/TextBoxField_';
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

const RowDiv = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;
`;

const ColDiv = styled.div`
	display: flex;
	flex-direction: column;
`;

const KeySpan = styled.span`
	font-size: 18px;
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
	const [own, setOwner] = useState(null);
	const [grp, setGroup] = useState(null);
	const [pub, setPublic] = useState(null);
	const [checked, setChecked] = useState([]);
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
		setOwner(null);
		setGroup(null);
		setPublic(null);
	}, [dispatch]);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();
			if (!own || !grp || !pub) return;

			// console.log(t + octToSymbol({own, grp, pub}));
			const prev = type + own + grp + pub;
			const per = parseInt(prev, 8);
			dispatch(
				commandChmodAction({
					permissions: per,
					path: stat.path,
					socket: socket,
					uuid: uuid,
				}),
			);
			closeModal();
		},
		[closeModal, dispatch, grp, own, pub, socket, stat, type, uuid],
	);

	const checkFunc = useCallback(
		(x) => (e) => {
			console.log(e.target.checked);
			const prev = checked.slice();
			const item = checked.find(
				(v) => JSON.stringify(v) === JSON.stringify(x),
			);
			console.log(item);
			const index = checked.findIndex(
				(v) => JSON.stringify(v) === JSON.stringify(x),
			);
			console.log(index);
			prev.splice(index, 1, {
				...item,
				checked: e.target.checked,
			});
			let checkValue = [
				{key: 'own', list: []},
				{key: 'grp', list: []},
				{key: 'pub', list: []},
			];
			prev.forEach((v) => {
				checkValue
					.find((x) => x.key === v.key)
					.list.push(v.checked === true ? 1 : 0);
			});
			let permission = [];
			checkValue.forEach((v) => {
				permission.push(parseInt(parseInt(v.list.join('')), 2));
			});
			setOwner(permission[0].toString());
			setGroup(permission[1].toString());
			setPublic(permission[2].toString());
			setPermission(permission.join(''));
			setChecked(prev);
		},
		[checked],
	);

	const handleInputValue = useCallback(
		(e) => {
			const {value} = e.target;
			setPermission(value);
			const parsedValue = parseInt(value);

			if (value.length === 3 && parsedValue > -1 && parsedValue < 778) {
				console.log(value);
				let octValue = '';
				value.split('').forEach((v) => {
					const k = parseInt(v).toString(2);
					let caseValue = k;
					if (k.length === 1) {
						caseValue = '00' + k;
					} else if (k.length === 2) {
						caseValue = '0' + k;
					}
					octValue += caseValue;
				});
				const checkList = checked.slice();
				octValue.split('').map((v, i) => {
					v === '1'
						? (checkList[i].checked = true)
						: (checkList[i].checked = false);
				});
				setChecked(checkList);
			}
		},
		[checked],
	);

	const handleBlur = useCallback(
		(e) => {
			const {value} = e.target;
			const parsedValue = parseInt(value);

			if (value.length !== 3 || parsedValue < 0 || parsedValue > 777) {
				let checkValue = [
					{key: 'own', list: []},
					{key: 'grp', list: []},
					{key: 'pub', list: []},
				];
				checked.forEach((v) => {
					v.checked
						? checkValue.find((x) => x.key === v.key).list.push('1')
						: checkValue
								.find((x) => x.key === v.key)
								.list.push('0');
				});
				console.log(checkValue);
				let result = '';
				checkValue.forEach((v) => {
					result += parseInt(parseInt(v.list.join('')), 2).toString();
				});
				setPermission(result);
			}
		},
		[checked],
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
			setType(stat.data.fileType);
			const arr = stat.data.permission.toString().split('');
			setOwner(arr[0]);
			setGroup(arr[1]);
			setPublic(arr[2]);
		}
	}, [stat]);

	useEffect(() => {
		if (own && grp && pub) {
			let value = '';
			setPermission(own + grp + pub);
			// setPermission(own)
			const item = [own, grp, pub];
			item.forEach((i) => {
				const k = parseInt(i).toString(2);
				let caseValue = k;
				if (k.length === 1) {
					caseValue = '00' + k;
				} else if (k.length === 2) {
					caseValue = '0' + k;
				}
				value += caseValue;
			});
			console.log(value);
			const checkList = [
				{key: 'own', type: 'Read', value: '4', checked: false},
				{key: 'own', type: 'Write', value: '2', checked: false},
				{key: 'own', type: 'Execute', value: '1', checked: false},
				{key: 'grp', type: 'Read', value: '4', checked: false},
				{key: 'grp', type: 'Write', value: '2', checked: false},
				{key: 'grp', type: 'Execute', value: '1', checked: false},
				{key: 'pub', type: 'Read', value: '4', checked: false},
				{key: 'pub', type: 'Write', value: '2', checked: false},
				{key: 'pub', type: 'Execute', value: '1', checked: false},
			];

			value.split('').map((v, i) => {
				v === '1'
					? (checkList[i].checked = true)
					: (checkList[i].checked = false);
			});
			setChecked(checkList);
		}
	}, [grp, own, pub]);

	return (
		checked.length !== 0 && (
			<_PopupModal
				isOpen={stat_form_popup.open}
				onRequestClose={closeModal}
				ariaHideApp={false}
				shouldCloseOnOverlayClick={false}
				theme_value={theme}
			>
				<ModalHeader theme_value={theme}>
					{/*<div>{HeaderMessage[stat_form_popup.key]}</div>*/}
					<div>권한</div>
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
					<RowDiv>
						<ColDiv>
							<KeySpan>Owner</KeySpan>
							<br />

							<CheckBox_
								title={checked[0].type}
								value={checked[0].checked}
								handleCheck={checkFunc(checked[0])}
								theme_value={0}
							/>
							<br />
							<CheckBox_
								title={checked[1].type}
								value={checked[1].checked}
								handleCheck={checkFunc(checked[1])}
								theme_value={0}
							/>

							<br />
							<CheckBox_
								title={checked[2].type}
								value={checked[2].checked}
								handleCheck={checkFunc(checked[2])}
								theme_value={0}
							/>
						</ColDiv>
						<ColDiv>
							<KeySpan>Group</KeySpan>
							<br />

							<CheckBox_
								title={checked[3].type}
								value={checked[3].checked}
								handleCheck={checkFunc(checked[3])}
								theme_value={0}
							/>
							<br />
							<CheckBox_
								title={checked[4].type}
								value={checked[4].checked}
								handleCheck={checkFunc(checked[4])}
								theme_value={0}
							/>
							<br />
							<CheckBox_
								title={checked[5].type}
								value={checked[5].checked}
								handleCheck={checkFunc(checked[5])}
								theme_value={0}
							/>
						</ColDiv>
						<ColDiv>
							<KeySpan>Public</KeySpan>
							<br />

							<CheckBox_
								title={checked[6].type}
								value={checked[6].checked}
								handleCheck={checkFunc(checked[6])}
								theme_value={0}
							/>
							<br />
							<CheckBox_
								title={checked[7].type}
								value={checked[7].checked}
								handleCheck={checkFunc(checked[7])}
								theme_value={0}
							/>
							<br />
							<CheckBox_
								title={checked[8].type}
								value={checked[8].checked}
								handleCheck={checkFunc(checked[8])}
								theme_value={0}
							/>
						</ColDiv>
					</RowDiv>
					<TextBoxField_>
						<UserInput
							type='text'
							value={permission}
							onChange={handleInputValue}
							onBlur={handleBlur}
						/>
					</TextBoxField_>
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
		)
	);
};

export default FileStateDialog;
