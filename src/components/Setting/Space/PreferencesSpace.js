import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
	MONTSERRAT,
	ROBOTO,
	ROBOTO_MONO,
	ROBOTO_SLAP,
} from '../../../styles/components/font';
import ComboBox_ from '../../RecycleComponents/ComboBox_';
import CheckBox_ from '../../RecycleComponents/CheckBox_';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
	SSH_CHANGE_AUTO_COMPLETION_MODE,
	SSH_SET_FONT_REQUEST,
} from '../../../reducers/ssh';
import {useTranslation} from 'react-i18next';
import {
	SettingContentsContainer,
	SettingMainContainer,
	SettingTitle,
} from '../../../styles/components/settingPage';
import {settingAction, settingSelector} from '../../../reducers/setting';

const _CheckBoxContanier = styled.div`
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
	const {theme, language} = useSelector(settingSelector.all);
	const [textCompletion, setTextCompletion] = useState(auto_completion_mode);
	const [Language, setLanguage] = useState(language);
	const [Theme, setTheme] = useState(theme);
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
		<SettingMainContainer>
			<SettingTitle>{t('general')}</SettingTitle>
			<SettingContentsContainer>
				<ComboBox_
					width={'500px'}
					title={t('lang')}
					options={languageOptions}
					value={Language}
					setValue={setLanguage}
				/>
				<ComboBox_
					width={'500px'}
					title={t('uiTheme')}
					options={background_theme}
					value={Theme}
					setValue={setTheme}
				/>
			</SettingContentsContainer>

			<SettingTitle>{t('terminal')}</SettingTitle>
			<SettingContentsContainer>
				<ComboBox_
					width={'500px'}
					title={t('uiTheme')}
					options={terminal_theme}
					value={terminalTheme}
					setValue={setTerminalTheme}
				/>
				<ComboBox_
					width={'500px'}
					title={t('font')}
					options={font_theme}
					value={terminalFont}
					setValue={setTerminalFont}
				/>
				<_CheckBoxContanier>
					<CheckBox_
						title={t('textCompletion')}
						value={textCompletion}
						handleCheck={(e) => setTextCompletion(e.target.checked)}
					/>
				</_CheckBoxContanier>
				{/*<CheckBox_*/}
				{/*	title={'Copy text on selection'}*/}
				{/*	value={copyText}*/}
				{/*	setValue={setCopyText}*/}
				{/*/>*/}
			</SettingContentsContainer>

			<SettingTitle>{t('sftp')}</SettingTitle>
			<SettingContentsContainer>
				<ComboBox_
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
