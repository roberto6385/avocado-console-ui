import React, {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useContextMenu} from 'react-contexify';
import PropTypes from 'prop-types';

import {
	accountIcon,
	notificationIcon,
	settingIcon,
	windowIcon,
} from '../../icons/icons';
import SettingContextMenu from '../ContextMenus/SettingContextMenu';
import SplitTerminalViewContextMenu from '../ContextMenus/SplitTerminalViewContextMenu';
import UserAccountContextMenu from '../ContextMenus/UserAccountContextMenu';
import {HoverButton} from '../../styles/components/icon';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {tabBarSelector} from '../../reducers/tabBar';

const _Container = styled.div`
	display: flex;
	align-items: center;
	background: transparant;
	height: 100%;
`;

const MenuButtons = ({isOpened, setisOpened}) => {
	const dispatch = useDispatch();
	const {terminalTabs} = useSelector(tabBarSelector.all);

	const userAccountIconRef = useRef();
	const settingIconRef = useRef();
	const notificationIconRef = useRef();
	const splitTerminalViewIconRef = useRef();

	const {show: showUserAccountMenu} = useContextMenu({
		id: 'user-account-context-menu',
	});
	const {show: showSettingMenu} = useContextMenu({
		id: 'setting-context-menu',
	});
	const {show: showSplitTerminalViewMenu} = useContextMenu({
		id: 'split-terminal-view-context-menu',
	});

	const onClickOpenContextMenu = useCallback(
		(v) => (e) => {
			switch (v) {
				case 'user-account': {
					const {right, bottom} =
						userAccountIconRef.current?.getBoundingClientRect();

					showUserAccountMenu(e, {
						position: {x: right - 130, y: bottom},
					});
					break;
				}

				case 'setting': {
					const {right, bottom} =
						settingIconRef.current?.getBoundingClientRect();

					showSettingMenu(e, {
						position: {x: right - 130, y: bottom},
					});
					break;
				}

				case 'notification':
					dispatch(dialogBoxAction.openAlert({key: 'developing'}));
					break;

				case 'split-terminal-view': {
					const {right, bottom} =
						splitTerminalViewIconRef.current?.getBoundingClientRect();

					showSplitTerminalViewMenu(e, {
						position: {x: right - 130, y: bottom},
					});
					break;
				}
				default:
					return;
			}
		},
		[
			dispatch,
			showSettingMenu,
			showSplitTerminalViewMenu,
			showUserAccountMenu,
		],
	);

	return (
		<_Container>
			<HoverButton
				ref={userAccountIconRef}
				onClick={onClickOpenContextMenu('user-account')}
			>
				{accountIcon}
			</HoverButton>
			<HoverButton
				ref={settingIconRef}
				onClick={onClickOpenContextMenu('setting')}
			>
				{settingIcon}
			</HoverButton>
			<HoverButton
				ref={notificationIconRef}
				onClick={onClickOpenContextMenu('notification')}
			>
				{notificationIcon}
			</HoverButton>
			{terminalTabs.length !== 0 && (
				<HoverButton
					ref={splitTerminalViewIconRef}
					onClick={onClickOpenContextMenu('split-terminal-view')}
				>
					{windowIcon}
				</HoverButton>
			)}
			<UserAccountContextMenu
				isOpened={isOpened}
				setIsOpened={setisOpened}
			/>
			<SettingContextMenu isOpened={isOpened} setisOpened={setisOpened} />
			<SplitTerminalViewContextMenu />
		</_Container>
	);
};

MenuButtons.propTypes = {
	setisOpened: PropTypes.func.isRequired,
	isOpened: PropTypes.bool.isRequired,
};

export default MenuButtons;
