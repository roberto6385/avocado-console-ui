import React, {useCallback, useRef} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useContextMenu} from 'react-contexify';
import PropTypes from 'prop-types';

import {
	accountIcon,
	notificationIcon,
	settingIcon,
	windowIcon,
} from '../../icons/icons';
import SettingContextMenu from '../ContextMenu/SettingContextMenu';
import ColumnContextMenu from '../ContextMenu/ColumnContextMenu';
import AccountContextMenu from '../ContextMenu/AccountContextMenu';
import {useDetectOutsideClick} from '../../hooks/useDetectOutsideClick';
import {HoverButton} from '../../styles/components/icon';
import {dialogBoxAction} from '../../reducers/dialogBoxs';

const _Container = styled.div`
	display: flex;
	align-items: center;
	background: transparant;
	height: 100%;
`;

const MenuButtons = ({toggle, setToggle}) => {
	const dispatch = useDispatch();
	const {tab} = useSelector((state) => state.common, shallowEqual);

	const MenuPosition = useRef();
	const accountRef = useRef();
	const settingRef = useRef();
	const notificationRef = useRef();
	const notificationMunuRef = useRef();
	const columnRef = useRef();

	const {show: showAccountMenu} = useContextMenu({
		id: 'account',
	});
	const {show: showSettingMenu} = useContextMenu({
		id: 'setting',
	});
	const {show: showColumnMenu} = useContextMenu({
		id: 'column',
	});
	const [shownotificationMenu, setShownotificationMenu] =
		useDetectOutsideClick(notificationMunuRef, false);

	const getAccountMenuPosition = useCallback(() => {
		const {right, bottom} = accountRef.current?.getBoundingClientRect();
		MenuPosition.current = {x: right - 130, y: bottom};
		return MenuPosition.current;
	}, [MenuPosition]);

	const getSettingMenuPosition = useCallback(() => {
		const {right, bottom} = settingRef.current?.getBoundingClientRect();
		MenuPosition.current = {x: right - 130, y: bottom};
		return MenuPosition.current;
	}, [MenuPosition]);

	const getColumnMenuPosition = useCallback(() => {
		const {right, bottom} = columnRef.current?.getBoundingClientRect();
		MenuPosition.current = {x: right - 130, y: bottom};
		return MenuPosition.current;
	}, [MenuPosition]);

	const openAccountMenu = useCallback(
		(e) => {
			showAccountMenu(e, {
				position: getAccountMenuPosition(),
			});
		},
		[getAccountMenuPosition, showAccountMenu],
	);

	const openSettingMenu = useCallback(
		(e) => {
			showSettingMenu(e, {
				position: getSettingMenuPosition(),
			});
		},
		[getSettingMenuPosition, showSettingMenu],
	);

	const openNotificationMenu = useCallback(() => {
		// setShownotificationMenu(true);
		dispatch(dialogBoxAction.openAlert({key: 'developing'}));
	}, [dispatch]);

	const openColumnMenu = useCallback(
		(e) => {
			showColumnMenu(e, {
				position: getColumnMenuPosition(),
			});
		},
		[getColumnMenuPosition, showColumnMenu],
	);

	return (
		<_Container>
			<HoverButton ref={accountRef} onClick={openAccountMenu}>
				{accountIcon}
			</HoverButton>
			<HoverButton ref={settingRef} onClick={openSettingMenu}>
				{settingIcon}
			</HoverButton>

			<HoverButton ref={notificationRef} onClick={openNotificationMenu}>
				{notificationIcon}
			</HoverButton>

			{tab.length !== 0 && (
				<HoverButton ref={columnRef} onClick={openColumnMenu}>
					{windowIcon}
				</HoverButton>
			)}
			<AccountContextMenu toggle={toggle} setToggle={setToggle} />
			<SettingContextMenu toggle={toggle} setToggle={setToggle} />
			{/*<NotificationContextMenu*/}
			{/*	show={shownotificationMenu}*/}
			{/*	location={{*/}
			{/*		left: notificationRef.current?.getBoundingClientRect().left,*/}
			{/*		top: notificationRef.current?.getBoundingClientRect()*/}
			{/*			.bottom,*/}
			{/*	}}*/}
			{/*	notificationMunuRef={notificationMunuRef}*/}
			{/*/>*/}
			<ColumnContextMenu />
		</_Container>
	);
};

MenuButtons.propTypes = {
	setToggle: PropTypes.func.isRequired,
	toggle: PropTypes.bool.isRequired,
};

export default MenuButtons;
