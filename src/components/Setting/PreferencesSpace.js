import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
	MONTSERRAT,
	ROBOTO,
	ROBOTO_MONO,
	ROBOTO_SLAP,
	borderColor,
	fontColor,
	inputColor,
	SUB_HEIGHT,
	backColor,
} from '../../styles/global';
import Select_ from '../RecycleComponents/Select_';
import Checkbox_ from '../RecycleComponents/Checkbox_';
import {useDispatch, useSelector} from 'react-redux';
import {SSH_SET_FONT_REQUEST} from '../../reducers/ssh';
import {CHANGE_GENERAL_THEME} from '../../reducers/common';

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

const _ContentsContainer = styled.div`
	padding: 15px 0px;
	margin: 0px 8px;
	font-size: 14px;
`;

const background_theme = [
	{value: 0, label: 'Light Mode'},
	{value: 1, label: 'Dark Mode'},
];
const terminal_theme = [
	{value: 0, label: 'Light Mode'},
	{value: 1, label: 'Dark Mode'},
];
const editor_theme = [
	{value: 0, label: 'Light Mode'},
	{value: 1, label: 'Dark Mode'},
];
const font_theme = [
	{value: ROBOTO, label: 'Roboto, monospace'},
	{value: ROBOTO_MONO, label: 'Roboto Mono, monospace'},
	{value: ROBOTO_SLAP, label: 'Roboto Slap, monospace'},
	{value: MONTSERRAT, label: 'Montserrat, monospace'},
];
const PreferencesSpace = () => {
	const dispatch = useDispatch();
	const {font} = useSelector((state) => state.ssht);
	const {theme} = useSelector((state) => state.common);

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
		<_Container back={backColor[theme]} color={fontColor[theme]}>
			<_Title b_color={borderColor[theme]}>General</_Title>
			<_ContentsContainer>
				<Select_
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					width={'500px'}
					title='UI Theme'
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
				/>
			</_ContentsContainer>

			<_Title b_color={borderColor[theme]}>Terminal</_Title>
			<_ContentsContainer>
				<Select_
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					width={'500px'}
					title='UI Theme'
					options={terminal_theme}
					value={terminalTheme}
					setValue={setTerminalTheme}
				/>
				<Select_
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					width={'500px'}
					title='Terminal Font'
					options={font_theme}
					value={font}
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
			</_ContentsContainer>

			<_Title b_color={borderColor[theme]}>SFTP</_Title>
			<_ContentsContainer>
				<Select_
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					width={'500px'}
					title='Editor Theme'
					options={editor_theme}
					value={editorTheme}
					setValue={setEditorTheme}
				/>
			</_ContentsContainer>
		</_Container>
	);
};

export default PreferencesSpace;
