import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ServerNavBarContainer} from '../../styles/common';
import Folder from './Folder';
import Server from './Server';
import Sortable from 'sortablejs';
import {SORT_SERVER_AND_FOLDER} from '../../reducers/common';

const NavList = () => {
	const {nav} = useSelector((state) => state.common);
	const dispatch = useDispatch();

	const dropNavList = () => {
		dispatch({type: SORT_SERVER_AND_FOLDER, data: {next: 'toEdge'}});
	};

	useEffect(() => {
		const sortableServerNav = document.getElementById('sortableServerNav');
		sortableServerNav !== null &&
			Sortable.create(sortableServerNav, {
				// group: 'sorting',
				sort: false,
				// direction: 'vertical',
			});
	}, []);

	return (
		<ServerNavBarContainer
			onDrop={dropNavList}
			id='sortableServerNav'
			className={'flex-column'}
		>
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
