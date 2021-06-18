import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {SSH_CHANGE_SNIPPET_REQUEST} from '../../reducers/ssh';
import {IconButton, fontColor, iconColor, backColor} from '../../styles/global';
import InputFiled_ from '../RecycleComponents/InputFiled_';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {closeIconMedium, deleteIconMidium, plusIcon} from '../../icons/icons';
import {
	Form,
	Input,
	ModalFooter,
	ModalHeader,
	ModalHeaderIconButton,
	PopupModal,
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/default';
import {
	borderColor,
	settingInput,
	snippetsBoarderColor,
	snippetsCLickedListColor,
	snippetsListColor,
} from '../../styles/color';

const _PopupModal = styled(PopupModal)`
	width: 598px;
	height: 520px;
	z-index: 5;
`;

const _Textarea = styled.textarea`
	height: 288px;
	padding: 6px 10px 260px;
	border-radius: 4px;
	border: 1px solid ${(props) => borderColor[props.themeValue]};
	background: ${(props) => settingInput[props.themeValue]};
	color: ${(props) => fontColor[props.themeValue]};
	resize: none;
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
	border-right: 1px solid ${(props) => borderColor[props.themeValue]};
	background: ${(props) => snippetsListColor[props.themeValue]};
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
	background: ${(props) =>
		props.clicked
			? snippetsCLickedListColor[props.themeValue]
			: snippetsListColor[props.themeValue]};
	padding: ${(props) =>
		props.clicked ? '1px 16px 3px 13px' : '1px 16px 3px 15px'};
	border-left: ${(props) => (props.clicked ? '2px solid' : 'none')};
	border-color: ${(props) => snippetsBoarderColor[props.themeValue]};
`;

const _HeaderLi = styled(_Li)`
	padding: 2px 16px;
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
			themeValue={theme}
		>
			<ModalHeader themeValue={theme}>
				<div>{t('snippetsManager')}</div>
				<ModalHeaderIconButton
					color={iconColor[theme]}
					onClick={onClickCancel}
				>
					{closeIconMedium}
				</ModalHeaderIconButton>
			</ModalHeader>
			<_ListContainer>
				<_Ul themeValue={theme} back={backColor[theme]}>
					<_HeaderLi>
						<_ListHeader>{t('snippetList')}</_ListHeader>
						<IconButton onClick={onClickAddSnippet}>
							{plusIcon}
						</IconButton>
						<IconButton
							padding={'2.5px 0px'}
							onClick={onClickDeleteSnippet}
						>
							{deleteIconMidium}
						</IconButton>
					</_HeaderLi>

					{tempSnippets.map((v) => (
						<_Li
							key={v.id}
							onClick={onClickSnippet(v.id)}
							themeValue={theme}
							clicked={clickedSnippet === v.id ? true : false}
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
							themeValue={theme}
						/>
					</InputFiled_>
					<InputFiled_ title={t('content')}>
						<_Textarea
							value={content}
							onChange={onChangeContent}
							type='text'
							placeholder={t('place.content')}
							themeValue={theme}
						/>
					</InputFiled_>
				</_Form>
			</_ListContainer>
			<ModalFooter themeValue={theme}>
				<PrimaryGreyButton themeValue={theme} onClick={onClickCancel}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryGreenButton themeValue={theme} onClick={onClickSubmit}>
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
