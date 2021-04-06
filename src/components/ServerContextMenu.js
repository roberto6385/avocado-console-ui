import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {animation, Item, Menu} from 'react-contexify';
import ConfirmPopup from './ConfirmPopup/ConfirmPopup';

const ServerContextMenu = ({data, indent}) => {
	const [open, setOpen] = useState(false);
	const [keyword, setKeyword] = useState('');

	const MENU_ID = data.key + 'server';

	function handleItemClick({event}) {
		setKeyword(event.currentTarget.id);
		switch (event.currentTarget.id) {
			case 'Connect':
				// contextDownload();
				break;
			case 'Open SFTP':
				// contextEdit(event);
				break;
			case 'Rename':
				// setOpen(true);
				break;
			case 'Delete':
				setOpen(true);
				break;
			case 'Properties':
				// setOpen(true);
				break;
			default:
				return;
		}
	}

	return (
		<>
			<Menu
				id={MENU_ID}
				animation={animation.slide}
				style={{fontSize: '14px'}}
			>
				<Item onClick={handleItemClick} id='Connect'>
					Connect
				</Item>
				<Item onClick={handleItemClick} id='Open SFTP'>
					Open SFTP
				</Item>
				<Item onClick={handleItemClick} id='Rename'>
					Rename
				</Item>
				<Item onClick={handleItemClick} id='Delete'>
					Delete
				</Item>
				<Item onClick={handleItemClick} id='Properties'>
					Properties
				</Item>
			</Menu>
			<ConfirmPopup
				keyword={'delete_server'}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
};

ServerContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default ServerContextMenu;
