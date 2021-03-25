import React, {useEffect} from 'react';
import {Row} from 'react-bootstrap';

import AddServerForm from '../components/AddServerForm';
import LeftContainer from '../components/LeftContainer';
import RightContainer from '../components/RightContainer';
import {MainContainer} from '../styles/page';

const Main = () => {
	return (
		<MainContainer fluid>
			<Row className={'fix-height'}>
				<LeftContainer />
				<RightContainer />
			</Row>
			<AddServerForm />
		</MainContainer>
	);
};

export default Main;
