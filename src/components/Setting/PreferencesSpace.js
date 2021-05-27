import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {
	BORDER_COLOR,
	LIGHT_BACKGROUND_COLOR,
	MONTSERRAT,
	ROBOTO,
	ROBOTO_MONO,
	ROBOTO_SLAP,
	SIXTEEN,
} from '../../styles/global';
import Select_ from '../RecycleComponents/Select_';
import Checkbox_ from '../RecycleComponents/Checkbox_';
import {useDispatch, useSelector} from 'react-redux';
import {SSH_SET_FONT_REQUEST} from '../../reducers/ssht';

const _Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	background: ${LIGHT_BACKGROUND_COLOR};
`;

const _P = styled.p`
	padding: 0px 0px 12px 0px;
	margin: 0px 0px 16px 0px;
	border-bottom: 1px solid ${BORDER_COLOR};
	font-size: ${SIXTEEN};
`;

const _SectionContainer = styled.div`
	padding: 16px;
`;

const background_theme = [
	{value: 'light_mode', label: 'Light Mode'},
	{value: 'dark_mode', label: 'Dark Mode'},
];

const font_theme = [
	{value: ROBOTO, label: 'Rovoto'},
	{value: ROBOTO_MONO, label: 'Rovoto Mono'},
	{value: ROBOTO_SLAP, label: 'Rovoto Slap'},
	{value: MONTSERRAT, label: 'Montserrat'},
];
const PreferencesSpace = () => {
	const dispatch = useDispatch();
	const [textCompletion, setTextCompletion] = useState(false);
	const [copyText, setCopyText] = useState(false);
	const [generalTheme, setGeneralTheme] = useState('light_mode');
	const [terminalFont, setTerminalFont] = useState(ROBOTO);

	const {font} = useSelector((state) => state.ssht);

	const onChangeTerminalFont = useCallback((e) => {
		dispatch({type: SSH_SET_FONT_REQUEST, data: e.target.value});
	}, []);

	useEffect(() => {
		dispatch({type: SSH_SET_FONT_REQUEST, data: terminalFont});
	}, [terminalFont, dispatch]);

	return (
		<_Container>
			<React.Fragment>
				<_SectionContainer>
					<_P>General</_P>
					<Select_
						width={'500px'}
						title='UI Theme'
						options={background_theme}
						value={generalTheme}
						setValue={setGeneralTheme}
					/>
				</_SectionContainer>
				<_SectionContainer>
					<_P>Terminal</_P>
					<Select_
						width={'500px'}
						title='UI Theme'
						options={background_theme}
						value={generalTheme}
						setValue={setGeneralTheme}
					/>
					<Select_
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
				</_SectionContainer>
				<_SectionContainer>
					<_P>SFTP</_P>
					<Select_
						width={'500px'}
						title='Editor Theme'
						options={background_theme}
						value={generalTheme}
						setValue={setGeneralTheme}
					/>
				</_SectionContainer>
			</React.Fragment>
		</_Container>
	);
};

export default PreferencesSpace;
