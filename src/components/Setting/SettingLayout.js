import React, {useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SettingNav from './SettingNav';
import Footer from '../Footer';
import {useDispatch, useSelector} from 'react-redux';
import {HEIGHT_54} from '../../styles/length';
import {borderColor, logoColor, navColor} from '../../styles/color';
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
	padding: 20px 46px;
	height: ${HEIGHT_54};
	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
	background: ${(props) => props.back};
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
			<_Header bcolor={borderColor[theme]} back={navColor[theme]}>
				{theme === 0 ? (
					<img src={LightModeLogo} height='24' alt='LightModeLogo' />
				) : (
					<img src={DarkModeLogo} height='24' alt='DarkModeLogo' />
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
