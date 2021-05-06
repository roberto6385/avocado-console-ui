import React, {useCallback} from 'react';
import {Nav} from 'react-bootstrap';
import {FaBars, FaPlus, RiFolderAddLine} from 'react-icons/all';
import {useDispatch, useSelector} from 'react-redux';

import {RotateButton, ServerSearchForm, SidebarShow} from '../styles/common';
import {CHANGE_SIDEBAR_DISPLAY} from '../reducers/common';

import NavList from './NavList/NavList';
import useInput from '../hooks/useInput';

import {getRefreshTicket} from '../reducers/auth/refreshTicket';
import {getVerify} from '../reducers/auth/verify';
import {getRevoke} from '../reducers/auth/revoke';
import {findToken} from '../reducers/auth/find';

import {
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_CONFIRM_POPUP,
} from '../reducers/popup';
import {IconButton} from '../styles/buttons';
import {MainHeader, SubHeader} from '../styles/cards';
import {MAIN_COLOR} from '../styles/global';
import {ColBox} from '../styles/divs';

const LeftContainer = () => {
	const dispatch = useDispatch();
	const {minimize, encodeData} = useSelector((state) => state.common);
	const {userTicket} = useSelector((state) => state.userTicket);
	const [search, onChangeSearch] = useInput('');

	const onClickAddFolder = useCallback(() => {
		dispatch({
			type: OPEN_CONFIRM_POPUP,
			data: {key: 'new_folder'},
		});
	}, []);

	const onClickVisibleForm = useCallback(() => {
		dispatch({
			type: OPEN_ADD_SERVER_FORM_POPUP,
			data: {type: 'add'},
		});
	}, []);

	const onClickLogout = useCallback(() => {
		dispatch(
			getRevoke({Authorization: 'Bearer ' + userTicket.access_token}),
		);
	}, [userTicket, dispatch]);

	const sideBarhandleSize = useCallback(
		(v) => () => {
			dispatch({
				type: CHANGE_SIDEBAR_DISPLAY,
				data: v,
			});
		},
		[],
	);

	const refresh = useCallback(() => {
		dispatch(
			getRefreshTicket({
				Authorization: 'Basic ' + encodeData,
				refresh_token: userTicket.refresh_token,
			}),
		);
	}, [userTicket, dispatch, encodeData]);

	const verify = useCallback(() => {
		dispatch(
			getVerify({
				Authorization: 'Bearer ' + userTicket.access_token,
			}),
		);
	}, [userTicket, dispatch]);

	const findActiveToken = useCallback(() => {
		dispatch(
			findToken({
				offset: 0, //레코드 넘버
				limit: 20, // 조회할 데이터 개수
			}),
		);
	}, [encodeData, userTicket]);

	return !minimize ? (
		<ColBox width={'250px'}>
			<MainHeader back={MAIN_COLOR} color={'white'}>
				<IconButton onClick={sideBarhandleSize(true)}>
					<FaBars style={{color: 'white'}} />
				</IconButton>
				<span>LOGO</span>
			</MainHeader>
			<SubHeader>
				<IconButton onClick={onClickVisibleForm}>
					<FaPlus />
				</IconButton>
				<IconButton onClick={onClickAddFolder}>
					<RiFolderAddLine />
				</IconButton>
				{/*<IconButton onClick={refresh}>*/}
				{/*	<MdRefresh />*/}
				{/*</IconButton>*/}
				{/*<IconButton onClick={verify}>*/}
				{/*	<AiOutlineCheck />*/}
				{/*</IconButton>*/}
				{/*<IconButton onClick={onClickLogout}>*/}
				{/*	<GrLogout />*/}
				{/*</IconButton>*/}
				{/*<IconButton onClick={findActiveToken}>*/}
				{/*	<GiToken />*/}
				{/*</IconButton>*/}
			</SubHeader>

			<Nav.Item key='search'>
				<ServerSearchForm
					onChange={onChangeSearch}
					value={search}
					type='search'
					placeholder='Search'
				/>
			</Nav.Item>

			<NavList search={search} />
		</ColBox>
	) : (
		<SidebarShow>
			<RotateButton onClick={sideBarhandleSize(false)}>
				servers
			</RotateButton>
		</SidebarShow>
	);
};

export default LeftContainer;
