import styled from 'styled-components';
import {IconButton} from '../icon';

export const SftpMainIcon = styled(IconButton)`
	color: ${(props) =>
		props.type === 'main' &&
		props.theme.pages.webTerminal.main.panels.sftp.files.main.font.color};
	svg {
		fill: ${(props) =>
			props.type === 'main' &&
			props.theme.pages.webTerminal.main.panels.sftp.files.main.font
				.color};
	}
`;
