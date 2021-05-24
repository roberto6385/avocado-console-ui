import React, {useState} from 'react';
import Select_ from '../../RecycleComponents/Select_';
import styled from 'styled-components';
import {BORDER_COLOR, SIXTEEN} from '../../../styles/global_design';
import Checkbox_ from '../../RecycleComponents/Checkbox_';

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

const PreferencesAside = () => {
	const [textCompletion, setTextCompletion] = useState(false);
	const [copyText, setCopyText] = useState(false);
	const [generalTheme, setGeneralTheme] = useState('light_mode');

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
					title='UI Theme'
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
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
