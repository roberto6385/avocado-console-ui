import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {animation, Item, Menu} from 'react-contexify';

const FolderContextMenu = ({data, indent}) => {
	const [open, setOpen] = useState(false);
	const MENU_ID = data.key + 'folder';

	return (
		<Menu
			id={MENU_ID}
			animation={animation.slide}
			style={{fontSize: '14px'}}
		>
			<Item>New Server</Item>
			<Item>New Folder</Item>
			<Item>Rename</Item>
			<Item>Delete</Item>
		</Menu>
	);
};

FolderContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FolderContextMenu;
