import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {SSH_CHANGE_SNIPPET_REQUEST} from '../../reducers/ssh';
import {
	FOLDER_HEIGHT,
	IconButton,
	formColor,
	borderColor,
	fontColor,
	iconColor,
	sideColor,
	backColor,
	mintColor,
	inputColor,
} from '../../styles/global';
import Input_ from '../RecycleComponents/Input_';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {closeIconMedium, deleteIconMidium, plusIcon} from '../../icons/icons';
import {FONT_14} from '../../styles/length';
import {PrimaryGreenButton, PrimaryGreyButton} from '../../styles/default';

const _Modal = styled(Modal)`
	position: absolute;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	width: 600px;
	height: 520px;
	padding: 1px;
	border-radius: 4px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.22);
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
	// xterm.js 의 canvas가 z-index:3을 갖고 있어서 5를 넣어줌.
	z-index: 5;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 40px;
	font-size: ${FONT_14};
	padding: 2px 10px 2px 16px;
	border-bottom: 1px solid;
	border-color: ${(props) => props.b_color};
	font-weight: 500;
`;

const _Input = styled.input`
	// width: 372px;
	height: 34px;
	margin: 0;
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _TextareaInput = styled.textarea`
	// width: 372px;
	height: 278px;
	margin: 0;
	padding: 6px 10px 20px;
	border-radius: 4px;

	border: 1px solid;
	border-color: ${(props) => props?.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
	resize: none;
`;

const _Form = styled.form`
	width: 404px;
	height: 416px;
	margin: 0;
	padding: 18px 16px;
`;

const _Text = styled.div`
	line-height: ${FOLDER_HEIGHT};
	font-size: 14px;
	flex: 1;
	vertical-align: middle;
`;

const _Title = styled.span`
	line-height: ${FOLDER_HEIGHT};
	font-size: 14px;
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
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: 0.14px;
	text-align: left;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: ${(props) => props.back};
	border-color: ${(props) => props.b_color};
	padding: ${(props) => props.padding};
	border-left: ${(props) => props.b_left};
`;

const _HeaderLi = styled(_Li)`
	padding: 2px 14px;
`;

const _Footer = styled.div`
	display: flex;
	width: 598px;
	height: 60px;
	margin: 1px 0 0;
	padding: 13px 16px 13px 326px;
	border-top: 1px solid;
	border-color: ${(props) => props.b_color};
`;

const _Input_ = styled(Input_)`
	width: 372px;
	height: 16px;
	margin: 0 0 6px;
	font-family: Roboto;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: normal;
	letter-spacing: 0.14px;
	text-align: left;

	color: ${(props) => props.color};
`;

const _ListContainer = styled.div`
	display: flex;
	flex-direction: row;
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
		<_Modal
			isOpen={open}
			onRequestClose={onClickCancel}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			back={formColor[theme]}
			b_color={borderColor[theme]}
			color={fontColor[theme]}
		>
			<_Header b_color={borderColor[theme]}>
				<_Title>{t('snippetsManager')}</_Title>
				<IconButton color={iconColor[theme]} onClick={onClickCancel}>
					{closeIconMedium}
				</IconButton>
			</_Header>
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
							b_color={mintColor[theme]}
							b_left={
								clickedSnippet === v.id ? '2px solid' : 'none'
							}
							padding={
								clickedSnippet === v.id
									? '1px 15px 3px 12px'
									: '1px 15px 3px 14px'
							}
						>
							<_Text>{v.name === '' ? t('new') : v.name}</_Text>
						</_Li>
					))}
				</_Ul>
				<_Form>
					<_Input_ title={t('name')}>
						<_Input
							ref={nameInput}
							value={name}
							onChange={onChangeName}
							type='text'
							placeholder={t('place.name')}
							back={inputColor[theme]}
							color={fontColor[theme]}
							b_color={borderColor[theme]}
						/>
					</_Input_>
					<_Input_ title={t('content')}>
						<_TextareaInput
							value={content}
							onChange={onChangeContent}
							type='text'
							placeholder={t('place.content')}
							back={inputColor[theme]}
							color={fontColor[theme]}
							b_color={borderColor[theme]}
						/>
					</_Input_>
				</_Form>
			</_ListContainer>
			<_Footer b_color={borderColor[theme]}>
				<PrimaryGreyButton themeValue={theme} onClick={onClickCancel}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryGreenButton themeValue={theme} onClick={onClickSubmit}>
					{t('save')}
				</PrimaryGreenButton>
			</_Footer>
		</_Modal>
	);
};

SnippetsManeger.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default SnippetsManeger;
