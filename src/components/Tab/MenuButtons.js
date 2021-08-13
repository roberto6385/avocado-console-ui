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
import SplitTerminalViewContextMenu from '../ContextMenu/SplitTerminalViewContextMenu';
import UserAccountContextMenu from '../ContextMenu/UserAccountContextMenu';
import {HoverButton} from '../../styles/components/icon';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {tabBarSelector} from '../../reducers/tabBar';

const _Container = styled.div`
	display: flex;
	align-items: center;
	background: transparant;
	height: 100%;
`;

const MenuButtons = ({toggle, setToggle}) => {
	const dispatch = useDispatch();
	const {terminalTabs} = useSelector(tabBarSelector.all);

	const MenuPosition = useRef();
	const accountIconRef = useRef();
	const settingIconRef = useRef();
	const notificationIconRef = useRef();
	const terminalRef = useRef();

	const {show: showAccountMenu} = useContextMenu({
		id: 'account',
	});
	const {show: showSettingMenu} = useContextMenu({
		id: 'setting',
	});
	const {show: showColumnMenu} = useContextMenu({
		id: 'column',
	});

	const getAccountMenuPosition = useCallback(() => {
		const {right, bottom} = accountIconRef.current?.getBoundingClientRect();
		MenuPosition.current = {x: right - 130, y: bottom};
		return MenuPosition.current;
	}, [MenuPosition]);

	const getSettingMenuPosition = useCallback(() => {
		const {right, bottom} = settingIconRef.current?.getBoundingClientRect();
		MenuPosition.current = {x: right - 130, y: bottom};
		return MenuPosition.current;
	}, [MenuPosition]);

	const getColumnMenuPosition = useCallback(() => {
		const {right, bottom} = terminalRef.current?.getBoundingClientRect();
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
			<HoverButton ref={accountIconRef} onClick={openAccountMenu}>
				{accountIcon}
			</HoverButton>
			<HoverButton ref={settingIconRef} onClick={openSettingMenu}>
				{settingIcon}
			</HoverButton>

			<HoverButton
				ref={notificationIconRef}
				onClick={openNotificationMenu}
			>
				{notificationIcon}
			</HoverButton>

			{terminalTabs.length !== 0 && (
				<HoverButton ref={terminalRef} onClick={openColumnMenu}>
					{windowIcon}
				</HoverButton>
			)}
			<UserAccountContextMenu toggle={toggle} setToggle={setToggle} />
			<SettingContextMenu toggle={toggle} setToggle={setToggle} />
			<SplitTerminalViewContextMenu />
		</_Container>
	);
};

MenuButtons.propTypes = {
	setToggle: PropTypes.func.isRequired,
	toggle: PropTypes.bool.isRequired,
};

export default MenuButtons;
