import React from 'react';
import styled from 'styled-components';
import {
	BORDER_COLOR,
	GREEN_COLOR,
	MAIN_HEIGHT,
} from '../../styles/global_design';

const Container = styled.div`
	display: flex;
	align-item: center;
	padding: 20px 46px;
	height: ${MAIN_HEIGHT};
	font-family: 'Roboto Slab', serif;
	border-bottom: 1px solid ${BORDER_COLOR};
`;
const Span = styled.span`
	font-size: 23px;
	line-height: 20px;
	color: ${GREEN_COLOR};
`;
const Header = () => {
	return (
		<Container>
			<Span>Avocado</Span>
		</Container>
	);
};

export default Header;
