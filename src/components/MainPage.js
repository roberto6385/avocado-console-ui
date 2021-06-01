import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {OPEN_ADD_SERVER_FORM_POPUP} from '../reducers/popup';
import {PrimaryButton, sideColor, fontColor, backColor} from '../styles/global';
import styled from 'styled-components';

const _Container = styled.div`
	background: ${(props) => props.back};
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
`;

const _Text = styled.div`
	color: ${(props) => props?.color};
`;

const MainPage = () => {
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);

	// 삭제 ㄴㄴ
	//
	// const refresh = useCallback(() => {
	// 	dispatch(
	// 		getRefreshTicket({
	// 			Authorization: 'Basic ' + encodeData,
	// 			refresh_token: userTicket.refresh_token,
	// 		}),
	// 	);
	// }, [userTicket, dispatch, encodeData]);
	//
	// const verify = useCallback(() => {
	// 	dispatch(
	// 		getVerify({
	// 			Authorization: 'Bearer ' + userTicket.access_token,
	// 		}),
	// 	);
	// }, [userTicket, dispatch]);
	//
	// const findActiveToken = useCallback(() => {
	// 	dispatch(
	// 		findToken({
	// 			offset: 0, //레코드 넘버
	// 			limit: 20, // 조회할 데이터 개수
	// 		}),
	// 	);
	// }, [encodeData, userTicket]);

	const onClickVisibleForm = useCallback(() => {
		dispatch({type: OPEN_ADD_SERVER_FORM_POPUP, data: {type: 'add'}});
	}, []);

	return (
		<_Container back={backColor[theme]}>
			<_Contents>
				<_Text color={fontColor[theme]}>Hello! Start Avocado</_Text>
				<_Text color={fontColor[theme]}>
					Select a server to start a session via SSH, SFTP, RDP, VNC
					or Telnet. Or
				</_Text>
				<PrimaryButton onClick={onClickVisibleForm}>
					Add Server
				</PrimaryButton>
			</_Contents>
		</_Container>
	);
};

export default MainPage;
