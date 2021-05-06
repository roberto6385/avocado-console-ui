import styled from 'styled-components';
import background from '../images/bg_3.png';

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
export const Background = styled(RowBox)`
	flex: 1;
	justify-content: center;
	background-image: url(${background});
	background-size: cover;
	background-position: center;
	position: relative;
`;
