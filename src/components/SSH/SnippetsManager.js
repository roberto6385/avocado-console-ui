import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {SSH_CHANGE_SNIPPET_REQUEST} from '../../reducers/ssh';
import InputFiled_ from '../RecycleComponents/InputFiled_';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {closeIcon, deleteIcon, plusIcon} from '../../icons/icons';
import {
	Form,
	Input,
	ModalFooter,
	ModalHeader,
	PopupModal,
} from '../../styles/default';
import {
	borderColor,
	fontColor,
	inputFocusBoaderColor,
	mainBackColor,
	settingInput,
	snippetsBoarderColor,
	snippetsCLickedListColor,
	snippetsListColor,
} from '../../styles/color';
import {
	ClickableIconButton,
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/button';

const _PopupModal = styled(PopupModal)`
	width: 598px;
	height: 520px;
	z-index: 5;
`;

const _Textarea = styled.textarea`
	height: 288px;
	padding: 6px 10px 260px;
	border-radius: 4px;
	border: 1px solid ${(props) => borderColor[props.theme_value]};
	background: ${(props) => settingInput[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
	resize: none;
	&:focus {
		border-color: ${(props) => inputFocusBoaderColor[props.theme_value]};
	}
`;

const _Form = styled(Form)`
	height: 416px;
	padding-bottom: 0px;
	flex: 1;
`;

const _ListHeader = styled.div`
	flex: 1;
	vertical-align: middle;
`;

const _Ul = styled.ul`
	width: 193px;
	height: 416px;
	border-right: 1px solid ${(props) => borderColor[props.theme_value]};
	background: ${(props) => snippetsListColor[props.theme_value]};
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
		props.clicked
			? snippetsCLickedListColor[props.theme_value]
			: snippetsListColor[props.theme_value]};
	border-left: 2px solid
		${(props) =>
			props.clicked
				? snippetsBoarderColor[props.theme_value]
				: snippetsListColor[props.theme_value]};
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

const SnippetsManeger = ({open, setOpen}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('snippets');
	const {theme} = useSelector((state) => state.common);
	const {snippets, snippents_index} = useSelector((state) => state.ssh);
	const [tempSnippets, setTempSnippets] = useState(snippets);
	const [index, setIndex] = useState(snippents_index);
	const [name, setName] = useState('');
	const [content, setContent] = useState('');
	const [clickedSnippet, setClickedSnippet] = useState(null);
	const nameInput = useRef(null);

	const onChangeName = useCallback(
		(e) => {
			setName(e.target.value);
			setTempSnippets(
				tempSnippets.map((v) => {
					if (v.id === clickedSnippet)
						return {...v, name: e.target.value};
					else return v;
				}),
			);
		},
		[clickedSnippet, tempSnippets],
	);

	const onChangeContent = useCallback(
		(e) => {
			setContent(e.target.value);
			setTempSnippets(
				tempSnippets.map((v) => {
					if (v.id === clickedSnippet)
						return {...v, content: e.target.value};
					else return v;
				}),
			);
		},
		[clickedSnippet, tempSnippets],
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
			dispatch({
				type: SSH_CHANGE_SNIPPET_REQUEST,
				data: {snippets: tempSnippets, snippents_index: index},
			});
			setOpen(false);
		}
	}, [snippets, tempSnippets, index]);

	const onClickSnippet = useCallback(
		(id) => () => {
			setName(tempSnippets.find((v) => v.id === id).name);
			setContent(tempSnippets.find((v) => v.id === id).content);
			setClickedSnippet(id);
			nameInput.current?.focus();
		},
		[tempSnippets, nameInput],
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
		setClickedSnippet(index);
		setIndex(index + 1);
		setName('');
		setContent('');
		nameInput.current?.focus();
	}, [tempSnippets, index, nameInput]);

	const onClickDeleteSnippet = useCallback(() => {
		if (clickedSnippet !== null) {
			setTempSnippets(
				tempSnippets.filter((x) => x.id !== clickedSnippet),
			);
			if (tempSnippets.length !== 0)
				setClickedSnippet(tempSnippets[0].id);
			else setClickedSnippet(null);
		}
	}, [clickedSnippet, tempSnippets]);

	useEffect(() => {
		if (snippets.length !== 0 && open) {
			setClickedSnippet(snippets[0].id);
			setName(snippets[0].name);
			setContent(snippets[0].content);
		} else {
			setClickedSnippet(null);
			setName('');
			setContent('');
		}
	}, [open, snippets]);

	useEffect(() => {
		nameInput.current?.focus();
	}, [clickedSnippet]);

	return (
		<_PopupModal
			isOpen={open}
			onRequestClose={onClickCancel}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			theme_value={theme}
		>
			<ModalHeader theme_value={theme}>
				<div>{t('snippetsManager')}</div>
				<ClickableIconButton
					color={fontColor[theme]}
					size={'sm'}
					margin={'0px'}
				>
					{closeIcon}
				</ClickableIconButton>
			</ModalHeader>
			<_ListContainer>
				<_Ul theme_value={theme} back={mainBackColor[theme]}>
					<_HeaderLi>
						<_ListHeader>{t('snippetList')}</_ListHeader>
						<ClickableIconButton
							size={'sm'}
							theme_value={theme}
							margin={'8px'}
							onClick={onClickAddSnippet}
						>
							{plusIcon}
						</ClickableIconButton>
						<ClickableIconButton
							size={'sm'}
							theme_value={theme}
							margin={'0px'}
							onClick={onClickDeleteSnippet}
						>
							{deleteIcon}
						</ClickableIconButton>
					</_HeaderLi>

					{tempSnippets.map((v) => (
						<_Li
							key={v.id}
							onClick={onClickSnippet(v.id)}
							theme_value={theme}
							clicked={clickedSnippet === v.id ? 1 : 0}
						>
							{v.name === '' ? t('new') : v.name}
						</_Li>
					))}
				</_Ul>
				<_Form>
					<InputFiled_ title={t('name')}>
						<Input
							ref={nameInput}
							value={name}
							onChange={onChangeName}
							type='text'
							placeholder={t('place.name')}
							theme_value={theme}
						/>
					</InputFiled_>
					<InputFiled_ title={t('content')}>
						<_Textarea
							value={content}
							onChange={onChangeContent}
							type='text'
							placeholder={t('place.content')}
							theme_value={theme}
						/>
					</InputFiled_>
				</_Form>
			</_ListContainer>
			<ModalFooter theme_value={theme}>
				<PrimaryGreyButton theme_value={theme} onClick={onClickCancel}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryGreenButton theme_value={theme} onClick={onClickSubmit}>
					{t('save')}
				</PrimaryGreenButton>
			</ModalFooter>
		</_PopupModal>
	);
};

SnippetsManeger.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default SnippetsManeger;
