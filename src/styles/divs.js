import styled from 'styled-components';
export const FlexBox = styled.div`
	display: flex;
	flex: ${(props) => props?.flex};
	padding: ${(props) => props?.padding || '0px'};
	margin: 0px;
	width: ${(props) => props.width};
	min-width: ${(props) => props.minWidth};
	justify-content: ${(props) => props?.justify};
	align-items: ${(props) => props?.align};
	background: ${(props) => props.back || 'initial'};
	position: ${(props) => props?.position};
	opacity: ${(props) => props.opacity};
	overflow: ${(props) => props?.overflow};
`;
export const RowBox = styled(FlexBox)`
	height: ${(props) => props?.height};
`;

export const ColBox = styled(FlexBox)`
	flex-direction: column;
	height: 100%;
`;

//SSHT
export const SSHTerminal = styled.div`
	height: 100%;
	width: 100%;
	max-height: 100%;
	max-width: 100%;
	position: relative;
`;
