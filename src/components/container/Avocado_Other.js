import React from 'react';
import styled from 'styled-components';
import Aside_Other from './Aside_Other';
import WorkSpace_Other from './WorkSpace_Other';

const Container = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
`;

const Avocado_Other = () => {
	return (
		<Container>
			<Aside_Other />
			<WorkSpace_Other />
		</Container>
	);
};

export default Avocado_Other;
