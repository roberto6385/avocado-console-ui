import styled from 'styled-components';

export const BaseSpan = styled.span`
	display: flex;
	align-items: center;
	margin: 0px;
	padding: 0px;
	
	width: 150px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const DropdownP = styled.p`
	margin: 0;
	padding: 0;
	width: 150px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
export const CustomP = styled.p`
	min-width: ${(props) => props.minWidth};
	margin: 0px 6px;
	padding: 2px 0px;
	font-size: 14px;
	text-align: ${(props) => props.align};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	flex: ${(props) => props.flex};
`;
export const IconSpan = styled.span`
	// color: black;
	display: flex;
	align-items: center;
`;
