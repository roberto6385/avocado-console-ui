import React, {useEffect, useState} from 'react';
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
import Checkbox_ from '../../RecycleComponents/Checkbox_';
import {SSH_SET_FONT_REQUEST} from '../../../reducers/ssh';
import {useDispatch, useSelector} from 'react-redux';
import {CHANGE_GENERAL_THEME} from '../../../reducers/common';

const _Container = styled.div`
	width: ${RIGHT_SIDE_WIDTH};
	padding: 0px 8px;
	color: ${(props) => props.color};
`;

const _Title = styled.div`
	font-size: 14px;
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
	{value: `${ROBOTO}`, label: 'Rovoto'},
	{value: `${ROBOTO_MONO}`, label: 'Rovoto Mono'},
	{value: `${ROBOTO_SLAP}`, label: 'Rovoto Slap'},
	{value: `${MONTSERRAT}`, label: 'Montserrat'},
];

const PreferencesAside = () => {
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);

	const [textCompletion, setTextCompletion] = useState(false);
	const [copyText, setCopyText] = useState(false);
	const [generalTheme, setGeneralTheme] = useState(theme);
	const [terminalTheme, setTerminalTheme] = useState(0);
	const [editorTheme, setEditorTheme] = useState(0);
	const [terminalFont, setTerminalFont] = useState(ROBOTO);

	useEffect(() => {
		dispatch({type: SSH_SET_FONT_REQUEST, data: terminalFont});
	}, [terminalFont, dispatch]);

	useEffect(() => {
		dispatch({type: CHANGE_GENERAL_THEME, payload: {theme: generalTheme}});
	}, [generalTheme, dispatch]);

	return (
		<_Container color={fontColor[theme]}>
			<_Title b_color={borderColor[theme]}>General</_Title>
			<_ContentsContainer color={fontColor[theme]}>
				<Select_
					width={'266px'}
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title='UI Theme'
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
				/>
			</_ContentsContainer>

			<_Title b_color={borderColor[theme]}>Terminal</_Title>
			<_ContentsContainer color={fontColor[theme]}>
				<Select_
					width={'266px'}
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title='UI Theme'
					options={terminal_theme}
					value={terminalTheme}
					setValue={setTerminalTheme}
				/>
				<Select_
					width={'266px'}
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
			</_ContentsContainer>

			<_Title b_color={borderColor[theme]}>SFTP</_Title>
			<_ContentsContainer color={fontColor[theme]}>
				<Select_
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title='Editor Theme'
					options={editor_theme}
					value={editorTheme}
					setValue={setEditorTheme}
				/>
			</_ContentsContainer>
		</_Container>
	);
};

export default PreferencesAside;
