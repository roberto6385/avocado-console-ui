import React, {useEffect} from 'react';
import {animation, Item} from 'react-contexify';
import {useSelector} from 'react-redux';
import {Menu} from 'react-contexify';

const NotificationContextMenu = () => {
	// const dispatch = useDispatch();
	const {notification, theme} = useSelector((state) => state.common);

	useEffect(() => {
		console.log(notification);
		notification.map((v) => console.log(v));
	}, [notification]);
	return (
		<Menu
			id={'notification'}
			animation={animation.slide}
			theme_value={theme}
		>
			{notification.map((v) => {
				return (
					<Item id={v.id} key={v.id}>
						<div>{v.message}</div>
						<span>{v.date}</span>
					</Item>
				);
			})}
		</Menu>
	);
};

export default NotificationContextMenu;
