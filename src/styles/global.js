// color
import styled from 'styled-components';

export const AVOCADO_HOVER_COLOR = '#45999b'; // folder,server highlight color
export const LIGHT_BACK_COLOR = '#f0f3f6'; // terminal, input background color
export const ICON_DARK_COLOR = 'rgba(0,0,0,0.54)'; // file list nav icon color

export const pauseColor = '#a8a8a8';
export const downloadColor = '#4ca6a8';
export const uploadColor = '#4285f4';
export const editColor = '#E4E723';
export const deleteColor = '#d45959';

// lightmode color
export const LIGHT_MODE_MINT_COLOR = '#4ca6a8';
export const LIGHT_MODE_POPUP_COLOR = '#ffffff';
export const LIGHT_MODE_SIDE_COLOR = '#ffffff';
export const LIGHT_MODE_FONT_COLOR = '#212121';
export const LIGHT_MODE_BACKGROUND_MINT_COLOR = '#e4f3f4'; // folder,server highlight color
export const LIGHT_MODE_ICON_COLOR = '#959ea1';
export const LIGHT_MODE_BACKGROUND_COLOR = '#f8f9fa'; // and filelist highlighting color
export const LIGHT_MODE_BORDER_COLOR = '#e5e5e5';
export const LIGHT_MODE_FOOTER_BACKGROUND_COLOR = '#dee1e6';
export const LIGHT_MODE_FORM_BACKGROUND_COLOR = '#ffffff';
export const LIGHT_MODE_INPUT_BACKGROUND_COLOR = '#f0f3f6';

// darkmode color
export const DARK_MODE_MINT_COLOR = '#44c8c0';
export const DARK_MODE_POPUP_COLOR = '#223b52';
export const DARK_MODE_SIDE_COLOR = '#1e364c';
export const DARK_MODE_FONT_COLOR = '#ffffff';
export const DARK_MODE_ICON_COLOR = 'rgba(255,255,255,0.54)';
export const DARK_MODE_BACKGROUND_MINT_COLOR = 'rgba(0,0,0,0.24)'; // folder,server highlight color
export const DARK_MODE_SERVER_FOLDER_COLOR = 'rgba(0,0,0,0.24)';
export const DARK_MODE_BACKGROUND_COLOR = '#1b2935';
export const DARK_MODE_BORDER_COLOR = '#192836';
export const DARK_MODE_FOOTER_BACKGROUND_COLOR = '#18191f';
export const DARK_MODE_FORM_BACKGROUND_COLOR = '#253c51';
export const DARK_MODE_INPUT_BACKGROUND_COLOR = 'rgba(0,0,0, 0.22)';

// Button color
export const ICON_LIGHT_COLOR = 'rgba(60,76,81,0.44)'; // tab icon color
export const ICON_ACTIVE_LIGHT_COLOR = 'rgba(60,76,81,0.56)'; // tab icon color
export const ICON_HOVER_LIGHT_COLOR = 'rgba(60,76,81,0.31)'; // tab icon color

export const DARK_GREEN_COLOR = '#126466';
export const ANCHOR_GRAY_COLOR = '#5e5e5e';

export const DISABLED_COLOR = 'rgba(60, 76, 81, 0.12)';
export const GRAY_COLOR = '#a9b0b2';
export const GRAY_HOVER_COLOR = 'rgba(60, 76 ,81, 0.38)';
export const GRAY_ACTIVE_COLOR = 'rgba(60 ,76, 81, 0.56)';
export const GREEN_COLOR = '#178082'; // logo, active icon color
export const GREEN_HOVER_COLOR = '#389193';
export const GREEN_ACTIVE_COLOR = '#0a6f71';
export const RED_COLOR = '#d45959';
export const RED_HOVER_COLOR = '#de6565';
export const RED_ACTIVE_COLOR = '#b84646';

export const CANCEL_BUTTON_DEFAULT_BORDER = `rgba(168, 168, 168, 0.7)`;
export const CANCEL_BUTTON_DEFAULT_COLOR = '#687578';
export const CANCEL_BUTTON_DEFAULT_HOVER_BORDER = `rgba(168, 168, 168, 0.6)`;
export const CANCEL_BUTTON_DEFAULT_HOVER_COLOR = `rgba(114, 125, 128, 0.87)`;
export const CANCEL_BUTTON_DEFAULT_ACTIVE_BORDER = `#a8a8a8`;
export const CANCEL_BUTTON_DEFAULT_ACTIVE_COLOR = `#556367`;

// theme
export const backColor = [
	LIGHT_MODE_BACKGROUND_COLOR,
	DARK_MODE_BACKGROUND_COLOR,
];
export const sideColor = [LIGHT_MODE_SIDE_COLOR, DARK_MODE_SIDE_COLOR];
export const popupColor = [LIGHT_MODE_POPUP_COLOR, DARK_MODE_POPUP_COLOR];
export const fontColor = [LIGHT_MODE_FONT_COLOR, DARK_MODE_FONT_COLOR];
export const iconColor = [LIGHT_MODE_ICON_COLOR, DARK_MODE_ICON_COLOR];
export const borderColor = [LIGHT_MODE_BORDER_COLOR, DARK_MODE_BORDER_COLOR];
export const serverFolderBackColor = [
	LIGHT_MODE_BACKGROUND_MINT_COLOR,
	DARK_MODE_BACKGROUND_MINT_COLOR,
];
export const footerColor = [
	LIGHT_MODE_FOOTER_BACKGROUND_COLOR,
	DARK_MODE_FOOTER_BACKGROUND_COLOR,
];
export const formColor = [
	LIGHT_MODE_FORM_BACKGROUND_COLOR,
	DARK_MODE_FORM_BACKGROUND_COLOR,
];
export const inputColor = [
	LIGHT_MODE_INPUT_BACKGROUND_COLOR,
	DARK_MODE_INPUT_BACKGROUND_COLOR,
];
export const mintColor = [LIGHT_MODE_MINT_COLOR, DARK_MODE_MINT_COLOR];

// height
export const MAIN_HEIGHT = '60px'; // tab container, logo container
export const SUB_HEIGHT = '50px'; // new folder container, (ssht, sftp nav)
export const THIRD_HEIGHT = '48px'; // aside form height, sftp table height
export const FOLDER_HEIGHT = '40px'; // folder, server height
export const FOOTER_HEIGHT = '26px'; // footer height
export const SEARCH_INPUT_HEIGHT = '36px';
export const PATH_SEARCH_INPUT_HEIGHT = '34px'; // and Drop Space Button, Account Button
export const SSH_SFTP_HEADER_HEIGHT = '30px';
export const DROP_SPACE_HEIGHT = '132px';
export const TERMINAL_SEARCH_FORM_HEIGHT = '42px';
export const AUTH_FORM_HEIGHT = '630px';
export const AUTH_FORM_SUB_HEIGHT = '614px';

// width
export const SIDE_WIDTH = '256px'; // side main nav width
export const RIGHT_SIDE_WIDTH = '300px';
export const SEARCH_INPUT_WIDTH = '165px';
export const TAB_WIDTH = '160px'; // tab, history button
export const HISTORY_ITEM_WIDTH = '134px';
export const TERMINAL_SEARCH_FORM_WIDTH = '400px';
export const ACCOUNT_BUTTON_WIDTH = '268px'; // and account input width
export const ACCOUNT_INPUT_WIDTH = '500px';
export const AUTH_FORM_WIDTH = '500px';
export const SERVER_FORM_INPUT_WIDTH = '178px';

// font-size
export const AVOCADO_FONTSIZE = '14px';
export const FOOTER_FONTSIZE = '10px';
export const HISTORY_FONTSIZE = '12px';
export const EIGHTEEN = '18px';
export const SIXTEEN = '16px';
export const MIDDLE_FONTSIZE = '20px';
export const LOGO_FONTSIZE = '24px';
export const LOGIN_LOGO_FONTSIZE = '29px';

// span
export const Span = styled.span`
	flex: ${(props) => props?.flex};
	font-size: ${(props) => props?.size || AVOCADO_FONTSIZE};
	padding: ${(props) => props.padding || '6px'};
	line-height: 0px;
	color: ${(props) => props.color};
`;

// font
export const NOTO_SANS_KR = `'Noto Sans KR', sans-serif`;
export const ROBOTO = `'Roboto', sans-serif`;
export const ROBOTO_MONO = `'Roboto Mono', monospace`;
export const ROBOTO_SLAP = `'Roboto Slab', serif`;
export const MONTSERRAT = `'Montserrat', sans-serif`;

// button
export const IconButton = styled.button`
	background: transparent;
	border: none;
	line-height: 0px;
	padding: ${(props) => props?.padding || '6px'};
	font-size: ${(props) => props?.size || MIDDLE_FONTSIZE};
	color: ${(props) => props.color || LIGHT_MODE_ICON_COLOR};

	// &:hover {
	// 	color: ${(props) => props?.hover || ICON_HOVER_LIGHT_COLOR};
	// }
	// &:active {
	// 	color: ${(props) => props?.active || ICON_ACTIVE_LIGHT_COLOR};
	// }
`;

export const DefaultButton = styled.button`
	height: 34px;
	width: 120px; // s,m,l 사이즈 정해지면 넣을 예정.
	border: none;
	line-height: 0px;
	padding: 7px 16px;
	margin: 0px 8px;
	font-size: 14px;
	color: white;
	border-radius: 4px;
	background: ${GRAY_COLOR};
	&:hover {
		background: ${GRAY_HOVER_COLOR};
	}
	&:active {
		background: ${GRAY_ACTIVE_COLOR};
	}
`;

export const PrimaryButton = styled(DefaultButton)`
	background: ${GREEN_COLOR};
	&:hover {
		background: ${GREEN_HOVER_COLOR};
	}
	&:active {
		background: ${GREEN_ACTIVE_COLOR};
	}
`;
export const DangerButton = styled(DefaultButton)`
	background: ${RED_COLOR};
	&:hover {
		background: ${RED_HOVER_COLOR};
	}
	&:active {
		background: ${RED_ACTIVE_COLOR};
	}
`;

export const BorderButton = styled(DefaultButton)`
	background-color: transparent;
	border: solid 1px ${CANCEL_BUTTON_DEFAULT_BORDER};
	color: ${(props) => props.color || CANCEL_BUTTON_DEFAULT_COLOR};
	&:hover {
		background-color: transparent;
		border: solid 1px ${CANCEL_BUTTON_DEFAULT_HOVER_BORDER};
		color: ${CANCEL_BUTTON_DEFAULT_HOVER_COLOR};
	}
	&:active {
		background-color: transparent;
		border: solid 1px ${CANCEL_BUTTON_DEFAULT_ACTIVE_BORDER};
		color: ${CANCEL_BUTTON_DEFAULT_ACTIVE_COLOR};
	}
`;

export const SecondaryButtonGreen = styled(BorderButton)`
	border: solid 1px ${GREEN_COLOR};
	color: ${GREEN_COLOR};
	&:hover {
		border: solid 1px ${GREEN_HOVER_COLOR};
		color: ${GREEN_HOVER_COLOR};
	}
	&:active {
		border: solid 1px ${GREEN_COLOR};
		color: ${GREEN_ACTIVE_COLOR};
	}
`;

export const SecondaryButtonRed = styled(BorderButton)`
	border: solid 1px ${RED_COLOR};
	color: ${RED_COLOR};
	&:hover {
		border: solid 1px ${RED_HOVER_COLOR};
		color: ${RED_HOVER_COLOR};
	}
	&:active {
		border: solid 1px ${RED_COLOR};
		color: ${RED_ACTIVE_COLOR};
	}
`;

// 복사방지
export const PreventDragCopy = `
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;
// 스크롤 숨기기 (동작 O)
export const HiddenScroll = `
-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
	::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}
`;

// 아이콘에 패딩, 마진, 컬러, 사이즈 넣을때 사용.
export const IconContainer = styled.div`
	line-height: 0;
	color: ${(props) => props?.color};
	padding: ${(props) => props?.padding || '0px'};
	margin: ${(props) => props.margin || '0px'};
`;
