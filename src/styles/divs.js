import styled from 'styled-components';

export const FlexBox = styled.div`
	display: flex;
	flex: ${(props) => props?.flex};
	padding: ${(props) => props?.padding || '0px'};
	margin: 0px;
	width: 100%;
	justify-content: ${(props) => props?.justify};
	align-items: ${(props) => props?.align};
`;
export const RowBox = styled(FlexBox)`
	height: 100%;
`;

export const ColBox = styled(FlexBox)`
	flex-direction: column;
	overflow: ${(props) => props?.overflow};
`;
