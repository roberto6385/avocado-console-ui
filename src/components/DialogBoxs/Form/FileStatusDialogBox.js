import React, {useCallback, useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';

import {CHMOD_REQUEST, STAT_REQUEST} from '../../../reducers/sftp';
import styled from 'styled-components';

import {closeIcon} from '../../../icons/icons';
import {IconButton} from '../../../styles/components/icon';
import CheckBox from '../../RecycleComponents/CheckBox';
import {
	DialogBox,
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../../styles/components/disalogBox';
import {Form} from '../../../styles/components/form';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/button';
import {TextBox} from '../../../styles/components/textBox';
import {useTranslation} from 'react-i18next';

const _DialogBox = styled(DialogBox)`
	width: 404px;
`;

const _Form = styled(Form)`
	padding-bottom: 29px;
`;

const _Row = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;
`;

const _Col = styled.div`
	display: flex;
	flex-direction: column;
`;

const KeySpan = styled.span`
	font-size: 18px;
`;

const FileStatusDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('fileStatusDialogBox');

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
	const {form} = useSelector(dialogBoxSelector.all);

	const uuid = form.uuid;
	const ws = sftp_socketState.find((it) => it.uuid === uuid)?.socket;
	const path = sftp_pathState.find((it) => it.uuid === uuid)?.path;
	const highlight = sftp_highState.find((it) => it.uuid === uuid)?.highlight;

	const onCloseDialogBox = useCallback(() => {
		dispatch(dialogBoxAction.closeForm());
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
			dispatch({
				type: CHMOD_REQUEST,
				payload: {
					permissions: per,
					path: stat.path,
					socket: ws,
					uuid: uuid,
				},
			});
			onCloseDialogBox();
		},
		[onCloseDialogBox, dispatch, grp, own, pub, ws, stat, type, uuid],
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
		if (form.open && form.key === 'sftp_stat') {
			dispatch({
				type: STAT_REQUEST,
				payload: {
					stat_path: path,
					file: highlight[0],
					socket: ws,
				},
			});
		}
	}, [dispatch, highlight, path, ws, form]);

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

			const checkList = [
				{key: 'own', type: t('read'), value: '4', checked: false},
				{key: 'own', type: t('write'), value: '2', checked: false},
				{key: 'own', type: t('execute'), value: '1', checked: false},
				{key: 'grp', type: t('read'), value: '4', checked: false},
				{key: 'grp', type: t('write'), value: '2', checked: false},
				{key: 'grp', type: t('execute'), value: '1', checked: false},
				{key: 'pub', type: t('read'), value: '4', checked: false},
				{key: 'pub', type: t('write'), value: '2', checked: false},
				{key: 'pub', type: t('execute'), value: '1', checked: false},
			];

			value.split('').map((v, i) => {
				v === '1'
					? (checkList[i].checked = true)
					: (checkList[i].checked = false);
			});
			setChecked(checkList);
		}
	}, [grp, own, pub, t]);

	return (
		checked.length !== 0 && (
			<_DialogBox
				isOpen={form.open && form.key === 'sftp_stat'}
				onRequestClose={onCloseDialogBox}
				ariaHideApp={false}
				shouldCloseOnOverlayClick={false}
			>
				<DialogBoxHeader>
					{/*<div>{HeaderMessage[file_status_dialog_box.resourceGroupId]}</div>*/}
					<div>{t('title')}</div>
					<IconButton
						btype={'font'}
						size={'sm'}
						margin={'0px'}
						onClick={onCloseDialogBox}
					>
						{closeIcon}
					</IconButton>
				</DialogBoxHeader>

				<_Form onSubmit={submitFunction}>
					<_Row>
						<_Col>
							<KeySpan>{t('owner')}</KeySpan>
							<br />

							<CheckBox
								title={checked[0].type}
								value={checked[0].checked}
								onChangeCheck={checkFunc(checked[0])}
							/>
							<br />
							<CheckBox
								title={checked[1].type}
								value={checked[1].checked}
								onChangeCheck={checkFunc(checked[1])}
							/>

							<br />
							<CheckBox
								title={checked[2].type}
								value={checked[2].checked}
								onChangeCheck={checkFunc(checked[2])}
							/>
						</_Col>
						<_Col>
							<KeySpan>{t('group')}</KeySpan>
							<br />

							<CheckBox
								title={checked[3].type}
								value={checked[3].checked}
								onChangeCheck={checkFunc(checked[3])}
							/>
							<br />
							<CheckBox
								title={checked[4].type}
								value={checked[4].checked}
								onChangeCheck={checkFunc(checked[4])}
							/>
							<br />
							<CheckBox
								title={checked[5].type}
								value={checked[5].checked}
								onChangeCheck={checkFunc(checked[5])}
							/>
						</_Col>
						<_Col>
							<KeySpan>{t('public')}</KeySpan>
							<br />

							<CheckBox
								title={checked[6].type}
								value={checked[6].checked}
								onChangeCheck={checkFunc(checked[6])}
							/>
							<br />
							<CheckBox
								title={checked[7].type}
								value={checked[7].checked}
								onChangeCheck={checkFunc(checked[7])}
							/>
							<br />
							<CheckBox
								title={checked[8].type}
								value={checked[8].checked}
								onChangeCheck={checkFunc(checked[8])}
							/>
						</_Col>
					</_Row>
					<TextBox
						type='text'
						value={permission}
						onChange={handleInputValue}
						onBlur={handleBlur}
					/>
				</_Form>

				<DialogBoxFooter>
					<TransparentButton onClick={onCloseDialogBox}>
						{t('cancel')}
					</TransparentButton>
					<NormalButton onClick={submitFunction}>
						{t('save')}
					</NormalButton>
				</DialogBoxFooter>
			</_DialogBox>
		)
	);
};

export default FileStatusDialogBox;
