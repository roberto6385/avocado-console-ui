import React, {useEffect, useState} from 'react';
import ComboBox from '../../RecycleComponents/ComboBox';
import styled from 'styled-components';
import {
	MONTSERRAT,
	ROBOTO,
	ROBOTO_MONO,
	ROBOTO_SLAP,
} from '../../../styles/components/font';
import {useTranslation} from 'react-i18next';
import CheckBox from '../../RecycleComponents/CheckBox';
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

const _ContentContainer = styled.div`
	padding: 15px 0px;
`;

const terminalThemeOptions = [
	{value: 0, label: 'theme0'},
	{value: 1, label: 'theme1'},
];
const editorThemeOptions = [
	{value: 0, label: 'theme0'},
	{value: 1, label: 'theme1'},
];
const sshFontOptions = [
	{value: ROBOTO, label: 'Roboto'},
	{value: ROBOTO_MONO, label: 'Roboto Mono'},
	{value: ROBOTO_SLAP, label: 'Roboto Slap'},
	{value: MONTSERRAT, label: 'Montserrat'},
];

const PreferencesAside = () => {
	const dispatch = useDispatch();
	const {t, i18n} = useTranslation('preferences');

	const {theme, language} = useSelector(settingSelector.all);
	const {font, auto_completion_mode} = useSelector(
		(state) => state.ssh,
		shallowEqual,
	);

	const [isAutocompleteTurnedOn, setIsAutocompleteTurnedOn] =
		useState(auto_completion_mode);
	const [themeCopy, setThemeCopy] = useState(theme);
	const [languageCopy, setLanguageCopy] = useState(language);
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
			i18n.changeLanguage(languageCopy).then(() =>
				dispatch(settingAction.setLanguage(languageCopy)),
			);
		}
	}, [languageCopy, dispatch, i18n, language]);

	return (
		<_Container>
			<_Title>{t('title.general')}</_Title>
			<_ContentContainer>
				<ComboBox
					width={'266px'}
					title={t('lang')}
					options={languageOptions}
					value={languageCopy}
					setValue={setLanguageCopy}
				/>
				<ComboBox
					width={'266px'}
					title={t('uiTheme')}
					options={themeOptions}
					value={themeCopy}
					setValue={setThemeCopy}
				/>
			</_ContentContainer>

			<_Title>{t('title.terminal')}</_Title>
			<_ContentContainer>
				<ComboBox
					width={'266px'}
					title={t('uiTheme')}
					options={terminalThemeOptions}
					value={terminalTheme}
					setValue={setTerminalTheme}
				/>
				<ComboBox
					width={'266px'}
					title={t('font')}
					options={sshFontOptions}
					value={sshFont}
					setValue={setSshFont}
				/>

				<CheckBox
					title={t('autoComplete')}
					value={isAutocompleteTurnedOn}
					onChangeCheck={(e) =>
						setIsAutocompleteTurnedOn(e.target.checked)
					}
				/>
			</_ContentContainer>

			<_Title>{t('titile.sftp')}</_Title>
			<_ContentContainer>
				<ComboBox
					title={t('editorTheme')}
					options={editorThemeOptions}
					value={editorTheme}
					setValue={setEditorTheme}
				/>
			</_ContentContainer>
		</_Container>
	);
};

export default PreferencesAside;
