import styled from 'styled-components';

export const FlexBox = styled.div`
	display: flex;
	padding: 0px;
	margin: 0px;
	width: 100;
`;
export const RowBox = styled(FlexBox)``;

export const ColBox = styled(FlexBox)`
	flex-direction: column;
`;
