// color
import styled from 'styled-components';
import {FONT_14, FONT_20} from './length';
import {
	ButtonColor,
	greenActiveButtonColor,
	greenHoverButtonColor,
	greenNormalButtonColor,
	greyBackgroundActiveButtonColor,
	greyBackgroundHoverButtonColor,
	greyBackgroundNormalButtonColor,
	greyBoarderActiveButtonColor,
	greyBoarderHoverButtonColor,
	greyBoarderNormalButtonColor,
	GreyButtonColor,
	redActiveButtonColor,
	redHoverButtonColor,
	redNormalButtonColor,
} from './color';

export const AVOCADO_HOVER_COLOR = '#45999b'; // folder,server highlight color

// lightmode color
export const LIGHT_MODE_MINT_COLOR = '#4ca6a8';
export const LIGHT_MODE_POPUP_COLOR = '#ffffff';
export const LIGHT_MODE_SIDE_COLOR = '#ffffff';
export const LIGHT_MODE_FONT_COLOR = '#212121';
export const LIGHT_MODE_BACKGROUND_MINT_COLOR = '#e4f3f4'; // folder,server highlight color
export const LIGHT_MODE_ICON_COLOR = '#959ea1';
export const LIGHT_MODE_BACKGROUND_COLOR = '#f8f9fa'; // and filelist highlighting color

export const LIGHT_MODE_BORDER_COLOR = '#e5e5e5';

export const LIGHT_MODE_FORM_BACKGROUND_COLOR = '#ffffff';
export const LIGHT_MODE_INPUT_BACKGROUND_COLOR = '#f0f3f6';
export const LIGHT_MODE_TERMINAL_COLOR = '#f8f9fa';

// darkmode color
export const DARK_MODE_MINT_COLOR = '#44c8c0';
export const DARK_MODE_POPUP_COLOR = '#223b52';
export const DARK_MODE_SIDE_COLOR = '#1e364c';
export const DARK_MODE_FONT_COLOR = 'rgba(255, 255, 255, 0.87)';
export const DARK_MODE_ICON_COLOR = 'rgba(255,255,255,0.54)';
export const DARK_MODE_BACKGROUND_MINT_COLOR = 'rgba(0,0,0,0.24)'; // folder,server highlight color
export const DARK_MODE_BACKGROUND_COLOR = '#1b2935';
export const DARK_MODE_BORDER_COLOR = '#192836';
export const DARK_MODE_FORM_BACKGROUND_COLOR = '#253c51';
export const DARK_MODE_INPUT_BACKGROUND_COLOR = 'rgba(0,0,0, 0.22)';
export const DARK_MODE_TERMINAL_COLOR = '#182530';

// Button color
export const ICON_ACTIVE_LIGHT_COLOR = 'rgba(60,76,81,0.56)'; // tab icon color
export const ICON_HOVER_LIGHT_COLOR = 'rgba(60,76,81,0.31)'; // tab icon color

export const DARK_GREEN_COLOR = '#126466';
export const ANCHOR_GRAY_COLOR = '#5e5e5e';

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
export const formColor = [
	LIGHT_MODE_FORM_BACKGROUND_COLOR,
	DARK_MODE_FORM_BACKGROUND_COLOR,
];
export const inputColor = [
	LIGHT_MODE_INPUT_BACKGROUND_COLOR,
	DARK_MODE_INPUT_BACKGROUND_COLOR,
];
export const terminalColor = [
	LIGHT_MODE_TERMINAL_COLOR,
	DARK_MODE_TERMINAL_COLOR,
];
export const mintColor = [LIGHT_MODE_MINT_COLOR, DARK_MODE_MINT_COLOR];

// height
export const MAIN_HEIGHT = '60px'; // tab container, logo container
export const SUB_HEIGHT = '50px'; // new folder container, (ssht, sftp nav)
export const THIRD_HEIGHT = '48px'; // aside form height, sftp table height
export const FOLDER_HEIGHT = '40px'; // folder, server height
export const FOOTER_HEIGHT = '26px'; // footer height
export const PATH_SEARCH_INPUT_HEIGHT = '34px'; // and Drop Space Button, Account Button
export const SSH_SFTP_HEADER_HEIGHT = '30px';
export const AUTH_FORM_HEIGHT = '630px';
export const AUTH_FORM_SUB_HEIGHT = '614px';

// width
export const RIGHT_SIDE_WIDTH = '300px';
export const SEARCH_INPUT_WIDTH = '165px';
export const TAB_WIDTH = '160px'; // tab, history button
export const ACCOUNT_BUTTON_WIDTH = '268px'; // and account input width
export const ACCOUNT_INPUT_WIDTH = '500px';
export const AUTH_FORM_WIDTH = '500px';
export const SERVER_FORM_INPUT_WIDTH = '178px';

// span
export const Span = styled.span`
	flex: ${(props) => props?.flex};
	font-size: ${(props) => props?.size || FONT_14};
	padding: ${(props) => props.padding || '6px'};
	line-height: 0px;
	color: ${(props) => props.color};
`;

// font
export const NOTO_SANS_KR = `'Noto Sans KR', sans-serif`;
export const ROBOTO = 'Roboto, sans-serif';
export const ROBOTO_MONO = 'Roboto Mono, sans-serif';
export const MONTSERRAT = 'Montserrat, sans-serif';
export const ROBOTO_SLAP = 'Roboto Slab, serif';

// button
export const IconButton = styled.button`
	background: transparent;
	border: none;
	line-height: 0px;
	padding: ${(props) => props?.padding || '6px'};
	margin: ${(props) => props.margin || '0px'};
	font-size: ${(props) => props?.size || FONT_20};
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
	width: 120px;
	padding: 7px 16px;
	font-size: 14px;
	border: none;
	border-radius: 4px;
	margin: 0px 8px;
`;

export const PrimaryGreenButton = styled(DefaultButton)`
	color: ${(props) => ButtonColor[props.theme]};
	background: ${(props) => greenNormalButtonColor[props.theme]};
	&:hover {
		background: ${(props) => greenHoverButtonColor[props.theme]};
	}
	&:active {
		background: ${(props) => greenActiveButtonColor[props.theme]};
	}
`;

export const PrimaryRedButton = styled(DefaultButton)`
	color: ${(props) => ButtonColor[props?.themeValue]};
	background: ${(props) => redNormalButtonColor[props?.themeValue]};
	&:hover {
		background: ${(props) => redHoverButtonColor[props?.themeValue]};
	}
	&:active {
		background: ${(props) => redActiveButtonColor[props?.themeValue]};
	}
`;

export const PrimaryGreyButton = styled(DefaultButton)`
	color: ${(props) => GreyButtonColor[props.theme]};
	background: ${(props) => greyBackgroundNormalButtonColor[props.theme]};
	border: solid 1px ${(props) => greyBoarderNormalButtonColor[props.theme]};
	&:hover {
		background: ${(props) => greyBackgroundHoverButtonColor[props.theme]};
		border: solid 1px ${(props) => greyBoarderHoverButtonColor[props.theme]};
	}
	&:active {
		background: ${(props) => greyBackgroundActiveButtonColor[props.theme]};
		border: solid 1px
			${(props) => greyBoarderActiveButtonColor[props.theme]};
	}
`;

export const SecondaryGreenButton = styled(PrimaryGreyButton)`
	background: transparent;
	color: ${(props) => greenNormalButtonColor[props.theme]};
	border: solid 1px ${(props) => greenNormalButtonColor[props.theme]};
	&:hover {
		color: ${(props) => greenHoverButtonColor[props.theme]};
		border: solid 1px ${(props) => greenHoverButtonColor[props.theme]};
	}
	&:active {
		color: ${(props) => greenActiveButtonColor[props.theme]};
		border: solid 1px ${(props) => greenActiveButtonColor[props.theme]};
	}
`;

export const SecondaryRedButton = styled(PrimaryGreyButton)`
	background: transparent;
	color: ${(props) => redNormalButtonColor[props.theme]};
	border: solid 1px ${(props) => redNormalButtonColor[props.theme]};
	&:hover {
		color: ${(props) => redHoverButtonColor[props.theme]};
		border: solid 1px ${(props) => redHoverButtonColor[props.theme]};
	}
	&:active {
		color: ${(props) => redActiveButtonColor[props.theme]};
		border: solid 1px ${(props) => redActiveButtonColor[props.theme]};
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
	cursor: pointer;
`;
