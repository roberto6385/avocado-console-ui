import React from 'react';

// sftp file icon
export const fileIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		height='24px'
		viewBox='0 0 24 24'
		width='24px'
		fill='none'
		className={'filelist_contents'}
	>
		<path d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z' />
	</svg>
);

export const viewColumnIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path d='M20 4H36V8H20z' transform='rotate(90 20 4)' />
		<path d='M14 4H30V8H14z' transform='rotate(90 14 4)' />
		<path d='M8 4H24V8H8z' transform='rotate(90 8 4)' />
	</svg>
);

export const viewListIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path d='M4 4H20V8H4zM4 10H20V14H4zM4 16H20V20H4z' />
	</svg>
);

export const sshIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24px'
		height='24px'
		viewBox='0 0 24 24'
		fill='none'
	>
		<path d='M3 10.95L6.45 7.5 3 4.05 4.05 3l4.5 4.5-4.5 4.5L3 10.95zM8 12.5h7V14H8v-1.5z' />
	</svg>
);

export const cancelFillIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24px'
		height='24px'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z' />
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
		<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z' />
	</svg>
);

// nav - folder,server icon
export const linuxServerIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path d='M17.503 16.042c-.549-.225-.784-.524-.761-.97.023-.52-.272-.9-.412-1.05.085-.324.332-1.442 0-2.414-.356-1.04-1.444-2.628-2.568-4.19-.46-.64-.481-1.337-.506-2.144-.024-.77-.052-1.642-.48-2.612C12.308 1.606 11.371 1 10.205 1c-.694 0-1.406.217-1.954.595-1.122.774-.974 2.463-.876 3.58.014.153.026.298.034.421.065 1.095.006 1.671-.072 1.847-.05.114-.298.44-.56.785-.271.357-.579.762-.83 1.14-.301.453-.544 1.146-.778 1.817-.172.49-.334.954-.492 1.231-.3.533-.225 1.03-.163 1.26-.113.079-.277.234-.415.526-.167.356-.505.547-1.21.683-.323.066-.547.202-.663.404-.17.295-.078.664.007.917.124.372.047.607-.095 1.034-.032.098-.07.21-.106.333-.06.194-.038.37.063.524.266.407 1.042.55 1.84.645.478.056 1 .247 1.505.432.495.18 1.007.368 1.472.425.07.009.14.013.208.013.703 0 1.02-.466 1.12-.657.253-.052 1.123-.217 2.02-.239.895-.026 1.761.151 2.007.206.077.148.28.485.604.659.179.097.427.153.68.153.272 0 .788-.064 1.196-.494.408-.431 1.426-.982 2.169-1.385l.457-.25c.417-.23.645-.562.625-.907-.017-.286-.207-.538-.495-.656zm-9.242-.083c-.052-.366-.523-.73-1.068-1.15-.446-.343-.952-.733-1.09-1.063-.289-.68-.062-1.878.334-2.494.195-.309.355-.777.51-1.23.166-.488.338-.993.531-1.214.306-.346.588-1.018.638-1.547.286.273.73.62 1.139.62.063 0 .124-.009.183-.025.28-.081.692-.32 1.091-.55.344-.199.768-.444.928-.466.273.393 1.862 3.91 2.025 5.04.128.893-.007 1.632-.076 1.921-.055-.007-.12-.013-.189-.013-.443 0-.56.242-.59.386-.079.375-.087 1.573-.088 1.843-.16.203-.97 1.16-2.132 1.333-.473.069-.915.104-1.314.104-.34 0-.557-.027-.648-.04l-.584-.669c.23-.113.46-.353.4-.786zM9.002 4.94l-.054.026c-.001-.04-.006-.08-.012-.12-.064-.367-.307-.634-.578-.634-.02 0-.04.002-.063.005-.161.027-.288.148-.357.32.06-.377.274-.656.528-.656.298 0 .55.401.55.876 0 .06-.005.12-.014.183zm2.315.283c.027-.087.042-.18.042-.278 0-.43-.273-.768-.622-.768-.341 0-.619.344-.619.768 0 .029.002.058.004.087l-.053-.02c-.039-.12-.059-.244-.059-.37 0-.515.33-.934.734-.934.405 0 .734.419.734.934 0 .214-.059.419-.161.581zm-.299 1.003c-.005.026-.018.038-.155.109-.07.036-.155.08-.263.147l-.072.043c-.29.176-.969.587-1.153.612-.125.016-.203-.032-.377-.15-.039-.027-.08-.055-.125-.084-.314-.206-.516-.433-.538-.521.102-.08.355-.277.485-.394.264-.245.529-.41.66-.41.007 0 .013 0 .02.002.154.027.534.179.812.29.128.05.24.095.317.123.246.085.374.193.39.233zm2.208 11.447c.14-.625.299-1.476.273-1.977-.006-.114-.016-.238-.026-.358-.018-.224-.045-.557-.017-.656l.018-.007c.002.287.064.859.521 1.058.136.06.292.09.463.09.458 0 .967-.225 1.175-.433.122-.123.226-.273.298-.392.016.047.025.107.02.185-.027.423.178.984.57 1.19l.057.03c.139.074.509.268.515.36 0 0-.003.011-.024.03-.093.085-.419.251-.734.413-.56.285-1.194.61-1.48.909-.4.422-.854.705-1.128.705-.033 0-.063-.004-.09-.012-.297-.093-.542-.522-.41-1.134zM3.085 16.079c-.03-.142-.055-.254-.029-.362.019-.081.416-.167.586-.204.238-.052.485-.105.646-.203.218-.132.336-.376.44-.591.076-.155.154-.316.247-.369.005-.003.013-.007.028-.007.174 0 .538.365.748.692.053.082.152.248.266.439.341.57.809 1.353 1.053 1.615.22.236.576.689.488 1.078-.064.301-.405.546-.486.6-.029.007-.065.01-.108.01-.467 0-1.392-.388-1.889-.597l-.073-.03c-.278-.117-.73-.19-1.168-.261-.349-.057-.826-.134-.905-.204-.065-.072.01-.306.075-.512.048-.148.096-.302.123-.462.038-.256-.006-.464-.042-.632z' />
	</svg>
);

export const awsServerIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path d='M10 7L3 4.5 10 2l7 2.5L10 7zM9 8.4L2 6v9.6L9 18V8.4zm2 0L18 6v9.6L11 18V8.4z' />
	</svg>
);

export const folderOpenIcon = (
	<span className='material-icons filelist_contents'>folder_open</span>
);

export const folderIcon = <span className='material-icons'>folder</span>;

export const arrowRightIcon = (
	<span className='material-icons'>arrow_right</span>
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
		<path d='M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm8 14H6c-.55 0-1-.45-1-1v-5h5c.55 0 1 .45 1 1v5zm-1-8H5V6c0-.55.45-1 1-1h5v5c0 .55-.45 1-1 1zm8 8h-5v-5c0-.55.45-1 1-1h5v5c0 .55-.45 1-1 1zm1-8h-5c-.55 0-1-.45-1-1V5h5c.55 0 1 .45 1 1v5z' />
	</svg>
);

export const settingIcon = <span className='material-icons'>settings</span>;

export const accountIcon = <span className='material-icons'>person</span>;

export const chevronLeftIcon = (
	<span className='material-icons '>chevron_left</span>
);
export const identityIcon = (
	<span className='material-icons'>assignment_ind</span>
);
export const notificationIcon = (
	<span className='material-icons'>notifications</span>
);

// basic plus icon
export const plusIcon = <span className='material-icons'>add</span>;

// basic close icon

export const closeIcon = <span className='material-icons'>close</span>;

// trash can icon
export const deleteIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		className={'history_contents'}
	>
		<path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z' />
	</svg>
);

// nav - bars icon
export const burgerMenuIcon = <span className='material-icons'>menu</span>;
// nav - new folder
export const newFolderIcon = (
	<span className='material-icons'>create_new_folder</span>
);
// nav and footer search icon
export const searchIcon = <span className='material-icons'>search</span>;

export const arrowDropUpIcon = (
	<span className='material-icons'>keyboard_arrow_up</span>
);
export const arrowDropDownIcon = (
	<span className='material-icons'>keyboard_arrow_down</span>
);

export const zoomInIcon = <span className='material-icons'>zoom_in</span>;
export const zoomOutIcon = <span className='material-icons'>zoom_out</span>;

// sftp terminal icon (현재는 터미널 아이콘 없음)
export const sftpIcon = <span className='material-icons'>swap_vert</span>;

export const sftpIconConvert = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path d='M16 17.01V11c0-.55-.45-1-1-1s-1 .45-1 1v6.01h-1.79c-.45 0-.67.54-.35.85l2.79 2.78c.2.19.51.19.71 0l2.79-2.78c.32-.31.09-.85-.35-.85H16zM8.65 3.35L5.86 6.14c-.32.31-.1.85.35.85H8V13c0 .55.45 1 1 1s1-.45 1-1V6.99h1.79c.45 0 .67-.54.35-.85L9.35 3.35c-.19-.19-.51-.19-.7 0z' />
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
		<path d='M6 14c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1H7v-2c0-.55-.45-1-1-1zm0-4c.55 0 1-.45 1-1V7h2c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm11 7h-2c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1s-1 .45-1 1v2zM14 6c0 .55.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1z' />
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
		<path d='M17.59 3.59c-.38-.38-.89-.59-1.42-.59H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7.83c0-.53-.21-1.04-.59-1.41l-2.82-2.83zM12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm1-10H7c-1.1 0-2-.9-2-2s.9-2 2-2h6c1.1 0 2 .9 2 2s-.9 2-2 2z' />
		<path d='M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z' />
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
		<path d='M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm13.3 11.29c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.88c.38.39.38 1.03 0 1.41z' />
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
		<path d='M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71zM5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z' />
	</svg>
);
export const fileUploadIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path d='M10 16h4c.55 0 1-.45 1-1v-5h1.59c.89 0 1.34-1.08.71-1.71L12.71 3.7c-.39-.39-1.02-.39-1.41 0L6.71 8.29c-.63.63-.19 1.71.7 1.71H9v5c0 .55.45 1 1 1zm-4 2h12c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1z' />
	</svg>
);

// filelist nav 상위경로, drop, list, refresh 아이콘
export const arrowUpwordIcon = (
	<span className='material-icons'>arrow_upward</span>
);
export const refreshIcon = <span className='material-icons'>refresh</span>;
export const homeIcon = <span className='material-icons'>home</span>;

// history icon
export const pauseCircleIcon = (
	<span className='material-icons'>pause_circle_outline</span>
);
export const arrowCircleUpIcon = (
	<span className='material-icons'>arrow_circle_up</span>
);
export const arrowCircleDownIcon = (
	<span className='material-icons'>arrow_circle_down</span>
);
export const buildCircleIcon = (
	<span className='material-icons'>build_circle</span>
);
export const removeCircleIcon = (
	<span className='material-icons'>remove_circle_outline</span>
);

// edit icon
export const editIcon = <span className='material-icons'>edit</span>;
