import React, {useEffect, useState} from 'react';
import Select_ from '../../RecycleComponents/Select_';
import styled from 'styled-components';
import {
	BORDER_COLOR,
	MONTSERRAT,
	ROBOTO,
	ROBOTO_MONO,
	ROBOTO_SLAP,
	SIXTEEN,
} from '../../../styles/global';
import Checkbox_ from '../../RecycleComponents/Checkbox_';
import {SSH_SET_FONT_REQUEST} from '../../../reducers/ssh';
import {useDispatch} from 'react-redux';

const _P = styled.p`
	padding: 0px 0px 12px;
	margin: 0px 8px 16px;
	border-bottom: 1px solid ${BORDER_COLOR};
	font-size: ${SIXTEEN};
`;

const _SectionContainer = styled.div`
	padding: 16px 8px;
`;

const background_theme = [
	{value: 'light_mode', label: 'Light Mode'},
	{value: 'dark_mode', label: 'Dark Mode'},
];

const font_theme = [
	{value: `${ROBOTO}`, label: 'Rovoto'},
	{value: `${ROBOTO_MONO}`, label: 'Rovoto Mono'},
	{value: `${ROBOTO_SLAP}`, label: 'Rovoto Slap'},
	{value: `${MONTSERRAT}`, label: 'Montserrat'},
];

const PreferencesAside = () => {
	const dispatch = useDispatch();

	const [textCompletion, setTextCompletion] = useState(false);
	const [copyText, setCopyText] = useState(false);
	const [generalTheme, setGeneralTheme] = useState('light_mode');
	const [terminalFont, setTerminalFont] = useState(ROBOTO);

	useEffect(() => {
		dispatch({type: SSH_SET_FONT_REQUEST, data: terminalFont});
	}, [terminalFont, dispatch]);

	return (
		<React.Fragment>
			<_SectionContainer>
				<_P>General</_P>
				<Select_
					title='UI Theme'
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
				/>
			</_SectionContainer>
			<_SectionContainer>
				<_P>Terminal</_P>
				<Select_
					title='UI Theme'
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
				/>
				<Select_
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
			<_SectionContainer>
				<_P>SFTP</_P>
				<Select_
					title='Editor Theme'
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
				/>
			</_SectionContainer>
		</React.Fragment>
	);
};

export default PreferencesAside;
