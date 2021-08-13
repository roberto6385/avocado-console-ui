import React, {useEffect, useState} from 'react';
import ComboBox_ from '../../RecycleComponents/ComboBox_';
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
import {settingAction, settingSelector} from '../../../reducers/setting';
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
	border-bottom: 1px solid
		${(props) => props.theme.pages.webTerminal.main.aside.border.color};
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

	const {theme, language} = useSelector(settingSelector.all);
	const {font, auto_completion_mode} = useSelector(
		(state) => state.ssh,
		shallowEqual,
	);

	const [textCompletion, setTextCompletion] = useState(auto_completion_mode);
	const [Theme, setTheme] = useState(theme);
	const [Language, setLanguage] = useState(language);
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
			payload: textCompletion,
		});
	}, [textCompletion, dispatch]);

	useEffect(() => {
		if (font !== terminalFont)
			dispatch({type: SSH_SET_FONT_REQUEST, payload: terminalFont});
	}, [font, terminalFont, dispatch]);

	useEffect(() => {
		dispatch(settingAction.setTheme(Theme));
	}, [Theme, dispatch]);

	useEffect(() => {
		dispatch(settingAction.setLanguage(Language));
		i18n.changeLanguage(Language);
	}, [Language, dispatch, i18n]);

	return (
		<_Container>
			<_Title>{t('general')}</_Title>
			<_ContentsContainer>
				<ComboBox_
					width={'266px'}
					title={t('lang')}
					options={languageOptions}
					value={Language}
					setValue={setLanguage}
				/>
				<ComboBox_
					width={'266px'}
					title={t('uiTheme')}
					options={background_theme}
					value={Theme}
					setValue={setTheme}
				/>
			</_ContentsContainer>

			<_Title>{t('terminal')}</_Title>
			<_ContentsContainer>
				<ComboBox_
					width={'266px'}
					title={t('uiTheme')}
					options={terminal_theme}
					value={terminalTheme}
					setValue={setTerminalTheme}
				/>
				<ComboBox_
					width={'266px'}
					title={t('font')}
					options={font_theme}
					value={terminalFont}
					setValue={setTerminalFont}
				/>

				<CheckBox_
					title={t('textCompletion')}
					value={textCompletion}
					handleCheck={(e) => setTextCompletion(e.target.checked)}
				/>
			</_ContentsContainer>

			<_Title>{t('sftp')}</_Title>
			<_ContentsContainer>
				<ComboBox_
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
