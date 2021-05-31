import React, {useEffect, useState} from 'react';
import Select_ from '../../RecycleComponents/Select_';
import styled from 'styled-components';
import {
	borderColor,
	fontColor,
	inputColor,
	MONTSERRAT,
	ROBOTO,
	ROBOTO_MONO,
	ROBOTO_SLAP,
	SIXTEEN,
} from '../../../styles/global';
import Checkbox_ from '../../RecycleComponents/Checkbox_';
import {SSH_SET_FONT_REQUEST} from '../../../reducers/ssh';
import {useDispatch, useSelector} from 'react-redux';
import {CHANGE_GENERAL_THEME} from '../../../reducers/common';

const _P = styled.p`
	padding: 0px 0px 12px;
	margin: 0px 8px 16px;
	border-bottom: 1px solid;
	border-color: ${(props) => props?.b_color};
	font-size: ${SIXTEEN};
`;

const _SectionContainer = styled.div`
	padding: 16px 8px;
	color: ${(props) => props?.color};
`;

const background_theme = [
	{value: 0, label: 'Light Mode'},
	{value: 1, label: 'Dark Mode'},
];
const terminal_theme = [
	{value: 0, label: 'theme0'},
	{value: 1, label: 'theme1'},
];
const editor_theme = [
	{value: 0, label: 'theme0'},
	{value: 1, label: 'theme1'},
];

const font_theme = [
	{value: `${ROBOTO}`, label: 'Rovoto'},
	{value: `${ROBOTO_MONO}`, label: 'Rovoto Mono'},
	{value: `${ROBOTO_SLAP}`, label: 'Rovoto Slap'},
	{value: `${MONTSERRAT}`, label: 'Montserrat'},
];

const PreferencesAside = () => {
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);
	const {font} = useSelector((state) => state.ssht);

	const [textCompletion, setTextCompletion] = useState(false);
	const [copyText, setCopyText] = useState(false);
	const [generalTheme, setGeneralTheme] = useState(theme);
	const [terminalTheme, setTerminalTheme] = useState(0);
	const [editorTheme, setEditorTheme] = useState(0);
	const [terminalFont, setTerminalFont] = useState(ROBOTO);

	useEffect(() => {
		if (font !== terminalFont)
			dispatch({type: SSH_SET_FONT_REQUEST, data: terminalFont});
	}, [terminalFont, dispatch]);

	useEffect(() => {
		dispatch({type: CHANGE_GENERAL_THEME, payload: {theme: generalTheme}});
	}, [generalTheme, dispatch]);

	return (
		<React.Fragment>
			<_SectionContainer color={fontColor[theme]}>
				<_P b_color={borderColor[theme]}>General</_P>
				<Select_
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title='UI Theme'
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
				/>
			</_SectionContainer>
			<_SectionContainer color={fontColor[theme]}>
				<_P b_color={borderColor[theme]}>Terminal</_P>
				<Select_
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title='UI Theme'
					options={terminal_theme}
					value={terminalTheme}
					setValue={setTerminalTheme}
				/>
				<Select_
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title='Terminal Font'
					options={font_theme}
					value={terminalFont}
					setValue={setTerminalFont}
				/>
				<Checkbox_
					title={'Text completion (IntelliSense)'}
					value={textCompletion}
					setValue={setTextCompletion}
				/>
				<Checkbox_
					title={'Copy text on selection'}
					value={copyText}
					setValue={setCopyText}
				/>
			</_SectionContainer>
			<_SectionContainer color={fontColor[theme]}>
				<_P b_color={borderColor[theme]}>SFTP</_P>
				<Select_
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title='Editor Theme'
					options={editor_theme}
					value={editorTheme}
					setValue={setEditorTheme}
				/>
			</_SectionContainer>
		</React.Fragment>
	);
};

export default PreferencesAside;
