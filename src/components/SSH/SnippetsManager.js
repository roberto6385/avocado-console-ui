import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {sshAction, sshSelector} from '../../reducers/ssh';
import TextBoxField from '../RecycleComponents/TextBoxField';
import {closeIcon, deleteIcon, plusIcon} from '../../icons/icons';
import {NormalButton, TransparentButton} from '../../styles/components/button';
import {HoverButton, IconButton} from '../../styles/components/icon';
import {
	DialogBox,
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../styles/components/disalogBox';
import {TextBox} from '../../styles/components/textBox';
import {Form} from '../../styles/components/form';
import {TextArea} from '../../styles/components/textArea';
import {dialogBoxAction, dialogBoxSelector} from '../../reducers/dialogBoxs';

const _PopupModal = styled(DialogBox)`
	width: 598px;
	height: 520px;
`;

const _Form = styled(Form)`
	height: 416px;
	padding-bottom: 0px;
	flex: 1;
`;

const _Header = styled.div`
	flex: 1;
	vertical-align: middle;
`;

const _SnippetList = styled.ul`
	width: 193px;
	height: 416px;
	border-right: 1px solid
		${(props) =>
			props.theme.basic.pages.dialogBoxs.normalStyle.border.color};
	background: ${(props) =>
		props.theme.basic.pages.dialogBoxs.normalStyle.subBlock
			.backgroundColor};
	overflow: scroll;
`;

const _Snippet = styled.li`
	width: 192px;
	height: 40px;
	letter-spacing: 0.14px;
	text-align: left;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1px 16px 3px 14px;
	background: ${(props) =>
		props.selected
			? props.theme.pages.webTerminal.main.panels.ssh.snippetsManager.list
					.selectedStyle.backgroundColor
			: props.theme.pages.webTerminal.main.panels.ssh.snippetsManager.list
					.normalStyle.backgroundColor};
	border-left: 2px solid
		${(props) =>
			props.selected
				? props.theme.pages.webTerminal.main.panels.ssh.snippetsManager
						.list.selectedStyle.border.color
				: props.theme.pages.webTerminal.main.panels.ssh.snippetsManager
						.list.normalStyle.border.color};
`;

const _HeaderContainer = styled(_Snippet)`
	padding: 2px 16px;
	border: none;
`;

const _Content = styled.div`
	display: flex;
	flex-direction: row;
	overflow: scroll;
`;
//TODO: snippet manager can be edited without temp index
const SnippetsManager = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('snippetsManager');

	const {form} = useSelector(dialogBoxSelector.all);
	const {snippets, snippetIndex} = useSelector(sshSelector.all);

	const [tempSnippets, setTempSnippets] = useState(snippets);
	const [index, setIndex] = useState(snippetIndex);
	const [name, setName] = useState('');
	const [content, setContent] = useState('');
	const [selectedSnippet, setSelectedSnippet] = useState(null);

	const nameTextBoxRef = useRef(null);

	const onChangeName = useCallback(
		(e) => {
			setName(e.target.value);
			setTempSnippets(
				tempSnippets.map((v) => {
					if (v.id === selectedSnippet)
						return {...v, name: e.target.value};
					else return v;
				}),
			);
		},
		[selectedSnippet, tempSnippets],
	);

	const onChangeContent = useCallback(
		(e) => {
			setContent(e.target.value);
			setTempSnippets(
				tempSnippets.map((v) => {
					if (v.id === selectedSnippet)
						return {...v, content: e.target.value};
					else return v;
				}),
			);
		},
		[selectedSnippet, tempSnippets],
	);

	const onClickCancelChanges = useCallback(() => {
		setName('');
		setContent('');
		setTempSnippets(snippets);
		setIndex(snippetIndex);
		dispatch(dialogBoxAction.closeForm());
	}, [dispatch, snippets, snippetIndex]);

	const onClickSaveChangesOnSnippets = useCallback(() => {
		const snippetNameList = tempSnippets.map((v) => {
			return v.name;
		});
		//snippets have blank val
		if (
			tempSnippets.filter((v) => v.name === '' || v.content === '')
				.length > 0
		) {
			dispatch(dialogBoxAction.openForm({key: 'blank-snippets'}));
			//snippets have duplicated val
		} else if (new Set(snippetNameList).size !== snippetNameList.length) {
			dispatch(dialogBoxAction.openForm({key: 'duplicate-snippet-name'}));
			//save snippet changes
		} else {
			//deleted snippets
			const deleteSnippets = snippets.filter(
				(x) => !tempSnippets.map((x) => x.id).includes(x.id),
			);
			//edited snippets
			const editSnippets = tempSnippets
				.filter((x) => snippets.map((x) => x.id).includes(x.id))
				.filter(
					(x) =>
						!tempSnippets
							.filter((x2) => snippets.includes(x2))
							.includes(x),
				);
			//added snippets
			const addSnippets = tempSnippets.filter(
				(x) => !snippets.map((x) => x.id).includes(x.id),
			);
			//req delete snippets
			for (let x of deleteSnippets) {
				dispatch(sshAction.deleteSnippet(x.id));
			}
			//req edit snippets
			for (let x of editSnippets) {
				dispatch(
					sshAction.changeSnippet({
						id: x.id,
						name: x.name,
						content: x.content,
					}),
				);
			}
			//req add snippets
			for (let x of addSnippets) {
				dispatch(
					sshAction.addSnippet({
						name: x.name,
						content: x.content,
					}),
				);
			}
			dispatch(dialogBoxAction.closeForm());
		}
	}, [dispatch, snippets, tempSnippets]);

	const onClickSnippet = useCallback(
		(id) => () => {
			setName(tempSnippets.find((v) => v.id === id).name);
			setContent(tempSnippets.find((v) => v.id === id).content);
			setSelectedSnippet(id);
			nameTextBoxRef.current?.focus();
		},
		[tempSnippets, nameTextBoxRef],
	);

	const onClickAddSnippet = useCallback(() => {
		setTempSnippets([
			...tempSnippets,
			{
				id: index,
				name: '',
				content: '',
			},
		]);
		setName('');
		setContent('');
		setSelectedSnippet(index);
		setIndex(index + 1);
		nameTextBoxRef.current?.focus();
	}, [tempSnippets, index]);

	const onClickRemoveSnippet = useCallback(() => {
		if (selectedSnippet !== null) {
			const newSnippets = tempSnippets.filter(
				(x) => x.id !== selectedSnippet,
			);

			if (newSnippets.length !== 0) {
				setName(newSnippets[0].name);
				setContent(newSnippets[0].content);
				setSelectedSnippet(newSnippets[0].id);
			} else {
				setName('');
				setContent('');
				setSelectedSnippet(null);
			}

			setTempSnippets(newSnippets);
			nameTextBoxRef.current?.focus();
		}
	}, [selectedSnippet, tempSnippets]);

	useEffect(() => {
		if (form.open && form.key === 'snippet') {
			if (snippets.length !== 0) {
				setSelectedSnippet(snippets[0].id);
				setName(snippets[0].name);
				setContent(snippets[0].content);
			} else {
				setSelectedSnippet(null);
				setName('');
				setContent('');
			}
			setIndex(snippetIndex);
			setTempSnippets(snippets);
		}
	}, [form, snippets, snippetIndex, nameTextBoxRef]);

	return (
		<_PopupModal
			isOpen={form.open && form.key === 'snippet'}
			onRequestClose={onClickCancelChanges}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				<div>{t('snippetsManager')}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCancelChanges}
				>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>
			<_Content>
				<_SnippetList>
					<_HeaderContainer>
						<_Header>{t('snippetList')}</_Header>
						<HoverButton
							size={'sm'}
							margin={'8px'}
							onClick={onClickAddSnippet}
						>
							{plusIcon}
						</HoverButton>
						<HoverButton
							size={'sm'}
							margin={'0px'}
							onClick={onClickRemoveSnippet}
						>
							{deleteIcon}
						</HoverButton>
					</_HeaderContainer>

					{tempSnippets.map((v) => (
						<_Snippet
							key={v.id}
							onClick={onClickSnippet(v.id)}
							selected={selectedSnippet === v.id ? 1 : 0}
						>
							{v.name === '' ? t('new') : v.name}
						</_Snippet>
					))}
				</_SnippetList>
				<_Form>
					<TextBoxField title={t('name')}>
						<TextBox
							autoFocus={true}
							ref={nameTextBoxRef}
							value={name}
							onChange={onChangeName}
							type='text'
							placeholder={t('placeholder.name')}
						/>
					</TextBoxField>
					<TextBoxField title={t('content')}>
						<TextArea
							value={content}
							onChange={onChangeContent}
							type='text'
							placeholder={t('placeholder.content')}
						/>
					</TextBoxField>
				</_Form>
			</_Content>
			<DialogBoxFooter>
				<TransparentButton onClick={onClickCancelChanges}>
					{t('cancel')}
				</TransparentButton>
				<NormalButton onClick={onClickSaveChangesOnSnippets}>
					{t('save')}
				</NormalButton>
			</DialogBoxFooter>
		</_PopupModal>
	);
};

export default SnippetsManager;
