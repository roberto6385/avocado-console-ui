import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {
	SSH_ADD_SNIPPET_REQUEST,
	SSH_CHANGE_SNIPPET_REQUEST,
	SSH_DELETE_SNIPPET_REQUEST,
} from '../../reducers/ssh';
import TextBoxField_ from '../RecycleComponents/TextBoxField_';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {closeIcon, deleteIcon, plusIcon} from '../../icons/icons';
import {
	borderColor,
	fontColor,
	inputFocusBoaderColor,
	settingInput,
} from '../../styles/color';
import {NormalButton, TransparentButton} from '../../styles/components/button';
import {HoverButton, IconButton} from '../../styles/components/icon';
import {
	ModalFooter,
	ModalHeader,
	PopupModal,
} from '../../styles/components/disalogBox';
import {Input} from '../../styles/components/input';
import {Form} from '../../styles/components/form';
import {TextArea} from '../../styles/components/textArea';

const _PopupModal = styled(PopupModal)`
	width: 598px;
	height: 520px;
	z-index: 5;
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

const _Ul = styled.ul`
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

const _Li = styled.li`
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

const _HeaderLi = styled(_Li)`
	padding: 2px 16px;
	border: none;
`;

const _ListContainer = styled.div`
	display: flex;
	flex-direction: row;
	overflow: scroll;
`;

const SnippetsManager = ({open, setOpen}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('snippets');

	const {theme} = useSelector((state) => state.common, shallowEqual);
	const {snippets, snippents_index} = useSelector(
		(state) => state.ssh,
		shallowEqual,
	);

	const [tempSnippets, setTempSnippets] = useState(snippets);
	const [index, setIndex] = useState(snippents_index);
	const [name, setName] = useState('');
	const [content, setContent] = useState('');
	const [selectedSnippet, setSelectedSnippet] = useState(null);
	const nameInputRef = useRef(null);

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

	const onClickCancel = useCallback(() => {
		setName('');
		setContent('');
		setTempSnippets(snippets);
		setIndex(snippents_index);
		setOpen(false);
	}, [snippets, snippents_index]);

	const onClickSubmit = useCallback(() => {
		const name = tempSnippets.map((v) => {
			return v.name;
		});

		if (
			tempSnippets.filter((v) => v.name === '' || v.content === '')
				.length > 0
		) {
			dispatch({type: OPEN_ALERT_POPUP, data: 'snippets_blank'});
		} else if (new Set(name).size !== name.length) {
			dispatch({type: OPEN_ALERT_POPUP, data: 'snippets_name_duplicate'});
		} else {
			const deleteSnippets = snippets.filter(
				(x) => !tempSnippets.map((x) => x.id).includes(x.id),
			);

			const editSnippets = tempSnippets
				.filter((x) => snippets.map((x) => x.id).includes(x.id))
				.filter(
					(x) =>
						!tempSnippets
							.filter((x2) => snippets.includes(x2))
							.includes(x),
				);

			const addSnippets = tempSnippets.filter(
				(x) => !snippets.map((x) => x.id).includes(x.id),
			);

			console.log(deleteSnippets, editSnippets, addSnippets);

			for (let i = 0; i < deleteSnippets.length; i++) {
				dispatch({
					type: SSH_DELETE_SNIPPET_REQUEST,
					data: deleteSnippets[i].id,
				});
			}

			for (let i = 0; i < editSnippets.length; i++) {
				dispatch({
					type: SSH_CHANGE_SNIPPET_REQUEST,
					data: {
						id: editSnippets[i].id,
						name: editSnippets[i].name,
						content: editSnippets[i].content,
					},
				});
			}

			for (let i = 0; i < addSnippets.length; i++) {
				dispatch({
					type: SSH_ADD_SNIPPET_REQUEST,
					data: {
						name: addSnippets[i].name,
						content: addSnippets[i].content,
					},
				});
			}

			setOpen(false);
		}
	}, [snippets, tempSnippets, index]);

	const onClickSnippet = useCallback(
		(id) => () => {
			setName(tempSnippets.find((v) => v.id === id).name);
			setContent(tempSnippets.find((v) => v.id === id).content);
			setSelectedSnippet(id);
			nameInputRef.current?.focus();
		},
		[tempSnippets, nameInputRef],
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
		nameInputRef.current?.focus();
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
			nameInputRef.current?.focus();
		}
	}, [selectedSnippet, tempSnippets]);

	useEffect(() => {
		if (open) {
			if (snippets.length !== 0) {
				setSelectedSnippet(snippets[0].id);
				setName(snippets[0].name);
				setContent(snippets[0].content);
			} else {
				setSelectedSnippet(null);
				setName('');
				setContent('');
			}
			setIndex(snippents_index);
			setTempSnippets(snippets);
		}
	}, [open, snippets, snippents_index, nameInputRef]);

	return (
		<_PopupModal
			isOpen={open}
			onRequestClose={onClickCancel}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<ModalHeader>
				<div>{t('snippetsManager')}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCancel}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>
			<_ListContainer>
				<_Ul>
					<_HeaderLi>
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
					</_HeaderLi>

					{tempSnippets.map((v) => (
						<_Li
							key={v.id}
							onClick={onClickSnippet(v.id)}
							selected={selectedSnippet === v.id ? 1 : 0}
						>
							{v.name === '' ? t('new') : v.name}
						</_Li>
					))}
				</_Ul>
				<_Form>
					<TextBoxField_ title={t('name')}>
						<Input
							autoFocus={true}
							ref={nameInputRef}
							value={name}
							onChange={onChangeName}
							type='text'
							placeholder={t('place.name')}
						/>
					</TextBoxField_>
					<TextBoxField_ title={t('content')}>
						<TextArea
							value={content}
							onChange={onChangeContent}
							type='text'
							placeholder={t('place.content')}
						/>
					</TextBoxField_>
				</_Form>
			</_ListContainer>
			<ModalFooter>
				<TransparentButton onClick={onClickCancel}>
					{t('cancel')}
				</TransparentButton>
				<NormalButton onClick={onClickSubmit}>{t('save')}</NormalButton>
			</ModalFooter>
		</_PopupModal>
	);
};

SnippetsManager.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default SnippetsManager;
