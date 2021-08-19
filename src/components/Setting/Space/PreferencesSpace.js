import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
	MONTSERRAT,
	ROBOTO,
	ROBOTO_MONO,
	ROBOTO_SLAP,
} from '../../../styles/components/font';
import ComboBox from '../../RecycleComponents/ComboBox';
import CheckBox from '../../RecycleComponents/CheckBox';
import {useDispatch, useSelector} from 'react-redux';
import {sshAction, sshSelector} from '../../../reducers/ssh';
import {useTranslation} from 'react-i18next';
import {
	SettingContentContainer,
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

	const {font, autoCompleteMode} = useSelector(sshSelector.all);
	const {theme, language} = useSelector(settingSelector.all);

	const [isAutocompleteTurnedOn, setIsAutocompleteTurnedOn] =
		useState(autoCompleteMode);
	const [languageCopy, setLanguageCopy] = useState(language);
	const [themeCopy, setThemeCopy] = useState(theme);
	const [terminalTheme, setTerminalTheme] = useState(0);
	const [editorTheme, setEditorTheme] = useState(0);
	const [sshFont, setSshFont] = useState(font.family);

	const themeOptions = [
		{value: 'light', label: t('light')},
		{value: 'dark', label: t('dark')},
	];
	const languageOptions = [
		{value: 'en-US', label: t('en')},
		{value: 'ko-KR', label: t('ko')},
	];

	useEffect(() => {
		if (autoCompleteMode !== isAutocompleteTurnedOn)
			dispatch(sshAction.setAutoCompleteMode(isAutocompleteTurnedOn));
	}, [autoCompleteMode, isAutocompleteTurnedOn, dispatch]);

	useEffect(() => {
		if (font.family !== sshFont) dispatch(sshAction.setFont(sshFont));
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
			<SettingContentContainer>
				<ComboBox
					width={'500px'}
					title={t('lang')}
					options={languageOptions}
					value={languageCopy}
					setValue={setLanguageCopy}
				/>
				<ComboBox
					width={'500px'}
					title={t('uiTheme')}
					options={themeOptions}
					value={themeCopy}
					setValue={setThemeCopy}
				/>
			</SettingContentContainer>

			<SettingTitle>{t('terminal')}</SettingTitle>
			<SettingContentContainer>
				<ComboBox
					width={'500px'}
					title={t('uiTheme')}
					options={terminalThemeOptions}
					value={terminalTheme}
					setValue={setTerminalTheme}
				/>
				<ComboBox
					width={'500px'}
					title={t('font')}
					options={terminalFontOptions}
					value={sshFont}
					setValue={setSshFont}
				/>
				<_CheckBoxContanier>
					<CheckBox
						title={t('textCompletion')}
						value={isAutocompleteTurnedOn}
						onChangeCheck={(e) =>
							setIsAutocompleteTurnedOn(e.target.checked)
						}
					/>
				</_CheckBoxContanier>
				{/*<CheckBox*/}
				{/*	title={'Copy text on selection'}*/}
				{/*	value={copyText}*/}
				{/*	setValue={setCopyText}*/}
				{/*/>*/}
			</SettingContentContainer>

			<SettingTitle>{t('sftp')}</SettingTitle>
			<SettingContentContainer>
				<ComboBox
					width={'500px'}
					title={t('editorTheme')}
					options={editorThemeOptions}
					value={editorTheme}
					setValue={setEditorTheme}
				/>
			</SettingContentContainer>
		</SettingMainContainer>
	);
};

export default PreferencesSpace;
