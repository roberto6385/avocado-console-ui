import styled from 'styled-components';

export const FlexBox = styled.div`
	display: flex;
	padding: 0px;
	margin: 0px;
	width: 100%;
`;
export const RowBox = styled(FlexBox)`
	flex: ${(props) => props?.flex};
	overflow-y: scroll;
	height: 100%;
`;

export const ColBox = styled(FlexBox)`
	flex: ${(props) => props?.flex};
	flex-direction: column;
	overflow: ${(props) => props.overflow};
`;
