import React from 'react';
import {shallowEqual, useSelector} from 'react-redux';

import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import LoadingSpinner from './LoadingSpinner';

const _Container = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	background: ${(props) =>
		props.theme.pages.webTerminal.main.backgroundColor};
`;

const _Contents = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	height: 130px;
	min-width: 600px;
`;

const _Text = styled.div`
	font-size: 18px;
	font-weight: 500;
	color: ${(props) => props.theme.pages.webTerminal.main.font.color};
`;

const MainPage = () => {
	const {t} = useTranslation('mainPage');

	const {loading: sshLoading} = useSelector(
		(state) => state.ssh,
		shallowEqual,
	);
	const {loading: sftpLoading} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);

	return (
		<_Container>
			<_Contents>
				{sshLoading || sftpLoading ? (
					<LoadingSpinner />
				) : (
					<_Text>{t('title')}</_Text>
				)}
			</_Contents>
		</_Container>
	);
};

export default MainPage;
