import styled from 'styled-components';
import {GoFile, GoFileDirectory} from 'react-icons/go';
import {BsArrowUpDown, BsFileEarmark, IoMdFolderOpen} from 'react-icons/all';
import {
	AVOCADO_COLOR,
	ICON_LIGHT_COLOR,
	LOGO_FONTSIZE,
	MIDDLE_FONTSIZE,
} from './global_design';

// ConvertSFTP
export const ConvertIcon = styled(BsArrowUpDown)`
	font-size: 21px;
`;

// SFTPContainer
export const FileIcon = styled(BsFileEarmark)`
	font-size: ${MIDDLE_FONTSIZE};
	margin-right: 8px;
	color: ${ICON_LIGHT_COLOR};
`;
export const DirectoryIcon = styled(IoMdFolderOpen)`
	font-size: ${MIDDLE_FONTSIZE};
	margin-right: 8px;
	color: ${AVOCADO_COLOR};
`;
