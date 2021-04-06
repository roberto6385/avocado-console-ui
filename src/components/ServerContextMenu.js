import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {animation, Item, Menu} from 'react-contexify';

const ServerContextMenu = ({data, indent}) => {
	const [open, setOpen] = useState(false);
	const MENU_ID = data.key + 'server';

	return (
		<Menu
			id={MENU_ID}
			animation={animation.slide}
			style={{fontSize: '14px'}}
		>
			<Item>Connect</Item>
			<Item>Open SFTP</Item>
			<Item>Rename</Item>
			<Item>Delete</Item>
			<Item>Properties</Item>
		</Menu>
	);
};

ServerContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default ServerContextMenu;
