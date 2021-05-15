import React from 'react';
import styled from 'styled-components';
import Aside from './Aside';
import Main from './Main';

const Container = styled.div`
	display: flex;
	flex: 1;
`;

const Avocado_Main = () => {
	return (
		<Container>
			<Aside />
			<Main />
		</Container>
	);
};

export default Avocado_Main;
