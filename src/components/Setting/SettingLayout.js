import React, {useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SettingNav from './SettingNav';
import Footer from '../Footer';
import {useDispatch, useSelector} from 'react-redux';
import {borderColor, navColor} from '../../styles/color';
import {SAVE_ACCOUT} from '../../reducers/common';
import LightModeLogo from '../../images/logo@2x.png';
import DarkModeLogo from '../../images/logo_white@3x.png';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	font-family: 'Roboto', sans-serif;
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
	border-color: ${(props) => borderColor[props.theme_value]};
	background: ${(props) => navColor[props.theme_value]};
`;

const SettingAppLayout = ({children}) => {
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);
	const {userInfo} = useSelector((state) => state.userTicket);

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
	}, [userInfo]);

	return (
		<_Container>
			<_Header theme_value={theme}>
				{theme === 0 ? (
					<img src={LightModeLogo} height='17' alt='LightModeLogo' />
				) : (
					<img src={DarkModeLogo} height='17' alt='DarkModeLogo' />
				)}
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
