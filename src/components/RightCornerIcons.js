import React, {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {RIGHT_SIDE_KEY} from '../reducers/common';
import {IconButton} from '../styles/global';
import {
	accountIcon,
	notificationIcon,
	settingIcon,
	windowIcon,
} from '../icons/icons';
import PropTypes from 'prop-types';
import {OPEN_ALERT_POPUP} from '../reducers/popup';
import {tabbarColor} from '../styles/color';
import {useContextMenu} from 'react-contexify';
import SettingContextMenu from './ContextMenu/SettingContextMenu';
import ColumnContextMenu from './ContextMenu/ColumnContextMenu';

const CornerIcons_Container = styled.div`
	display: flex;
	align-items: center;
	background: ${(props) => props?.back};
	height: 100%;
`;

const RightCornerIcons = ({toggle, setToggle}) => {
	const dispatch = useDispatch();
	const {theme, tab, rightSideKey} = useSelector((state) => state.common);
	const settingRef = useRef();
	const columnRef = useRef();
	const MenuPosition = useRef();

	function getSettingMenuPosition() {
		const {right, bottom} = settingRef.current?.getBoundingClientRect();
		MenuPosition.current = {x: right - 130, y: bottom};
		return MenuPosition.current;
	}
	function getColumnMenuPosition() {
		const {right, bottom} = columnRef.current?.getBoundingClientRect();
		MenuPosition.current = {x: right - 130, y: bottom};
		return MenuPosition.current;
	}

	const {show: showMenu1} = useContextMenu({
		id: 'setting',
	});
	const {show: showMenu2} = useContextMenu({
		id: 'column',
	});

	const openSideMenu = useCallback(
		(key) => () => {
			if (toggle && rightSideKey === key) {
				setToggle(false);
			} else {
				dispatch({type: RIGHT_SIDE_KEY, payload: key});
				setToggle(true);
			}
		},
		[rightSideKey, toggle],
	);

	const onClickNotification = useCallback(() => {
		dispatch({
			type: OPEN_ALERT_POPUP,
			data: 'developing',
		});
	}, []);

	const openSetting = useCallback((e) => {
		showMenu1(e, {
			position: getSettingMenuPosition(),
		});
	}, []);

	const openColumn = useCallback((e) => {
		showMenu2(e, {
			position: getColumnMenuPosition(),
		});
	}, []);

	return (
		<CornerIcons_Container back={tabbarColor[theme]}>
			<IconButton onClick={openSideMenu('Account')}>
				{accountIcon}
			</IconButton>
			<IconButton ref={settingRef} onClick={openSetting}>
				{settingIcon}
			</IconButton>
			<IconButton onClick={onClickNotification}>
				{notificationIcon}
			</IconButton>
			{tab.length !== 0 && (
				<IconButton ref={columnRef} onClick={openColumn}>
					{windowIcon}
				</IconButton>
			)}
			<SettingContextMenu toggle={toggle} setToggle={setToggle} />
			<ColumnContextMenu />
		</CornerIcons_Container>
	);
};

RightCornerIcons.propTypes = {
	setToggle: PropTypes.func.isRequired,
	toggle: PropTypes.bool.isRequired,
};

export default RightCornerIcons;
