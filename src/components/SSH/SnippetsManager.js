import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {SSH_CHANGE_SNIPPET_REQUEST} from '../../reducers/ssh';
import {
	FOLDER_HEIGHT,
	IconButton,
	fontColor,
	iconColor,
	sideColor,
	backColor,
} from '../../styles/global';
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
	L_GREEN_NORMAL,
	settingInput,
	snippetsBoarderColor,
} from '../../styles/color';

const _PopupModal = styled(PopupModal)`
	width: 600px;
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
`;

const _Text = styled.div`
	line-height: ${FOLDER_HEIGHT};
	font-size: 14px;
	flex: 1;
	vertical-align: middle;
`;

const _Ul = styled.ul`
	width: 193px;
	height: 416px;
	padding: 0 0 175px;
	border-right: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
`;

const _Li = styled.li`
	width: 193px;
	height: 40px;
	letter-spacing: 0.14px;
	text-align: left;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: ${(props) => props.back};
	padding: ${(props) =>
		props.clicked ? '1px 15px 3px 12px' : '1px 15px 3px 14px'};
	border-color: ${(props) => snippetsBoarderColor[props.themeValue]};
	border-left: ${(props) => (props.clicked ? '2px solid' : 'none')};
`;

const _HeaderLi = styled(_Li)`
	padding: 2px 14px;
`;

// const _InputFiled = styled(InputFiled_)`
// 	width: 372px;
// 	height: 16px;
// 	margin: 0 0 6px;
// 	color: ${(props) => props.color};
// `;

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
			isOpen={true}
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
				<_Ul b_color={borderColor[theme]} back={backColor[theme]}>
					<_HeaderLi>
						<_Text>{t('snippetList')}</_Text>
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
							height={'40px'}
							width={'193px'}
							key={v.id}
							onClick={onClickSnippet(v.id)}
							variant={clickedSnippet === v.id && 'primary'}
							back={
								clickedSnippet === v.id
									? sideColor[theme]
									: backColor[theme]
							}
							themeValue={theme}
							clicked={clickedSnippet === v.id ? true : false}
						>
							<_Text>{v.name === '' ? t('new') : v.name}</_Text>
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
