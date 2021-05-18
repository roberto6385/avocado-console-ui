import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {
	BORDER_COLOR,
	Button,
	RIGHT_SIDE_WIDTH,
	SIXTEEN,
	SUB_HEIGHT,
} from '../../styles/global_design';
import Preferences_Container from '../container/Preferences_Container';
import Identities_Container from '../container/Identities_Container';
import {IoCloseOutline} from 'react-icons/all';
import {RIGHT_SIDE_KEY} from '../../reducers/common';

const Container = styled.div`
	display: none;
	width: 0px;
	// width: ${RIGHT_SIDE_WIDTH};
	// max-width: ${RIGHT_SIDE_WIDTH};
	flex: 1;
	z-index: 5; // terminal보다 높아야 함.
	background: white;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: ${SUB_HEIGHT};
	padding: 16px;
	font-size: ${SIXTEEN};
	border-bottom: 1px solid ${BORDER_COLOR};
`;

const Close_Button = styled(Button)`
	padding: 6px 0px 6px 6px;
`;

const SideMenuContainer = () => {
	const {rightSideKey} = useSelector((state) => state.common);

	const close_sidebar = useCallback(() => {
		const sideMenu = document.querySelector('#right_side_menu');
		sideMenu.classList.remove('active');
	}, []);

	return (
		<Container id={'right_side_menu'}>
			<Header>
				{rightSideKey}
				<Close_Button onClick={close_sidebar}>
					<IoCloseOutline />
				</Close_Button>
			</Header>
			{rightSideKey === 'Preferences' && <Preferences_Container />}
			{rightSideKey === 'Identities' && <Identities_Container />}
			{/*{rightSideKey === 'Account' && <AccountSide />}*/}
		</Container>
	);
};

export default SideMenuContainer;
