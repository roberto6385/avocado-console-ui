import styled from 'styled-components';

export const TextArea = styled.textarea`
	height: 288px;
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) =>
		props.theme.basic.pages.textAreas.normalStyle.border.color};
	background: ${(props) =>
		props.theme.basic.pages.textAreas.normalStyle.backgroundColor};
	color: ${(props) =>
		props.theme.basic.pages.textAreas.normalStyle.font.color};
	resize: none;
	&:focus {
		border-color: ${(props) =>
			props.theme.basic.pages.textAreas.normalStyle.focused.border.color};
	}
	width: 100%;
`;
