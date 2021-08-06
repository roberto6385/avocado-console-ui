import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import Folder from './Folder';
import Server from './Server';
import {SORT_SERVER_AND_FOLDER} from '../../../reducers/common';
import {searchTreeStart} from '../functions';
import {_Nav} from '../../../styles/components/navigationBar';

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
