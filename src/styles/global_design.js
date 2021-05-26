// color
import styled from 'styled-components';

export const SERVER_HOVER_COLOR = '#e4f3f4'; // folder,server highlight color
export const AVOCADO_HOVER_COLOR = '#45999b'; // folder,server highlight color
export const LIGHT_BACK_COLOR = '#f0f3f6'; // terminal, input background color
export const ICON_DARK_COLOR = 'rgba(0,0,0,0.54)'; // file list nav icon color
export const FONT_COLOR = 'rgba(0,0,0,0.87)'; //other icon color
export const FOOTER_BACK_COLOR = '#dee1e6';
export const SFTP_DIRECTORY_COLOR = '#4ca6a8';
export const CANCEL_BUTTON_COLOR = 'rgba(60,76,81,0.24)';
export const LIGHT_MODE_BACK_COLOR = '#ffffff';
export const BORDER_COLOR = '#e5e5e5';

// Button color
export const ICON_LIGHT_COLOR = 'rgba(60,76,81,0.44)'; // tab icon color
export const ICON_ACTIVE_LIGHT_COLOR = 'rgba(60,76,81,0.56)'; // tab icon color
export const ICON_HOVER_LIGHT_COLOR = 'rgba(60,76,81,0.31)'; // tab icon color

export const DARK_GREEN_COLOR = '#126466';
export const ANCHOR_GRAY_COLOR = '#5e5e5e';
export const LIGHT_BACKGROUND_COLOR = '#f8f9fa'; // and filelist highlighting color

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
export const AUTH_FORM_HEIGHT = '550px';

// width
export const SIDE_WIDTH = '256px'; // side main nav width
export const RIGHT_SIDE_WIDTH = '300px';
export const SEARCH_INPUT_WIDTH = '165px';
export const TAB_WIDTH = '160px'; // tab, history button
export const HISTORY_ITEM_WIDTH = '134px';
export const TERMINAL_SEARCH_FORM_WIDTH = '400px';
export const ACCOUNT_BUTTON_WIDTH = '268px'; // and account input width
export const ACCOUNT_INPUT_WIDTH = '500px';
export const AUTH_FORM_WIDTH = '480px';

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
	color: ${(props) => props.color || ICON_LIGHT_COLOR};

	&:hover {
		color: ${(props) => props?.hover || ICON_HOVER_LIGHT_COLOR};
	}
	&:active {
		color: ${(props) => props?.hover || ICON_ACTIVE_LIGHT_COLOR};
	}
`;

export const DefaultButton = styled.button`
	height: 34px;
	width: 120px; // s,m,l 사이즈 정해지면 넣을 예정.
	background: transparent;
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

// 복사방지
export const PreventDragCopy = `
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;
