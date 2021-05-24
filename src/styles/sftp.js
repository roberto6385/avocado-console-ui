import styled from 'styled-components';
import {
	BsFileEarmark,
	IoMdFolderOpen,
	RiArrowUpDownLine,
} from 'react-icons/all';
import {GREEN_COLOR, ICON_LIGHT_COLOR, MIDDLE_FONTSIZE} from './global_design';

// SFTPConvertButton
export const ConvertIcon = styled(RiArrowUpDownLine)`
	font-size: 18px;
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
	color: ${GREEN_COLOR};
`;
