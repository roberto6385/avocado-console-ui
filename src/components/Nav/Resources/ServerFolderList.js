import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import Folder from './Folder';
import Server from './Server';
import {SORT_SERVER_AND_FOLDER} from '../../../reducers/common';
import {_Nav} from '../../../styles/components/navigationBar';
import {startSearchingTree} from '../../../utils/searchTree';

const ServerFolderList = ({searchVal}) => {
	const dispatch = useDispatch();
	const {nav} = useSelector((state) => state.common, shallowEqual);
	const [filteredNavList, setFilteredNavList] = useState(nav);

	const onDropResources = useCallback(() => {
		dispatch({type: SORT_SERVER_AND_FOLDER, payload: {next: 'toEdge'}});
	}, []);

	useEffect(() => {
		const sortableServerNav = document.getElementById('sortableServerNav');
		sortableServerNav !== null &&
			Sortable.create(sortableServerNav, {
				sort: false,
			});
	}, []);

	useEffect(() => {
		setFilteredNavList(startSearchingTree(nav, searchVal));
	}, [nav, searchVal]);

	return (
		<_Nav onDrop={onDropResources} id='sortableServerNav'>
			{filteredNavList.map((data) =>
				data.type === 'folder' ? (
					<Folder
						key={data.key}
						open={searchVal !== ''}
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
	searchVal: PropTypes.string.isRequired,
	setSearch: PropTypes.func,
};

export default ServerFolderList;
