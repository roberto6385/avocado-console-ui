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
import {useDispatch, useSelector} from 'react-redux';
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

const terminalThemeOptions = [
	{value: 0, label: 'Theme - 1'},
	{value: 1, label: 'Theme - 2'},
];
const editorThemeOptions = [
	{value: 0, label: 'Theme - 1'},
	{value: 1, label: 'Theme - 2'},
];

const terminalFontOptions = [
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

	const [isAutocompleteTurnedOn, setIsAutocompleteTurnedOn] =
		useState(auto_completion_mode);
	const [languageCopy, setLanguageCopy] = useState(language);
	const [themeCopy, setThemeCopy] = useState(theme);
	const [terminalTheme, setTerminalTheme] = useState(0);
	const [editorTheme, setEditorTheme] = useState(0);
	const [sshFont, setSshFont] = useState(font);

	const themeOptions = [
		{value: 'light', label: t('light')},
		{value: 'dark', label: t('dark')},
	];
	const languageOptions = [
		{value: 'en-US', label: t('en')},
		{value: 'ko-KR', label: t('ko')},
	];

	useEffect(() => {
		if (auto_completion_mode !== isAutocompleteTurnedOn)
			dispatch({
				type: SSH_CHANGE_AUTO_COMPLETION_MODE,
				payload: isAutocompleteTurnedOn,
			});
	}, [auto_completion_mode, isAutocompleteTurnedOn, dispatch]);

	useEffect(() => {
		if (font !== sshFont)
			dispatch({type: SSH_SET_FONT_REQUEST, payload: sshFont});
	}, [font, sshFont, dispatch]);

	useEffect(() => {
		dispatch(settingAction.setTheme(themeCopy));
	}, [themeCopy, dispatch]);

	useEffect(() => {
		if (language !== languageCopy) {
			dispatch(settingAction.setLanguage(languageCopy));
			i18n.changeLanguage(languageCopy);
		}
	}, [language, languageCopy, dispatch, i18n]);

	return (
		<SettingMainContainer>
			<SettingTitle>{t('general')}</SettingTitle>
			<SettingContentsContainer>
				<ComboBox_
					width={'500px'}
					title={t('lang')}
					options={languageOptions}
					value={languageCopy}
					setValue={setLanguageCopy}
				/>
				<ComboBox_
					width={'500px'}
					title={t('uiTheme')}
					options={themeOptions}
					value={themeCopy}
					setValue={setThemeCopy}
				/>
			</SettingContentsContainer>

			<SettingTitle>{t('terminal')}</SettingTitle>
			<SettingContentsContainer>
				<ComboBox_
					width={'500px'}
					title={t('uiTheme')}
					options={terminalThemeOptions}
					value={terminalTheme}
					setValue={setTerminalTheme}
				/>
				<ComboBox_
					width={'500px'}
					title={t('font')}
					options={terminalFontOptions}
					value={sshFont}
					setValue={setSshFont}
				/>
				<_CheckBoxContanier>
					<CheckBox_
						title={t('textCompletion')}
						value={isAutocompleteTurnedOn}
						handleCheck={(e) =>
							setIsAutocompleteTurnedOn(e.target.checked)
						}
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
					options={editorThemeOptions}
					value={editorTheme}
					setValue={setEditorTheme}
				/>
			</SettingContentsContainer>
		</SettingMainContainer>
	);
};

export default PreferencesSpace;
