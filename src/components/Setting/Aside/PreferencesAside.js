import React, {useEffect, useRef, useState} from 'react';
import Select_ from '../../RecycleComponents/Select_';
import styled from 'styled-components';
import {
	borderColor,
	fontColor,
	inputColor,
	MONTSERRAT,
	RIGHT_SIDE_WIDTH,
	ROBOTO,
	ROBOTO_MONO,
	ROBOTO_SLAP,
} from '../../../styles/global';
import {useTranslation} from 'react-i18next';
import Checkbox_ from '../../RecycleComponents/Checkbox_';
import {
	CHANGE_AUTO_COMPLETION_MODE,
	SSH_SET_FONT_REQUEST,
} from '../../../reducers/ssh';
import {useDispatch, useSelector} from 'react-redux';
import {CHANGE_GENERAL_THEME, CHANGE_LANGUAGE} from '../../../reducers/common';
import {FONT_16} from '../../../styles/length';

const _Container = styled.div`
	width: ${RIGHT_SIDE_WIDTH};
	padding: 0px 8px;
	color: ${(props) => props.color};
`;

const _Title = styled.div`
	font-size: ${FONT_16};
	margin: 0px 8px;
	display: flex;
	align-items: center;
	height: 50px;
	min-height: 50px;
	border-bottom: 1px solid ${(props) => props?.b_color};
`;

const _ContentsContainer = styled.div`
	font-size: 14px;
	padding: 15px 0px;
	margin: 0px;
	color: ${(props) => props?.color};
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
	const {t, i18n} = useTranslation('preferencesAside');
	const dispatch = useDispatch();
	const {theme, lang} = useSelector((state) => state.common);
	const {font, auto_completion_mode} = useSelector((state) => state.ssh);

	const [textCompletion, setTextCompletion] = useState(auto_completion_mode);
	const [generalTheme, setGeneralTheme] = useState(theme);
	const [language, setLanguage] = useState(lang);
	const [terminalTheme, setTerminalTheme] = useState(0);
	const [editorTheme, setEditorTheme] = useState(0);
	const [terminalFont, setTerminalFont] = useState(font);

	const {current: background_theme} = useRef([
		{value: 0, label: t('light')},
		{value: 1, label: t('dark')},
	]);
	const {current: languageOptions} = useRef([
		{value: 'en-US', label: t('en')},
		{value: 'ko-KR', label: t('ko')},
	]);

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
		<_Container color={fontColor[theme]}>
			<_Title b_color={borderColor[theme]}>{t('general')}</_Title>
			<_ContentsContainer color={fontColor[theme]}>
				<Select_
					width={'266px'}
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title={t('lang')}
					options={languageOptions}
					value={language}
					setValue={setLanguage}
				/>
				<Select_
					width={'266px'}
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title={t('uiTheme')}
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
				/>
			</_ContentsContainer>

			<_Title b_color={borderColor[theme]}>{t('terminal')}</_Title>
			<_ContentsContainer color={fontColor[theme]}>
				<Select_
					width={'266px'}
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title={t('uiTheme')}
					options={terminal_theme}
					value={terminalTheme}
					setValue={setTerminalTheme}
				/>
				<Select_
					width={'266px'}
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title={t('font')}
					options={font_theme}
					value={terminalFont}
					setValue={setTerminalFont}
				/>
				<Checkbox_
					title={t('textCompletion')}
					value={textCompletion}
					setValue={setTextCompletion}
				/>
			</_ContentsContainer>

			<_Title b_color={borderColor[theme]}>{t('sftp')}</_Title>
			<_ContentsContainer color={fontColor[theme]}>
				<Select_
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title={t('editorTheme')}
					options={editor_theme}
					value={editorTheme}
					setValue={setEditorTheme}
				/>
			</_ContentsContainer>
		</_Container>
	);
};

export default PreferencesAside;
