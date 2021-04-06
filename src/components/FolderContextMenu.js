import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {animation, Item, Menu} from 'react-contexify';
import AddServerForm from './AddServerForm/AddServerForm';
import ConfirmPopup from './ConfirmPopup/ConfirmPopup';

const FolderContextMenu = ({data, indent}) => {
	const [open, setOpen] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [showAddServerForm, setShowAddServerForm] = useState(false);
	const [addFolderOpen, setAddFolderOpen] = useState(false);

	const MENU_ID = data.key + 'folder';

	function handleItemClick({event}) {
		setKeyword(event.currentTarget.id);
		switch (event.currentTarget.id) {
			case 'New Server':
				setShowAddServerForm(true);
				break;
			case 'New Folder':
				setAddFolderOpen(true);
				break;
			case 'Rename':
				// setOpen(true);
				break;
			case 'Delete':
				setOpen(true);
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
				<Item onClick={handleItemClick} id='New Server'>
					New Server
				</Item>
				<Item onClick={handleItemClick} id='New Folder'>
					New Folder
				</Item>
				<Item onClick={handleItemClick} id='Rename'>
					Rename
				</Item>
				<Item onClick={handleItemClick} id='Delete'>
					Delete
				</Item>
			</Menu>
			<AddServerForm
				showForm={showAddServerForm}
				setShowForm={setShowAddServerForm}
			/>
			<ConfirmPopup
				keyword={'add_folder'}
				open={addFolderOpen}
				setOpen={setAddFolderOpen}
			/>
			<ConfirmPopup
				keyword={'delete_server'}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
};

FolderContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FolderContextMenu;
