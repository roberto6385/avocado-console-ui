import React, {useState} from 'react';
import Select_Container from './Select_Container';
import styled from 'styled-components';
import {BORDER_COLOR, SIXTEEN} from '../../styles/global_design';
import Checkbox_Container from './Checkbox_Container';

const P = styled.p`
	padding: 0px 0px 12px 0px;
	margin: 0px 0px 16px 0px;
	border-bottom: 1px solid ${BORDER_COLOR};
	font-size: ${SIXTEEN};
`;

const Item_Container = styled.div`
	padding: 16px;
`;

const background_theme = [
	{value: 'light_mode', label: 'Light Mode'},
	{value: 'dark_mode', label: 'Dark Mode'},
];

const Preferences_Container = () => {
	const [textCompletion, setTextCompletion] = useState(false);
	const [copyText, setCopyText] = useState(false);
	const [generalTheme, setGeneralTheme] = useState('light_mode');

	return (
		<React.Fragment>
			<Item_Container>
				<P>General</P>
				<Select_Container
					title='UI Theme'
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
				/>
			</Item_Container>
			<Item_Container>
				<P>Terminal</P>
				<Select_Container
					title='UI Theme'
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
				/>
				<Select_Container
					title='UI Theme'
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
				/>
				<Checkbox_Container
					title={'Text completion (IntelliSense)'}
					value={textCompletion}
					setValue={setTextCompletion}
				/>
				<Checkbox_Container
					title={'Copy text on selection'}
					value={copyText}
					setValue={setCopyText}
				/>
			</Item_Container>
			<Item_Container>
				<P>SFTP</P>
				<Select_Container
					title='Editor Theme'
					options={background_theme}
					value={generalTheme}
					setValue={setGeneralTheme}
				/>
			</Item_Container>
		</React.Fragment>
	);
};

export default Preferences_Container;
