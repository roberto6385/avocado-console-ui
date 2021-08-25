import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import WorkSpace from '../components/WorkSpace';
import Footer from '../components/Footer';
import {userResourceAction} from '../reducers/api/userResource';
import {authSelector} from '../reducers/api/auth';
import i18n from 'i18next';
import {settingSelector} from '../reducers/setting';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	font-family: 'Roboto', sans-serif;
`;

const Home = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {language} = useSelector(settingSelector.all);
	const {userData} = useSelector(authSelector.all);

	useEffect(() => {
		if (userData) {
			dispatch(
				userResourceAction.findUserByIdRequest({
					access_token: userData.access_token,
					id: userData.user_id,
				}),
			);
		} else {
			history.push('/signin');
		}
	}, [dispatch, userData]);

	useEffect(() => {
		i18n.changeLanguage(language);
	}, [i18n, language]);
	return (
		<_Container>
			<WorkSpace />
			<Footer />
		</_Container>
	);
};

export default Home;
