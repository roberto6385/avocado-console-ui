import React, {useCallback, useRef} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useContextMenu} from 'react-contexify';
import PropTypes from 'prop-types';

import {
	accountIcon,
	notificationIcon,
	settingIcon,
	windowIcon,
} from '../icons/icons';
import {OPEN_ALERT_POPUP} from '../reducers/popup';
import {tabbarColor} from '../styles/color';
import {ClickableIconButton} from '../styles/button';
import SettingContextMenu from './ContextMenu/SettingContextMenu';
import ColumnContextMenu from './ContextMenu/ColumnContextMenu';
import AccountContextMenu from './ContextMenu/AccountContextMenu';
import NotificationContextMenu from './ContextMenu/NotificationContextMenu';
import {useDetectOutsideClick} from '../hooks/useDetectOutsideClick';

const CornerIcons_Container = styled.div`
	display: flex;
	align-items: center;
	background: ${(props) => props?.back};
	height: 100%;
`;

const RightCornerIcons = ({toggle, setToggle}) => {
	const {theme, tab} = useSelector((state) => state.common, shallowEqual);
	const MenuPosition = useRef();
	const accountRef = useRef();
	const settingRef = useRef();
	const columnRef = useRef();
	const dropdownRef = useRef();
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
		useDetectOutsideClick(dropdownRef, false);

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

	// const getNotificationMenuPosition = useCallback(() => {
	// 	const {right, bottom} =
	// 		notificationRef.current?.getBoundingClientRect();
	// 	MenuPosition.current = {x: right - 130, y: bottom};
	// 	return MenuPosition.current;
	// }, [MenuPosition]);

	const getColumnMenuPosition = useCallback(() => {
		const {right, bottom} = columnRef.current?.getBoundingClientRect();
		MenuPosition.current = {x: right - 130, y: bottom};
		return MenuPosition.current;
	}, [MenuPosition]);

	const openAccount = useCallback(
		(e) => {
			showAccountMenu(e, {
				position: getAccountMenuPosition(),
			});
		},
		[getAccountMenuPosition, showAccountMenu],
	);

	const openSetting = useCallback(
		(e) => {
			showSettingMenu(e, {
				position: getSettingMenuPosition(),
			});
		},
		[getSettingMenuPosition, showSettingMenu],
	);

	//TODO: 배포전 수정
	// const openNotification = useCallback(() => {
	// 	dispatch({
	// 		type: OPEN_ALERT_POPUP,
	// 		data: 'developing',
	// 	});
	// }, []);

	const openNotification = useCallback(() => {
		setShownotificationMenu(!shownotificationMenu);
	}, [shownotificationMenu]);

	const openColumn = useCallback(
		(e) => {
			showColumnMenu(e, {
				position: getColumnMenuPosition(),
			});
		},
		[getColumnMenuPosition, showColumnMenu],
	);

	return (
		<CornerIcons_Container back={tabbarColor[theme]}>
			<ClickableIconButton
				theme_value={theme}
				ref={accountRef}
				onClick={openAccount}
			>
				{accountIcon}
			</ClickableIconButton>
			<ClickableIconButton
				theme_value={theme}
				ref={settingRef}
				onClick={openSetting}
			>
				{settingIcon}
			</ClickableIconButton>

			<ClickableIconButton theme_value={theme} onClick={openNotification}>
				{notificationIcon}
			</ClickableIconButton>

			{tab.length !== 0 && (
				<ClickableIconButton
					theme_value={theme}
					ref={columnRef}
					onClick={openColumn}
				>
					{windowIcon}
				</ClickableIconButton>
			)}
			<AccountContextMenu toggle={toggle} setToggle={setToggle} />
			<SettingContextMenu toggle={toggle} setToggle={setToggle} />
			<NotificationContextMenu
				show={shownotificationMenu}
				dropdownRef={dropdownRef}
			/>
			<ColumnContextMenu />
		</CornerIcons_Container>
	);
};

RightCornerIcons.propTypes = {
	setToggle: PropTypes.func.isRequired,
	toggle: PropTypes.bool.isRequired,
};

export default RightCornerIcons;
