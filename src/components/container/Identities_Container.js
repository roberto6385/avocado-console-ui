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

const Li_Container = styled.li`
	width: ${RIGHT_SIDE_WIDTH};
	height: ${THIRD_HEIGHT};
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${BORDER_COLOR};
`;

const Account_Container = styled.div`
	width: 109px;
	display: flex;
	align-items: center;
	padding: 6px 16px;
`;
const Authentication_Container = styled(Account_Container)`
	width: 142px;
`;
const Button_Container = styled(Account_Container)`
	justify-content: center;
	padding: 0;
	width: 49px;
`;

const Span = styled.span`
	font-size: ${AVOCADO_FONTSIZE};
`;

const Account_Button = styled.button`
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

const Container = styled.div`
	width: ${RIGHT_SIDE_WIDTH};
	display: flex;
	flex-direction: column;

	align-items: center;
`;

const Identities_Container = () => {
	const {account} = useSelector((state) => state.common);

	return (
		<Container>
			<ul>
				<Li_Container>
					<Account_Container>
						<Span>Account</Span>
					</Account_Container>
					<Authentication_Container>
						<Span>Authentication</Span>
					</Authentication_Container>
					<Button_Container />
				</Li_Container>
				{account.map((item) => {
					return (
						<Li_Container key={item.id}>
							<Account_Container>
								<Span>{item.name}</Span>
							</Account_Container>
							<Authentication_Container>
								<Span>{item.type}</Span>
							</Authentication_Container>
							<Button_Container>
								<IconButton>
									<span className='material-icons button_midium'>
										delete
									</span>
								</IconButton>
							</Button_Container>
						</Li_Container>
					);
				})}
			</ul>
			<Account_Button>Edit more account settings</Account_Button>
		</Container>
	);
};

export default Identities_Container;
