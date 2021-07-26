import React from 'react';
import {useSelector} from 'react-redux';
import styled, {keyframes} from 'styled-components';
import PropTypes from 'prop-types';

import {borderColor, fontColor, sshSearch} from '../../styles/color';

const slideIn = keyframes`
  	from {
    	opacity: 0;
    	transform: scale3d(1, 0.3, 1);
  	}
  	to {
    	opacity: 1;
  	}
`;

const slideOut = keyframes`
	from {
    	opacity: 1;
  	}
  	to {
    	opacity: 0;
     	transform: scale3d(1, 0.3, 1);
  	}
`;

const _Nav = styled.div`
	position: absolute;
	left: ${(props) => props?.left};
	top: ${(props) => props?.top};
	width: 300px;
	visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
	transition: visibility 0.3s linear;
	transform-origin: top center;
	animation: ${(props) => (props.show ? slideIn : slideOut)} 0.3s linear;
	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.19);
	border-radius: 4px;
	background: ${(props) => sshSearch[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
	z-index: 7;
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

const NotificationContextMenu = ({
	show,
	notificationRef,
	notificationMunuRef,
}) => {
	const {notification, theme} = useSelector((state) => state.common);
	return (
		<_Nav
			ref={notificationMunuRef}
			id={'notification'}
			theme_value={theme}
			show={show}
			left={
				notificationRef.current?.getBoundingClientRect().left -
				288 +
				'px'
			}
			top={notificationRef.current?.getBoundingClientRect().bottom + 'px'}
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
	notificationRef: PropTypes.object.isRequired,
	notificationMunuRef: PropTypes.object.isRequired,
};

export default NotificationContextMenu;
