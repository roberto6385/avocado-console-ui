import React from 'react';
import {useSelector} from 'react-redux';

import {ServerNavBarContainer} from '../../styles/common';
import Folder from './Folder';
import Server from './Server';

const NavList = () => {
	const {nav} = useSelector((state) => state.common);

	return (
		<ServerNavBarContainer className={'flex-column'}>
			{nav.map((data) =>
				data.type === 'folder' ? (
					<Folder key={data.key} data={data} indent={1} />
				) : (
					<Server key={data.key} data={data} indent={1} />
				),
			)}
		</ServerNavBarContainer>
	);
};

export default NavList;
