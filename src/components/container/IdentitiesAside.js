import React from 'react';
import styled from 'styled-components';
import {
	ACCOUNT_BUTTON_WIDTH,
	GREEN_COLOR,
	AVOCADO_FONTSIZE,
	AVOCADO_HOVER_COLOR,
	BORDER_COLOR,
	IconButton,
	PATH_SEARCH_INPUT_HEIGHT,
	RIGHT_SIDE_WIDTH,
	THIRD_HEIGHT,
} from '../../styles/global_design';
import {useSelector} from 'react-redux';

const _Li = styled.li`
	width: ${RIGHT_SIDE_WIDTH};
	height: ${THIRD_HEIGHT};
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${BORDER_COLOR};
`;

const _AccountContainer = styled.div`
	width: 109px;
	display: flex;
	align-items: center;
	padding: 6px 16px;
`;
const _AuthenticationContainer = styled(_AccountContainer)`
	width: 142px;
`;
const _ButtonContainer = styled(_AccountContainer)`
	justify-content: center;
	padding: 0;
	width: 49px;
`;

const _Span = styled.span`
	font-size: ${AVOCADO_FONTSIZE};
`;

const _Button = styled.button`
	width: ${ACCOUNT_BUTTON_WIDTH};
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	border: none;
	background: ${GREEN_COLOR};
	border-radius: 4px;
	font-size: ${AVOCADO_FONTSIZE};
	color: white;
	margin-top: 34px;
	&:hover {
		background: ${AVOCADO_HOVER_COLOR};
	}
`;

const _Container = styled.div`
	width: ${RIGHT_SIDE_WIDTH};
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const IdentitiesAside = () => {
	const {account} = useSelector((state) => state.common);

	return (
		<_Container>
			<ul>
				<_Li>
					<_AccountContainer>
						<_Span>Account</_Span>
					</_AccountContainer>
					<_AuthenticationContainer>
						<_Span>Authentication</_Span>
					</_AuthenticationContainer>
					<_ButtonContainer />
				</_Li>
				{account.map((item) => {
					return (
						<_Li key={item.id}>
							<_AccountContainer>
								<_Span>{item.name}</_Span>
							</_AccountContainer>
							<_AuthenticationContainer>
								<_Span>{item.type}</_Span>
							</_AuthenticationContainer>
							<_ButtonContainer>
								<IconButton>
									<span className='material-icons button_midium'>
										delete
									</span>
								</IconButton>
							</_ButtonContainer>
						</_Li>
					);
				})}
			</ul>
			<_Button>Edit more account settings</_Button>
		</_Container>
	);
};

export default IdentitiesAside;
