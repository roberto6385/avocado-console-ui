import React, {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {OPEN_ADD_SERVER_FORM_POPUP} from '../reducers/popup';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {logoColor, mainBackColor} from '../styles/color';
import LoadingSpinner from './LoadingSpinner';

const _Container = styled.div`
	background: ${(props) => props?.back};
	display: flex;
	flex: 1;
	align-items: center;
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
	color: ${(props) => props?.color};
`;

const MainPage = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('mainPage');

	const {theme} = useSelector((state) => state.common, shallowEqual);
	const {loading: sshLoading} = useSelector(
		(state) => state.ssh,
		shallowEqual,
	);
	const {loading: sftpLoading} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);

	const onClickOpenAddServerDialog = useCallback(() => {
		dispatch({type: OPEN_ADD_SERVER_FORM_POPUP, data: {type: 'add'}});
	}, [dispatch]);

	return (
		<_Container back={mainBackColor[theme]}>
			<_Contents>
				{sshLoading || sftpLoading ? (
					<LoadingSpinner />
				) : (
					<_Text color={logoColor[theme]}>{t('title')}</_Text>
				)}
				{/*<_Text color={fontColor[theme]}>{t('paragraph')}</_Text>*/}
				{/*<PrimaryButton onClick={onClickOpenAddServerDialog}>*/}
				{/*	{t('addServer')}*/}
				{/*</PrimaryButton>*/}
			</_Contents>
		</_Container>
	);
};

export default MainPage;
