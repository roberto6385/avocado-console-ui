import React, {useState} from 'react';
import {Row} from 'react-bootstrap';

import AddServerForm from '../components/AddServerForm';
import LeftContainer from '../components/LeftContainer';
import RightContainer from '../components/RightContainer';
import {MainContainer, MainRow} from '../styles/page';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

const Main = () => {
	const [showAddServerForm, setShowAddServerForm] = useState(false);
	const {me} = useSelector((state) => state.common);

	// if (!me) return <Redirect to='/login' />;

	return (
		<MainContainer fluid>
			<MainRow className={'fix-height'}>
				<LeftContainer setShowAddServerForm={setShowAddServerForm} />
				<RightContainer setShowAddServerForm={setShowAddServerForm} />
			</MainRow>
			<AddServerForm
				showForm={showAddServerForm}
				setShowForm={setShowAddServerForm}
			/>
		</MainContainer>
	);
};

export default Main;
