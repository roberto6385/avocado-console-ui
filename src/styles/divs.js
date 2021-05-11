import styled from 'styled-components';
import background from '../images/bg_3.png';

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
	display: inline-block;
	background: black;
	background-size: 100% 32px;
	background-position: left 10px;
	width: 100%;
	textarea {
		color: white;
		background: url(http://i.imgur.com/2cOaJ.png);
		background-attachment: local;
		background-repeat: no-repeat;
		padding-left: 35px;
		padding-top: 10px;
		outline: none;
		border: none;
		width: 100%;
		height: 100%;
		font-size: 13px;
		line-height: 16px;
		resize: none;
	}
`;
