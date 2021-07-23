import React, {useEffect} from 'react';
import {animation} from 'react-contexify';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

export const ContextMenu = styled.div`
	z-index: 5px;
	position: relative;
	top: 0;
	left: 500px;
`;

const _Item = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
	height: 100px;
`;

const _Message = styled.div`
	width: 300px;
`;

const _Date = styled.div`
	width: 300px;
`;

const NotificationContextMenu = () => {
	// const dispatch = useDispatch();
	const {notification, theme} = useSelector((state) => state.common);

	return (
		<ContextMenu id={'notification'} theme_value={theme}>
			{notification.map((v) => (
				<_Item id={v.id} key={v.id}>
					<_Message>{v.message}</_Message>
					<_Date>{v.date}</_Date>
				</_Item>
			))}
		</ContextMenu>
	);
};

export default NotificationContextMenu;
