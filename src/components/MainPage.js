import React from 'react';
import {shallowEqual, useSelector} from 'react-redux';

import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from './LoadingSpinner';
import {sshSelector} from '../reducers/ssh';
import {sftpSelector} from '../reducers/renewal';

const _Container = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	background: ${(props) =>
		props.theme.pages.webTerminal.main.backgroundColor};
`;

const _Content = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	height: 130px;
	min-width: 600px;
`;

const _Title = styled.div`
	font-size: 18px;
	font-weight: 500;
	color: ${(props) => props.theme.pages.webTerminal.main.font.color};
`;

const MainPage = () => {
	const {t} = useTranslation('mainPage');

	const {loading: sshLoading} = useSelector(sshSelector.all);
	const {loading: sftpLoading} = useSelector(sftpSelector.all);

	return (
		<_Container>
			<_Content>
				{sshLoading || sftpLoading ? (
					<LoadingSpinner />
				) : (
					<_Title>{t('title')}</_Title>
				)}
			</_Content>
		</_Container>
	);
};

export default MainPage;
