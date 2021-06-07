import React from 'react';
import {LIGHT_MODE_ICON_COLOR} from '../styles/global';

// sftp file icon
export const fileIcon = (
	// eslint-disable-next-line react/react-in-jsx-scope
	<svg
		xmlns='http://www.w3.org/2000/svg'
		height='24px'
		viewBox='0 0 24 24'
		width='24px'
		fill={LIGHT_MODE_ICON_COLOR}
	>
		{/* eslint-disable-next-line react/react-in-jsx-scope */}
		<path d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z' />
	</svg>
);

export const viewColumnIcon = (color) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill={color}
		viewBox='0 0 24 24'
	>
		<path d='M20 4H36V8H20z' transform='rotate(90 20 4)' />
		<path d='M14 4H30V8H14z' transform='rotate(90 14 4)' />
		<path d='M8 4H24V8H8z' transform='rotate(90 8 4)' />
	</svg>
);

export const viewListIcon = (color) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill={color}
		viewBox='0 0 24 24'
	>
		<path d='M4 4H20V8H4zM4 10H20V14H4zM4 16H20V20H4z' />
	</svg>
);

export const sshIcon = (color) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='18px'
		height='18px'
		viewBox='0 0 18 18'
		fill={color}
	>
		<path d='M3 10.95L6.45 7.5 3 4.05 4.05 3l4.5 4.5-4.5 4.5L3 10.95zM8 12.5h7V14H8v-1.5z' />
	</svg>
);

export const cancelFillIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path
			fill='#D55959'
			d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z'
		/>
	</svg>
);

export const alertFillIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path
			fill='#178082'
			d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z'
		/>
	</svg>
);

// nav - folder,server icon
export const dnsIconMidium = (
	<span className='material-icons button_midium'>dns</span>
);
export const folderOpenIcon = (
	<span className='material-icons '>folder_open</span>
);
export const folderOpenIconMidium = (
	<span className='material-icons button_midium '>folder_open</span>
);
export const folderIcon = <span className='material-icons '>folder</span>;
export const folderIconMidium = (
	<span className='material-icons button_midium'>folder</span>
);
export const arrowRightIconMidium = (
	<span className='material-icons button_midium'>arrow_right</span>
);

// right corner and setting icon
export const windowIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path
			fill='#959EA1'
			d='M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm8 14H6c-.55 0-1-.45-1-1v-5h5c.55 0 1 .45 1 1v5zm-1-8H5V6c0-.55.45-1 1-1h5v5c0 .55-.45 1-1 1zm8 8h-5v-5c0-.55.45-1 1-1h5v5c0 .55-.45 1-1 1zm1-8h-5c-.55 0-1-.45-1-1V5h5c.55 0 1 .45 1 1v5z'
		/>
	</svg>
);
export const settingIcon = <span className='material-icons'>settings</span>;
export const settingIconMidium = (
	<span className='material-icons button_midium'>settings</span>
);
export const accountIcon = <span className='material-icons'>person</span>;
export const accountIconMidium = (
	<span className='material-icons button_midium'>person</span>
);
export const chevronLeftIcon = (
	<span className='material-icons '>chevron_left</span>
);
export const identityIconMidium = (
	<span className='material-icons button_midium'>assignment_ind</span>
);
export const notificationIcon = (
	<span className='material-icons'>notifications</span>
);

// basic plus icon
export const plusIcon = <span className='material-icons'>add</span>;

// basic close icon
export const closeIconSmall = (
	<span className='material-icons button_small'>close</span>
);
export const closeIconMedium = (
	<span className='material-icons button_midium'>close</span>
);

// trash can icon
export const deleteIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		className={'history_contents'}
	>
		<path
			fill='#959EA1'
			d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z'
		/>
	</svg>
);
export const deleteIconMidium = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='20'
		height='20'
		fill='none'
		viewBox='0 0 20 20'
	>
		<path
			fill='#959EA1'
			d='M5 15.833c0 .917.75 1.667 1.667 1.667h6.666c.917 0 1.667-.75 1.667-1.667V7.5c0-.917-.75-1.667-1.667-1.667H6.667C5.75 5.833 5 6.583 5 7.5v8.333zm10-12.5h-2.083l-.592-.591c-.15-.15-.367-.242-.583-.242H8.258c-.216 0-.433.092-.583.242l-.592.591H5c-.458 0-.833.375-.833.834 0 .458.375.833.833.833h10c.458 0 .833-.375.833-.833 0-.459-.375-.834-.833-.834z'
		/>
	</svg>
);

// nav - bars icon
export const burgerMenuIcon = <span className='material-icons '>menu</span>;
// nav - new folder
export const newFolderIcon = (
	<span className='material-icons '>create_new_folder</span>
);
// nav and footer search icon
export const searchIcon = <span className='material-icons'>search</span>;
export const searchIconMicro = (
	<span className='material-icons button_micro'>search</span>
);
export const arrowDropDownIconMidium = (
	<span className='material-icons button_midium'>arrow_drop_down</span>
);
export const arrowDropUpIconMidium = (
	<span className='material-icons button_midium'>arrow_drop_up</span>
);
export const zoomInIconMicro = (
	<span className='material-icons button_micro'>zoom_in</span>
);
export const zoomOutIconMicro = (
	<span className='material-icons button_micro'>zoom_out</span>
);

// sftp terminal icon (현재는 터미널 아이콘 없음)
export const sftpIconSmall = (
	<span className='material-icons button_small'>swap_vert</span>
);
export const sftpIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path
			fill='#959EA1'
			d='M16 17.01V11c0-.55-.45-1-1-1s-1 .45-1 1v6.01h-1.79c-.45 0-.67.54-.35.85l2.79 2.78c.2.19.51.19.71 0l2.79-2.78c.32-.31.09-.85-.35-.85H16zM8.65 3.35L5.86 6.14c-.32.31-.1.85.35.85H8V13c0 .55.45 1 1 1s1-.45 1-1V6.99h1.79c.45 0 .67-.54.35-.85L9.35 3.35c-.19-.19-.51-.19-.7 0z'
		/>
	</svg>
);

export const snippetIcon = (
	<span className='material-icons '>text_snippet</span>
);
export const fullScreenIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path
			fill='#959EA1'
			d='M6 14c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1H7v-2c0-.55-.45-1-1-1zm0-4c.55 0 1-.45 1-1V7h2c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm11 7h-2c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1s-1 .45-1 1v2zM14 6c0 .55.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1z'
		/>
	</svg>
);

// edit - nav save icon

export const saveIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path
			fill='#959EA1'
			d='M17.59 3.59c-.38-.38-.89-.59-1.42-.59H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7.83c0-.53-.21-1.04-.59-1.41l-2.82-2.83zM12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm1-10H7c-1.1 0-2-.9-2-2s.9-2 2-2h6c1.1 0 2 .9 2 2s-.9 2-2 2z'
		/>
		<path
			fill='#959EA1'
			d='M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z'
		/>
	</svg>
);

export const squareDeleteIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path
			fill='#959EA1'
			d='M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm13.3 11.29c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.88c.38.39.38 1.03 0 1.41z'
		/>
	</svg>
);

// upload download icon
export const fileDownloadIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path
			fill='#959EA1'
			d='M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71zM5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z'
		/>
	</svg>
);
export const fileUploadIcon = (color = '#959EA1') => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path
			fill={color}
			d='M10 16h4c.55 0 1-.45 1-1v-5h1.59c.89 0 1.34-1.08.71-1.71L12.71 3.7c-.39-.39-1.02-.39-1.41 0L6.71 8.29c-.63.63-.19 1.71.7 1.71H9v5c0 .55.45 1 1 1zm-4 2h12c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1z'
		/>
	</svg>
);

export const navNextIcon = (
	<span className='material-icons button_super'>navigate_next</span>
);

// filelist nav 상위경로, drop, list, refresh 아이콘
export const arrowUpwordIcon = (
	<span className='material-icons '>arrow_upward</span>
);
export const refreshIcon = <span className='material-icons '>refresh</span>;
export const homeIcon = <span className='material-icons '>home</span>;

// history icon
export const pauseCircleIconSmall = (
	<span className='material-icons button_small'>pause_circle_outline</span>
);
export const arrowCircleUpIconSmall = (
	<span className='material-icons button_small'>arrow_circle_up</span>
);
export const arrowCircleDownIconSmall = (
	<span className='material-icons button_small'>arrow_circle_down</span>
);
export const buildCircleIconSmall = (
	<span className='material-icons button_small'>build_circle</span>
);
export const removeCircleIconSmall = (
	<span className='material-icons button_small'>remove_circle_outline</span>
);

// edit icon
export const editIcon = <span className='material-icons '>edit</span>;
