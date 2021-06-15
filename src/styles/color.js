// border color
export const L_BORDER = '#e3e5e5';
export const D_BORDER = 'rgba(0, 0, 0, 0.3)';

// gray icon color
export const GRAY_ICON_ACTIVE = `#556367`;

// light button color
export const L_BUTTON = '#ffffff';
export const L_GREY_BUTTON = '#556367';
export const L_GREEN_NORMAL = '#178082';
export const L_GREEN_HOVER = '#389193';
export const L_GREEN_ACTIVE = '#0a6f71';
export const L_RED_NORMAL = '#de6565';
export const L_RED_HOVER = '#d45959';
export const L_RED_ACTIVE = '#b84646';
export const L_GREY_BOARDER_NORMAL = '#c2c2c2';
export const L_GREY_BOARDER_HOVER = '#c2c2c2';
export const L_GREY_BOARDER_ACTIVE = '#a8a8a8';
export const L_GREY_BACKGROUND_NORMAL = '#ffffff';
export const L_GREY_BACKGROUND_HOVER = '#f8f9fa';
export const L_GREY_BACKGROUND_ACTIVE = '#f8f9fa';

// dark button color
export const D_BUTTON = '#212121';
export const D_GREY_BUTTON = 'rgba(255, 255, 255, 0.6)';
export const D_GREEN_NORMAL = '#44c8c0';
export const D_GREEN_HOVER = '#69d3cd';
export const D_GREEN_ACTIVE = '#31bbb3';
export const D_RED_NORMAL = '#de6565';
export const D_RED_HOVER = '#e27777';
export const D_RED_ACTIVE = '#d45959';
export const D_GREY_BOARDER_NORMAL = 'rgba(255, 255, 255, 0.38)';
export const D_GREY_BOARDER_HOVER = 'rgba(255, 255, 255, 0.38)';
export const D_GREY_BOARDER_ACTIVE = 'rgba(255, 255, 255, 0.38';
export const D_GREY_BACKGROUND_NORMAL = '#1b2935';
export const D_GREY_BACKGROUND_HOVER = 'rgba(255, 255, 255, 0.04)';
export const D_GREY_BACKGROUND_ACTIVE = 'rgba(255, 255, 255, 0.04)';

export const L_HIGHLIGHT = '#e4f3f4';
export const L_FONT = '#212121';
export const L_ICON = `#959ea1`;
export const L_LOGO = '#126466';
export const L_IDENTITY_HIGH = 'rgba(228, 243, 244, 0.7)';
export const L_PANE_HEADER_BORDER = 'rgba(23, 128, 130, 0.4)';

export const D_NAV_HIGHLIGHT = 'rgba(0,0,0,0.22)';
export const D_HIGHLIGHT = 'rgba(105,211,205,0.05)';
export const D_FONT = 'rgba(255,255,255,0.87)';
export const D_ICON = `rgba(255,255,255,0.6)`;
export const D_LOGO = '#4ca6a8';
export const D_IDENTITY_HIGH = 'rgba(0, 0, 0, 0.12)';
export const D_PANE_HEADER_HIGH = '#1f323c';
export const D_PANE_HEADER_BORDER = 'rgba(68, 200, 192, 0.5)';

// light background color
export const L_BACK = '#ffffff'; // nav, active tab, droplist, workSpace header, subHeader
export const L_BACK_TABBAR = '#f0f3f6'; //tab bar, input, edit back
export const L_BACK_MAIN = '#f8f9fa'; // main, terminal base background,
// snippet left back, setting - prefer back, aside-identity-checked
export const L_BACK_FOOTER = '#dee1e6';

// dark background color
export const D_BACK = '#1b2935'; // active tab, input back, main, workSpace header, subHeader,
export const D_BACK_DROPLIST = '#253545';
export const D_BACK_NAV = '#1e364c'; //nav, input, edit back, snippet left back
export const D_BACK_TERMINAL = '#182530'; // terminal base background,
// setting - prefer back, aside-identity-checked
export const D_BACK_FOOTER = '#18191f';
export const D_BACK_TABBAR = '#223b52';
export const D_BACK_ASIDE = '#1c3246';
export const D_BACK_INPUT_BACK = '#21303e';
export const D_SFTP_FILELIST_BACK = '#17232E';
export const D_SFTP_EDIT_BACK = '#121d28';

// prev ui guide line
// export const D_BACK = '#0b141c';
// export const D_BACK_APPBAR = '#121d28';
// export const D_BACK_TOOLBAR_INPUT = '#21303e';
// export const D_BACK_DROPDOWN = '#253545';
// export const D_BACK1 = '#17232e';
// export const D_BACK2 = '#1b2935';

// indigo color
export const I_BACK_NAV = '#1e364c';
export const I_BACK_SETTING = '#1c3246';
export const I_BACK_SELECT_MENU = '#1e364c';
export const I_BACK_POPUP = '#223c51';
export const I_BACK_DROP = '#325165';

// theme array
export const navColor = [L_BACK, D_BACK_NAV];
export const navInputColor = [L_BACK_TABBAR, D_BACK];
export const inputColor = [L_BACK_TABBAR, D_BACK_INPUT_BACK];
export const tabbarColor = [L_BACK_TABBAR, I_BACK_NAV];
export const borderColor = [L_BORDER, D_BORDER];
export const highColor = [L_HIGHLIGHT, D_HIGHLIGHT];
export const navHighColor = [L_HIGHLIGHT, D_NAV_HIGHLIGHT];
export const activeColor = [L_GREEN_NORMAL, D_GREEN_NORMAL];
export const hoverColor = [L_GREEN_HOVER, D_GREEN_HOVER];
export const activePaneHeaderColor = [
	L_PANE_HEADER_BORDER,
	D_PANE_HEADER_BORDER,
];
export const fontColor = [L_FONT, D_FONT];
export const iconColor = [L_ICON, D_ICON];
export const tabColor = [L_BACK, D_BACK];
export const mainBackColor = [L_BACK_MAIN, D_BACK];
export const logoColor = [L_LOGO, D_LOGO];
export const terminalColor = [L_BACK_MAIN, D_BACK_TERMINAL];
export const terminalFontColor = [L_FONT, L_BACK];
export const fileListHighColor = [L_BACK_MAIN, D_SFTP_FILELIST_BACK];
export const editColor = [L_BACK_TABBAR, D_SFTP_EDIT_BACK];
export const footerColor = [L_BACK_FOOTER, D_BACK_FOOTER];

export const settingInput = [L_BACK, D_NAV_HIGHLIGHT];
export const identitySearchInput = [L_BACK_TABBAR, D_NAV_HIGHLIGHT];
export const accountHigh = [L_IDENTITY_HIGH, D_HIGHLIGHT];
export const identityHigh = [L_BACK_MAIN, D_IDENTITY_HIGH];
export const identityForm = [L_BACK, D_BACK_INPUT_BACK];
export const paneHeaderHigh = [L_BACK, D_PANE_HEADER_HIGH];
export const sshSearch = [L_BACK, D_BACK_DROPLIST];

export const historyPauseColor = '#a8a8a8';
export const historyDownloadColor = '#4ca6a8';
export const historyUploadColor = '#4285f4';
export const historyEditColor = '#E4E723';
export const historyDeleteColor = '#d45959';

export const settingColor = [L_BACK, D_NAV_HIGHLIGHT];

export const ButtonColor = [L_BUTTON, D_BUTTON];
export const GreyButtonColor = [L_GREY_BUTTON, D_GREY_BUTTON];

export const greenNormalButtonColor = [L_GREEN_NORMAL, D_GREEN_NORMAL];
export const greenHoverButtonColor = [L_GREEN_HOVER, D_GREEN_HOVER];
export const greenActiveButtonColor = [L_GREEN_ACTIVE, D_GREEN_ACTIVE];

export const redNormalButtonColor = [L_RED_NORMAL, D_RED_NORMAL];
export const redHoverButtonColor = [L_RED_HOVER, D_RED_HOVER];
export const redActiveButtonColor = [L_RED_ACTIVE, D_RED_ACTIVE];

export const greyBoarderNormalButtonColor = [
	L_GREY_BOARDER_NORMAL,
	D_GREY_BOARDER_NORMAL,
];
export const greyBoarderHoverButtonColor = [
	L_GREY_BOARDER_HOVER,
	D_GREY_BOARDER_HOVER,
];
export const greyBoarderActiveButtonColor = [
	L_GREY_BOARDER_ACTIVE,
	D_GREY_BOARDER_ACTIVE,
];

export const greyBackgroundNormalButtonColor = [
	L_GREY_BACKGROUND_NORMAL,
	D_GREY_BACKGROUND_NORMAL,
];
export const greyBackgroundHoverButtonColor = [
	L_GREY_BACKGROUND_HOVER,
	D_GREY_BACKGROUND_HOVER,
];
export const greyBackgroundActiveButtonColor = [
	L_GREY_BACKGROUND_ACTIVE,
	D_GREY_BACKGROUND_ACTIVE,
];