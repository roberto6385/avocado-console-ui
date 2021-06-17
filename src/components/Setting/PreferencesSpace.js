import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
	MONTSERRAT,
	ROBOTO,
	ROBOTO_MONO,
	ROBOTO_SLAP,
	borderColor,
	fontColor,
	SUB_HEIGHT,
	backColor,
} from '../../styles/global';
import Select_ from '../RecycleComponents/Select_';
import Checkbox_ from '../RecycleComponents/Checkbox_';
import {useDispatch, useSelector} from 'react-redux';
import {
	CHANGE_AUTO_COMPLETION_MODE,
	SSH_SET_FONT_REQUEST,
} from '../../reducers/ssh';
import {CHANGE_GENERAL_THEME, CHANGE_LANGUAGE} from '../../reducers/common';
import {useTranslation} from 'react-i18next';

const _Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	background: ${(props) => props?.back};
	color: ${(props) => props.color};
`;

const _Title = styled.div`
	border-bottom: 1px solid;
	border-color: ${(props) => props?.b_color};
	margin: 0px 16px;
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
	min-height: ${SUB_HEIGHT};
	overflow: scroll;
`;

const CheckboxContanier = styled.div`
	margin 0px 8px ;
`;

const _ContentsContainer = styled.div`
	padding: 15px 0px;
	margin: 0px 8px;
	font-size: 14px;
`;

const terminal_theme = [
	{value: 0, label: 'Theme - 1'},
	{value: 1, label: 'Theme - 2'},
];
const editor_theme = [
	{value: 0, label: 'Theme - 1'},
	{value: 1, label: 'Theme - 2'},
];

const font_theme = [
	{value: ROBOTO, label: 'Roboto'},
	{value: ROBOTO_MONO, label: 'Roboto Mono'},
	{value: MONTSERRAT, label: 'Montserrat'},
	{value: ROBOTO_SLAP, label: 'Roboto Slap'},
];

const PreferencesSpace = () => {
	const {t, i18n} = useTranslation('preferencesAside');
	const dispatch = useDispatch();
	const {font, auto_completion_mode} = useSelector((state) => state.ssh);
	const {theme, lang} = useSelector((state) => state.common);
	const [textCompletion, setTextCompletion] = useState(auto_completion_mode);
	const [language, setLanguage] = useState(lang);
	const [generalTheme, setGeneralTheme] = useState(theme);
	const [terminalTheme, setTerminalTheme] = useState(0);
	const [editorTheme, setEditorTheme] = useState(0);
	const [terminalFont, setTerminalFont] = useState(font);

	const background_theme = [
		{value: 0, label: t('light')},
		{value: 1, label: t('dark')},
	];
	const languageOptions = [
		{value: 'en-US', label: t('en')},
		{value: 'ko-KR', label: t('ko')},
	];

	useEffect(() => {
		dispatch({
			type: CHANGE_AUTO_COMPLETION_MODE,
			data: textCompletion,
		});
	}, [textCompletion, dispatch]);

	useEffect(() => {
		if (font !== terminalFont)
			dispatch({type: SSH_SET_FONT_REQUEST, data: terminalFont});
	}, [terminalFont, dispatch]);

	useEffect(() => {
		dispatch({type: CHANGE_GENERAL_THEME, payload: {theme: generalTheme}});
	}, [generalTheme, dispatch]);

	useEffect(() => {
		dispatch({type: CHANGE_LANGUAGE, payload: {language: language}});
		i18n.changeLanguage(lang);
	}, [language, dispatch, i18n, lang]);

	return (
		<_Container back={backColor[theme]} color={fontColor[theme]}>
			<_Title b_color={borderColor[theme]}>{t('general')}</_Title>

			<_ContentsContainer>
				<Select_
					width={'500px'}
					title={t('lang')}
					options={languageOptions}
					value={language}
					setValue={setLanguage}
				/>
				<Select_
					width={'500px'}
					title={t('uiTheme')}
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
				/>
			</_ContentsContainer>

			<_Title b_color={borderColor[theme]}>{t('terminal')}</_Title>
			<_ContentsContainer>
				<Select_
					width={'500px'}
					title={t('uiTheme')}
					options={terminal_theme}
					value={terminalTheme}
					setValue={setTerminalTheme}
				/>
				<Select_
					width={'500px'}
					title={t('font')}
					options={font_theme}
					value={font}
					setValue={setTerminalFont}
				/>
				<CheckboxContanier>
					<Checkbox_
						title={t('textCompletion')}
						value={textCompletion}
						handleCheck={(e) => setTextCompletion(e.target.checked)}
					/>
				</CheckboxContanier>
				{/*<Checkbox_*/}
				{/*	title={'Copy text on selection'}*/}
				{/*	value={copyText}*/}
				{/*	setValue={setCopyText}*/}
				{/*/>*/}
			</_ContentsContainer>

			<_Title b_color={borderColor[theme]}>{t('sftp')}</_Title>
			<_ContentsContainer>
				<Select_
					width={'500px'}
					title={t('editorTheme')}
					options={editor_theme}
					value={editorTheme}
					setValue={setEditorTheme}
				/>
			</_ContentsContainer>
		</_Container>
	);
};

export default PreferencesSpace;
