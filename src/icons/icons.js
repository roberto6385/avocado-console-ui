import React from 'react';
import {IconButton, ICON_GRAY_COLOR} from '../styles/global';

export const fileIcon = (
	// eslint-disable-next-line react/react-in-jsx-scope
	<svg
		xmlns='http://www.w3.org/2000/svg'
		height='24px'
		viewBox='0 0 24 24'
		width='24px'
		fill={ICON_GRAY_COLOR}
	>
		{/* eslint-disable-next-line react/react-in-jsx-scope */}
		<path d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z' />
	</svg>
);

export const dnsIconMedium = (
	<span className='material-icons button_midium'>dns</span>
);

export const folderOpenIcon = (
	<span className='material-icons '>folder_open</span>
);
export const folderOpenIconMedium = (
	<span className='material-icons button_midium '>folder_open</span>
);
export const folderIcon = <span className='material-icons '>folder</span>;
export const folderIconMedium = (
	<span className='material-icons button_midium'>folder</span>
);

export const windowIcon = <span className='material-icons'>window</span>;

export const settingIcon = <span className='material-icons'>settings</span>;

export const accountIcon = <span className='material-icons'>person</span>;

export const notificationIcon = (
	<span className='material-icons'>notifications</span>
);

export const plusIcon = <span className='material-icons'>add</span>;

export const burgerMenuIcon = <span className='material-icons '>menu</span>;

export const newFolderIcon = (
	<span className='material-icons '>create_new_folder</span>
);

export const searchIcon = <span className='material-icons'>search</span>;
