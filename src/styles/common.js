import styled from 'styled-components';
import {FiServer, RiArrowUpDownLine, RiTerminalFill} from 'react-icons/all';
import {GREEN_COLOR} from './global_design';

// SidebarShow, RotateButton 삭제 예정.
export const SidebarShow = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	width: 30px;
`;

export const RotateButton = styled.button`
	background: transparent;
	outline: none;
	border: none;
	position: absolute;
	left: -18px;

	-ms-transform: rotate(-90deg); /* IE 9 */
	-webkit-transform: rotate(-90deg); /* Chrome, Safari, Opera */
	transform: rotate(-90deg);
	&:hover {
		color: ${GREEN_COLOR};
	}
`;

// ServerNavBar
export const FaServerIcon = styled(FiServer)`
	margin-right: 4px;
	color: ${GREEN_COLOR};
`;

export const TabSSHTIcon = styled(RiTerminalFill)`
	color: ${GREEN_COLOR};
	margin-right: 5px;
`;

export const TabSFTPIcon = styled(RiArrowUpDownLine)`
	color: ${GREEN_COLOR};
	margin-right: 5px;
`;
