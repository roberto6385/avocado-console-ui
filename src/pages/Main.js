import React, {useState} from 'react';
import {Row} from 'react-bootstrap';

import AddServerForm from '../components/AddServerForm';
import LeftContainer from '../components/LeftContainer';
import RightContainer from '../components/RightContainer';
import {MainContainer} from '../styles/page';

const Main = () => {
	const [showAddServerForm, setShowAddServerForm] = useState(false);

	return (
		<MainContainer fluid>
			<Row className={'fix-height'}>
				<LeftContainer setShowAddServerForm={setShowAddServerForm} />
				<RightContainer setShowAddServerForm={setShowAddServerForm} />
			</Row>
			<AddServerForm
				showForm={showAddServerForm}
				setShowForm={setShowAddServerForm}
			/>
		</MainContainer>
	);
};

export default Main;
