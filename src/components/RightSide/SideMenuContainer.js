import React from 'react';
import {RightSideBox} from '../../styles/divs';
import {useSelector} from 'react-redux';
import PreferencesSide from './PreferencesSide';
import AccountSide from './AccountSide';
import IdentitiesSide from './IdentitiesSide';

const SideMenuContainer = () => {
	const {rightSideKey} = useSelector((state) => state.common);

	return (
		<RightSideBox
			id={'right_side_menu'}
			position={'fixed'}
			overflow={'hidden'}
			width={'0px'}
			right={'0px'}
			height={'100%'}
			back={'white'}
		>
			{rightSideKey === 'Preferences' && <PreferencesSide />}
			{rightSideKey === 'Identities' && <IdentitiesSide />}
			{rightSideKey === 'Account' && <AccountSide />}
		</RightSideBox>
	);
};

export default SideMenuContainer;
