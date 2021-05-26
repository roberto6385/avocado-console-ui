import styled from 'styled-components';

export const BaseSpan = styled.span`
	display: flex;
	align-items: center;
	margin: ${(props) => props?.margin || '0px'};
	padding: ${(props) => props?.padding || '0px'};
	color: ${(props) => props?.color || 'black'};
	font-size: ${(props) => props?.fontSize || '14px'};
`;
