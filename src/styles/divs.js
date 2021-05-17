import styled from 'styled-components';
import background from '../images/bg_3.png';
import {AVOCADO_FONTSIZE, LIGHT_BACK_COLOR} from './global_design';

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

export const RightSideBox = styled(FlexBox)`
	z-index: 5;
	height: ${(props) => props?.height};
	top: ${(props) => props?.top};
	bottom: ${(props) => props?.bottom};
	left: ${(props) => props?.left};
	right: ${(props) => props?.right};
	transition: 0.5s;
`;

export const ColBox = styled(FlexBox)`
	flex-direction: column;
	height: 100%;
`;
export const Background = styled(RowBox)`
	flex: 1;
	justify-content: center;
	background-image: url(${background});
	background-size: cover;
	background-position: center;
	position: relative;
`;

//SSHT
export const SSHTerminal = styled.div`
	height: 100%;
	width: 100%;
	max-height: 100%;
	max-width: 100%;
	position: relative;
`;
export const TextAreaWrapper = styled.div`
	flex: 1;
	display: inline-block;
	background: black;
	background-size: 100% 32px;
	background-position: left 10px;
	overflow: hidden;
	textarea {
		background: ${LIGHT_BACK_COLOR};
		height: 100%;
		padding: 20px;
		outline: none;
		border: none;
		width: 100%;
		font-size: ${AVOCADO_FONTSIZE};
		resize: none;
	}
`;
