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
import {tabbarColor} from '../styles/color';
import SettingContextMenu from './ContextMenu/SettingContextMenu';
import ColumnContextMenu from './ContextMenu/ColumnContextMenu';
import AccountContextMenu from './ContextMenu/AccountContextMenu';
import NotificationContextMenu from './ContextMenu/NotificationContextMenu';
import {useDetectOutsideClick} from '../hooks/useDetectOutsideClick';
import {IconButton} from '../styles/icon';

const _Container = styled.div`
	display: flex;
	align-items: center;
	background: transparant;
	height: 100%;
`;

const RightCornerIcons = ({toggle, setToggle}) => {
	const {theme, tab} = useSelector((state) => state.common, shallowEqual);
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

	const openNotification = useCallback(() => {
		setShownotificationMenu(true);
	}, []);

	const openColumn = useCallback(
		(e) => {
			showColumnMenu(e, {
				position: getColumnMenuPosition(),
			});
		},
		[getColumnMenuPosition, showColumnMenu],
	);

	return (
		<_Container>
			<IconButton
				theme_value={theme}
				ref={accountRef}
				onClick={openAccount}
			>
				{accountIcon}
			</IconButton>
			<IconButton
				theme_value={theme}
				ref={settingRef}
				onClick={openSetting}
			>
				{settingIcon}
			</IconButton>

			<IconButton
				theme_value={theme}
				ref={notificationRef}
				onClick={openNotification}
			>
				{notificationIcon}
			</IconButton>

			{tab.length !== 0 && (
				<IconButton
					theme_value={theme}
					ref={columnRef}
					onClick={openColumn}
				>
					{windowIcon}
				</IconButton>
			)}
			<AccountContextMenu toggle={toggle} setToggle={setToggle} />
			<SettingContextMenu toggle={toggle} setToggle={setToggle} />
			<NotificationContextMenu
				show={shownotificationMenu}
				location={{
					left: notificationRef.current?.getBoundingClientRect().left,
					top: notificationRef.current?.getBoundingClientRect()
						.bottom,
				}}
				notificationMunuRef={notificationMunuRef}
			/>
			<ColumnContextMenu />
		</_Container>
	);
};

RightCornerIcons.propTypes = {
	setToggle: PropTypes.func.isRequired,
	toggle: PropTypes.bool.isRequired,
};

export default RightCornerIcons;
