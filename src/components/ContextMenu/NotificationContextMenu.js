import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {borderColor, fontColor, modalColor} from '../../styles/color';

const _Nav = styled.div`
	z-index: 5;
	top: 0;
	right: 50px;
	position: absolute;
	top: 60px;
	transform: translateY(-20px);
	visibility: ${(props) => props?.visibility};
	width: 300px;
	border: 1px solid ${(props) => borderColor[props.theme_value]};
	background: ${(props) => modalColor[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};

	.active {
		transform: translateY(0);
		visibility: visible;
	}
`;

const _Item = styled.li`
	padding: 18px;
	display: flex;
	flex-direction: column;
	height: 100px;
	border-bottom: 1px solid ${(props) => borderColor[props.theme_value]};
`;

const _Message = styled.div`
	margin-bottom: 10px;
	font-size: 16px;
`;

const _Date = styled.div``;

const isToday = (date) => {
	const today = new Date();
	return (
		date.getDate() == today.getDate() &&
		date.getMonth() == today.getMonth() &&
		date.getFullYear() == today.getFullYear()
	);
};

const calculateData = (data) => {
	const date = new Date(data);
	if (isToday(date)) {
		if (Math.floor((Date.now() - date) / 1000 / 60 / 60) > 0) {
			return (
				Math.floor((Date.now() - date) / 1000 / 60 / 60) + 'hour ago'
			);
		} else if (Math.floor((Date.now() - date) / 1000 / 60) > 0) {
			return Math.floor((Date.now() - date) / 1000 / 60) + 'min ago';
		} else return 'now';
	}
	return date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate();
};

const NotificationContextMenu = ({show, dropdownRef}) => {
	const {notification, theme} = useSelector((state) => state.common);

	return (
		<_Nav
			ref={dropdownRef}
			id={'notification'}
			theme_value={theme}
			visibility={show ? 'visible' : 'hidden'}
		>
			<ul>
				{notification.map((v) => (
					<_Item id={v.id} key={v.id} theme_value={theme}>
						<_Message>{v.message}</_Message>
						<_Date>{calculateData(v.date)}</_Date>
					</_Item>
				))}
			</ul>
		</_Nav>
	);
};

NotificationContextMenu.propTypes = {
	show: PropTypes.bool.isRequired,
	dropdownRef: PropTypes.object.isRequired,
};

export default NotificationContextMenu;
