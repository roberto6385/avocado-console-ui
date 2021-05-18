import React from 'react';
import Select_Container from './Select_Container';
import styled from 'styled-components';
import {BORDER_COLOR, SIXTEEN} from '../../styles/global_design';

const P = styled.p`
	padding: 0px 0px 12px 0px;
	margin: 0px 0px 16px 0px;
	border-bottom: 1px solid ${BORDER_COLOR};
	font-size: ${SIXTEEN};
`;

const Item_Container = styled.div`
	padding: 16px 22px;
`;

const background_theme = [
	{value: 'light_mode', label: 'Light Mode'},
	{value: 'dark_mode', label: 'Dark Mode'},
];

const Preferences_Container = () => {
	return (
		<React.Fragment>
			<Item_Container>
				<P>General</P>
				<Select_Container title='UI Theme' options={background_theme} />
			</Item_Container>
			<Item_Container>
				<P>Terminal</P>
				<Select_Container title='UI Theme' options={background_theme} />
				<Select_Container title='UI Theme' options={background_theme} />
			</Item_Container>
			<Item_Container>
				<P>SFTP</P>
				<Select_Container
					title='Editor Theme'
					options={background_theme}
				/>
			</Item_Container>
		</React.Fragment>
	);
};

export default Preferences_Container;
