import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {
	MONTSERRAT,
	ROBOTO,
	ROBOTO_MONO,
	ROBOTO_SLAP,
} from '../../../styles/font';
import Select_ from '../../RecycleComponents/Select_';
import Checkbox_ from '../../RecycleComponents/Checkbox_';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
	SSH_CHANGE_AUTO_COMPLETION_MODE,
	SSH_SET_FONT_REQUEST,
} from '../../../reducers/ssh';
import {CHANGE_GENERAL_THEME, CHANGE_LANGUAGE} from '../../../reducers/common';
import {useTranslation} from 'react-i18next';
import {
	SettingContentsContainer,
	SettingMainContainer,
	SettingTitle,
} from '../../../styles/default';

const CheckboxContanier = styled.div`
	margin-bottom: 16px;
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
	const dispatch = useDispatch();
	const {t, i18n} = useTranslation('preferencesAside');
	const {font, auto_completion_mode} = useSelector((state) => state.ssh);
	const {theme, lang} = useSelector((state) => state.common, shallowEqual);
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
			type: SSH_CHANGE_AUTO_COMPLETION_MODE,
			data: textCompletion,
		});
	}, [textCompletion, dispatch]);

	useEffect(() => {
		if (font !== terminalFont)
			dispatch({type: SSH_SET_FONT_REQUEST, data: terminalFont});
	}, [font, terminalFont, dispatch]);

	useEffect(() => {
		dispatch({type: CHANGE_GENERAL_THEME, payload: {theme: generalTheme}});
	}, [generalTheme, dispatch]);

	useEffect(() => {
		dispatch({type: CHANGE_LANGUAGE, payload: {language: language}});
		i18n.changeLanguage(lang);
	}, [language, dispatch, i18n, lang]);

	return (
		<SettingMainContainer theme_value={theme}>
			<SettingTitle theme_value={theme}>{t('general')}</SettingTitle>
			<SettingContentsContainer>
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
			</SettingContentsContainer>

			<SettingTitle theme_value={theme}>{t('terminal')}</SettingTitle>
			<SettingContentsContainer>
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
					value={terminalFont}
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
			</SettingContentsContainer>

			<SettingTitle theme_value={theme}>{t('sftp')}</SettingTitle>
			<SettingContentsContainer>
				<Select_
					width={'500px'}
					title={t('editorTheme')}
					options={editor_theme}
					value={editorTheme}
					setValue={setEditorTheme}
				/>
			</SettingContentsContainer>
		</SettingMainContainer>
	);
};

export default PreferencesSpace;
