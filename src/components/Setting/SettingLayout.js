import React, {useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SettingNav from './SettingNav';
import Footer from '../Footer';
import {useDispatch, useSelector} from 'react-redux';
import {HEIGHT_54} from '../../styles/length';
import {borderColor, logoColor, navColor} from '../../styles/color';
import {SAVE_ACCOUT} from '../../reducers/common';

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
	font-family: 'Roboto Slab', serif;

	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
	background: ${(props) => props.back};
`;

const _Span = styled.span`
	font-size: 23px;
	line-height: 20px;
	color: ${(props) => props?.color};
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
				<_Span color={logoColor[theme]}>Avocado</_Span>
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
