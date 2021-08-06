import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import styled from 'styled-components';

import Folder from './Folder';
import Server from './Server';
import {SORT_SERVER_AND_FOLDER} from '../../../reducers/common';
import {HideScroll} from '../../../styles/function';
import {searchTreeStart} from '../functions';

export const _Nav = styled.div`
	display: block;
	min-height: 0;
	flex: 1 1 0;
	overflow-y: scroll;
	width: 100%;
	height: 100%;
	z-index: 3;
	${HideScroll}
`;

const ServerFolderList = ({search}) => {
	const dispatch = useDispatch();
	const {nav} = useSelector((state) => state.common, shallowEqual);
	const [filteredNavList, setFilteredNavList] = useState(nav);

	const dropNavList = useCallback(() => {
		dispatch({type: SORT_SERVER_AND_FOLDER, data: {next: 'toEdge'}});
	}, []);

	useEffect(() => {
		const sortableServerNav = document.getElementById('sortableServerNav');
		sortableServerNav !== null &&
			Sortable.create(sortableServerNav, {
				sort: false,
			});
	}, []);

	useEffect(() => {
		setFilteredNavList(searchTreeStart(nav, search));
	}, [nav, search]);

	return (
		<_Nav onDrop={dropNavList} id='sortableServerNav'>
			{filteredNavList.map((data) =>
				data.type === 'folder' ? (
					<Folder
						key={data.key}
						open={search !== ''}
						data={data}
						indent={1}
					/>
				) : (
					<Server key={data.key} data={data} indent={1} />
				),
			)}
		</_Nav>
	);
};

ServerFolderList.propTypes = {
	search: PropTypes.string.isRequired,
	setSearch: PropTypes.func,
};

export default ServerFolderList;
