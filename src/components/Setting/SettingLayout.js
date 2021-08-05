import React, {useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SettingNav from './SettingNav';
import Footer from '../Footer';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {SAVE_ACCOUT} from '../../reducers/common';
import {avocadoLogo} from '../../icons/icons';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	font-family: 'Roboto', sans-serif;
`;

const Logo = styled.div`
	svg {
		fill: ${(props) => props.theme.pages.webTerminal.main.font.color};
	}
`;

const _ContentsContainer = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	padding: 18px 46px 19px 46px;
	height: 54px;
	border-bottom: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.setting.header.border.color};
	background: ${(props) =>
		props.theme.pages.webTerminal.setting.header.backgroundColor};
`;

const SettingAppLayout = ({children}) => {
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common, shallowEqual);
	const {userInfo} = useSelector((state) => state.userTicket, shallowEqual);

	useEffect(() => {
		if (userInfo) {
			const email = userInfo.email;
			const index = email.indexOf('@');
			const id = email.substring(0, index);

			dispatch({
				type: SAVE_ACCOUT,
				payload: {
					account: userInfo.id === id ? userInfo.id : id,
					name: userInfo.name,
					email: userInfo.email,
				},
			});
		}
	}, [dispatch, userInfo]);

	return (
		<_Container>
			<_Header>
				<Logo>{avocadoLogo}</Logo>
			</_Header>
			<_ContentsContainer>
				<SettingNav />
				{children}
			</_ContentsContainer>
			<Footer />
		</_Container>
	);
};

SettingAppLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
export default SettingAppLayout;
