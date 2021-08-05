import styled from 'styled-components';
import React from 'react';

export const Input = styled.input`
	width: 100%;
	height: 34px;
	padding: 6px 10px;
	border: 1px solid;
	border-color: ${(props) =>
		props.theme.basic.pages.textBoxs.normalStyle.border.color};
	border-radius: 4px;
	font-size: 14px;
	background: ${(props) =>
		props.theme.basic.pages.textBoxs.normalStyle.backgroundColor};
	color: ${(props) =>
		props.theme.basic.pages.textBoxs.normalStyle.font.color};
	&:focus {
		border-color: ${(props) =>
			props.theme.basic.pages.textBoxs.normalStyle.focused.border.color};
	}
`;
// resource, bookmark, sftp, identities page
export const SearchInput = styled.input`
	width: 100%;
	height: 34px;
	padding: 6px 10px;
	border: 1px solid;
	border-color: ${(props) =>
		props.theme.basic.pages.textBoxs.searchStyle.border.color};
	border-radius: 4px;
	font-size: 14px;
	background: ${(props) =>
		props.theme.basic.pages.textBoxs.searchStyle.backgroundColor};
	color: ${(props) =>
		props.theme.basic.pages.textBoxs.searchStyle.font.color};
`;
