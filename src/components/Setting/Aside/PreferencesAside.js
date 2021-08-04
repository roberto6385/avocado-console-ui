import React, {useEffect, useState} from 'react';
import Select_ from '../../RecycleComponents/Select_';
import styled from 'styled-components';
import {
	MONTSERRAT,
	ROBOTO,
	ROBOTO_MONO,
	ROBOTO_SLAP,
} from '../../../styles/components/font';
import {useTranslation} from 'react-i18next';
import CheckBox_ from '../../RecycleComponents/CheckBox_';
import {
	SSH_CHANGE_AUTO_COMPLETION_MODE,
	SSH_SET_FONT_REQUEST,
} from '../../../reducers/ssh';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {CHANGE_GENERAL_THEME, CHANGE_LANGUAGE} from '../../../reducers/common';
import {borderColor, fontColor} from '../../../styles/color';
//Setting Page Side Bar
const _Container = styled.div`
	padding: 0px 16px 15px 17px;
	height: 100%;
	z-index: 5; // terminal보다 높아야 함.
`;

const _Title = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
	font-size: 16px;
	border-bottom: 1px solid ${(props) => borderColor[props.theme_value]};
`;

const _ContentsContainer = styled.div`
	padding: 15px 0px;
`;

const terminal_theme = [
	{value: 0, label: 'theme0'},
	{value: 1, label: 'theme1'},
];
const editor_theme = [
	{value: 0, label: 'theme0'},
	{value: 1, label: 'theme1'},
];
const font_theme = [
	{value: ROBOTO, label: 'Roboto'},
	{value: ROBOTO_MONO, label: 'Roboto Mono'},
	{value: ROBOTO_SLAP, label: 'Roboto Slap'},
	{value: MONTSERRAT, label: 'Montserrat'},
];

const PreferencesAside = () => {
	const dispatch = useDispatch();
	const {t, i18n} = useTranslation('preferencesAside');

	const {theme, lang} = useSelector((state) => state.common, shallowEqual);
	const {font, auto_completion_mode} = useSelector(
		(state) => state.ssh,
		shallowEqual,
	);

	const [textCompletion, setTextCompletion] = useState(auto_completion_mode);
	const [generalTheme, setGeneralTheme] = useState(theme);
	const [language, setLanguage] = useState(lang);
	const [terminalTheme, setTerminalTheme] = useState(0);
	const [editorTheme, setEditorTheme] = useState(0);
	const [terminalFont, setTerminalFont] = useState(font);

	const background_theme = [
		{value: 'light', label: t('light')},
		{value: 'dark', label: t('dark')},
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
		<_Container>
			<_Title theme_value={theme}>{t('general')}</_Title>
			<_ContentsContainer>
				<Select_
					width={'266px'}
					title={t('lang')}
					options={languageOptions}
					value={language}
					setValue={setLanguage}
					popup={true}
				/>
				<Select_
					width={'266px'}
					title={t('uiTheme')}
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
					popup={true}
				/>
			</_ContentsContainer>

			<_Title theme_value={theme}>{t('terminal')}</_Title>
			<_ContentsContainer>
				<Select_
					width={'266px'}
					title={t('uiTheme')}
					options={terminal_theme}
					value={terminalTheme}
					setValue={setTerminalTheme}
					popup={true}
				/>
				<Select_
					width={'266px'}
					title={t('font')}
					options={font_theme}
					value={terminalFont}
					setValue={setTerminalFont}
					popup={true}
				/>

				<CheckBox_
					title={t('textCompletion')}
					value={textCompletion}
					handleCheck={(e) => setTextCompletion(e.target.checked)}
				/>
			</_ContentsContainer>

			<_Title theme_value={theme}>{t('sftp')}</_Title>
			<_ContentsContainer>
				<Select_
					title={t('editorTheme')}
					options={editor_theme}
					value={editorTheme}
					setValue={setEditorTheme}
					popup={true}
				/>
			</_ContentsContainer>
		</_Container>
	);
};

export default PreferencesAside;
